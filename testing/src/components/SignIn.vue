<script setup>
import {useRouter} from "vue-router";
import {onAuthStateChanged} from "firebase/auth";
import fire from "../firebase.js";
import {ref} from "vue";

let email = ref("");
let password = ref("");
let router = useRouter();

function signIn(){
  if(email.value.trim() !== "" && password.value.trim() !== ""){
    fire.signIn(email.value, password.value);
    onAuthStateChanged(fire.auth, ()=>{
      email.value = "";
      password.value = "";
      router.push('/');
    });

  }else {
    alert("Invalid Parameters");
  }
}


</script>

<template>
  <div class="content">
    <input type="email" v-model="email" placeholder="Email">
    <br>
    <input type="password" v-model="password" placeholder="Password">
    <br>
    <button @click = "signIn">Sign In</button>
  </div>
</template>

<style scoped>

.content{
  text-align: center;
  z-index: -50;
  position: absolute;
  margin: 3em auto;
  left: 36.8%;
}

button{
  height: 40px;
  margin: 15px;
  width: 250px;
  border-radius: 20px;
  border: none;
  background-color: rgba(93, 147, 255, .9);
  color: white;
  font-size: 20px;
}

input{
  height: 2em;
  width: 20em;
  font-size: 1.5em;
  text-align: center;
  margin-top: 1em;
  border-radius: 1.53em;
  background-color: rgba(0, 0, 0, .5);
  color: white;
  border: none;
}

.content input::placeholder{
  color: black;
}

</style>
