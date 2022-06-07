<template>

<div class="w3-row-padding">
  <center><h1>Welcome to Album Store</h1></center>
<div class="w3-half">
     <div class="w3-half">
         <router-link to="/">
        <button @click="gotTo({to:'root'})" class="home w3-container w3-blue">
        Home
        </button></router-link><br>
    </div>
    <div class="w3-half">
      <router-link to="/albums">
        <button @click="gotTo({to:'albums'})" class="w3-container w3-blue">Albums</button>
        </router-link>
        <br>
    </div>
</div>
<div class="w3-half">
      <router-link to="/register">
        <button @click="gotTo({to:'/register'})" class="w3-container w3-blue">
        Signup
        </button></router-link>
         <router-link to="/login">
        <button @click="gotTo({to:'root'})" class="w3-container w3-blue">
        Login
        </button></router-link>
        <br>
</div>
</div>

</template>

<script>
export default {
  methods: {
    gotTo (route) {
      this.$route.push(route)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://www.w3schools.com/w3css/4/w3.css";
.home{
    cursor: pointer;
}
</style>
