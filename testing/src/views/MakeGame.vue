<script setup>
import fire from "../firebase.js";
import { ref} from "vue";



let userName = ref("");
let gameName = ref("");
let description = ref("");
let howToPlay = ref("");
let coinAmount = ref(0);


//Gets user's username
if(fire.auth.currentUser !== null){
  fire.db.collection("Users")
      .doc(fire.auth.currentUser.uid)
      .get()
      .then((result)=>{
        userName.value = result.data().Username;
      })
}


//Posts a new game
function postGame(){

  if(gameName.value.trim() !== "" && description.value.trim() !== "" && howToPlay.value.trim() !== ""){
    //Creates Object
    let gameObject = {
      GameName: gameName.value,
      Description: description.value,
      HowToPlay: howToPlay.value,
      CreatorName: userName.value,
      CreatorID: fire.auth.currentUser.uid
    }
    //Adds game to user profile
    fire.db.collection("Users")
        .doc(fire.auth.currentUser.uid)
        .collection("GamesMade")
        .add(gameObject)
        .then((doc)=>{

          //Adds to public games
          fire.db.collection("PublicGames")
              .doc(doc.id)
              .set(gameObject)
              .then(()=>{

                //Gets rid of a coin
                fire.db.collection("Users")
                    .doc(fire.auth.currentUser.uid)
                    .get()
                    .then((result)=> {
                      let coins = result.data().Coins;
                      let amountPosted = result.data().GamesMade;

                      if(coins > 0){
                        coins -= 1;
                        amountPosted += 1;
                        fire.db.collection("Users")
                            .doc(fire.auth.currentUser.uid)
                            .update({
                              Coins: coins,
                              GamesMade: amountPosted
                            })
                            .then(()=>{
                              gameName.value = "";
                              description.value = "";
                              howToPlay.value = "";
                            })
                      }else{
                        alert("Not enough coins to proceed");
                      }
                    })
              })
        })
  }else{
    alert("Invalid Input")
  }
}


</script>

<template>

  <div class="allContent">

    <div>
      <input v-model="gameName" type="text" placeholder="Name of the game...">
      <br>
      <textarea v-model="description" placeholder="Description..."></textarea>
      <br>
      <textarea v-model="howToPlay" placeholder="Instructions..."></textarea>
    </div>
    <button @click="postGame">Send Game</button>
  </div>



</template>

<style scoped>

.allContent{
  margin: 0 auto;
  text-align: center;
}

input{
  margin-top: 2em;
  width: 30em;
  height: 3em;
}

textarea{
  resize: none;
  margin-top: 2em;
  width: 50em;
  height: 10em;
}

input, textarea{
  border-radius: 10px;
  border: none;
  padding: 1em;
}

button{
  width: 8em;
  height: 4em;
  margin-top: 1em;
  border-radius: 10px;
  border: none;
}

textarea, input::placeholder{
  font-family: Bahnschrift,serif;
}


</style>

