<template>
    <v-data-table
        :headers=headers
        :items=enrichedPlayers
        :items-per-page=25
        :sort-by.sync=sortBy
        :sort-desc.sync=sortDesc
        show-select
        v-model="selectedPlayers"
        item-key="player.id"
        class=elevation-1>

        <template v-slot:footer>
            <v-container fluid>
                <v-col cols="12">
                    <v-row justify="end">
                        <v-btn small color="primary" @click="goToPlayerComparison()">Compare players</v-btn>
                    </v-row>
                </v-col>
            </v-container>
        </template>

    </v-data-table>
</template>

<script>

export default {
  name: 'PlayersTable',
  props: ['players'],
  data: () => ({
    headers: [
      { text: 'Name', align: 'left', value: 'player.lastName' },
      { text: 'Minutes', align: 'right', value: 'min' },
      { text: 'Points', align: 'right', value: 'stats.offense.ptsPerGame' },
      { text: 'Rebounds', align: 'right', value: 'stats.rebounds.rebPerGame' },
      { text: 'Assists', align: 'right', value: 'stats.offense.astPerGame' },
      { text: 'Blocks', align: 'right', value: 'stats.defense.blkPerGame' },
      { text: 'Steals', align: 'right', value: 'stats.defense.stlPerGame' },
      { text: 'TTFL', align: 'right', value: 'ttfl' }
    ],
    sortBy: 'ttfl',
    sortDesc: true,
    selectedPlayers: []
  }),
  computed: {
    enrichedPlayers () {
      return this.players.map(p => {
        return {
          ...p,
          min: (p.stats.miscellaneous.minSecondsPerGame / 60).toFixed(1),
          ttfl: this.calculateTTFL(p)
        }
      })
    }
  },
  methods: {
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
    },
    goToPlayerComparison () {
      this.$store.dispatch('COMPARE_PLAYERS', this.selectedPlayers)
      this.$router.push({ path: '/playerComparison' })
    }
  }
}
</script>

<!-- Add scoped attribute to limit CSS to this component only -->
<style scoped>

</style>
