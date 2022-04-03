<script setup>
import {reactive, ref} from "vue";

let mainUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=7-Up";

let ingredientUrl = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";

let ingredientArray = reactive([]);
let infoArray = reactive([]);
let drinkInfo = reactive([]);
let selected = ref("7-Up");
let requestOptions = {
  method: "GET",
  redirect: "follow",
};


let newObject = reactive({});



//Image portion of Code
//Changes the mainUrl to fetch cocktails with specified ingredient
function change(selected){
  mainUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + selected;
  infoArray.length = 0;
  getData(mainUrl);
}

//Put all ingredients into array
function getDrinkInfo(url){
  fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((completedData) => {
    drinkInfo.length = 0;
    drinkInfo.push(completedData.drinks[0]);
    console.info(drinkInfo[0]);
  })
}

//Gets cocktails' Images
function getData(url){
  fetch(url, requestOptions)
      .then((response) => {
        return response.json();})
      .then((completedData)=>{
        imagesIntoArray(completedData.drinks, "strDrinkThumb");
        namesIntoObject(completedData.drinks, "strDrink");
      })
}


function namesIntoObject(arr, prop){
  let extractedValue = arr.map(item => item[prop]);
  infoArray.push(newObject.name = extractedValue);
  return extractedValue;
}

//Put images in an array to be called and listed
function imagesIntoArray(arr, prop) {
  // extract value from property
  let extractedValue = arr.map(item => item[prop]);
  infoArray.push(newObject.imageUrl = extractedValue);
  return extractedValue;
}



//Ingredient Portion of Code
//Gets all ingredients (Done)
function getIngredients(url){
  fetch(url, requestOptions)
  .then((response) => {
    return response.json();})
  .then((completedData) => {
    extractIngredients(completedData.drinks, "strIngredient1");
  })
}

//Stores all ingredients into an array (Done)
function extractIngredients(arr, prop){
  let extractedValue = arr.map(item => item[prop]);
  ingredientArray.push(extractedValue.sort());
  return extractedValue;
}


function printName(index){
  let url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + infoArray[1][index] + "&api_key=1";
  getDrinkInfo(url);
}


//Initial function calls
getData(mainUrl);
getIngredients(ingredientUrl);

</script>

<template>
  <div class="fullInfo">
    <div class="dropDown">
      <!-- Calls the function to change the mainUrl when the option is clicked -->
      <select id="drop-down" v-model="selected" @change="change(selected)">
        <option disabled value="">Pick your Ingredient</option>
        <option v-for="item in ingredientArray[0]">{{item}}</option>
      </select>
    </div>

    <div class="showImages">
      <div v-for="image in infoArray[0]">
        <h2>{{infoArray[1][infoArray[0].indexOf(image)]}}</h2>
        <img  @click="printName(infoArray[0].indexOf(image))" :src="image" alt="">
      </div>
    </div>
  </div>
</template>

<style scoped>

#drop-down{
  background-color: rgba(0, 0, 0, .7);
  height: 60px;
  width: 300px;
  text-align: center;
  font-size: 25px;
  color: white;
  border-radius: 10px;
}

.showImages{
  width: 400px;
  height: 500px;
  margin: 20px auto;
  overflow: scroll;
}

.showImages::-webkit-scrollbar{
  display: none;
}

.showImages div{
  border: 1px black solid;
  margin: 10px auto;
}

.showImages div img{
  width: 200px;
  height: auto;
}

.showImages div img:hover{
  cursor: pointer;
}

</style>
