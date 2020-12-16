import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    teacherName: 'Default',
    teacherTID: null
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
    }
  },
  actions: {
  },
  modules: {
  }
})
