<script setup>
import {reactive, ref} from "vue";
import fire from "../firebase.js";
import {RouterLink, useRouter} from "vue-router";
import {onAuthStateChanged} from "firebase/auth";
import OtherUserAccount from "./OtherUserAccount.vue"

let array = reactive([]);
let signedIn;

const router = useRouter();

let userDrinks = reactive([]);

let userGames = reactive([]);

let showDrinkInfo = ref(false);

let drinkInfo = reactive([]);

let generalInfo = reactive([]);

let isFollowing = ref(false);




let serverAPI = "https://discord.com/api/guilds/965317787293732956/widget.json";


function getDrinkInfo(index){
  let measurement = "Measurement";
  drinkInfo.length = 0;
  generalInfo.length = 0;
  for(let i = 0; i < Object.keys(userDrinks[index].DrinkInfo).length; i++){
    drinkInfo.push(userDrinks[index].DrinkInfo[measurement+i.toString()])

  }
  generalInfo.push(userDrinks[index].GeneralInfo);
  //checkIfFollowing(userDrinks[index].GeneralInfo.CreatorID);
  showDrinkInfo.value = true;
}

// function checkIfFollowing(userID){
//   isFollowing.value = false;
//   fire.db.collection("Users")
//   .doc(fire.auth.currentUser.uid)
//   .collection("Following")
//   .doc(userID)
//   .get()
//   .then((result)=>{
//     if (result.exists){
//       isFollowing.value = true;
//     }
//
//   })
// }
//
// function followOrUnfollow(userID, action){
//   let getFollowings = fire.db.collection("Users").doc(fire.auth.currentUser.uid).collection("Following");
//   let getUserFollowers = fire.db.collection("Users").doc(userID).collection("Followers");
//   let getUser = fire.db.collection("Users")
//       .doc(fire.auth.currentUser.uid);
//   let numberOfFollowings;
//   let numberOfUserFollowers;
//
//   getUser.get()
//       .then((result)=>{
//         numberOfFollowings = parseInt(result.data().Following)
//       })
//
//   fire.db.collection("Users")
//   .doc(userID)
//   .get()
//   .then((result)=>{
//     numberOfUserFollowers = parseInt(result.data().Followers);
//   })
//
//
//
//   switch (action){
//     case "Unfollow":
//       getFollowings.doc(userID).delete()
//       .then(()=>{
//         numberOfFollowings -= 1;
//         numberOfUserFollowers -= 1;
//         getUser.update({
//           Following: parseInt(numberOfFollowings)
//         })
//         getUserFollowers.doc(fire.auth.currentUser.uid).delete();
//         fire.db.collection("Users")
//         .doc(userID)
//         .update({
//           Followers: parseInt(numberOfUserFollowers)
//         })
//       });
//
//
//       isFollowing.value = false;
//       break;
//
//     case "Follow":
//         getFollowings.doc(userID)
//           .set({
//             Username: generalInfo[0].CreatorName
//           })
//           .then(()=>{
//             isFollowing.value = true;
//           })
//         .then(()=>{
//           numberOfFollowings += 1;
//           getUser.update({
//             Following: numberOfFollowings
//           })
//
//           numberOfUserFollowers += 1;
//
//           fire.db.collection("Users")
//           .doc(userID)
//           .update({
//             Followers: parseInt(numberOfUserFollowers)
//           })
//
//           getUser.get()
//           .then((result)=>{
//             getUserFollowers.doc(fire.auth.currentUser.uid)
//                 .set({
//                   Username: result.data().Username
//                 })
//           })
//
//
//         })
//       break;
//   }
//
// }

function exit(){
  showDrinkInfo.value = false;
}

function refreshGames(){
  userGames.length = 0;

  fire.db.collection("PublicGames")
  .get()
  .then((result)=>{
    result.forEach((post)=>{
      userGames.push({
        CreatorName: post.data().CreatorName,
        Description: post.data().Description
      })
    })
  })
}

function refreshDrinks(){
  userDrinks.length = 0;
  fire.db.collection("PublicDrinks")
      .get()
      .then((result)=>{
        result.forEach((post)=>{
          userDrinks.push({
            GeneralInfo: post.data().DrinkInfo.GeneralInfo,
            DrinkInfo: post.data().DrinkInfo.DrinkInfo
          })
        })
      })
}

refreshDrinks();


function goToUserProfile(userID){
  fire.setProfileId(userID);
  router.push("/fellowUser");

}

function showID(){
  console.log(generalInfo[0].CreatorID);
}


signedIn = fire.auth.currentUser !== null;




</script>

<template>
  <div v-if="showDrinkInfo" class="instructionDisplay">
    <div class="exit">
      <h1 @click="exit">X</h1>
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
      <h2 @click="goToUserProfile(generalInfo[0].CreatorID)">Creator : {{generalInfo[0].CreatorName}}</h2>
<!--      <button v-if="!isFollowing" @click="followOrUnfollow(generalInfo[0].CreatorID, 'Follow')">Follow</button>-->
<!--      <button v-else @click="followOrUnfollow(generalInfo[0].CreatorID, 'Unfollow')">Unfollow</button>-->
      <br>
      <img style=" margin-top:2em;width: 11em; border-radius: 5px;" src="../assets/images/drinkPlaceholder.jpg" alt="">
    </div>


  </div>

  <div class="signUpClass">

    <div class="user_made_drinks">
      <div>
        <h1>User Made Drinks</h1>
        <button @click="refreshDrinks">Refresh</button>
      </div>

      <div class="user_drink_display">
        <div v-for="item in userDrinks">
          <p>{{item.GeneralInfo.DrinkName}}</p>
          <img @click="getDrinkInfo(userDrinks.indexOf(item))" style="width: 11em; border-radius: 5px;" src="../assets/images/drinkPlaceholder.jpg" alt="">
          <p>{{item.GeneralInfo.CreatorName}}</p>
        </div>
      </div>

    </div>

    <div class="user_made_games">
      <h1>User Made Games</h1>
    </div>


<!--    <div class="game_section">-->
<!--      <div>-->
<!--        <img src="../assets/icons/ShareDrink2.jpg" alt="">-->
<!--        <p>Share a drink</p>-->
<!--      </div>-->
<!--      <div>-->
<!--        <img src="../assets/icons/Discover.png" alt="">-->
<!--        <p>Discover User Drinks</p>-->
<!--      </div>-->

<!--      <div>-->
<!--        <img src="../assets/icons/RevisedCreateGame.jpg" alt="">-->
<!--        <p>Drinking Games</p>-->
<!--      </div>-->
<!--      <div>-->
<!--        <img style="width: 8em;" src="../assets/icons/DrinkingGameIcon2.png">-->
<!--        <p>Create A Game</p>-->
<!--      </div>-->

<!--    </div>-->

<!--    <div class="social_chat">-->
<!--      <iframe src="https://discord.com/widget?id=965317787293732956&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0"-->
<!--              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>-->
<!--    </div>-->


  </div>


</template>

<style scoped>

.signUpClass{
  display: grid;
  grid-template-columns: 50% 50%;
  width: 90%;
  text-align: center;
  justify-content: center;
  height: 35em;
  margin: 2em auto;
}


.user_made_drinks{
  height: 35em;
}

.user_drink_display{
  border: 2px purple solid;
  background-color: rgba(0, 0, 0, .6);
  color: white;
  border-radius: 6px;
  height: 25em;
  margin: 1em;

  display: grid;
  grid-template-columns: 33% 33% 33%;
  overflow: scroll;
  overflow-x: hidden;
}

button{
  border: none;
  border-radius: 5px;
  height: 3em;
  width: 7em;
}

.user_drink_display::-webkit-scrollbar{
  display: none;
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

.ingredients{
  display: grid;
  grid-template-columns: 50% 50%;

}

.shownIng{
  border: 3px purple solid;
  height: 20em;
  overflow: hidden;
  overflow-x: scroll;
  margin-left: 1em;
  margin-top: 2em;
  border-radius: 6px;
  background-color: #B447CC;
}

.shownIng::-webkit-scrollbar{
  display: none;
}

.shownDesc{
  margin: 3em;
  overflow: hidden;
  overflow-x: scroll;
}

.shownDesc::-webkit-scrollbar{
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

