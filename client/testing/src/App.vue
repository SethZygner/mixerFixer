<script setup>

import fire from "./firebase.js";


</script>





<template id="test">
  <div class="allContent">
    <div class="mainScreen">
      <div id="menu">
        <div class="constant clearfix">
          <img id="logo" src="./assets/images/mixerfixer.png" alt="Mixer Fixer">
          <img id="hamburger" src="./assets/icons/hamburgerMenu.png" alt="Menu">
        </div>

        <ul>
          <li style="margin-top: 1em;"><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/browseCocktails">Browse<br>Cocktails</RouterLink></li>
          <li><RouterLink to="/socialHub">Social<br>Hub</RouterLink></li>
          <li>
            <div>
              <RouterLink v-if="fire.signedIn.value" to="/Account" >Account</RouterLink>
              <RouterLink v-else to="/logInSignUp" >Login/<br>Sign Up</RouterLink>
            </div>
          </li>
        </ul>
      </div>
      <RouterView :key="$route.path" />
    </div>
  </div>

</template>










<style scoped>



#logo{
  width: 120px;
  height: auto;
  position: absolute;
  z-index: 100;
  left: 20px;
  top: 20px;
}



/*
Menu Style
 */
#menu{
  margin: 0 auto;
  background-color: rgba(0, 0, 0, .7);
  text-align: right;
  padding-right: 50px;
  height: 80px;
}


#menu ul{
  list-style-type: none;
  display: inline-flex;
  text-align: center;
}

#menu ul li{
  text-align: center;
  margin-left: 80px;
  color: white;
  display: inline;
  font-weight: normal;
}

#menu ul li a{
  text-decoration: none;
  color: white;
}

#menu ul li:hover{
  cursor: pointer;
  border-bottom: solid 2px darkorange !important;

}

#menu ul li a:hover{
  color: darkorange !important;
}

#hamburger{
  display: none;
  width: 3em;
  height: auto;
  margin-top: 1em;
}

#hamburger:hover{
  cursor: pointer;
}




/*
Adapt to resolutions
 */
@media screen and (max-width: 1140px){
  #logo{
    width: 50px;
  }

  #menu ul{
    display: none;
  }
  #hamburger{
    display: block;
    float: right;
  }
}


</style>
