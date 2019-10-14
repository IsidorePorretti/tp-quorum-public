import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import state from './state'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'tp-quorum',
  storage: window.localStorage
})

export const store = new Vuex.Store({
  strict: true,
  state,
  mutations: {
    changeCurrentUser (state, user) {
      state.currentUser = user
    },
    memorizeMilkDeliveries (state, milkDeliveries) {
      state.milkDeliveries = milkDeliveries
    }
  },
  actions: {
    changeCurrentUser ({commit}, user) {
      try {
        commit('changeCurrentUser', user)
      } catch (e) {
        console.log('Error in action changeCurrentUser', e)
      }
    },
    memorizeMilkDeliveries ({commit}, milkDeliveries) {
      try {
        commit('memorizeMilkDeliveries', milkDeliveries)
      } catch (e) {
        console.log('Error in action memorizeMilkDeliveries', e)
      }
    }
  },
  getters: {
    currentUser: state => state.currentUser,
    milkDeliveries: state => state.milkDeliveries
  },
  plugins: [vuexPersist.plugin]
})
