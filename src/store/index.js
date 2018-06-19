import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import state from './state'
import getters from './getters'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
// console.log(debug)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default store