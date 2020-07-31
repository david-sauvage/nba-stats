<template>
    <v-container fluid>
        <v-row>
            <line-chart :data="chartData" />
        </v-row>
        <v-row>
            <v-col cols="2" v-for="(player, index) in players" :key="index" >
                <PlayerCard :player="player"></PlayerCard>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import PlayerCard from '../components/PlayerCard'
import mySportsFeedService from '../services/mySportsFeedService'
export default {
  name: 'PlayerComparison',
  components: {
    PlayerCard
  },
  data: function () {
    return {
      chartData: []
    }
  },
  async mounted () {
    const playersList = this.$store.state.playerComparison.selectedPlayers.map(p => p.player.id).join(',')
    const response = await mySportsFeedService.getPlayersGameLogs(this.$store, playersList)
    for (const gamelog of response.data.gamelogs) {
      let currentPlayer = this.chartData.find(player => player.name === gamelog.player.lastName)
      if (currentPlayer === undefined) {
        currentPlayer = { name: gamelog.player.lastName, data: {} }
        this.chartData.push(currentPlayer)
      }
      currentPlayer.data[Object.keys(currentPlayer.data).length + 1] = this.calculateTTFL(gamelog)
    }
  },
  computed: {
    players () {
      return this.$store.state.playerComparison.selectedPlayers
    }
  },
  methods: {
    // TODO Needs to be done in a service to factorize with playersTale
    calculateTTFL (player) {
      const {
        stats: {
          fieldGoals: {
            fg3PtAttPerGame: fg3a,
            fg3PtMadePerGame: fg3m,
            fgAttPerGame: fga,
            fgMadePerGame: fgm
          },
          freeThrows: {
            ftAttPerGame: fta,
            ftMadePerGame: ftm
          },
          rebounds: {
            offRebPerGame: oreb,
            defRebPerGame: dreb
          },
          offense: {
            astPerGame: ast,
            ptsPerGame: pts
          },
          defense: {
            tovPerGame: to,
            stlPerGame: stl,
            blkPerGame: blck
          }
        }
      } = player
      const calcul = pts + oreb + dreb + ast + stl + blck + fg3m + fgm + ftm -
                (to + (fg3a - fg3m) + (fga - fgm) + (fta - ftm))
      return calcul.toFixed(1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
