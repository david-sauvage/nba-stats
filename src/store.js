import Vue from 'vue'
import Vuex from 'vuex'
import mySportsFeedService from './services/mySportsFeedService'
import dateService from './services/dateService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    schedule: null,
    teams: null,
    chosenDate: new Date().toISOString().slice(0, 10)
  },
  mutations: {
    setSchedule (state, schedule) {
      state.schedule = schedule
    },
    setTeams (state, teams) {
      state.teams = teams
    },
    setChosenDate (state, date) {
      state.chosenDate = date
    }
  },
  actions: {
    LOAD_SCHEDULE: function ({ commit }) {
      mySportsFeedService.getSchedule()
        .then(response => {
          var schedule = {}
          for (var gameFromMSF of response.data.games) {
            var dayOfGame = dateService.getDayInUsa(gameFromMSF.schedule.startTime)
            if (!schedule[dayOfGame]) {
              schedule[dayOfGame] = []
            }
            schedule[dayOfGame].push(gameFromMSF)
          }
          commit('setSchedule', schedule)
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    LOAD_TEAMS: function ({ dispatch, commit }) {
      mySportsFeedService.getTeamStandings()
        .then(response => {
          commit('setTeams', response.data.teams)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
})
