<script setup>
//Imports
import {reactive, ref} from "vue";
import fire from "../firebase.js";


//Variables
let apiKey = "9973533";

let drinkNames = reactive([]);
const drinkObject = reactive({});
let ingredients = reactive([]);

let requestOptions ={
  method: "GET",
  redirect: "follow"
};


let ingredientsListUrl = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
let multipleIngredientUrl = "";


/*
First, we will create some functions.
The first one should be used to list all the
ingredients that can be used and put them in an
assortment so that the user can choose from each
 */

//These 2 functions get all the ingredients
function extractIngredientElements(arr, prop){
  let extractedValue = arr.map(item => item[prop]);
  ingredients.push(extractedValue.sort());
  return extractedValue;
}
function listIngredients(){
  fetch(ingredientsListUrl, requestOptions)
  .then((response)=>{
    return response.json();
  })
  .then((completedData)=>{
    ingredients.length = 0;
    extractIngredientElements(completedData.drinks, "strIngredient1");
  })
}


let map = new Map();
//When an ingredient is clicked
function clickedIngredient(index){
  if(map.size === 0){
    multipleIngredientUrl = "https://www.thecocktaildb.com/api/json/v2/"+apiKey+"/filter.php?i=";
    multipleIngredientUrl += (ingredients[0].at(index));
    map.set(ingredients[0].at(index), ingredients[0].at(index));
    console.log(multipleIngredientUrl);
  }else{
    multipleIngredientUrl += ","+ingredients[0].at(index);
    console.log(multipleIngredientUrl);
  }
}

function clearIngredientList(){
  multipleIngredientUrl = "";
  console.log("Cleared");
  map.clear();
}






//Initial Function Calls
listIngredients();


</script>

<template>

  <button @click="clearIngredientList"></button>
  <div id="ingredientContainer">
    <div @click="clickedIngredient(ingredients[0].indexOf(ingredient))" v-for="ingredient in ingredients[0]" class="ingredient"
         :key="ingredient">{{ingredient}}</div>
  </div>


</template>

<style scoped>

#ingredientContainer{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 100px));
  gap: 10px;
  grid-auto-flow: dense;
  width: 700px;
  height: 600px;
  overflow: scroll;
}

#ingredientContainer div{
  border: black solid 1px;
  border-radius: 10px;
  color: white;
}

#ingredientContainer div:hover{
  cursor: pointer;
  background-color: rgba(0, 0, 0, .6);
}

#ingredientContainer::-webkit-scrollbar{
  display: none;
}

.clicked{
  background-color: #B447CC;
}

</style>
