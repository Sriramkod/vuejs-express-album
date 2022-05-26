// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { sync } from 'vuex-router-sync'
import routestore from '@/state/routestore'
Vue.config.productionTip = false

Vue.use(Vuetify)

sync(routestore, router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  routestore,
  components: { App },
  template: '<App/>'
})
