<script setup>

import fire from "../firebase.js";
import {reactive, ref} from "vue";

let userInfo = reactive([]);

let gamesMade = reactive([]);

let drinksMade = reactive([]);

let isFollowing = ref(false);




async function getMadeGames(){
  await fire.db.collection("Users")
  .doc(fire.userId.value)
  .collection("GamesMade")
  .get()
  .then((result)=>{
    result.forEach((item)=>{
      gamesMade.push(item.data());
    })
  })

}

async function getMadeDrinks(){
 await fire.db.collection("Users")
  .doc(fire.userId.value)
  .collection("MadeDrinks")
  .get()
  .then((result)=>{
    result.forEach((item)=>{
      drinksMade.push(item.data());
    })
  }).then(()=>{
    console.log(drinksMade);
     })
}

async function getStuff(){
  userInfo.length = 0;
 await fire.db.collection("Users")
      .doc(fire.userId.value)
      .get()
      .then((result)=>{
        userInfo.push(result.data())
        getMadeGames();
        getMadeDrinks()

      })

}

async function checkIfFollowing(){
  let user = fire.db.collection("Users").doc(fire.auth.currentUser.uid);

  await user.collection("Following")
  .doc(userInfo[0].ID)
  .get()
  .then((result)=>{
    isFollowing.value = result.exists;
  })
}


// function followOrUnfollow(action){
//
//
//   switch (action){
//     case "Follow":
//
//       break;
//
//     case "Unfollow":
//
//       break;
//   }
//
//
//
// }


getStuff();


</script>

<template>
  <div class="allContent">
    <div class="headerContent">

      <div class="informationOnUser" v-for="item in userInfo">
        <div class="information">
          <img class="profilePic"  src="../assets/images/originalPic.png">
          <div class="allInfo">
            <h2 style="width: 100%;">{{item.Username}}</h2>
            <div class="stats">
<!--              <p><b>Followers: </b>{{item.Followers}}</p>-->
<!--              <p><b>Following: </b>{{item.Following}}</p>-->
              <p><b>Drinks Made: </b>{{item.DrinksMade}}</p>
              <p><b>Games Made: </b>{{item.GamesMade}}</p>
            </div>
            <div class="bio">
              <p>{{item.Bio}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="shownCreations">


      <div class="noGames" v-if="drinksMade.length === 0">
        <h2>No drinks made by this user yet!</h2>
      </div>
      <div v-else class="encapsulated">
        <h3>Shared Drinks</h3>
        <div class="contentMade">
          <div v-for="item in drinksMade">
            <p>{{item.DrinkInfo.GeneralInfo.DrinkName}}</p>
            <img style="width: 11em; border-radius: 5px;" src="../assets/images/drinkPlaceholder.jpg" alt="">
          </div>
        </div>
      </div>


      <div class="noGames" v-if="gamesMade.length === 0">
        <h2>No games made by this user yet!</h2>
      </div>
      <div class="encapsulated" v-else>
        <h3>Shared Games</h3>
        <div  class="contentMade">
          <div v-for="item in gamesMade">
            <p>{{item.GameName}}</p>
            <img  src="../assets/images/gamePic.png" style="width: 11em; border-radius: 5px;" alt="">
          </div>
        </div>
      </div>




    </div>



  </div>
</template>

<style scoped>

.allContent{
  color: white;
  overflow: scroll;
  overflow-x: hidden;
  height: 40em;
}

.allContent::-webkit-scrollbar{
  display: none;
}

.informationOnUser{
  width: 90%;
  margin: 2em auto;
  background: rgba(0, 0, 0, .6);
  border-radius: 10px;
  height: 20em;
}

.information{
  display: grid;
  grid-template-columns: 30% 50% 20%;
  text-align: center;
}

button{
  width: 7em;
  height: 3em;
  margin: 5em auto;
}

.profilePic{
  width: 14em;
  margin: 3em;
}

.stats{
  display: grid;
  grid-template-columns: auto auto;
  margin-top: 2em;
}

.allInfo{
  margin-top: 3em;
  text-align: center;
}

.bio{
  height: 8em;
  width: 38em;
  border-radius: 10px;
  margin: 0 auto;
  background-color: rgba(225, 255, 255, .06);
  border: 1px black solid;
}

.shownCreations{
  display: grid;
  width: 90%;
  border-radius: 10px;
  grid-template-columns: 50% 50%;
  margin: 2em auto;
  background-color: rgba(0, 0, 0, .6);
  height: 30em;
}

.contentMade{
  display: grid;
  grid-template-columns: 33% 33% 33%;
  margin: 2em;
  text-align: center;
  height: 23em;
  background-color: rgba(225, 255, 255, .06);
  border: 1px black solid;
  border-radius: 10px;
}

.encapsulated{
  text-align: center;
}

img:hover{
  cursor: pointer;
}

.noGames{
  text-align: center;
  margin-top: 3em;
}


</style>
