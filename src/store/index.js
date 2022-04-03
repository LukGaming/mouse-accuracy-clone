import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    color: 'red',
    maximumRadius: 20,
    speed: 500
  },
  getters: {
    color (state) {
      return state.color
    },
    maximumRadius (state) {
      return state.maximumRadius
    },
    speed (state) {
      return state.speed
    }
  },
  mutations: {
    changeColor (state, payload) {
      this.state.color = payload
    },
    changeMaximumRadius (state, payload) {
      this.state.maximumRadius = payload
    },
    changeSpeed (state, payload) {
      this.state.speed = payload
    }
  },
  actions: {
    changeColor (context, payload) {
      context.commit('changeColor', payload)
    },
    changeMaximumRadius (context, payload) {
      context.commit('changeMaximumRadius', payload)
    },
    changeSpeed (context, payload) {
      context.commit('changeSpeed', payload)
    }
  },
  modules: {}
})
