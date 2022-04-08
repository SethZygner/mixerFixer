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
    enteredIngredients(multipleIngredientUrl);
    map.set(ingredients[0].at(index), ingredients[0].at(index));
    view.value += ingredients[0].at(index);
  }else{
    multipleIngredientUrl += ","+ingredients[0].at(index);
    enteredIngredients(multipleIngredientUrl);
    view.value += ", " + ingredients[0].at(index);
  }
}



function enteredIngredients(url){
  fetch(url)
  .then((response)=>{
    return response.json();
  })
  .then((compData)=>{
    console.info(compData)
  })
  .catch((err)=>{
    console.log(err.message);
  })
}

function clearIngredientList(){
  multipleIngredientUrl = "";
  view.value = "";
  map.clear();
}






//Initial Function Calls
listIngredients();


</script>

<template>

  <div class="ShowButton" @click="ingredientsHidden = !ingredientsHidden">Browse<br>Specific<br>Ingredients</div>
  <div id="ingredientContainer" :class="ingredientsHidden && 'hide'">
    <div class="showIng">
      <div>{{view}}</div>

    </div>
    <button @click="clearIngredientList">Clear</button>
    <div id="ingredients">
      <div @click="clickedIngredient(ingredients[0].indexOf(ingredient))" v-for="ingredient in ingredients[0]" class="ingredient"
           :key="ingredient">{{ingredient}}
      </div>
    </div>
  </div>



</template>

<style scoped>

.ShowButton{
  border: 1px black solid;
  border-radius: 10px;
  height: 200px;
  width: 200px;
  margin: 0 auto;
  background: url("../assets/images/specificBrowse.jpg");
  position: absolute;

}

.showIng{
  border: 1px black solid;
  width: 18em;
  height: 2em;
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
  width: 80%;
  height: 600px;
  background-color: rgba(0, 0, 0, .4);
  border-radius: 20px;
  margin: 0 auto;
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
