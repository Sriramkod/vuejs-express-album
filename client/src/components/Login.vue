<template>
<div>
   <br>
<div class="w3-card-4">
  <div  class="w3-container w3-orange">

 <h4> Login</h4>
       </div>

       <h4><div class="error w3-text-red" v-html="error"></div></h4>
       <br>
       <h4>Please Provide your Email</h4>
       <input type="text"  name="email" class="w3-input w3-border w3-sand"  placeholder="Enter email"
    v-model="email"
   />
   <br>
   <h4>Please Provide your Password</h4>
   <input type="password" class="w3-input w3-border w3-sand"
          name="password"
          placeholder="Enter password"
          v-model="password"
   /><br>
   <br>

    <button @click="login" class="w3-btn w3-blue">login</button>
    <br><br>
</div>
</div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        console.log('Login button', this.email, this.password)
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        console.log(response)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://www.w3schools.com/w3css/4/w3.css";
</style>
