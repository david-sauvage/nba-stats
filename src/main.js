import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from "axios";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

axios.get('./data/schedule.json')
  .then(function(response) {
    var schedule = {};
    for (var gameFromNbaSite of response.data.league.standard) {
      if (!schedule[gameFromNbaSite.startDateEastern]) {
        schedule[gameFromNbaSite.startDateEastern] = [];
      }
      var game = {"home":gameFromNbaSite.hTeam.teamId , "visitor":gameFromNbaSite.hTeam.teamId}
      schedule[gameFromNbaSite.startDateEastern].push(game)
    }
    console.log(schedule);
  })
  .catch(function(error) {
    console.log(error);
  });
