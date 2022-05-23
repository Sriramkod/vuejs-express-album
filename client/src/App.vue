<template>
  <div id="app">
     <page-header/>
    <v-app>

    <main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </main>
    </v-app>
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>

  </div>
</template>

<script>
import PageHeader from '@/components/Header'
export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
