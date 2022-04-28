<script setup>
import {useRouter} from "vue-router";
import fire from "../firebase.js";


import {onMounted, reactive, ref} from "vue";
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
              DrinksMade: compData.data().DrinksMade
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
  .then(()=>{
    console.log(APIFavorites);
  })
}


getInfoOfUser();



</script>

<template>


<div id="wholePage">
  <div class="headerContent">

    <div class="header" v-if="info[0] != null">
      <div><img class="profilePic" src="../assets/images/profilePic.jpg" alt=""></div>

      <div class="publicInformation">

        <div class="clearfix" id="topInfo">
          <h2 style="width: 12em; text-align: center">{{info[0].Username}}</h2>
          <button>Follow</button>
          <button @click="signOut">Sign Out</button>
        </div>

        <div class="clearfix" id="middleInfo">
          <p><b>Followers: </b>{{info[0].Followers}}</p>
          <p><b>Following: </b>{{info[0].Following}}</p>
          <p><b>Drinks Posted: </b>{{info[0].DrinksMade}}</p>
          <p><b>Games Posted: </b>{{info[0].GamesMade}}</p>
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

    <div id="drinksMade">

    </div>

  </div>
</div>


</template>

<style scoped>

#wholePage{
  border: 2px solid black;
  height: 40em;
  overflow: scroll;
  overflow-x: hidden;

}

#wholePage::-webkit-scrollbar{
  display: none;
}

.headerContent, .personalDrinkStuff{
  margin: 4em 2em;
  background-color: lightgray;
  border-radius: 15px;
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

#topInfo button{
  float: left;
  margin-left: 2em;
  margin-top: 1em;
  width: 8em;
  height: 3em;
  background-color: dodgerblue;
  color: white;
  border: none;
  border-radius: 10px;
}

#topInfo button:hover{
  cursor: pointer;
  background-color: cornflowerblue;
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
}




.personalDrinkStuff{
  display: grid;
  grid-template-columns: 50% 50%;
  height: 20em;
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

</style>
