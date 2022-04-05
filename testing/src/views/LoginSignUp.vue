<script setup>
import { RouterLink, RouterView, useRoute, useRouter} from "vue-router";
import { getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import fire from "../firebase.js";
import {onMounted, reactive, ref} from "vue";

const email = ref("");
const password = ref("");
const rePass = ref("");
const router = useRouter();
//Sign Up a New User
function signUp(){
  if(password.value !== rePass.value){
    alert("Password didn't match! Try again.")
  }else{
    fire.newUser(email.value, password.value);
    let auth = fire.auth;
    onAuthStateChanged(auth, ()=>{
      console.log("New user added: " + auth.currentUser.uid);
      fire.addUser({name:"Seth"});
      email.value ="";
      password.value="";
      router.push('/');
    })


  }
}

function signOut(){
  fire.signOut();
}

function returnId(){
  if(fire.auth.currentUser === null){
    console.log("No User Signed In")
  }else {
    console.log(fire.auth.currentUser.uid);
  }
}
</script>

<template>
  <div class="content">
    <div class="leftSide">
      <h1>Thirsty?<br>Get started!</h1>
    </div>

    <div class="rightSide">
      <input type="email" v-model="email" placeholder="Enter email">
      <br>
      <input type="password" v-model="password" placeholder="Enter Password">
      <br>
      <input type="password" v-model="rePass" placeholder="Re-enter password">
      <br>
      <button @click="signUp">Sign Up</button>
      <br>
      <button @click="returnId">Show ID</button>
      <br>
      <button @click="signOut">Sign Out</button>
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

</style>
