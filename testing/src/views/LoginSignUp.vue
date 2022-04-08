<script setup>
import {useRouter} from "vue-router";
import {onAuthStateChanged} from "firebase/auth";
import fire from "../firebase.js";
import {ref} from "vue";
import SignIn from "../components/SignIn.vue";

const email = ref("");
const userName = ref("");
const password = ref("");
const rePass = ref("");
const router = useRouter();
const signInView = ref(true);

//Sign Up a New User and go
//to the home page
function signUp(){
  if(userName.value.trim() !== ""){
    if(password.value !== rePass.value){
      alert("Password didn't match! Try again.")
    } else{
      fire.newUser(email.value, password.value);
      let auth = fire.auth;
      onAuthStateChanged(auth, ()=>{
        console.log("New user added: " + auth.currentUser.uid);
        fire.addUser({
          Username:userName.value,
          Time: fire.timeStamp
        });
        email.value ="";
        password.value="";
        rePass.value = "";
        router.push('/');
      })
    }
  }else{
    alert("No username entered!");
  }
}


</script>

<template>

    <SignIn :class="signInView && 'hide'" />
    <div class="content" :class="!signInView && 'hide'">
      <input type="text" v-model="userName" placeholder="Username">
      <br>
      <input type="email" v-model="email" placeholder="Enter email">
      <br>
      <input type="password" v-model="password" placeholder="Enter Password">
      <br>
      <input type="password" v-model="rePass" placeholder="Re-enter password">
      <br>
      <button @click="signUp">Sign Up</button>
      <br>
      <button @click="signInView = !signInView" style="background-color: white; color: black;">Sign In</button>
    </div>

</template>


<style scoped>

.content{
  text-align: center;
  margin-top: 3em;
}


.content input::placeholder{
  color: black;
}


.content input{
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

.content input:focus{
  border: none;
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

button:hover{
  cursor: pointer;
}

.hide{
  display: none;
}


</style>
