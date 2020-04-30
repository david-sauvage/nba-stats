import axios from 'axios'

const HEADERS = { Authorization: 'Basic OWNmNTNiOTctYmQ5YS00MjY2LWFhNDEtYmFhNmEyOk1ZU1BPUlRTRkVFRFM=' }

export default {
  getSchedule: async function (store) {
    try {
      store.dispatch('START_LOADING')
      return await axios.get('https://api.mysportsfeeds.com/v2.1/pull/nba/latest/games.json',
        { params: {}, headers: HEADERS })
    } catch (error) {
      console.log(error)
    } finally {
      store.dispatch('STOP_LOADING')
    }
  },
  getPlayersStats: async function (store, teamsList) {
    try {
      store.dispatch('START_LOADING')
      return await axios.get(`https://api.mysportsfeeds.com/v2.1/pull/nba/latest/player_stats_totals.json?team=${teamsList}`,
        { params: {}, headers: HEADERS })
    } catch (error) {
      console.log(error)
    } finally {
      store.dispatch('STOP_LOADING')
    }
  },
  getTeamStandings: async function (store) {
    try {
      store.dispatch('START_LOADING')
      return await axios.get('https://api.mysportsfeeds.com/v2.1/pull/nba/latest/standings.json',
        { params: {}, headers: HEADERS })
    } catch (error) {
      console.log(error)
    } finally {
      store.dispatch('STOP_LOADING')
    }
  }
}
