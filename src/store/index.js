import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    color: 'blue',
    maximumRadius: 20
  },
  getters: {
    color (state) {
      return state.color
    },
    maximumRadius(state){
      return state.maximumRadius
    }
  },
  mutations: {
    changeColor (state, payload) {
      this.state.color = payload
    },
    changeMaximumRadius (state, payload) {
      this.state.maximumRadius = payload
    }
  },
  actions: {
    changeColor (context, payload) {
      context.commit('changeColor', payload)
    },
    changeMaximumRadius (context, payload) {
      context.commit('changeMaximumRadius', payload)
    }
  },
  modules: {}
})
