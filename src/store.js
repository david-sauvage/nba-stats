import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    schedule: null,
    teams: null,
    chosenDate: new Date().toISOString().slice(0, 10)
  },
  mutations: {
    setSchedule(state, schedule) {
      state.schedule = schedule
    },
    setTeams(state, teams) {
      state.teams = teams
    }, 
    setChosenDate(state, date) {
      state.chosenDate = date
    },
    enrichTeam(state, team) {
      var idx = state.teams.findIndex((e) => e.teamId == team.teamId)
      state.teams[idx] = team
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
                var game = {"home":gameFromNbaSite.hTeam.teamId , "visitor":gameFromNbaSite.vTeam.teamId}
                schedule[gameFromNbaSite.startDateEastern].push(game)
            }
            commit('setSchedule', schedule)
        })
        .catch(function(error) {
            console.log(error);
        });
    },

    LOAD_TEAMS: function ({ dispatch, commit }) {
      axios.get('./data/teams.json')
        .then(response => {
            var teams = [];
            for (var teamFromNbaSite of response.data.league.standard) {
              if (teamFromNbaSite.isNBAFranchise) {
                  teams.push(teamFromNbaSite);
              }
            }
            commit('setTeams', teams)
            dispatch('LOAD_STATS', teams)
        })
        .catch(function(error) {
            console.log(error);
        });
    },

    LOAD_STATS: function ( {commit}, teams) {
      for(let t of teams) {
        axios.all([
          axios.get('./data/players-'+t.teamId+'.json'),
          axios.get('./data/stats-'+t.teamId+'.json')
        ])
        .then(axios.spread((playersResponse, statsResponse) => {
          var playersFromNbaSite = playersResponse.data.resultSets[1].rowSet
          t.players = dataReader.createPlayers(playersFromNbaSite)

          var teamOverral = statsResponse.data.resultSets[0].rowSet
          t.stats = dataReader.createTeamStats(teamOverral)
          commit('enrichTeam', t)
        }))
        .catch(function(error) {
            console.log(error);
        });
      }
    }
  }
})

var dataReader = {
  createTeamStats(nbaData) {
    return {
      win_pct:nbaData[0][6],
      win:nbaData[0][4],
      loss:nbaData[0][5],
      off_rat:nbaData[0][9],
      def_rat:nbaData[0][11],
      pac:nbaData[0][24],
    }
  },
  createPlayers(playersFromNbaSite) {
    var players = []
    for (var p of playersFromNbaSite) {
      var player = {
        name:p[2],
        min:p[7],
        pts:p[27],
        fgm:p[8],
        fga:p[9],
        fg3m:p[11],
        fg3a:p[12],
        ftm:p[14],
        fta:p[15],
        oreb:p[17],
        dreb:p[18],
        ast:p[20],
        to:p[21],
        stl:p[22],
        blck:p[23],
        pf:p[25],
        plus_minus:p[28]
      }
      players.push(player)
    }
    return players
  }
}

