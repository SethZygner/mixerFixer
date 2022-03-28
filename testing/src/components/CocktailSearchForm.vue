<script setup>
import {reactive, ref} from "vue";

let mainUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin";

let ingredientUrl = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";

let array = reactive([]);
let pictureArray = reactive([]);
let selected = ref("Vodka");
let requestOptions = {
  method: "GET",
  redirect: "follow",
};
const state = reactive({ drinks: {} });



//Image portion of Code
//Changes the mainUrl to fetch cocktails with specified ingredient
function change(selected){
  mainUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + selected;
  pictureArray.length = 0;
  getImages(mainUrl);
}

//Gets cocktails' Images
function getImages(url){
  fetch(url, requestOptions)
      .then((response) => {
        return response.json();})
      .then((completedData)=>{
        //Come back and change this
        imagesIntoArray(completedData.drinks, "strDrinkThumb");
      })
}

//Put images in an array to be called and listed
function imagesIntoArray(arr, prop) {
  // extract value from property
  let extractedValue = arr.map(item => item[prop]);
  pictureArray.push(extractedValue);
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
  array.push(extractedValue.sort());
  return extractedValue;
}



//Initial function calls
getImages(mainUrl);
getIngredients(ingredientUrl);

</script>

<template>
  <div>
    <div>
      <!-- Calls the function to change the mainUrl when the option is clicked -->
      <select id="drop-down" v-model="selected" @change="change(selected)">
        <option disabled value="">Pick your Ingredient</option>
        <option v-for="item in array[0]">{{item}}</option>
      </select>
    </div>
    <div class="showImages">
      <ul>
        <li v-for="image in pictureArray[0]"><img :src="image" alt=""></li>
      </ul>
    </div>
  </div>
  <div>

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
  width: 600px;
  height: 500px;
  padding: 10px;
  border: black solid 1px;
  overflow: scroll;
  margin: 0 auto;
  text-align: center;
  justify-content: center;
}

.showImages::-webkit-scrollbar{
  display: none;
}

.showImages ul li img{
  width: 350px;
  height: auto;
  padding-top: 10px;
}

.showImages ul{
  list-style-type: none;
}

</style>
