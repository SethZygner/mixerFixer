

<script setup>
import { ref,reactive } from 'vue';

//Makes the title reactive
const state = reactive({ drinks: {} });
let url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";


//Sets the result to
function setResults(results){
  state.drinks = results;
}


let requestOptions = {
  method: "GET",
  redirect: "follow",
};

function fetchRandomCocktail(){
  fetch(`${url}`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then(setResults)
      .catch((error) => console.log("Error", error));
}


fetchRandomCocktail();
</script>


<template>
  <div v-if="state.drinks != null && state.drinks.drinks != null && state.drinks.drinks[0] != null" class="fullInfo">

    <div class="info">
      <p v-if="state.drinks.drinks[0].strAlcoholic === 'Alcoholic'">Alcoholic: Yes</p>
      <p v-else>Alcoholic: No</p>
      <div class="clearfix">
        <p v-if="state.drinks.drinks[0].strIngredient1 != null">{{state.drinks.drinks[0].strIngredient1}}</p>
        <p v-if="state.drinks.drinks[0].strMeasure1 != null">{{state.drinks.drinks[0].strMeasure1}}</p>
      </div>
      <div class="clearfix">
        <p v-if="state.drinks.drinks[0].strIngredient2 != null">{{state.drinks.drinks[0].strIngredient2}}</p>
        <p v-if="state.drinks.drinks[0].strMeasure2 != null">{{state.drinks.drinks[0].strMeasure2}}</p>
      </div>
      <div class="clearfix">
        <p v-if="state.drinks.drinks[0].strIngredient3 != null">{{state.drinks.drinks[0].strIngredient3}}</p>
        <p v-if="state.drinks.drinks[0].strMeasure3 != null">{{state.drinks.drinks[0].strMeasure3}}</p>
      </div>
      <div class="clearfix">
        <p v-if="state.drinks.drinks[0].strIngredient4 != null">{{state.drinks.drinks[0].strIngredient4}}</p>
        <p v-if="state.drinks.drinks[0].strMeasure4 != null">{{state.drinks.drinks[0].strMeasure4}}</p>
      </div>
      <div class="clearfix">
        <p v-if="state.drinks.drinks[0].strIngredient5 != null">{{state.drinks.drinks[0].strIngredient5}}</p>
        <p v-if="state.drinks.drinks[0].strMeasure5 != null">{{state.drinks.drinks[0].strMeasure5}}</p>
      </div>
      <div class="clearfix">
        <p v-if="state.drinks.drinks[0].strIngredient6 != null">{{state.drinks.drinks[0].strIngredient6}}</p>
        <p v-if="state.drinks.drinks[0].strMeasure6 != null">{{state.drinks.drinks[0].strMeasure6}}</p>
      </div>
      <div class="clearfix">
        <p v-if="state.drinks.drinks[0].strIngredient7 != null">{{state.drinks.drinks[0].strIngredient7}}</p>
        <p v-if="state.drinks.drinks[0].strMeasure7 != null">{{state.drinks.drinks[0].strMeasure7}}</p>
      </div>
      <div class="clearfix">
        <p v-if="state.drinks.drinks[0].strIngredient8 != null">{{state.drinks.drinks[0].strIngredient8}}</p>
        <p v-if="state.drinks.drinks[0].strMeasure8 != null">{{state.drinks.drinks[0].strMeasure8}}</p>
      </div>
      <div class="clearfix">
        <p v-if="state.drinks.drinks[0].strIngredient9 != null">{{state.drinks.drinks[0].strIngredient9}}</p>
        <p v-if="state.drinks.drinks[0].strMeasure9 != null">{{state.drinks.drinks[0].strMeasure9}}</p>
      </div>
      <div class="clearfix">
        <p v-if="state.drinks.drinks[0].strIngredient10 != null">{{state.drinks.drinks[0].strIngredient10}}</p>
        <p v-if="state.drinks.drinks[0].strMeasure10 != null">{{state.drinks.drinks[0].strMeasure10}}</p>
      </div>
      <div class="clearfix">
        <p v-if="state.drinks.drinks[0].strIngredient11 != null">{{state.drinks.drinks[0].strIngredient11}}</p>
        <p v-if="state.drinks.drinks[0].strMeasure11 != null">{{state.drinks.drinks[0].strMeasure11}}</p>
      </div>
      <div class="clearfix">
        <p v-if="state.drinks.drinks[0].strIngredient12 != null">{{state.drinks.drinks[0].strIngredient12}}</p>
        <p v-if="state.drinks.drinks[0].strMeasure12 != null">{{state.drinks.drinks[0].strMeasure12}}</p>
      </div>
      <div class="clearfix">
        <p v-if="state.drinks.drinks[0].strIngredient13 != null">{{state.drinks.drinks[0].strIngredient13}}</p>
        <p v-if="state.drinks.drinks[0].strMeasure13 != null">{{state.drinks.drinks[0].strMeasure13}}</p>
      </div>
      <div class="clearfix">
        <p v-if="state.drinks.drinks[0].strIngredient14 != null">{{state.drinks.drinks[0].strIngredient14}}</p>
        <p v-if="state.drinks.drinks[0].strMeasure14 != null">{{state.drinks.drinks[0].strMeasure14}}</p>
      </div>
      <div class="clearfix">
        <p v-if="state.drinks.drinks[0].strIngredient15 != null">{{state.drinks.drinks[0].strIngredient15}}</p>
        <p v-if="state.drinks.drinks[0].strMeasure15 != null">{{state.drinks.drinks[0].strMeasure15}}</p>
      </div>
    </div>
    <div>
      <h1>{{state.drinks.drinks[0].strDrink}}</h1>
      <img id="randomImage" :src=state.drinks.drinks[0].strDrinkThumb alt="Image here">
      <button @click="fetchRandomCocktail" class="randomButton">Randomize</button>
    </div>
    <div id="last">
      <p>{{state.drinks.drinks[0].strInstructions}}</p>
    </div>

  </div>



</template>




<style scoped>
*{
  color: white;
}

/* This styles the whole thing pretty much */
.fullInfo{
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto auto auto;
  text-align: center;
}


div{
  text-align: center;
  margin: 0 auto;
}

#randomImage{
  border-radius: 10px;
}
img{
  width: 300px;
  height: auto;
}

.randomButton{
  margin: 10px auto;
  height: 50px;
  display: block;
  width: 100px;
  text-align: center;
  border-radius: 10px;
  background-color: royalblue;
  color: white;
}

.arrow_div{
  display: none;
}

/* This is the styling of both instructions AND ingredients*/
.info, #last{
  width: 350px;
  height: 350px;
  overflow: scroll;
  border: black solid 1px;
  background: rgba(0, 0, 0, .4);
  border-radius: 5px;
  position: relative;
  top: 80px;
  text-align: center;
  padding: 10px;
}

/* This hides the scroll bar for the instructions */
#last::-webkit-scrollbar{
  display: none;
}

/* This hides the scroll bar for the ingredients */
.info::-webkit-scrollbar{
  display: none;
}

.info div{
  display: grid;
  grid-template-columns: 175px 175px;
  text-align: center;
}


.info div:first-child{
  text-align: right;
}

.info div:last-child{
  text-align: left;
}


</style>

