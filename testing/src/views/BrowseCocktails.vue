
<script setup>
//Imports
import RandomCocktail from "../components/RandomCocktail.vue";
import {defineAsyncComponent, reactive, ref} from "vue";
import LoadingComponent from "../components/loadingScreenShaker.vue";
import fire from "../firebase.js";



//Variables
let apiKey = "9973533";

let  testing = ref(true);

let ingredients = reactive([]);

let requestOptions ={
  method: "GET",
  redirect: "follow"
};


let ingredientsListUrl = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
let multipleIngredientUrl = "";
let ingredientsHidden = ref(true);
let view = ref("");
let map = new Map();


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


//Get drinks that match the ingredients
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

//Clear ingredients
function clearIngredientList(){
  multipleIngredientUrl = "";
  view.value = "";
  map.clear();
}


function poo(){
  testing.value = false;
  setTimeout(()=>{
    testing.value = true;
  }, 1000);
}



//Initial Function Calls
poo();
listIngredients();

document.title = "Browse Cocktails";


</script>

<template>
  <div class="wholePage">
    <div>
      <div class="buttonControls clearfix">
        <button class="randomButton" @click="poo">Generate<br>Random</button>
        <button class="findCocktailButton">Find Cocktail</button>
      </div>

      <div class="list_of_drinks">

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

.findCocktailButton{
  float: left;
  margin-left: 3em;
}

.findCocktailButton, .randomButton{
  height: 3em;
  width: 8em;
}

.RandomView div{
  text-align: center;
  margin-top: 0;
}

</style>
