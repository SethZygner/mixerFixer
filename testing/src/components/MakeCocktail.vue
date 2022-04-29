<script setup>
import fire from "../firebase.js";
import {reactive, ref} from "vue";


let ingredientsArray = reactive([]);
let ingredient = ref("");
let amount = ref("");
let measure = ref("");

let userName = ref("");
let drinkName = ref("");
let description = ref("");

fire.db.collection("Users")
.doc(fire.auth.currentUser.uid)
.get()
.then((result)=>{
  userName.value = result.data().Username;
})



function postDrink(arr){
  try{
    if(arr.length !== 0 && description.value.trim() !== "" && drinkName.value.trim() !== "" && parseFloat(amount.value) > 0){
      let drinkObj = {};
      let Measurement = "Measurement"
      let Measurements = reactive({});
      for (let i = 0; i < arr.length; i++){
        Measurements[Measurement+i.toString()] = arr[i]
      }

      drinkObj["Drink Info"] = Measurements;
      drinkObj["General Info"] = {
        DrinkName: drinkName.value,
        Description: description.value,
        CreatorName: userName.value,
        CreatorID: fire.auth.currentUser.uid
      }

      fire.db.collection("Users")
      .doc(fire.auth.currentUser.uid)
      .get()
      .then((result)=>{
        let coins = result.data().Coins;

        if(coins > 0){
          coins -= 1;
          fire.db.collection("Users")
          .doc(fire.auth.currentUser.uid)
          .update({
            Coins: coins
          }).then(()=>{
            fire.db.collection("Users")
                .doc(fire.auth.currentUser.uid)
                .collection("MadeDrinks")
                .add({
                  DrinkInfo: drinkObj
                })
                .then((doc)=>{
                  fire.db.collection("PublicDrinks")
                      .doc(doc.id)
                      .set({
                        DrinkInfo: drinkObj
                      })
                })
          })



        }else{
          alert("You are out of coins!");
        }
      })


    }else{
      alert("Missing some fields!")
    }
  }catch (err){
    console.log(err.message);
  }
}


function addToList(){
  if(ingredientsArray.length !== 15){
    if(ingredient.value !== "" && amount.value !== ""){
      let object = {
        Ingredient: ingredient.value,
        Measurement: parseFloat(amount.value)+ " "+measure.value
      }
      ingredientsArray.push(object);
      ingredient.value = "";
      amount.value = "";
    }
  }else{
    alert("Can't add more than 15 ingredients!");
  }

}

function deleteIngredient(index){

  ingredientsArray.splice(index, 1);

}



</script>

<template>
<div class="allContent">
  <div class="ingredientInput">
    <div style="text-align: center; justify-content: center">
      <input placeholder="Drink Name..." v-model="drinkName">
      <button @click="addToList">Add Ingredient</button>
      <div class="ingredientStuff">
        <input maxlength="30" v-model="ingredient" id="ingredient" placeholder="Ingredient..." type="text">
        <input v-model="amount" id="measureNumber" placeholder="Amount..." type="number">
        <select v-model="measure" style="height: 3em; border-radius: 3px">
          <option>oz</option>
          <option>cup</option>
          <option>Tbsp.</option>
          <option>tsp.</option>
          <option>mL</option>
          <option>Liters</option>
          <option></option>
        </select>
      </div>
      <div class="ingredientBox">
        <div class="clearfix ingredient" style="width: 80%; margin: 1em auto; height: auto; text-align: center;" v-for="item in ingredientsArray">
          <p >{{item.Ingredient}}</p>
          <p >{{item.Measurement}}</p>
          <div>
            <button @click="deleteIngredient(ingredientsArray.indexOf(item))" style="height: 2em; width: 2em; ">X</button>
          </div>
        </div>
      </div>
      <div style="height: 4em; border: 1px black solid">
        <button>Continue to Instructions</button>
      </div>
    </div>
  </div>


  <div class="ingredientInstructionInput">
    <h2>Enter Instructions</h2>
    <textarea v-model="description" style="resize: none; width: 20em; height: 6em;"></textarea>
    <button @click="postDrink(ingredientsArray)">Send</button>
  </div>
</div>


</template>

<style scoped>


.allContent{
  display: grid;
  grid-template-columns: 45% 45%;
  gap: 2em;
  text-align: center;
  justify-content: center;
  margin: 3em 2em;

}



input{
  margin: .5em;
  height: 3em;
  border-radius: 3px;
  border: none;
  width: 20em;
  text-align: center;
}

.ingredientStuff{

  margin: .5em;
}

.ingredient {
  display: grid;
  grid-template-columns: 40% 30% 30%;
  border: 2px black solid;
}

.ingredientBox{
  border: 1px black solid;
  height: 26em;
}

.ingredient p{
  text-align: center;
}

.ingredient div{
  text-align: right;
}

</style>
