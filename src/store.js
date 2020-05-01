import Vue from 'vue'
import Vuex from 'vuex'
import mySportsFeedService from './services/mySportsFeedService'
import dateService from './services/dateService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    schedule: null,
    teams: null,
    chosenDate: new Date().toISOString().slice(0, 10),
    isLoading: false,
    snackbar: {
      isDisplayingSnackBar: false,
      message: ''
    }
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
    },
    isLoading (state, isLoading) {
      state.isLoading = isLoading
    },
    setSnackbar (state, snackbar) {
      state.snackbar = snackbar
    }
  },
  actions: {
    LOAD_SCHEDULE: async function ({ dispatch, commit }) {
      const response = await mySportsFeedService.getSchedule(this)
      const schedule = {}
      for (const gameFromMSF of response.data.games) {
        const dayOfGame = dateService.getDayInUsa(gameFromMSF.schedule.startTime)
        if (!schedule[dayOfGame]) {
          schedule[dayOfGame] = []
        }
        schedule[dayOfGame].push(gameFromMSF)
      }
      commit('setSchedule', schedule)
    },
    LOAD_TEAMS: async function ({ commit }) {
      const response = await mySportsFeedService.getTeamStandings(this)
      commit('setTeams', response.data.teams)
    },
    START_LOADING: function ({ commit }) {
      commit('isLoading', true)
    },
    STOP_LOADING: function ({ commit }) {
      commit('isLoading', false)
    },
    DISPLAY_MESSAGE: function ({ commit }, message) {
      const snackbar = {}
      snackbar.isDisplayingSnackBar = true
      snackbar.message = message
      commit('setSnackbar', snackbar)
    }
  }
})
