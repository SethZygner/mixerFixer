<script setup>
import {useRouter} from "vue-router";
import fire from "../firebase.js";
import {reactive, ref} from "vue";
const router = useRouter();


//Signs out the user and sends them back to the home screen
function signOut(){
  fire.signOut();
  router.push("/");

}


let APIFavorites = reactive([]);
let userName = ref("");


async function getInfoOfUser(){
  try{
    await fire.db.collection("Users")
        .doc(fire.auth.currentUser.uid)
        .get()
        .then((info)=>{
          userName.value = info.data().Username;
        })
    await getSavedAPIDrinks();
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

    <div class="header">
      <div><img class="profilePic" src="../assets/images/profilePic.jpg" alt=""></div>

      <div class="publicInformation">

        <div class="clearfix" id="topInfo">
          <h2>{{ userName }}</h2>
          <button>Follow</button>
          <button @click="signOut">Sign Out</button>
        </div>

        <div class="clearfix" id="middleInfo">
          <p><b>Followers: </b>0</p>
          <p><b>Following: </b>0</p>
          <p><b>Drinks Posted: </b>0</p>
          <p><b>Games Posted: </b>0</p>
        </div>

        <div id="bio">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. </p>
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
  width: 40em;
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
