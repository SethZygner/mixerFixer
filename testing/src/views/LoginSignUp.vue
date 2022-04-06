<script setup>
import {useRouter} from "vue-router";
import {onAuthStateChanged} from "firebase/auth";
import fire from "../firebase.js";
import {ref} from "vue";

const email = ref("");
const userName = ref("");
const password = ref("");
const rePass = ref("");
const router = useRouter();

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
          username:userName.value,
          email: email.value
        });
        email.value ="";
        password.value="";
        router.push('/');
      })
    }
  }else{
    alert("No username entered!");
  }
}

</script>

<template>
  <div class="content">
    <div class="leftSide">
      <h1>Thirsty?<br>Get started!</h1>
    </div>

    <div class="rightSide">
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
      <p>Already have an account? <a href="#">Sign In</a></p>
    </div>
  </div>

</template>


<style scoped>

.content{
  display: grid;
  grid-template-columns: 700px 700px;
  margin: 20px auto;
  border: 1px black solid;
  justify-content: center;
  height: 500px;
  gap: 20px;
}

.leftSide, .rightSide{
  text-align: center;
  border: 1px black solid;
  border-radius: 15px;
  padding-top: 125px;
}

.rightSide input::placeholder{
  color: black;
}


.rightSide input{
  height: 40px;
  width: 350px;
  font-size: 20px;
  text-align: center;
  margin-top: 15px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, .5);
  color: white;
  border: none;
}

.rightSide input:focus{
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

#consent{
  border: 1px black solid;
}


</style>
