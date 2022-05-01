<script setup>

import fire from "../firebase.js";
import {reactive, ref} from "vue";

let userInfo = reactive([{Username:{}}]);

let isFollowing = ref(false);


async function getStuff(){
  userInfo.length = 0;
 await fire.db.collection("Users")
      .doc(fire.userId.value)
      .get()
      .then((result)=>{
        userInfo.push({
          Username: result.data().Username,
          ID: result.data().ID,
          Followers: result.data().Followers,
          Following: result.data().Following,
          DrinksMade: result.data().DrinksMade,
          GamesMade: result.data().GamesMade,
          Bio: result.data().Bio
        })
       checkIfFollowing();
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
  </div>
</template>

<style scoped>

.allContent{
  color: white;
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


</style>
