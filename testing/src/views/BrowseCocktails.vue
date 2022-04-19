
<script setup>

import RandomCocktail from "../components/RandomCocktail.vue";
import {reactive, ref} from "vue";
import LoadingComponent from "../components/loadingScreenShaker.vue";


document.title = "Browse Cocktails";

//Variables
let apiKey = "9973533";
let drinkInfo = reactive([]);
let testing = ref(true);
let drinkHasBeenSelected = ref(false);
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
  drinkHasBeenSelected.value = false;
  ingredientInput.value = "";

}

function loadingGif(){
  testing.value = false;
  setTimeout(()=>{
    testing.value = true;
  }, 1000);
}


//Get all relevant information about the drink clicked
function test(index){
  drinkInfo.length = 0;
  let getByNameUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+ listedDrinks[0][index].Name+"&api_key=1";
  fetch(getByNameUrl)
      .then((result)=>{
        return result.json();
      })
      .then((compData)=>{
        drinkInfo.push(compData);
        console.log(drinkInfo);
        // //Gets all relevant info
        // let drinkObject = {
        //   Name: state.strDrink,
        //   Picture: state.strDrinkThumb,
        //   Instructions: state.strInstructions,
        //   ...state.strIngredient1 && state.strIngredient1!=="" && {IngMes1:
        //         {
        //           Ing: state.strIngredient1,
        //           Measurement: state.strMeasure1
        //         }},
        //   ...state.strIngredient2 && state.strIngredient2!=="" && {IngMes2:
        //         {
        //           Ing: state.strIngredient2,
        //           Measurement: state.strMeasure2
        //         }},
        //   ...state.strIngredient3 && state.strIngredient3!=="" && {IngMes3:
        //         {
        //           Ing: state.strIngredient3,
        //           Measurement: state.strMeasure3
        //         }},
        //   ...state.strIngredient4 && state.strIngredient4!=="" && {IngMes4:
        //         {
        //           Ing: state.strIngredient4,
        //           Measurement: state.strMeasure4
        //         }},
        //   ...state.strIngredient5 && state.strIngredient5!=="" && {IngMes5:
        //         {
        //           Ing: state.strIngredient5,
        //           Measurement: state.strMeasure5
        //         }},
        //   ...state.strIngredient6 && state.strIngredient6!=="" && {IngMes6:
        //         {
        //           Ing: state.strIngredient6,
        //           Measurement: state.strMeasure6
        //         }},
        //   ...state.strIngredient7 && state.strIngredient7!=="" && {IngMes7:
        //         {
        //           Ing: state.strIngredient7,
        //           Measurement: state.strMeasure7
        //         }},
        //   ...state.strIngredient8 && state.strIngredient8!=="" && {IngMes8:
        //         {
        //           Ing: state.strIngredient8,
        //           Measurement: state.strMeasure8
        //         }},
        //   ...state.strIngredient9 && state.strIngredient9!=="" && {IngMes9:
        //         {
        //           Ing: state.strIngredient9,
        //           Measurement: state.strMeasure9
        //         }},
        //   ...state.strIngredient10 && state.strIngredient10!=="" && {IngMes10:
        //         {
        //           Ing: state.strIngredient10,
        //           Measurement: state.strMeasure10
        //         }},
        //   ...state.strIngredien11 && state.strIngredient11!=="" && {IngMes11:
        //         {
        //           Ing: state.strIngredient11,
        //           Measurement: state.strMeasure11
        //         }},
        //   ...state.strIngredient12 && state.strIngredient12!=="" && {IngMes12:
        //         {
        //           Ing: state.strIngredient12,
        //           Measurement: state.strMeasure12
        //         }},
        //   ...state.strIngredient13 && state.strIngredient13!=="" && {IngMes13:
        //         {
        //           Ing: state.strIngredient13,
        //           Measurement: state.strMeasure13
        //         }},
        //   ...state.strIngredient14 && state.strIngredient14!=="" && {IngMes14:
        //         {
        //           Ing: state.strIngredient14,
        //           Measurement: state.strMeasure14
        //         }},
        //   ...state.strIngredient15 && state.strIngredient15!=="" && {IngMes15:
        //         {
        //           Ing: state.strIngredient15,
        //           Measurement: state.strMeasure15
        //         }}
        // }
        drinkHasBeenSelected.value = true;
      })
      .catch((err)=>{
        console.info(err.message);
      })


}

function exitOut(){
  drinkHasBeenSelected.value = false;
}


//Initial Function Calls
loadingGif();

</script>

<template>
  <div class="wholePage">
    <div>
      <div  class="buttonControls">
        <input placeholder="Add an Ingredient..."
               @keydown.enter="enterIngredient(ingredientInput)"
               v-model="ingredientInput"
               type="text" style="float: right; margin-right: 5em; width: 25em; height: 2.7em; border-radius: 10px;
                border: none; text-align: center; font-size: 1.2em">
      </div>

      <div class="findCocktail" >
        <div class="filter">

          <div v-for="item in ingArray">{{item}}</div>
          <br>
          <button @click="clearIngredients">Clear</button>
        </div>

        <div v-if="listedDrinks.length === 0">
          <div>
            <h1>Make some drinks using<br>the search bar!</h1>
          </div>
        </div>
        <div v-else class="list">
          <div  v-for="drink in listedDrinks[0]">
            <p>{{drink.Name}}</p>
            <img @click="test(listedDrinks[0].indexOf(drink))" style="width:13em; border-radius: 10px" :src=drink.Picture alt="">
          </div>
        </div>
      </div>

    </div>
    <div class="RandomView">
      <div v-if="!testing">
        <LoadingComponent />
      </div>
      <div v-else>
        <button  class="randomButton" @click="loadingGif">Generate Random</button>
        <RandomCocktail />
      </div>

    </div>

    <div v-if="drinkHasBeenSelected" class="testing">
      <div class="clearfix exit" style="width: 100%; text-align: right;"><h2 @click="exitOut" style="margin-right: 2em;  width: 3em;">X</h2></div>
      <div class="fullContent">
        <div class="ingredients">

          <div class="clearfix">
            <p v-if="drinkInfo[0].drinks[0].strIngredient1 != null">{{drinkInfo[0].drinks[0].strIngredient1}}</p>
            <p v-if="drinkInfo[0].drinks[0].strMeasure1 != null">{{drinkInfo[0].drinks[0].strMeasure1}}</p>
          </div>

          <div class="clearfix">
            <p v-if="drinkInfo[0].drinks[0].strIngredient2 != null">{{drinkInfo[0].drinks[0].strIngredient2}}</p>
            <p v-if="drinkInfo[0].drinks[0].strMeasure2 != null">{{drinkInfo[0].drinks[0].strMeasure2}}</p>
          </div>

          <div class="clearfix">
            <p v-if="drinkInfo[0].drinks[0].strIngredient3 != null">{{drinkInfo[0].drinks[0].strIngredient3}}</p>
            <p v-if="drinkInfo[0].drinks[0].strMeasure3 != null">{{drinkInfo[0].drinks[0].strMeasure3}}</p>
          </div>

          <div class="clearfix">
            <p v-if="drinkInfo[0].drinks[0].strIngredient4 != null">{{drinkInfo[0].drinks[0].strIngredient4}}</p>
            <p v-if="drinkInfo[0].drinks[0].strMeasure4 != null">{{drinkInfo[0].drinks[0].strMeasure4}}</p>
          </div>

          <div class="clearfix">
            <p v-if="drinkInfo[0].drinks[0].strIngredient5 != null">{{drinkInfo[0].drinks[0].strIngredient5}}</p>
            <p v-if="drinkInfo[0].drinks[0].strMeasure5 != null">{{drinkInfo[0].drinks[0].strMeasure5}}</p>
          </div>

          <div class="clearfix">
            <p v-if="drinkInfo[0].drinks[0].strIngredient6 != null">{{drinkInfo[0].drinks[0].strIngredient6}}</p>
            <p v-if="drinkInfo[0].drinks[0].strMeasure6 != null">{{drinkInfo[0].drinks[0].strMeasure6}}</p>
          </div>

          <div class="clearfix">
            <p v-if="drinkInfo[0].drinks[0].strIngredient7 != null">{{drinkInfo[0].drinks[0].strIngredient7}}</p>
            <p v-if="drinkInfo[0].drinks[0].strMeasure7 != null">{{drinkInfo[0].drinks[0].strMeasure7}}</p>
          </div>

          <div class="clearfix">
            <p v-if="drinkInfo[0].drinks[0].strIngredient8 != null">{{drinkInfo[0].drinks[0].strIngredient8}}</p>
            <p v-if="drinkInfo[0].drinks[0].strMeasure8 != null">{{drinkInfo[0].drinks[0].strMeasure8}}</p>
          </div>

          <div class="clearfix">
            <p v-if="drinkInfo[0].drinks[0].strIngredient9 != null">{{drinkInfo[0].drinks[0].strIngredient9}}</p>
            <p v-if="drinkInfo[0].drinks[0].strMeasure9 != null">{{drinkInfo[0].drinks[0].strMeasure9}}</p>
          </div>

          <div class="clearfix">
            <p v-if="drinkInfo[0].drinks[0].strIngredient10 != null">{{drinkInfo[0].drinks[0].strIngredient10}}</p>
            <p v-if="drinkInfo[0].drinks[0].strMeasure10 != null">{{drinkInfo[0].drinks[0].strMeasure10}}</p>
          </div>

          <div class="clearfix">
            <p v-if="drinkInfo[0].drinks[0].strIngredient11 != null">{{drinkInfo[0].drinks[0].strIngredient11}}</p>
            <p v-if="drinkInfo[0].drinks[0].strMeasure11 != null">{{drinkInfo[0].drinks[0].strMeasure11}}</p>
          </div>

          <div class="clearfix">
            <p v-if="drinkInfo[0].drinks[0].strIngredient12 != null">{{drinkInfo[0].drinks[0].strIngredient12}}</p>
            <p v-if="drinkInfo[0].drinks[0].strMeasure12 != null">{{drinkInfo[0].drinks[0].strMeasure12}}</p>
          </div>

          <div class="clearfix">
            <p v-if="drinkInfo[0].drinks[0].strIngredient13 != null">{{drinkInfo[0].drinks[0].strIngredient13}}</p>
            <p v-if="drinkInfo[0].drinks[0].strMeasure13 != null">{{drinkInfo[0].drinks[0].strMeasure13}}</p>
          </div>

          <div class="clearfix">
            <p v-if="drinkInfo[0].drinks[0].strIngredient14 != null">{{drinkInfo[0].drinks[0].strIngredient14}}</p>
            <p v-if="drinkInfo[0].drinks[0].strMeasure14 != null">{{drinkInfo[0].drinks[0].strMeasure14}}</p>
          </div>

          <div class="clearfix">
            <p v-if="drinkInfo[0].drinks[0].strIngredient15 != null">{{drinkInfo[0].drinks[0].strIngredient15}}</p>
            <p v-if="drinkInfo[0].drinks[0].strMeasure15 != null">{{drinkInfo[0].drinks[0].strMeasure15}}</p>
          </div>

        </div>


        <div>
          <h1>{{drinkInfo[0].drinks[0].strDrink}}</h1>
          <img :src=drinkInfo[0].drinks[0].strDrinkThumb alt="">
        </div>


        <div class="instructions">
          <p>{{drinkInfo[0].drinks[0].strInstructions}}</p>
        </div>
      </div>
    </div>

  </div>




</template>

<style scoped>

.testing{
  width: 60em;
  height: 35em;
  background-color: rgba(0, 0, 0, .85);
  position: fixed;
  left: 0;
  right: 0;
  margin-right: auto;
  margin-left: auto;
  z-index: 10;
  color: white;
  border-radius: 10px;

}

.fullContent{
  display: grid;
  grid-template-columns: 35% 30% 35%;
}

.ingredients, .instructions{
  background-color: #B447CC;
  width: 80%;
  height: 23em;
  overflow: scroll;
  overflow-x: hidden;
  border-radius: 10px;
  margin: 2em;
}





.ingredients::-webkit-scrollbar, .instructions::-webkit-scrollbar{
  display: none;
}

.ingredients div{
  display: grid;
  grid-template-columns: 50% 50%;
}

.testing img{
  width:13em;
  border-radius: 10px;
  height: auto;
}

.exit h2:hover{
  cursor: pointer;
}

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
  height: 4em;
}


.findCocktail{
  display: grid;
  grid-template-columns: 30% 70%;
  height: 100%;
  margin: 0;
}

.filter{
  height: 30em;
  background-color: rgba(0, 0, 0, .6);
  border-radius: 10px;
  color: white;
}

.randomButton{
  height: 4em;
  width: 10em;
  margin-left: 3em;
  margin-top: -2em;
  border-radius: 10px;
  border: 2px black solid;
  background-color: rgba(180, 71, 204, .7);
  color: white;
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

.list div img:hover{
  cursor: pointer;
}

.list::-webkit-scrollbar{
  display: none;
}

</style>
