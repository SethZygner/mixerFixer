<script setup>
import {useRouter} from "vue-router";
import fire from "../firebase.js";
const router = useRouter();

function signOut(){
  fire.signOut();
  router.push("/");
}


</script>

<template>


</template>

<style scoped>

</style>
