<script setup>
import {useRouter} from "vue-router";
import {onAuthStateChanged} from "firebase/auth";
import fire from "../firebase.js";
import {ref} from "vue";
import SignIn from "../components/SignIn.vue";

/*
SE: Self Explanatory
 */

const email = ref("");//SE

const userName = ref("");//SE

const password = ref("");//SE

const rePass = ref("");//SE

const router = useRouter();//Calls the router import to use for directing to another page

let signInView = ref(true);//Shows the sign-in view it is set to true


//This function signs ip a new user and directs the user after signing them up to the home page
function signUp(){

  if(userName.value.trim() !== ""){//Checks if the entered username is empty or not

    if(password.value !== rePass.value){//Checks if the password matches the "re-enter password" field

      alert("Password didn't match! Try again.")//SE

    } else{

      fire.newUser(email.value, password.value);//Sends the entered email and password to the function found in the 'firebase' import

      let auth = fire.auth;//SE

      onAuthStateChanged(auth, ()=>{//When the authorization event has a change, then it will add a user to firebase


        fire.addUser(
            {

              Username:userName.value,
              Bio: "",
              Followers: 0,
              Following: 0,
              DrinksMade: 0,
              GamesMade: 0
        });

        //This then clears all inputs just for looks pretty much
        email.value ="";
        password.value="";
        rePass.value = "";

        router.push('/');//This pushes the user to the home page after signing them in
      })
    }
  }else{
    alert("No username entered!");//SE
  }
}


</script>

<template>

    <SignIn :class="signInView && 'hide'" />
    <!-- All the inputs -->
    <div class="main_content" :class="!signInView && 'hide'">

      <input maxlength="16" type="text" v-model="userName" placeholder="Username">
      <br>
      <input maxlength="35" type="email" v-model="email" placeholder="Enter email">
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

.main_content{
  text-align: center;
  margin-top: 3em;
}


.main_content input::placeholder{
  color: black;
}


.main_content input{
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

.main_content input:focus{
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
