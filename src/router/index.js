import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/Main'
import PDF from '@/components/PDF'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/pdf',
      name: 'pdf',
      component: PDF
    }
  ]
})
