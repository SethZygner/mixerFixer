<script setup>

import fire from "../firebase.js";
import {reactive, ref} from "vue";

let userInfo = reactive([]);

let drinkInfo = reactive([]);

let generalInfo = reactive([]);

let gamesMade = reactive([]);

let drinksMade = reactive([]);

let isLiked = ref(false);


let showDrinkInfo = ref(false);

let isFollowing = ref(false);


function checkIfFavorite(){
  try{
    if(fire.auth.currentUser !== null){
      isLiked.value = false;
      fire.db.collection("Users")
          .doc(fire.auth.currentUser.uid)
          .collection("UserFavorites")
          .get()
          .then((result)=>{
            result.forEach((doc)=>{
              if(doc.id.toString() === generalInfo[0].DrinkID){
                isLiked.value = true;
              }
            })
          })
    }
  }catch (err){
    //Nothing to see here
  }

}

function addToFavorites(){
  let info = {
    DrinkInfo: drinkInfo,
    GeneralInfo: generalInfo[0]
  }

  fire.addUserDrinkToFavorites(generalInfo[0].DrinkID, info);
  checkIfFavorite();
}

function removeFromFavorites(){
  fire.db.collection("Users")
      .doc(fire.auth.currentUser.uid)
      .collection("UserFavorites")
      .doc(generalInfo[0].DrinkID)
      .delete()
      .then(()=>{
        checkIfFavorite();
      })
}


function getDrinkInfo(index){
  drinkInfo.length = 0;
  generalInfo.length = 0;
  let measurement = "Measurement";
  for(let i = 0; i < Object.keys(drinksMade[index].DrinkInfo.DrinkInfo).length; i++){
    drinkInfo.push(drinksMade[index].DrinkInfo.DrinkInfo[measurement+i.toString()])
  }
  generalInfo.push(drinksMade[index].DrinkInfo.GeneralInfo);
  if(fire.auth.currentUser !== null){
    checkIfFavorite();
  }
  showDrinkInfo.value = true;
}

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
        getMadeDrinks();

      })

}


function exit(){
  showDrinkInfo.value = false;
}



getStuff();


</script>

<template>

  <div v-if="showDrinkInfo" class="instructionDisplay">
    <div class="exit">
      <h1 class="exitButton" @click="exit">X</h1>
    </div>

    <div class="leftSide">
      <div class="shownIng">
        <div class="ingredients" v-for="item in drinkInfo">
          <h3>{{item.Ingredient}}</h3>
          <h3>{{item.Measurement}}</h3>
        </div>
      </div>
      <div class="shownDesc">
        {{generalInfo[0].Description}}
      </div>
    </div>
    <div class="rightSide">
      <h2 >Drink Name : {{generalInfo[0].DrinkName}}</h2>
      <h2 >Creator : <span class="creatorsName">{{generalInfo[0].CreatorName}}</span></h2>
      <br>
      <img style=" margin-top:2em;width: 17em; border-radius: 5px;" src="../assets/images/drinkPlaceholder.jpg" alt="">
      <br>
      <img v-if="isLiked" @click="removeFromFavorites" style="width: 4em;" src="../assets/icons/saved.png" alt="">
      <img  v-else @click="addToFavorites" style="width: 4em;" src="../assets/icons/unSaved.png" alt="">
    </div>

  </div>
  <div class="allContent">




    <div class="headerContent">

      <div class="informationOnUser" v-for="item in userInfo">
        <div class="information">
          <img alt="" class="profilePic"  src="../assets/images/originalPic.png">
          <div class="allInfo">
            <h2 style="width: 100%;">{{item.Username}}</h2>
            <div class="stats">
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
            <img @click="getDrinkInfo(drinksMade.indexOf(item))" style="width: 11em; border-radius: 5px;" src="../assets/images/drinkPlaceholder.jpg" alt="">
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

.instructionDisplay{
  width: 60em;
  height: 35em;
  background-color: rgba(0, 0, 0, .85);
  position: absolute;
  left: 0;
  right: 0;
  margin-right: auto;
  margin-left: auto;
  margin-top: 2em;
  z-index: 100;
  color: white;
  border-radius: 10px;
  text-align: center;
  display: grid;
  grid-template-columns: 50% 50%;
}

.shownIng{
  border: 3px purple solid;
  height: 20em;
  overflow: scroll;
  overflow-x: hidden;
  margin-left: 1em;
  margin-top: 2em;
  border-radius: 6px;
  background-color: #B447CC;
}

.ingredients{
  display: grid;
  grid-template-columns: 50% 50%;

}

.shownDesc{
  margin: 3em;
  overflow: scroll;
  overflow-x: hidden;
}

.shownDesc::-webkit-scrollbar, .shownIng::-webkit-scrollbar{
  display: none;
}

.exit{
  grid-column: 1/3;
  height: 2em;
}

.exit h1{
  float: left;
  margin-left: 2em;
  width: fit-content;
}


.exit h1, img:hover{
  cursor: pointer;
}


</style>
