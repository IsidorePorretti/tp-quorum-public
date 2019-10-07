// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/'
import AsyncComputed from 'vue-async-computed'
import Fragment from 'vue-fragment'
import AppPlugin from './plugins/AppPlugin'
// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheese, faThumbsUp, faThumbsDown, faCheck, faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

Vue.use(AsyncComputed)
Vue.use(Fragment.Plugin)
Vue.use(AppPlugin, { store })

// Font Awesome
library.add(faCheese, faThumbsUp, faThumbsDown, faCheck, faBan)
Vue.component('font-awesome-icon', FontAwesomeIcon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
