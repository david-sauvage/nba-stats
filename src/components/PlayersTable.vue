<template>
    <v-data-table
        :headers="headers"
        :items="enrichedPlayers"
        :items-per-page="25"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        class="elevation-1">
    </v-data-table>
</template>

<script>

export default {
  name: 'PlayersTable',
  props: ['players'],
  data: () => ({
    headers: [
      { text: 'Name', align: 'left', value: 'name' },
      { text: 'Minutes', align: 'right', value: 'min' },
      { text: 'Points', align: 'right', value: 'pts' },
      { text: 'Rebounds', align: 'right', value: 'reb' },
      { text: 'Assists', align: 'right', value: 'ast' },
      { text: 'Blocks', align: 'right', value: 'blck' },
      { text: 'Steals', align: 'right', value: 'stl' },
      { text: 'TTFL', align: 'right', value: 'ttfl' },
      { text: 'JDE', align: 'right', value: 'jde' }
    ],
    sortBy: 'ttfl',
    sortDesc: true
  }),
  computed: {
    enrichedPlayers () {
      return this.players.map(p => {
        return {
          ...p,
          reb: (p.oreb + p.dreb).toFixed(1),
          ttfl: this.calculateTTFL(p),
          jde: this.calculateJDE(p)
        }
      })
    }
  },
  methods: {
    calculateTTFL (player) {
      const { pts, oreb, dreb, ast, stl, blck, fg3a, fg3m, fga, fgm, fta, ftm, to } = player
      const calcul = pts + oreb + dreb + ast + stl + blck + fg3m + fgm + ftm -
                            (to + (fg3a - fg3m) + (fga - fgm) + (fta - ftm))
      return calcul.toFixed(1)
    },
    calculateJDE (player) {
      const { oreb, dreb, ast, stl, blck, fg3a, fg3m, fga, fgm, fta, ftm, to, plusMinus, pf } = player
      let calcul = plusMinus * 0.15
      calcul += (fgm - fg3m) * 2
      calcul += (fga - fgm - fg3m) * -0.5
      calcul += fg3m * 3
      calcul += (fg3a - fg3m) * -0.5
      calcul += ftm
      calcul += (fta - ftm) * -0.5
      calcul += dreb * 0.75
      calcul += oreb
      calcul += ast
      calcul += stl * 2
      calcul += blck * 2
      calcul += to * -0.75
      calcul += pf * -0.5
      return calcul.toFixed(2)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
