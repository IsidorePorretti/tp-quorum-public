// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/'
import AsyncComputed from 'vue-async-computed'
import Fragment from 'vue-fragment'
import AppPlugin from './plugins/AppPlugin'

Vue.config.productionTip = false

Vue.use(AsyncComputed)
Vue.use(Fragment.Plugin)
Vue.use(AppPlugin, { store })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
