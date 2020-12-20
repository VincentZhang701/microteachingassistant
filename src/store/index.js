import Vue from 'vue'
import Vuex from 'vuex'

import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [persistedState()],
  state: {
    isLoggedIn: false,
    teacherName: 'Default',
    teacherTID: null,
    pageTitle: null
  },
  mutations: {
    changeLoggingStatus (state, value) {
      state.isLoggedIn = value
    },
    changeTeacherName (state, value) {
      state.teacherName = value
    },
    changeTeacherID (state, value) {
      state.teacherTID = value
    },
    changeTitle (state, value) {
      state.pageTitle = value
    }
  },
  actions: {
  },
  modules: {
  }
})
