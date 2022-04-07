<script setup>
document.title = "Home";
</script>

<template>

  <div class="mainMessage">
    <h1>Find Your Faves<br>And More</h1>
    <p>Introducing Mixer Fixer, a new<br>
      website designed for the modern<br>
      generation of social drinking!</p>
  </div>
  <div>
  <img id = "background1" src = "https://pbs.twimg.com/media/Drz_T0TUcAA0ugT?format=jpg&name=4096x4096">
  </div>
  <div class = "Bottom-bar"> </div>
    <div class="announcements">
      <h1>New Changes</h1>
      <p1>Website launch!</p1>
       <p4>Today! </p4>
      <p3> Random Cocktail Function Implemented!</p3>
      <h2>News</h2>
      <p5>Dev update messages go here blah blah <br>
        blah blah blah</p5>
      <p6>Today! </p6>

  </div>


</template>

<style scoped>

.mainMessage{
  height: 250px;
  width: 500px;
  position: absolute;
  border-radius: 15px;
  right: 100px;
  top: 200px;
  background: rgba(0, 0, 0, .3);
  color: white;
  text-align: center;
}
.mainMessage h1{
  font-size: 45px;
  position: relative;
  text-shadow: 2px 2px 4px #000000;
}
.mainMessage p{
  font-size: 25px;
  position: relative;
  bottom: 15px;
  text-shadow: 2px 2px 4px #000000;
}


#background1 {
  height: 100%;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  bottom: 1px;
  z-index: -300;
}

.Bottom-bar{
  width: 1500px;
  height: 200px;
  margin-top: 550px;
  float: left;
  color: white;
  text-align: center;
  background-color: rgba(0, 0, 0, .7);
}
.announcements{
  width: 1500px;
  height: 200px;
  margin-top: 500px;
  float: left;
  color: white;
  text-align: center;
  background-color: rgba(0, 0, 0, .7);
}
.announcements{
  margin-top: 20px;
}
.announcements h1{
  font-size: 25px;
  position: absolute;
  bottom: 50px;
  right: 1300px;
  text-shadow: 2px 2px 4px #000000;
}
.announcements h2{
  font-size: 25px;
  position: absolute;
  bottom: 50px;
  left: 1200px;
}
.announcements p1{
  font-size: 20px;
  position: absolute;
  bottom: 35px;
  right: 1320px;
  color: gray;
  text-shadow: 2px 2px 4px #000000;
}
.announcements p4{
  font-size: 20px;
  position: absolute;
  bottom: 15px;
  right: 1117px;
  text-shadow: 2px 2px 4px #000000;
}
.announcements p6{
  font-size: 20px;
  position: absolute;
  bottom: 15px;
  right: 1390px;
  text-shadow: 2px 2px 4px #000000;
}
.announcements p3{
  font-size: 20px;
  position: absolute;
  bottom: 35px;
  right: 840px;
  color: gray;
  text-shadow: 2px 2px 4px #000000;
}
.announcements p5{
  font-size: 20px;
  position: absolute;
  bottom: 20px;
  left: 1200px;
  color: gray;
  text-shadow: 2px 2px 4px #000000;
}
</style>
