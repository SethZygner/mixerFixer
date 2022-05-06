<script setup>
import {useRouter} from "vue-router";
import fire from "../firebase.js";
import {reactive, ref} from "vue";
import {onAuthStateChanged} from "firebase/auth";

const router = useRouter();


//Signs out the user and sends them back to the home screen
function signOut(){
  fire.signOut();
  router.push("/");

}


let APIFavorites = reactive([]);

let hasBio = ref(true);

let userBio = ref("");

let changeBio = ref(false);

let drinkInfo = reactive([]);

let showInfo = ref(false);

let info = reactive([]);

let arrayOfUsers = fire.arrayOfUsers;

let matched = reactive([]);

let typed = ref("");

let getDrinkURL ="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Mojito&api_key=1"



function clickedAPIFavorite(index){
  let getDrinkURL ="https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+APIFavorites[index].Name+"&api_key=1";

  drinkInfo.length = 0;
  fetch(getDrinkURL)
  .then((result)=>{
    return result.json();
  })
  .then((item)=>{

    let ingredientsArray = [];
    let generalInfo;
    for (let i = 0; i<= Object.keys(item.drinks[0]).length; i++){
      let measurement = "strMeasure";
      let ingredient = "strIngredient";
      let finalIngredient = item.drinks[0][ingredient+(i+1).toString()]
      let finalMeasurement = item.drinks[0][measurement+(i+1).toString()];
      if(finalIngredient !== null && finalIngredient !== undefined){
        ingredientsArray.push({
          Ingredient: finalIngredient,
          Measurement: finalMeasurement

        })
      }
    }

    generalInfo = {
      DrinkId: item.drinks[0]["idDrink"],
      DrinkName: item.drinks[0]["strDrink"],
      Instructions: item.drinks[0]["strInstructions"],
      Image: item.drinks[0]["strDrinkThumb"]
    }

    drinkInfo.push({
      DrinkMeasurements: ingredientsArray,
      GeneralInfo: generalInfo
    });
    console.log(drinkInfo);
    })
  .then(()=>{
    showInfo.value = true;
  })


}

//Finds suggested users when searching for friends
function autoSuggest(arr){
  if(typed.value.trim() === ""){
    matched.length = 0;
  }else {
    matched.length = 0;
    arr.forEach((item)=>{
      if(item.Username.substr(0, typed.value.length).toLowerCase() === typed.value.toLowerCase()){
        if(item.Username !== info[0].Username){
          matched.push(item);
        }

      }
    });
  }

}

function addBio(){
  changeBio.value = true;

  hasBio.value = true;
}

async function getInfoOfUser(){
  try{
    info.length = 0;
   await onAuthStateChanged(fire.auth, ()=>{
     try{
       fire.db.collection("Users")
           .doc(fire.auth.currentUser.uid)
           .get()
           .then((compData)=>{
             let object = {
               Username: compData.data().Username,
               Bio: compData.data().Bio,
               GamesMade: compData.data().GamesMade,
               DrinksMade: compData.data().DrinksMade,
               Coins: compData.data().Coins
             }

             hasBio.value = object.Bio !== "";

             info.push(object);
           })
       getSavedAPIDrinks();
     }catch (err){
       console.log("No user signed in");
     }

    })

  }catch(err){
    console.log(err.message);
  }

}

function enteredBio(){
  try{
    if (userBio.value.trim() !== ""){
      fire.db.collection("Users")
          .doc(fire.auth.currentUser.uid)
          .update({
            Bio: userBio.value
          })
      .then(()=>{
        changeBio.value = false;
        getInfoOfUser();
      })
    }

  }catch(err){
    console.log(err.message);
  }

}

async function getSavedAPIDrinks(){
  APIFavorites.length = 0;
  await fire.db.collection("Users")
  .doc(fire.auth.currentUser.uid)
  .collection("APIFavorites")
  .get()
  .then((result)=>{
    result.forEach((doc)=>{
      let info = {
        Name: doc.data().strDrink,
        Image: doc.data().strDrinkThumb
      }
      APIFavorites.push(info);
    })
  })
}

function clickOnUser(userID){
  fire.setProfileId(userID);
  router.push("/fellowUser");
}

function removeFromFavorites(docID){
  try{
    showInfo.value = false;
    fire.db.collection("Users")
        .doc(fire.auth.currentUser.uid)
        .collection("APIFavorites")
        .doc(docID).delete().then(()=>{
          getInfoOfUser();
    })
  }catch(err){
    console.log(err.message);
  }

}

function exit(){
  showInfo.value = false;
}

getInfoOfUser();



</script>

<template>


<div id="wholePage">

  <div v-if="showInfo" class="shownInfo clearfix">
    <div class="exit" style="text-align: center">
      <h1 style="float: left;" @click="exit">X</h1>
      <img @click="removeFromFavorites(drinkInfo[0].GeneralInfo.DrinkId)" style="width: 4em; border: none; margin-right: 3em" src="../assets/icons/saved.png" alt="">
    </div>

    <div class="fullInfo">
      <div class="ingDisplay">
        <div v-for="item in drinkInfo[0].DrinkMeasurements" class="ingAndMeasure">
          <div class="shownIng">
            <div>
              <p>{{item.Ingredient}}</p>
            </div>
            <div>
              <p>{{item.Measurement}}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="nameAndImg">
        <h1>{{drinkInfo[0].GeneralInfo.DrinkName}}</h1>
        <img :src=drinkInfo[0].GeneralInfo.Image alt="">
      </div>


      <!-- At the far right is the instructions -->
      <div class="instructions">
        <p>{{drinkInfo[0].GeneralInfo.Instructions}}</p>
      </div>
    </div>


  </div>





  <div class="headerContent">
<!--    <input @input="autoSuggest(arrayOfUsers)" v-model="typed">-->

    <div class="header" v-if="info[0] != null">
      <div><img class="profilePic" src="../assets/images/originalPic.png" alt=""></div>

      <div  class="publicInformation">

        <div class="clearfix" id="topInfo">
          <h2 style="width: 12em; text-align: left">{{info[0].Username}}</h2>
          <img style="float: right; width: 3em; margin-right: 2em;" src="../assets/icons/settingsIcon.png" @click="signOut">
        </div>

        <div class="clearfix" id="middleInfo">
          <p><b>Drinks Posted: </b>{{info[0].DrinksMade}}</p>
          <p><b>Games Posted: </b>{{info[0].GamesMade}}</p>
          <p><b>Coins: </b>{{info[0].Coins}}</p>
        </div>

        <div id="bio" class="clearfix" style=" width: 40em; display: grid; grid-template-columns: auto auto">
          <p v-if="!hasBio" @click="addBio">Make a Bio!</p>
          <div v-if="hasBio && !changeBio">
            <p style="width: 30em">{{info[0].Bio}}</p>
          </div>

          <div v-if="changeBio">
            <textarea class="enterBio" @keydown.enter="enteredBio" v-model="userBio"></textarea>
          </div>

         <img @click="addBio" class="editImage" src="../assets/icons/editButton.png" alt="">

        </div>

      </div>

    </div>
  </div>





  <div class="personalDrinkStuff">

    <div id="favoriteDrinks">
      <div style="text-align: center" v-for="drink in APIFavorites">
        <p>{{drink.Name}}</p>
        <img class="favoritesImg" @click="clickedAPIFavorite(APIFavorites.indexOf(drink))" :src="drink.Image" :alt="drink.Name">
      </div>

    </div>

    <div id="friendsPanel" style="text-align: center">
      <h1>Find Friends</h1>
      <div class="friendInput">
        <input style="height: 2.5em; text-align: center; font-size: 15px"
               @input="autoSuggest(arrayOfUsers)" v-model="typed" type="text">
      </div>

      <div class="friendListContainer">
        <div class="listedFriendSearch" v-for="user in matched">
          <div @click="clickOnUser(user.ID)">
            <img style="width: 3em" src="../assets/images/originalPic.png">
            <p>{{user.Username}}</p>
          </div>
        </div>
      </div>
    </div>

  </div>



</div>


</template>

<style scoped>

#wholePage{

  height: 40em;
  overflow: scroll;
  overflow-x: hidden;

}

#wholePage::-webkit-scrollbar{
  display: none;
}

.headerContent, .personalDrinkStuff{
  margin: 4em 2em;
  background-color: rgba(0, 0, 0, .6);
  border-radius: 15px;
  color: white;
}

.header{
  display: grid;
  grid-template-columns: 25% 75%;
}

.profilePic{
  width: 15em;
  height: 15em;
  border-radius: 50%;
  border: 3px royalblue solid;
  margin: 2em;
}

#topInfo{
  height: 4em;
  margin-top: 3em;
}

#topInfo h2{
  float: left;
}



#middleInfo{
  width: 100%;
  height: 4em;
  display: inline-block;
}

#middleInfo p{
  float: left;
  margin-right: 2em;
}

#bio{
  width: 30em;
}

.editImage{
  width: 1.8em !important;
}


.enterBio{
  resize: none;
  width: 40em;
  height: 7em;
  font-family: Bahnschrift, serif;
}




.personalDrinkStuff{
  display: grid;
  grid-template-columns: 50% 50%;
  height: 40em;
  padding: .5em;
}

#favoriteDrinks{
  overflow: scroll;
  overflow-x: hidden;
  display: grid;
  grid-template-columns: 33% 33% 33%;

}

#favoriteDrinks::-webkit-scrollbar{
  display: none;
}

.favoritesImg{
  width: 10em;
  border-radius: 6px;
}

.favoritesImg:hover{
  cursor: pointer;
}

.friendInput{
  text-align: center;
  margin-bottom: .4em;
}

.friendInput input{
  width: 30em;
}

.friendListContainer{
  display: grid;
  grid-template-columns: 45% 45%;
  gap: 5px;
}

.listedFriendSearch div{
  border: 1px black solid;
  padding: 1em;
  border-radius: 5px;
}

.listedFriendSearch:hover{
  cursor: pointer;
}

.friendListContainer div p{
  float: right;
  margin-right: 2em;
}

.shownIng{
  display: grid;
  grid-template-columns: 50% 50%;
}

.ingDisplay, .instructions{
  background-color: #B447CC;
  border: 4px purple solid;
  width: 80%;
  height: 23em;
  overflow: scroll;
  overflow-x: hidden;
  border-radius: 10px;
  margin: 2em;


}

.ingDisplay::-webkit-scrollbar, .instructions::-webkit-scrollbar{
  display: none;
}



.shownInfo{
  width: 60em;
  height: 35em;
  background-color: rgba(0, 0, 0, .85);
  position: absolute;
  left: 0;
  right: 0;
  margin-right: auto;
  margin-left: auto;
  margin-top: 2em;
  z-index: 10;
  color: white;
  border-radius: 10px;
}


.fullInfo{
  display: grid;
  text-align: center;
  grid-template-columns: 37.5% 25% 37.5%;
  margin: 1em;
}

.shownInfo img{
  width:13em;
  border-radius: 10px;
  height: auto;
  border: 3px #B447CC solid;
}



.exit{
  column-span: all;
  width: 100%;
  height: 5em;
}

.exit h1{
  margin-left: 1em;
  width: fit-content;
}

.exit h1:hover{
  cursor: pointer;
}

</style>
