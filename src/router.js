import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Schedule from './pages/Schedule.vue'
import Players from './pages/Players.vue'
import Teams from './pages/Teams.vue'
import GameDetails from './pages/GameDetails.vue'
import PlayerComparison from './pages/PlayerComparison'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/schedule',
      name: 'Schedule',
      component: Schedule
    },
    {
      path: '/players',
      name: 'Players',
      component: Players
    },
    {
      path: '/teams',
      name: 'Teams',
      component: Teams
    },
    {
      path: '/gameDetails/:awayTeamId/:homeTeamId',
      name: 'GameDetails',
      component: GameDetails
    },
    {
      path: '/playerComparison',
      name: 'PlayerComparison',
      component: PlayerComparison
    }
  ]
})
