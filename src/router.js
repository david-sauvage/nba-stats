import Vue from 'vue'
import Router from 'vue-router'
import Schedule from './components/Schedule.vue'
import Players from './components/Players.vue'
import GameDetails from './components/GameDetails.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Schedule',
      component: Schedule
    },
    {
      path: '/players',
      name: 'Players',
      component: Players
    },
    {
      path: '/gameDetails/:awayTeamId/:homeTeamId',
      name: 'GameDetails',
      component: GameDetails
    }
  ]
})
