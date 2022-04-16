<script setup>
import fire from "../firebase.js";
import {useRouter} from "vue-router";
import {reactive, ref} from "vue";

const router = useRouter();
let username = ref("");

function getInfo(Type){
  setTimeout(()=>{
    console.log(fire.getUserInfo(Type));
    console.log(fire.getUserInfo(Type));
  }, 1000);
}

getInfo("Username");

function signOut(){
  fire.signOut();
  router.push("/");
}

</script>


<template>
  <div>
    <div class="ProfImg">

    </div>
    <div class="userName">

    </div>
  </div>

</template>



<style scoped>

button{
  width: 200px;
  height: 200px;
}
</style>
