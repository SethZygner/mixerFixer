<script setup>
import {useRouter} from "vue-router";
import {onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import fire from "../firebase.js";
import { ref} from "vue";

/*
SE: Self Explanatory
 */

const newEmail = ref("");//SE

const email = ref("");

const password = ref("");

let showSignUp = ref(false);

const newUserName = ref("");

const newPassword = ref("");//SE

const rePass = ref("");//SE

const router = useRouter();//Calls the router import to use for directing to another page


let userNameExist = ref(false);

//This function signs ip a new user and directs the user after signing them up to the home page
function signUp(){

  userNameExist.value = false;

  fire.db.collection("Users")
  .get()
  .then((result)=>{
    result.forEach((item)=>{
      if(item.data().Username === newUserName.value){
        userNameExist.value = true;
      }
    })
  })




  if(newUserName.value.trim() !== ""){//Checks if the entered username is empty or not

    if(newPassword.value === rePass.value){//Checks if the password matches the "re-enter password" field

      if(!userNameExist){
        fire.newUser(newEmail.value, newPassword.value);//Sends the entered email and password to the function found in the 'firebase' import

        let auth = fire.auth;//SE

        onAuthStateChanged(auth, ()=>{//When the authorization event has a change, then it will add a user to firebase


          fire.addUser(
              {

                Username:newUserName.value,
                Bio: "",
                Followers: 0,
                Following: 0,
                DrinksMade: 0,
                GamesMade: 0,
                ID: auth.currentUser.uid,
                Coins: 3
              });

          //This then clears all inputs just for looks pretty much
          newUserName.value = "";
          newEmail.value ="";
          newPassword.value="";
          rePass.value = "";

          router.push('/');//This pushes the user to the home page after signing them in
        })
      }
      else {
        alert("Username already taken");
      }

    } else{
      alert("Password didn't match! Try again.")//SE
    }
  }else{
    alert("No username entered!");//SE
  }
}

function signIn(){
    signInWithEmailAndPassword(fire.auth, email.value, password.value)
    .then(()=>{
      router.push('/');
    })
    .catch((err)=>{
      alert(err.message);
    })


}

</script>

<template>

  <div class="allContent">

    <div class="viewOfSocialStuff" v-if="showSignUp">
      <h1>Sign Up</h1>
      <br>
      <input maxlength="16" type="text" v-model="newUserName" placeholder="Username">
      <br>
      <input maxlength="35" type="email" v-model="newEmail" placeholder="Enter email">
      <br>
      <input type="password" v-model="newPassword" placeholder="Enter Password">
      <br>
      <input type="password" v-model="rePass" placeholder="Re-enter password">
      <br>
      <button @click="signUp">Sign Up</button>
      <br>
      <p @click="showSignUp =! showSignUp">Already have an account? <span class="link">SignIn</span></p>
    </div>

    <div class="signInClass" v-else>
      <h1>Sign In</h1>
      <br>
      <input maxlength="35" type="email" v-model="email" placeholder="Enter email">
      <br>
      <input type="password" v-model="password" placeholder="Enter Password">
      <br>
      <button @click="signIn">Sign In</button>
      <br>
      <p @click="showSignUp = !showSignUp">Don't have an account? Register<span class="link"> here</span></p>
    </div>

  </div>


</template>


<style scoped>




.allContent{
  display: grid;
  grid-template-columns: 50% 50%;
}

.viewOfSocialStuff, .signInClass{
  text-align: center;
  margin-top: 3em;
  height: 31em;
}


input::placeholder{
  color: black;
}

.link{
  color: purple;
}

.link:hover{
  cursor: pointer;
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

.viewOfSocialStuff input:focus{
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
