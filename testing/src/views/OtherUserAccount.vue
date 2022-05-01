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
          DrinksMade: result.data().DrinksMade
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


function followOrUnfollow(action){
  let user = fire.db.collection("Users").doc(fire.auth.currentUser.uid);
  let otherUser = fire.db.collection("Users").doc(userInfo[0].ID);
  let userFollowing = 0;
  let otherUserFollowers = 0;
  let currentUsername = ref("");


  switch (action){
    case "Follow":
      user.get().then((result)=>{
        userFollowing = parseInt(result.data().Following);
        currentUsername.value = result.data().Username;
      })
      otherUser.get().then((result)=>{
        otherUserFollowers = parseInt(result.data().Followers);
      })





      user.update({
        Following: userFollowing += 1
      })
        .then(()=>{

          console.log("Updating otherUser");
          otherUser.update({
            Followers: otherUserFollowers +=1
          })
        }).then(()=>{
          console.log("Adding the followed user to main user account");
          user.collection("Following")
        .doc(userInfo[0].ID)
        .set({
          Username: userInfo[0].Username
        })
      })
        .then(()=>{
          console.log("Adding name to otherUsers followers")
          otherUser.collection("Followers")
          .doc(fire.auth.currentUser.uid)
          .set({
            Username: currentUsername.value
          })
        })
        .then(()=>{
          console.log("Redoing data");
          getStuff();
          isFollowing.value = true;
        })
      break;

    case "Unfollow":
      user.get().then((result)=>{
        userFollowing = parseInt(result.data().Following);
        currentUsername.value = result.data().Username;
      })
      otherUser.get().then((result)=>{
        otherUserFollowers = parseInt(result.data().Followers);
      })



      console.log(userFollowing + "user following");
      user.update({
        Following: userFollowing -= 1
      })
          .then(()=>{

            otherUser.update({
              Followers: otherUserFollowers -=1
            })
          }).then(()=>{
        user.collection("Following")
            .doc(userInfo[0].ID).delete();
      })
          .then(()=>{

            otherUser.collection("Followers")
                .doc(fire.auth.currentUser.uid)
                .delete();
          })
        .then(()=>{
          getStuff();
          isFollowing.value = false;

        })
      break;
  }



}


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
              <p><b>Followers: </b>{{item.Followers}}</p>
              <p><b>Following: </b>{{item.Following}}</p>
              <p><b>Drinks Made: </b>{{item.DrinksMade}}</p>
            </div>
          </div>
          <button @click="followOrUnfollow('Follow')" v-if="!isFollowing">Follow</button>
          <button @click="followOrUnfollow('Unfollow')" v-else>Unfollow</button>
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
  grid-template-columns: auto auto auto;
  margin-top: 4em;
}

.allInfo{
  margin-top: 3em;
}

</style>
