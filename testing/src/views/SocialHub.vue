<script setup>
import {reactive, ref} from "vue";
import fire from "../firebase.js";
import { RouterLink } from "vue-router";
import {onAuthStateChanged} from "firebase/auth";

let array = reactive([]);
let signedIn;


let serverAPI = "https://discord.com/api/guilds/965317787293732956/widget.json";





if(fire.auth.currentUser === null){
  signedIn = false;
  console.log("No signed in")
}else {
  signedIn = true;
  console.log("Signed In")
}


</script>

<template>
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

  <div class="main_content">


    <div class="game_section">
      <div>
        <img src="../assets/icons/ShareDrink2.jpg" alt="">
        <p>Share a drink</p>
      </div>
      <div>
        <img src="../assets/icons/Discover.png" alt="">
        <p>Discover User Drinks</p>
      </div>

      <div>
        <img src="../assets/icons/RevisedCreateGame.jpg" alt="">
        <p>Drinking Games</p>
      </div>
      <div>
        <img style="width: 8em;" src="../assets/icons/DrinkingGameIcon2.png">
        <p>Create A Game</p>
      </div>

    </div>

    <div class="social_chat">
      <iframe src="https://discord.com/widget?id=965317787293732956&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
    </div>


  </div>


</template>

<style scoped>

.main_content{
  display: grid;
  grid-template-columns: 60% 40%;
  width: 90%;
  text-align: center;
  justify-content: center;
  height: 35em;
  margin: 2em auto;
}

.game_section{
  display: grid;
  grid-template-columns: 50% 50%;
  text-align: center;
  padding-top: 5em;
  column-gap: .5em;
  width: 90%;
  justify-content: center;


}

.game_section div{
  height: 10em;
  border: 3px black solid;
  width: auto;
  border-radius: 15px;
  padding: .3em;
}

.game_section div:hover{
  border: 3px #B447CC solid;
  cursor: pointer;
}



.game_section div img{
  width: 6em;
  height: auto;
}



</style>

