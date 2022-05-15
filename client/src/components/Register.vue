<template>
  <div>
    <h1>Register</h1>
    <input type="text"  name="email"  placeholder="Enter email"
    v-model="email"
   />
   <br>
   <input type="password"
          name="password"
          placeholder="Enter password"
          v-model="password"
   /><br>
   <button @click="register">Register</button>
   </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: 'abc',
      password: '123'
    }
  },
  methods: {
    async register () {
      console.log('register button', this.email, this.password)
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      console.log(response)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
