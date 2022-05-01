<script setup>
import {reactive, ref} from "vue";
import fire from "../firebase.js";
import {RouterLink, useRouter} from "vue-router";
import {onAuthStateChanged} from "firebase/auth";

let array = reactive([]);
let signedIn;

let router = useRouter();

let userDrinks = reactive([]);


let serverAPI = "https://discord.com/api/guilds/965317787293732956/widget.json";


function refreshData(){
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
        console.log(userDrinks);
      })
}

refreshData();




signedIn = fire.auth.currentUser !== null;




</script>

<template>


  <div class="signUpClass">

    <div class="user_made_drinks">
      <div>
        <h1>User Made Drinks</h1>
        <button @click="refreshData">Refresh</button>
      </div>

      <div class="user_drink_display">
        <div v-for="item in userDrinks">
          <p>{{item.GeneralInfo.DrinkName}}</p>
          <img style="width: 11em; border-radius: 5px;" src="../assets/images/drinkPlaceholder.jpg" alt="">
          <p>{{item.GeneralInfo.CreatorName}}</p>
        </div>

      </div>
    </div>

    <div class="user_made_games">
      <h1>User Made Games</h1>
    </div>


    <!--
 <div class="content">
     <div>
       <img class="tutorial_button" src="../assets/images/FlipCupTutorial.png" alt="">
       <h3>Setup</h3>
       <ol type="1">
         <li>Split your group into even teams</li>
         <li>Fill the cups. Pour each players drink of choice into his or her cup.</li>
         <li>Line up on either side of the table with your drink in front of you.
           Each person should be standing directly across from someone on the other team.
         </li>
       </ol>
       <h3>Gameplay</h3>
       <p>Flip Cup starts by the first people on each team chugging their beer, placing their empty cup back on the edge of
         the table, and using their fingers to flip the cup completely upside down. Once the first player has successfully
         “flipped” their solo cup, the next player will play their turn by chugging and flipping, and so on. The team to flip
         their solo cups the fastest, wins!
       </p>
     </div>

   </div>
   -->

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
  border: 1px black solid;
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







</style>

