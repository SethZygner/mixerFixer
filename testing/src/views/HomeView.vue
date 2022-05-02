<script setup>
document.title = "Home";
import {ref, reactive, computed, onMounted, watch} from "vue";
import fire from "../firebase.js";
import {onAuthStateChanged} from "firebase/auth";





</script>

<template>

  <div id="allContent">

    <div class="content1">

    </div>

    <div class="content2">
      <p>Content 2</p>
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
  height: 55em;
  margin: 10px auto;
  grid-gap: 10px;
}

#allContent div{
  border: 1px black solid;
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
