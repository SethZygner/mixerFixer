<script setup>
import fire from "../firebase.js";
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";


let ingredientsArray = reactive([]);
let ingredient = ref("");
let amount = ref("");
let measure = ref("");

let userName = ref("");
let drinkName = ref("");
let description = ref("");

let coinAmount = ref(0);

const router = useRouter();

//Checks if a user is signed in
if(fire.auth.currentUser !== null){
  fire.db.collection("Users")
      .doc(fire.auth.currentUser.uid)
      .get()
      .then((result)=>{
        userName.value = result.data().Username;
      })
}



//This function is a doozy, but it's what works for now until I move it to an SQL server instead
function postDrink(arr){

  //Tries to post drink
  try{

    //Checks the length of the array to make the appropriate amount of ingredients and measurments
    if(arr.length !== 0 && description.value.trim() !== "" && drinkName.value.trim() !== "" && 9999 > parseFloat(amount.value) > -1 ){
      let drinkObj = {};
      let Measurement = "Measurement"
      let Measurements = reactive({});

      for (let i = 0; i < arr.length; i++){
        Measurements[Measurement+i.toString()] = arr[i]
      }

      drinkObj["DrinkInfo"] = Measurements;

      drinkObj["GeneralInfo"] = {
        DrinkName: drinkName.value,
        Description: description.value,
        CreatorName: userName.value,
        CreatorID: fire.auth.currentUser.uid
      }
      //This gets the amount of coins the user has
      fire.db.collection("Users")
          .doc(fire.auth.currentUser.uid)
          .get()
          .then((result)=>{
            let coins = result.data().Coins;
            let amountPosted = result.data().DrinksMade;

            //Subtracts a coin the user has to post a drink
            if(coins > 0){
              coins -= 1;
              amountPosted += 1;
              fire.db.collection("Users")
                  .doc(fire.auth.currentUser.uid)
                  .update({
                    Coins: coins,
                    DrinksMade: amountPosted
                  }).then(()=>{

                    //This then adds the drink to the user who posted it
                fire.db.collection("Users")
                    .doc(fire.auth.currentUser.uid)
                    .collection("MadeDrinks")
                    .add(drinkObj)
                    .then((doc)=>{



                      //This then adds to the drinks in public drinks
                      fire.db.collection("PublicDrinks")
                          .doc(doc.id)
                          .set(drinkObj)
                      .then(()=>{
                        //This updates the users made drinks to include the id
                        fire.db.collection("Users")
                        .doc(fire.auth.currentUser.uid)
                        .collection("MadeDrinks")
                        .doc(doc.id.toString())
                        .update({
                          DrinkID: doc.id
                        })
                      })
                    })
              })



            }else{
              alert("You are out of coins!");
            }
          }).then(()=>{
            router.push('/socialHub');
      })


    }else{
      alert("Missing some fields or a the 'Amount' is invalid");
    }
  }catch (err){
    console.log("Something happened");
  }
}


function addToList(){
  if(ingredientsArray.length !== 15){
    if(ingredient.value !== "" && amount.value !== ""){
      let object = {
        Ingredient: ingredient.value,
        Measurement: parseFloat(amount.value)+ " "+measure.value
      }
      ingredientsArray.push(object);
      ingredient.value = "";
      amount.value = "";
    }
  }else{
    alert("Can't add more than 15 ingredients!");
  }

}

function deleteIngredient(index){

  ingredientsArray.splice(index, 1);

}



</script>

<template>
  <div class="allContent">
    <div>
      <div class="ingredientStuff">
        <input maxlength="30" v-model="ingredient" placeholder="Ingredient..." type="text">
        <input v-model="amount" placeholder="Amount..." type="number">
        <select v-model="measure" style="height: 3em; border-radius: 3px">
          <option>oz</option>
          <option v-if="amount > 1">cups</option>
          <option v-else>cup</option>
          <option>tbsp.</option>
          <option>tsp.</option>
          <option>mL</option>
          <option v-if="amount > 1">liters</option>
          <option v-else>liter</option>
          <option v-if="amount > 1">parts</option>
          <option v-else>part</option>
          <option></option>
        </select>
        <button @click="addToList">Add Ingredient</button>
      </div>

      <div class="ingredientBox">
        <div class="clearfix ingredient" style="width: 80%; margin: 1em auto; height: auto; text-align: center;" v-for="item in ingredientsArray">
          <p >{{item.Ingredient}}</p>
          <p >{{item.Measurement}}</p>
          <div>
            <button @click="deleteIngredient(ingredientsArray.indexOf(item))" style="height: 2em; width: 2em; ">X</button>
          </div>
        </div>
      </div>
    </div>

    <div class="ingredientInput">
      <div style="text-align: center; justify-content: center">
        <input placeholder="Drink Name..." v-model="drinkName">

        <div class="ingredientInstructionInput">
          <h2>Enter Instructions</h2>
          <textarea maxlength="1000" v-model="description" style="resize: none;
         font-family: Bahnschrift,serif; padding: 5px; border: none;
          width: 35em; height: 15em; border-radius: 5px;"></textarea>
          <br>
          <button @click="postDrink(ingredientsArray)">Send</button>
        </div>
      </div>
    </div>





  </div>
</template>

<style scoped>


.allContent{
  display: grid;
  grid-template-columns: 45% 45%;
  gap: 2em;
  text-align: center;
  justify-content: center;
  margin: 3em 2em;

}

input{
  margin: .5em;
  height: 3em;
  border-radius: 3px;
  border: none;
  width: 11em;
  text-align: center;
}

.ingredientStuff{
  margin: .5em;
}

.ingredient {
  display: grid;
  grid-template-columns: 40% 30% 30%;
  border: 2px black solid;
}

.ingredientBox{
  border: 1px black solid;
  height: 23em;
  border-radius: 5px;
}

.ingredient p{
  text-align: center;
}

.ingredient div{
  text-align: right;
}

button{
  height: 3em;
  width: 9em;
  border-radius: 5px;
  border: none;
  margin-bottom: 2em;
  margin-left: 1em;
}

@media screen and (max-width: 1126px) {
  .allContent{
    display: block;
    overflow-y: scroll;
    height: 36em;
  }

  .allContent::-webkit-scrollbar{
    display: none;
  }


}

@media screen and (max-width: 410px){
  input{
    width: 6em;
  }
}

</style>

