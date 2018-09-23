import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    schedule: null,
    teams: null
  },
  mutations: {
    setSchedule(state, schedule) {
      state.schedule = schedule
    },
    setTeams(state, teams) {
      state.teams = teams
    }

  },
  actions: {
    LOAD_SCHEDULE: function ({ commit }) {
      axios.get('./data/schedule.json')
        .then(response => {
            var schedule = {};
            for (var gameFromNbaSite of response.data.league.standard) {
                if (!schedule[gameFromNbaSite.startDateEastern]) {
                    schedule[gameFromNbaSite.startDateEastern] = [];
                }
                var game = {"home":gameFromNbaSite.hTeam.teamId , "visitor":gameFromNbaSite.hTeam.teamId}
                schedule[gameFromNbaSite.startDateEastern].push(game)
            }
            commit('setSchedule', schedule)
        })
        .catch(function(error) {
            console.log(error);
        });
    },

    LOAD_TEAMS: function ({ commit }) {
      axios.get('./data/teams.json')
        .then(response => {
            var teams = [];
            for (var teamFromNbaSite of response.data.league.standard) {
              if (teamFromNbaSite.isNBAFranchise) {
                  teams.push(teamFromNbaSite);
                
              }
            }
            commit('setTeams', teams)
        })
        .catch(function(error) {
            console.log(error);
        });
    }

  }
})
