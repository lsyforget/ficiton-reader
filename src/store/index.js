import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fictionInfo: []
  },
  mutations: {
    setMark (state, fiction, name, path) {
      if (fiction) {
        window.localStorage.setItem(fiction, name + '_' + path)
        this.commit('getMark')
      }
    },
    getMark (state) {
      for (let i = 0; i < window.localStorage.length; i++) {
        const getKey = window.localStorage.key(i)
        const getVal = window.localStorage.getItem(getKey)
        state.fictionInfo.push({
          fiction: getKey,
          info: getVal
        })
      }
      console.log(state.fictionInfo)
    }
  },
  actions: {
  },
  modules: {
  }
})
