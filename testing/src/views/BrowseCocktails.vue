
<script setup>

import RandomCocktail from "../components/RandomCocktail.vue";
import {reactive, ref} from "vue";
import LoadingComponent from "../components/loadingScreenShaker.vue";


document.title = "Browse Cocktails";

//Variables
let apiKey = "9973533";
let  testing = ref(true);
let ingredients = reactive([]);
let ingredientInput = ref("");

//let ingredientsListUrl = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
let multipleIngredientUrl = "";
let view = ref("");
let ingArray = reactive([]);
let listedDrinks = reactive([]);


function extractSpecifics(arr, prop, prop2){
  let extractedValue = arr.map((item) => {
    let name = item[prop];
    let picture = item[prop2];

    let drinkObject = {
      Name: name,
      Picture: picture
    }

    return drinkObject;

  });
  listedDrinks.push(extractedValue);
  return extractedValue;
}

function enterIngredient(ing){
  if(ingredientInput.value.trim() !== ""){
    if(ingArray.length === 0){
      multipleIngredientUrl = "https://www.thecocktaildb.com/api/json/v2/"+apiKey+"/filter.php?i=";
      multipleIngredientUrl += ing.trim();
      enteredIngredients(multipleIngredientUrl);
      ingArray.push(ing.trim());
      ingredientInput.value = "";
      console.log(ingArray);
    }else{
      multipleIngredientUrl += ","+ing.trim();
      ingArray.push(ing.trim());
      ingredientInput.value = "";
      console.log(ingArray);
      enteredIngredients(multipleIngredientUrl);
    }
  }else{
    ingredientInput.value = "";
    alert("Must enter a valid ingredient!");
  }

}

//Get drinks that match the ingredients
function enteredIngredients(url){
  listedDrinks.length = 0;
  fetch(url)
      .then((response)=>{
        return response.json();
      })
      .then((compData)=>{
        extractSpecifics(compData.drinks, "strDrink", "strDrinkThumb");
      })
      .catch((err)=>{
        console.log(err.message);
      })
}

function clearIngredients(){
  ingArray.length = 0;
  listedDrinks.length = 0;
  ingredientInput.value = "";

}

function loadingGif(){
  testing.value = false;
  setTimeout(()=>{
    testing.value = true;
  }, 1000);
}

//Initial Function Calls
loadingGif();

</script>

<template>
  <div class="wholePage">
    <div>
      <div class="buttonControls clearfix">
        <button class="randomButton" @click="loadingGif">Generate<br>Random</button>
      </div>

      <div class="findCocktail">
        <div class="filter">
          <input placeholder="Press ENTER"
                 @keydown.enter="enterIngredient(ingredientInput)"
                 v-model="ingredientInput"
                 type="text">
          <div v-for="item in ingArray">{{item}}</div>
          <br>
          <button @click="clearIngredients">Clear</button>
        </div>

        <div class="list">
          <div v-for="drink in listedDrinks[0]">
            <p>{{drink.Name}}</p>
            <img style="width:13em; border-radius: 10px" :src=drink.Picture alt="">
          </div>
        </div>
      </div>

    </div>
    <div class="RandomView">
      <div v-if="!testing">
        <LoadingComponent />
      </div>
      <div v-else>
        <RandomCocktail />
      </div>

    </div>
  </div>


</template>

<style scoped>

div{
  margin-top: 20px;
  text-align: center;
}

.wholePage{
  display: grid;
  grid-template-columns: 65% 35%;
}

.wholePage div{
  text-align: center;

}

.buttonControls{
  width: 100%;
  height: 3em;
}

.randomButton{
  float: right;
  margin-right: 3em;
}

.findCocktail{
  display: grid;
  grid-template-columns: 30% 70%;
  height: 100%;
  margin: 0;
}


.randomButton{
  height: 3em;
  width: 8em;
}

.RandomView div{
  text-align: center;
  margin-top: 0;
}

.list{
  display: grid;
  grid-template-columns: 50% 50%;
  width: 100%;
  height: 32em;
  margin: 0 auto;
  overflow: scroll;
}

.list::-webkit-scrollbar{
  display: none;
}

</style>
