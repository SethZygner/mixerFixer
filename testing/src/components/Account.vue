<script setup>
import fire from "../firebase.js";
import {useRouter} from "vue-router";

const router = useRouter();

function signOut(){
  fire.signOut();
  router.push("/");
}
</script>


<template>

  <div>
    <button @click="signOut">Sign Out</button>
  </div>

</template>



<style scoped>

button{
  width: 200px;
  height: 200px;
}
</style>
