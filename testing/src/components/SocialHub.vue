<script setup>
import {ref} from "vue";
import fire from "../firebase.js";
import { RouterLink } from "vue-router";
import {onAuthStateChanged} from "firebase/auth";

let textArea = ref("");
let signedIn;

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
        <img src="../assets/icons/DrinkingGameIcon.png">
        <p>Drinking Games</p>
      </div>
      <div>
        <p>Something Else</p>
      </div>
      <div>
        <p>Another</p>
      </div>
      <div>
        <p>Another</p>
      </div>

      <div>
        <p>Another</p>
      </div>
      <div>
        <p>Another</p>
      </div>

    </div>

    <div class="social_chat">
      <div id="showChat">
        Stuff
      </div>
      <div class="chatBox">
        <textarea :disabled="signedIn === false" maxlength="200" rows="3"></textarea>
        <p :class="signedIn && 'hide'" class="signUpPrompt"><RouterLink to="/logInSignUp">Sign Up</RouterLink> to socialize!</p>
      </div>

    </div>

    <div class="options">

    </div>

  </div>


</template>

<style scoped>

.main_content{
  display: grid;
  grid-template-columns: 25% 50% 25%;
  width: 90%;
  height: 35em;
  margin: 2em auto;
}

.game_section{
  display: grid;
  grid-template-columns: 50% 50%;
  text-align: center;
}

.game_section div{
  height: 10em;
}

.game_section div img{
  width: 6em;
  height: auto;
}

.hide{
  display: none;
}

.social_chat{
  text-align: center;
}

.social_chat textarea{
  resize: none;
  padding: 1em;
  width: 80%;
  border-radius: 1em;
  border: none;
  height: 5%;

}

.signUpPrompt{
  position: relative;
  bottom: 4em;
}


#showChat{
  height: 80%;
  margin: 1em;
  background-color: white;
  border-radius: 10px;
}


</style>
