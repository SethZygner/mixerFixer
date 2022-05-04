<script setup>
document.title = "Home";
import {ref, reactive, computed, onMounted, watch} from "vue";
import fire from "../firebase.js";
import {onAuthStateChanged} from "firebase/auth";





</script>

<template>

  <div id="allContent">

    <div class="content1">
      <img src="../assets/images/Image_1.png">
    </div>

    <div class="content2">
      <div>
        <h1>Welcome to MixerFixer</h1>
        <h3>Where all your drinks come true...</h3>
        <p>Check out our social hub where you can discover drinks and games other users have made. If you're feeling
          creative, create your own for other users to give a shot (pun intended)!</p>
        <p>Or, try out our pre-build list of drinks by searching the "Browse Cocktail" page to see if you have ingredients to
          clench that thirst! Test your luck with the "Random Cocktail" button and discover something new.</p>
      </div>
    </div>

    <div class="content3">
      <p>Content 3</p>
    </div>

  </div>


</template>

<style scoped>


#allContent{
  display: grid;
  grid-template-columns: 50% 50%;
  width: 82%;
  height: 30em;
  margin: 5em auto;
  grid-gap: 1em;
}

.content3{
  display: none;
}

.content1 img{
  width: 33em;
  height: auto;
  margin: 3em auto;
  border-radius: 15px;
  border: 3px purple solid;
}

.content2{
  color: white;
}

.content2 div{
  width: 32em;
  margin: 4em auto 0 auto;
  padding: 2em;
  border-radius: 15px;
  background-color: #B447CC;
}

#allContent div{
  text-align: center;
}


@media screen and (max-width: 1071px) {
  #allContent{
    display: grid;
    grid-template-columns: auto;
    width: 80%;
    height: 80%;
  }

  .content1{
    display: none;

  }
  .content3, .content2{
    display: block;
    width: 100%;
  }
}



</style>
