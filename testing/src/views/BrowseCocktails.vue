<script setup>

//Grabbing imports to use in this file
import RandomCocktail from "../components/RandomCocktail.vue";
import {reactive, ref} from "vue";
import fire from "../firebase.js";
import LoadingComponent from "../components/loadingScreenShaker.vue";

//This simply changes the title shown in the tab when opened in an explorer of some kind
document.title = "Browse Cocktails";
/*
SE: means "Self Explanatory"
 */

if (fire.auth === null){
  console.log("User is null");
}



//Variables
let apiKey = "9973533";  //SE

let isLiked = ref(false);

let drinkInfo = reactive([]); //All drink information needed based on ingredients chosen

let loadingIconIsShown = ref(true); //Initializes the loading icon to show for the random cocktail section

let drinkHasBeenSelected = ref(false); //SE

let ingredientInput = ref(""); //Gets the ingredients inputted by user

let ingArray = reactive([]); //Holds the multiple ingredients the user inputted

let listedDrinks = reactive([]); //Drinks displayed from what the user has inputted

let multipleIngredientUrl; //Initialize the URL for function "enterIngredient(ing)"



//This function takes the ingredient given by the user
function enterIngredient(ing){


  if(ingredientInput.value.trim() !== ""){ //This "if" statement checks if the input the user made is valid (not empty)

    //Because the URL needs to have commas, this will check if the "ingArray" is empty and if it is,
    //this means that there will be no commas necessary for the first ingredient entered
    if(ingArray.length === 0){

      multipleIngredientUrl = "https://www.thecocktaildb.com/api/json/v2/"+apiKey+"/filter.php?i="; //Adds URL

      multipleIngredientUrl += ing.trim(); //Eliminate spaces of the ingredient entered and adds it to the URL

      sendEnteredIngredientsURL(multipleIngredientUrl); //SE

      ingArray.push(ing.trim()); //Pushes to the array for display in the "filter" div (seen below in template)

      ingredientInput.value = "" //Sets the input back to empty for smooth transition to enter a new ingredient to add

    }else{ //This else is for if there are already items in the "ingArray" so when it's added to the URL,
      //there will be a comma added with it (as the URL requires)

      multipleIngredientUrl += ","+ing.trim(); //Adds the comma to the URL along with the added ingredient

      ingArray.push(ing.trim()); //Pushes to the array for display in the "filter" div (seen below in template)

      ingredientInput.value = ""; //Sets the input back to empty for smooth transition to enter a new ingredient to add

      sendEnteredIngredientsURL(multipleIngredientUrl); //SE
    }
  }else{//Just in case the user tries to enter something empty
    ingredientInput.value = ""; //Sets the input back to empty for smooth transition to enter a new ingredient to add
    alert("Must enter a valid ingredient!"); //Makes an alert to th user
  }

}




//Get drinks that match the ingredients
function sendEnteredIngredientsURL(url){
  listedDrinks.length = 0; //Clears the listed drinks before filing it up again with new information

  //Gets the URL entered from the "enterIngredient(ing)" function
  fetch(url)
      .then((response)=>{
        return response.json(); //Gets response and turns it into a JSON file so it can be read
      })
      .then((compData)=>{

        //Takes completed data and gets specific path "drinks" for the array and specifies which keys it wants to pull
        extractSpecifics(compData.drinks, "strDrink", "strDrinkThumb", "idDrink");
      })
      .catch((err)=>{
        alert(err.message); //SE
      })
}




//Gets the specific Name and Picture for each drink listed
function extractSpecifics(arr, prop, prop2, prop3){
  let extractedValue = arr.map((item) => {
    let name = item[prop];
    let picture = item[prop2];
    let theID = item[prop3];
    return {
      Name: name,
      Picture: picture,
      ID: theID
    };
  });
  listedDrinks.push(extractedValue);
  return extractedValue;
}




//This basically just clears everything from the "ingArray" to the input and gives a fresh new start to the
//searching process
function clearIngredients(){
  ingArray.length = 0; //Sets the ingredients to empty
  listedDrinks.length = 0; //Makes the displayed list empty
  drinkHasBeenSelected.value = false; //Removes the possibility of a drink selected display being shown fter clearing
  ingredientInput.value = ""; //Sets input back to blank

}




//This function shows the animation for the loading screen for the random cocktail in the form of a GIF for about 1 sec
//before loading the random cocktail component
function loadingGif(){
  loadingIconIsShown.value = false;
  setTimeout(()=>{
    loadingIconIsShown.value = true;
  }, 1000);
}




//Get all relevant information about the drink clicked
function selectedDrink(index){
  drinkInfo.length = 0; //Resets the specific drink information, so it doesn't have more than 1 drink in it

  //This URL, as you can see, takes the listed drinks at index 0 and within that index 0, it goes to the specified
  //index that is clicked. For instance, if I have a 2D array, ill have something like arr[2][2]. This means
  //I'd have 9 spots I could look at. Because there arr[0,1,2][0,1,2]. So 3x3=9. In this case, lets call it
  //[column][row]. So in column 0, find row (index)
  let getByNameUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+ listedDrinks[0][index].Name+"&api_key=1";

  favorites(parseInt(listedDrinks[0][index].ID));

  //Fetches the new URL made above
  fetch(getByNameUrl)
      .then((result)=>{
        return result.json(); // Takes the result and turns it into a JSON file to read from
      })
      .then((compData)=>{

        drinkInfo.push(compData); //Once completed, the compData (completed data) is then put into the "drinkInfo" array.


        drinkHasBeenSelected.value = true; //Allows the display of the drink selected to show along with its information
      })
      .catch((err)=>{
        alert(err.message);//SE
      })
}




//This function checks if the item is already favorite
function favorites(drinkId){

  try{
    isLiked.value = false;
    let liked = fire.db.collection("Users")
        .doc(fire.auth.currentUser.uid)
        .collection("APIFavorites")
        .get();

    liked.then((result)=>{
      result.forEach((doc)=>{
        if(parseInt(doc.id) === drinkId){
          isLiked.value = true;
          return isLiked.value = true;

        }
      })

    })
  }catch(err){
    console.log(err.message);
  }

}

function addToFavorites(docID, drink){
  fire.addApiToFavorites(docID, drink);

  favorites(parseInt(docID));

  isLiked.value = true;

}

function removeFromFavorites(docID){
  try{
    fire.db.collection("Users")
        .doc(fire.auth.currentUser.uid)
        .collection("APIFavorites")
        .doc(docID).delete();
  }catch(err){
    console.log(err.message);
  }

  isLiked.value = false;

}


//Exits from the display shown for the selected drink
function exitOut(){
  drinkHasBeenSelected.value = false;
}


//Initial Function Calls (for initial things to happen)
loadingGif();



</script>

<template>




  <!-- The WHOLE PAGE is literally everything displayed on the WHOLE PAGE -->
  <div class="wholePage">


    <!-- This div is used to separate the 2 things: The search by ingredients, and the Random Cocktail view -->
    <div class="leftPage">

      <!-- Used to separate the input from the display of drinks and ingredients -->
      <div  class="inputDiv">

        <!-- The input with all the styling within the element itself -->
        <input placeholder="Add an Ingredient..."
               @keydown.enter="enterIngredient(ingredientInput)"
               v-model="ingredientInput"
               type="text" style="float: right; margin-right: 5em; width: 25em; height: 2.7em; border-radius: 10px;
                border: none; text-align: center; font-size: 1.2em">
      </div>




      <!-- "findCocktailArea" is where all the display for ingredients entered and listed drinks are  -->
      <div class="findCocktailArea" >


        <!-- Shows the ingredients entered in real time -->
        <div class="filterDisplay">

          <!-- For every ingredient in the "ingArray", make another div for each item in said array -->
          <div v-for="item in ingArray">{{item}}</div>

          <br> <!-- A break -->

          <!-- This button clears the filterDisplay -->
          <button @click="clearIngredients">Clear</button>

        </div>

        <!-- If the listed drinks array is empty, then it will display whatever is in this div
         TODO: Make something more creative in here
         -->
        <div v-if="listedDrinks.length === 0">

          <div>

            <h1>Make some drinks using<br>the search bar!</h1>

          </div>

        </div>

        <!-- If the listedDrinks array isn't empty, it will display this div -->
        <div v-else class="list">

          <!-- For every drink in listedDrinks at index 0, get the "Name" and "Picture" to display in a div -->
          <div class="drinkInList"  v-for="drink in listedDrinks[0]">
            <p>{{drink.Name}}</p>

            <!-- This image grab is possible due to Vue3's ":src" attribute -->
            <img @click="selectedDrink(listedDrinks[0].indexOf(drink))"
                 style="width:13em; border: 3px solid purple;
                 border-radius: 10px"
                 :src=drink.Picture alt=""

            >
          </div>

        </div>

      </div>

    </div>


    <!-- This section is for the random cocktail component to be shown -->
    <div class="RandomView">

      <!-- If the loading icon isn't true, show the Loading Icon -->
      <div v-if="!loadingIconIsShown">
        <LoadingComponent />
      </div>

      <!-- Once the function runs its course, it then displays the random cocktail and it does this for every click of the random
       button-->
      <div v-else>
        <button  class="randomButton" @click="loadingGif">Generate Random</button>
        <RandomCocktail />
      </div>

    </div>



    <!-- The "v-if" states that if a drink has been selected, then show this div -->
    <div v-if="drinkHasBeenSelected" class="selectedDrinkDisplay" >





      <!-- This is a simple 'X' so the user can exit out of the drink display -->
        <div class="clearfix exit" style="width: 100%; text-align: center;">
          <h2 @click="exitOut" style="margin-right: 2em; float: left;  width: 3em;">X</h2>
          <img style="width: 4em; position: relative; right: 3.7em;  border: none;" src="../assets/icons/unSaved.png" v-if="!isLiked" @click="()=>{addToFavorites(drinkInfo[0].drinks[0].idDrink, drinkInfo[0].drinks[0])}">
          <img src="../assets/icons/saved.png" style="width: 4em; position: relative; right: 3.7em;  border: none" v-else @click="removeFromFavorites(drinkInfo[0].drinks[0].idDrink)">
        </div>


      <!-- "fullContent" shows everything relevant for the selected drink and is shown in grid fashion as ingredients->picture and name->
       instructions-->
      <div class="fullContent">

        <!-- As stated above, ingredients are shown on the far left -->
        <div class="ingredients">

          <!-- This section may look like a lot and may seem confusing so let me break it down using one of them
           so that you may understand all of them.

           There are 15 divs within "ingredients" because within the API being used, there are only a possibility
           of 15 ingredients, and in turn, there is only a possibility of 15 measurements.

           So what each div does is it checks if an ingredient is present in the drinkInfo at index 0, key "drinks" at index
           0. If you look at each div, you'll see theres "strIngredient1", "strIngredient2", ... "strIngredient15".
           -->

          <div class="clearfix">
            <p v-if="drinkInfo[0].drinks[0].strIngredient1 != null">{{drinkInfo[0].drinks[0].strIngredient1}}</p>
            <p v-if="drinkInfo[0].drinks[0].strMeasure1 != null">{{drinkInfo[0].drinks[0].strMeasure1}}</p>
          </div>

          <div class="clearfix">
            <p  v-if="drinkInfo[0].drinks[0].strIngredient2 != null">{{drinkInfo[0].drinks[0].strIngredient2}}</p>
            <p v-if="drinkInfo[0].drinks[0].strMeasure2 != null">{{drinkInfo[0].drinks[0].strMeasure2}}</p>
          </div>

          <div class="clearfix">
            <p  v-if="drinkInfo[0].drinks[0].strIngredient3 != null">{{drinkInfo[0].drinks[0].strIngredient3}}</p>
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


        <!-- This is the middle section where it simply shows the name of the drink as well as the image of the selected drink -->
        <div>
          <h1>{{drinkInfo[0].drinks[0].strDrink}}</h1>
          <img :src=drinkInfo[0].drinks[0].strDrinkThumb alt="">
        </div>


        <!-- At the far right is the instructions -->
        <div class="instructions">
          <p>{{drinkInfo[0].drinks[0].strInstructions}}</p>
        </div>
      </div>
    </div>
  </div> <!-- THIS IS THE END OF THE "WHOLE PAGE" DIV -->




</template>

<style scoped>


/* Whole page styling */
.wholePage{
  display: grid;
  grid-template-columns: 65% 35%;
  text-align: center;
}








/* Styling for the drink selected display */
.exit h2:hover{
  cursor: pointer;
}

.fullContent{
  display: grid;
  grid-template-columns: 37.5% 25% 37.5%;
}

.selectedDrinkDisplay{
  width: 60em;
  height: 35em;
  background-color: rgba(0, 0, 0, .85);
  position: fixed;
  left: 0;
  right: 0;
  margin-right: auto;
  margin-left: auto;
  margin-top: 2em;
  z-index: 10;
  color: white;
  border-radius: 10px;
}

.selectedDrinkDisplay img{
  width:13em;
  border-radius: 10px;
  height: auto;
  border: 3px #B447CC solid;
}

.ingredients, .instructions{
  background-color: #B447CC;
  border: 4px purple solid;
  width: 80%;
  height: 23em;
  overflow: scroll;
  overflow-x: hidden;
  border-radius: 10px;
  margin: 2em;
  padding: .5em;
}

.ingredients div{
  display: grid;
  grid-template-columns: 50% 50%;
}

.ingredients::-webkit-scrollbar, .instructions::-webkit-scrollbar{
  display: none;
}








/* Specific ingredient part of page styling */
.leftPage{
  margin-top: 2em;
}

.inputDiv{
  width: 100%;
  height: 4em;
}

.findCocktailArea{
  display: grid;
  grid-template-columns: 30% 70%;
  height: 100%;
  margin: 0;
}

.filterDisplay{
  height: 30em;
  background-color: rgba(0, 0, 0, .6);
  border-radius: 10px;
  color: white;
  padding: 1em;
  margin-left: 2em;
}

.drinkInList{
  text-align: center;
}

.drinkInList p{
  border: 2px solid purple ;
  background-color: rgba(180, 71, 204, .7);
  border-radius: 5px;
  width: 80%;
  height: 2em;
  margin: 0 auto -.7em auto;
  color: white;
}

.list{
  display: grid;
  grid-template-columns: 50% 50%;
  row-gap: 2em;
  width: 100%;
  height: 32em;
  margin: 0 auto;
  overflow: scroll;
}

.list div img:hover{
  cursor: pointer;
  border: 3px solid dodgerblue !important;
}

.list::-webkit-scrollbar{
  display: none;
}








/* Random Cocktail view styling */
.RandomView{
  margin-top: 2em;
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


.hide{
  display: none;
}


</style>
