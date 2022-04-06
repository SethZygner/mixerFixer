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
let ingredientsHidden = ref(true);
let view = ref("");
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
    view += ingredients[0].at(index);
    console.log(multipleIngredientUrl);
  }else{
    multipleIngredientUrl += ","+ingredients[0].at(index);
    view += ", " + ingredients[0].at(index);
    console.log(multipleIngredientUrl);
  }



}

function clearIngredientList(){
  multipleIngredientUrl = "";
  view = "";
  map.clear();
}






//Initial Function Calls
listIngredients();


</script>

<template>

  <button class="what" @click="ingredientsHidden = !ingredientsHidden">Hide</button>
  <div id="ingredientContainer" :class="ingredientsHidden && 'hide'">
    <div class="functions">
      <div class="ingView">
        <!-- This isn't working for some reason -->
        <h1>{{view}}</h1>
      </div>
      <button @click="clearIngredientList">Clear</button>
    </div>

    <div id="ingredients">
      <div @click="clickedIngredient(ingredients[0].indexOf(ingredient))" v-for="ingredient in ingredients[0]" class="ingredient"
           :key="ingredient">{{ingredient}}</div>
    </div>
  </div>



</template>

<style scoped>

button{
  height: 40px;
  width: 100px;
  margin: 0 auto;
}

.ingView{
  border: 1px black solid;
  width: 400px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, .8);
  }

.functions{
  display: inline-flex;
}

#ingredients{
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 10px;
  width: 50%;
  margin: 0 auto;
  height: 80%;
  overflow: scroll;
  padding: 10px;

}

#ingredientContainer{
  border: 1px black solid;
  text-align: center;
  margin: -30px auto;
  width: 80%;
  height: 600px;
  background-color: rgba(0, 0, 0, .4);
  border-radius: 20px;
  padding: 20px;
}

#ingredients div{
  border: black solid 1px;
  border-radius: 10px;
  color: black;
  background-color: white;
}

#ingredients div:hover{
  cursor: pointer;
  background-color: rgba(93, 147, 255, .8);
}

#ingredients::-webkit-scrollbar{
  display: none;
}

.hide{
  display: none !important;
}


</style>
