<script setup>
import { ref, reactive } from "vue";
let url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin";


let selected = ref("Vodka");


const state = reactive({ drinks: {} });

function change(selected){
  url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + selected;
  getRandomCocktailId(url);
}

let requestOptions = {
  method: "GET",
  redirect: "follow",
};



function getRandomCocktailId(url){
  fetch(url, requestOptions)
      .then((response) => {
      return response.json();})
  .then((completedData)=>{
    extractSpecificValue(completedData.drinks, "idDrink");
  })
}

function extractSpecificValue(arr, prop) {

  // extract value from property
  let extractedValue = arr.map(item => item[prop]);
  console.log(extractedValue);
  return extractedValue;

}

getRandomCocktailId(url);
</script>

<template>
  <div>
    <div>
      <select id="drop-down" v-model="selected" @change="change(selected)">
        <option disabled value="">Pick your Poison</option>
        <option>Rum</option>
        <option>Vodka</option>
        <option selected="selected">Gin</option>
        <option>Tequila</option>
        <option>Bourbon</option>
        <option>Whiskey</option>
        <option>Scotch</option>
        <option>Brandy</option>
      </select>
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

</style>
