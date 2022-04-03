<script setup>
import { RouterLink, RouterView } from "vue-router";
import fire from "../firebase.js";
import {reactive, ref} from "vue";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";

const email = ref("");
const password = ref("");
const auth = getAuth();


function login(){
  console.log("Clicked");
  console.log(email.value);
  console.log(password.value);
  createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCrid) => {
        let user = userCrid.user;
      })
      .catch((err)=>{
        alert(err.message);
        console.log(err.message);
      })
}

</script>

<template>
  <div class="credentials" >
    <input id="email" type="text" placeholder="Email" v-model="email"/>
    <br>
    <input id="password" type="text" placeholder="Password" v-model="password">
    <br>
    <button @click.prevent="login">Submit</button>
    <h3> Need to signup for an account? <router-link to="/signup">Signup here</router-link></h3>
  </div>
</template>


<style scoped>

.credentials{
  margin: 20px auto;
  text-align: center;
}

</style>
