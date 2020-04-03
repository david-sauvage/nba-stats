import axios from 'axios'

export default {
  getGames: function (date) {
    return axios.get('https://ia565ao8nk.execute-api.eu-west-3.amazonaws.com/test/getnbacalendar?date=' + date)
  }
}
