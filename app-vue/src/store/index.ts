import { createStore } from 'vuex'

const store = createStore({
  state: {
    data: []
  },
  mutations: {
    setData (state, value) {
      state.data = value
    }
  },
  actions: {},
  modules: {},
})

export default store
