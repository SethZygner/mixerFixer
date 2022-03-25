<script setup>
document.title = "Home";
</script>

<template>

  <div class="mainMessage">
    <h1>Find Your Favs<br>And More</h1>
    <p>Introducing Mixer Fixer, a new<br>
      website designed for the modern<br>
      generation of social drinking!</p>
  </div>
  <div class="wip">
    <h1>Work in progress</h1>
  </div>

</template>

<style scoped>

.mainMessage{
  height: 300px;
  width: 550px;
  position: absolute;
  border-radius: 15px;
  right: 100px;
  top: 200px;
  background: rgba(0, 0, 0, .4);
  color: white;
  text-align: center;
}

.mainMessage p{
  font-size: 25px;
  position: relative;
  bottom: -20px;
}

.wip{
  position: absolute;
  left: 140px;
  top: 300px;
}

</style>
