<script setup>
import Account from "../components/Account.vue";
import {useRouter} from "vue-router";
import fire from "../firebase.js";
const router = useRouter();

function signOut(){
  fire.signOut();
  router.push("/");
}

</script>

<template>

  <div>
    <Account />
  </div>


</template>

<style scoped>

</style>
