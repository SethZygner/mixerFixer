<script>

</script>

<template>
  <div class="ShowButton" @click="ingredientsHidden = !ingredientsHidden">Flip Cup</div>
  <div id="ruleContainer" :class="ingredientsHidden && 'hide'">
  <h3>Setup</h3>
    <ol type="1">
      <li>Split your group into even teams</li>
      <li>Fill the cups. Pour each players drink of choice into his or her cup.</li>
      <li>Line up on either side of the table with your drink in front of you. Each person should be standing directly across from someone on the other team.</li>

    </ol>
    <h3>
      Gameplay
    </h3>
    <p>Flip Cup starts by the first people on each team chugging their beer, placing their empty cup back on the edge of
      the table, and using their fingers to flip the cup completely upside down. Once the first player has successfully
      “flipped” their solo cup, the next player will play their turn by chugging and flipping, and so on. The team to flip
      their solo cups the fastest, wins!</p>
    <img src="../assets/images/FlipCupTutorial.png" alt="Flip Cup Example" width="300" height="150" border="1px black solid">
  </div>
</template>

<style scoped>

.ShowButton{
  border: 2px black solid;
  border-radius: 10px;
  margin-top: 5em;
  margin-left: 10em;
  text-align: center;
  color: black;
  font-size: 2em;
  background: url("../assets/images/flipcup2.jpg");
  position: relative;
  background-size: contain;
  width: 370px;
  height: 195px;

}
#ruleContainer{
  border: 2px black solid;
  width: 600px;
  height: 470px;
  background: rgba(0, 0, 0, .4);
  margin-left: 20em;
  margin-top: 10em;
  border-radius: 5px;
  position: absolute;
  top: 80px;
  text-align: center;
  padding: 10px;
}
.hide{
  display: none !important;
}

li {
  list-style-position: inside;
}

</style>