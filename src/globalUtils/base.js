import Vue from 'vue'

const base = {}
const vm = new Vue()

base.on = (eventtype, fun) => {
  vm.$on(eventtype, fun)
}

base.emit = (eventtype, ...params) => {
  vm.$emit(eventtype, ...params)
}

base.off = (eventtype) => {
  vm.$off(eventtype)
}

base.data = (data) => {
  vm.$data = data
}

base.watch = (data, cd) => {
  vm.$watch(data, cd, {deep: true})
}

export default base
