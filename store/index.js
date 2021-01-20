import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './action'
import mutations from './mutation'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  },
  state: {
    isUserLogin: false,
    userDetails: {
        address: '',
        company: '',
        email: '',
        id: '',
        name: '',
        phone: '',
        website: '',
        posts: []
    }
  },
  getters,
  actions,
  mutations
})
