

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
        <div>
          <h1>{{state.drinks.drinks[0].strDrink}}</h1>
          <img id="randomImage" :src=state.drinks.drinks[0].strDrinkThumb alt="Image here">
          <!--<button @click="fetchRandomCocktail" class="randomButton">Randomize</button>-->
        </div>
        <div>
          <div class="ingredientLabel">
            <h3>Ingredients</h3>
          </div>
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
        </div>

        <div>
          <div class="ingredientLabel">
            <h3>Instructions</h3>
          </div>
          <div id="last">
            <p>{{state.drinks.drinks[0].strInstructions}}</p>
          </div>
        </div>

    </div>
</template>




<style scoped>
*{
  color: white;
}

/* This styles the whole thing pretty much */
.fullInfo{
  float: right;
  margin-right: 3em;
  text-align: center;
  margin-top: 0;
}

.fullInfo div h1{
  margin: 0;
}


div{
  text-align: center;
  margin: 0 auto;
}

#randomImage{
  border-radius: 10px;
}
img{
  width: 16em;
  height: auto;
}

.randomButton{
  margin: .0625em auto;
  height: 3.125em;
  display: block;
  width: 6.25em;
  text-align: center;
  border-radius: 10px;
  background-color: royalblue;
  color: white;
}



.ingredientLabel{
  border-top: 3px purple solid;
  border-right: 3px purple solid;
  border-left: 3px purple solid;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-top: 3px;
  margin-bottom: -5px;
  width: 21.875em;
  background-color: rgba(180, 71, 204, .7);
}

.ingredientLabel h3{
  margin: 3px;
  color: white;
}

/* This is the styling of both instructions AND ingredients*/
.info, #last{
  width: 21.875em;
  height: 5em;
  overflow: scroll;
  border: black solid 1px;
  background: rgba(0, 0, 0, .4);
  border-radius: 5px;
  text-align: center;
  padding: 10px;
  overflow-x: hidden;
}






/* This hides the scroll bar for the ingredients */
.info::-webkit-scrollbar, #last::-webkit-scrollbar{
  display: none;
}

.info div{
  display: grid;
  grid-template-columns: 10.9375em 10.9375em;
  text-align: center;
}


.info div:first-child{
  text-align: right;
}

.info div:last-child{
  text-align: left;
}


</style>

