import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state,
  mutations: {
    changeCurrentUser (state, user) {
      console.log('changeCurrentUser Mutation being executed', user)
      state.currentUser = user
    }
  },
  actions: {
    changeCurrentUser ({commit}, user) {
      console.log('changeCurrentUser Action being executed')
      try {
        commit('changeCurrentUser', user)
      } catch (e) {
        console.log('Error in action changeCurrentUser', e)
      }
    }
  },
  getters: {
    currentUser: state => state.currentUser
  }
})
