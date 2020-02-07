import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
import decodeJwt from 'jwt-decode'
Vue.use(Vuex)

const USER_KEY = 'user'
export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY), // token
    cachePage: ['TabBar']
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      if (data && data.token) {
        data.id = decodeJwt(data.token).user_id
      }
      setItem(USER_KEY, state.user)
    },
    addCachePage (state, name) {
      if (!state.cachePage.includes(name)) {
        state.cachePage.push(name)
      }
    },
    removeCachePage (state, name) {
      const index = state.cachePage.indexOf(name)
      if (index !== -1) {
        state.cachePage.splice(index)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
