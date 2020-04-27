<template>
    <v-container  fluid >
        <Game :awayTeamId="$route.params.awayTeamId" :homeTeamId="$route.params.homeTeamId"/>
        <PlayersTable :players="players"/>
    </v-container>
</template>

<script>
import Game from '../components/Game.vue'
import PlayersTable from '../components/PlayersTable.vue'
import mySportsFeedService from '../services/mySportsFeedService'

export default {
  name: 'GameDetails',
  components: {
    Game, PlayersTable
  },
  data: function () {
    return {
      players: []
    }
  },
  mounted () {
    this.players = []

    mySportsFeedService.getPlayersStats(`${this.$route.params.awayTeamId},${this.$route.params.homeTeamId}`)
      .then(response => {
        this.players = response.data.playerStatsTotals
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
