import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const Store = new Vuex.Store({
  state: {
    selectType: '1',
    canvas: null
  },
  mutations: {
    setSelectType: (state, newtype) => {
      state.selectType = newtype
    },
    setCanvas: (state, obj) => {
      state.canvas = obj
    }
  }
})
export default Store
