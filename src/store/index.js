import Vue from 'vue'
import Vuex from 'vuex'
import Games from './modules/games'
import User from './modules/user'
import Money from './modules/money'
import createLogger from 'vuex/dist/logger'
const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    Games,
    User,
    Money
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
