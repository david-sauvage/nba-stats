import Vue from 'vue'
import Router from 'vue-router'
import Schedule from './components/Schedule.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Schedule',
      component: Schedule
    }
  ]
})
