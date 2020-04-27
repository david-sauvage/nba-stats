import axios from 'axios'

const HEADERS = { Authorization: 'Basic OWNmNTNiOTctYmQ5YS00MjY2LWFhNDEtYmFhNmEyOk1ZU1BPUlRTRkVFRFM=' }

export default {
  getSchedule: function () {
    return axios.get('https://api.mysportsfeeds.com/v2.1/pull/nba/latest/games.json',
      { params: {}, headers: HEADERS })
  },
  getPlayersStats: function (teamsList) {
    return axios.get(`https://api.mysportsfeeds.com/v2.1/pull/nba/latest/player_stats_totals.json?team=${teamsList}`,
      { params: {}, headers: HEADERS })
  },
  getTeamStandings: function () {
    return axios.get('https://api.mysportsfeeds.com/v2.1/pull/nba/latest/standings.json',
      { params: {}, headers: HEADERS })
  }
}
