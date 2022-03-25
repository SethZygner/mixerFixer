<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div id="side-bar">
    <div class="social-media">
      <img src="@/assets/icons/facebook-logo-1024x1024.png">
      <img src="@/assets/icons/instagram.png">
      <img id="twitter" src="@/assets/icons/Twitter-Logo.png">
    </div>
  </div>
  <div id="menu">
    <img id="logo" src="@/assets/images/mixerfixer.png" alt="Mixer Fixer">
    <ul>
      <li style="padding-top: 10px"><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/browseCocktails">Browse<br>Cocktails</RouterLink></li>
      <li><RouterLink to="/randomCocktails">Random<br>Cocktails</RouterLink></li>
      <li> <RouterLink to="">Favorite<br>Cocktails</RouterLink></li>
      <li><RouterLink to="">My<br>Cabinet</RouterLink></li>
      <li><RouterLink to="">Social<br>Hub</RouterLink></li>
      <li><RouterLink to="">Login<br>/Sign Up</RouterLink></li>
    </ul>
  </div>

  <RouterView :key="$route.path" />
</template>

<style scoped>

#side-bar{
  width: 80px;
  height: 900px;
  border-right: 3px darkgrey solid;
  margin-top: 80px;
  float: left;
  color: white;
  text-align: center;
  background-color: rgba(0, 0, 0, .7);
}

#side-bar h2{
  margin-top: -70px;
}

.social-media{
  margin-top: 420px;
}

.social-media img{
  width: 45px;
  height: auto;
  margin-top: 20px;
}

#twitter{
  width: 80px;
  height: auto;
}

#logo{
  width: 120px;
  height: auto;
  position: absolute;
  left: 20px;
  top: 20px;
}

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



</style>
