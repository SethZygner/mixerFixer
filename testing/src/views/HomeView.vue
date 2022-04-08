<script setup>
document.title = "Home";
import {ref, reactive, computed, onMounted, watch} from "vue";
import fire from "../firebase.js";
import {onAuthStateChanged} from "firebase/auth";



</script>

<template>

  <div class="mainMessage">
    <h1>Find Your Faves<br>And More</h1>
    <p>Introducing Mixer Fixer, a new<br>
      website designed for the modern<br>
      generation of social drinking!</p>
  </div>
  <div class="wip">
    <img src="../assets/images/Image_1.png">
  </div>
  <div>
    <img id = "background1" src = "https://pbs.twimg.com/media/Drz_T0TUcAA0ugT?format=jpg&name=4096x4096">
  </div>
</template>

<style scoped>


.mainMessage{
  height: 18.75em;
  width: 34.375em;
  position: absolute;
  border-radius: 15px;
  right: 6.25em;
  top: 12.5em;
  background: rgba(0, 0, 0, .4);
  color: white;
  text-align: center;
}

.mainMessage p{
  font-size: 1.5625em;
  position: relative;
  bottom: -1.25em;
}

.wip img{
  position: relative;
  width: 37.5em;
  height: auto;
  top: 5em;
  left: 3.125em;
  border-radius: 15px;
  border: 3px black solid;
}
#background1 {
  height: 100%;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  bottom: 1px;
  z-index: -300;
}
</style>
