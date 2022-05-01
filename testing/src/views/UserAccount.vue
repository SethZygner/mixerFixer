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

let info = reactive([]);

let arrayOfUsers = fire.arrayOfUsers;

let matched = reactive([]);

let typed = ref("");


//Finds suggested users when searching for friends
function autoSuggest(arr){
  if(typed.value.trim() === ""){
    matched.length = 0;
  }else {
    matched.length = 0;
    arr.forEach((item)=>{
      if(item.Username.substr(0, typed.value.length).toLowerCase() === typed.value.toLowerCase()){
        matched.push(item);
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
      fire.db.collection("Users")
          .doc(fire.auth.currentUser.uid)
          .get()
          .then((compData)=>{
            let object = {
              Username: compData.data().Username,
              Bio: compData.data().Bio,
              Followers: compData.data().Followers,
              Following: compData.data().Following,
              GamesMade: compData.data().GamesMade,
              DrinksMade: compData.data().DrinksMade,
              Coins: compData.data().Coins
            }

            hasBio.value = object.Bio !== "";

            info.push(object);
          })
      getSavedAPIDrinks();
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


getInfoOfUser();



</script>

<template>


<div id="wholePage">
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
          <p><b>Followers: </b>{{info[0].Followers}}</p>
          <p><b>Following: </b>{{info[0].Following}}</p>
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
        <img :src="drink.Image" :alt="drink.Name">
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
          <div>
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

#favoriteDrinks div img{
  width: 10em;
  border-radius: 6px;
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

</style>
