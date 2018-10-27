<template>
    <v-container  fluid grid-list-xl >
        <Game :awayTeamId="$route.params.awayTeamId" :homeTeamId="$route.params.homeTeamId"/>

        <v-data-table
            :headers="headers"
            :items="enrichedPlayers"
            hide-actions
            class="elevation-1">

            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.min }}</td>
                <td class="text-xs-right">{{ props.item.pts }}</td>
                <td class="text-xs-right">{{ props.item.reb }}</td>
                <td class="text-xs-right">{{ props.item.ast }}</td>
                <td class="text-xs-right">{{ props.item.blck }}</td>
                <td class="text-xs-right">{{ props.item.stl }}</td>
                <td class="text-xs-right">{{ props.item.ttfl }}</td>
                <td class="text-xs-right">{{ props.item.jde }}</td>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import Game from './Game.vue'

export default {
    name: 'GameDetails',
    components: {
        Game
    },
    data: () => ({
      headers: [
          { text: 'Name', align: 'left', value: 'name' },
          { text: 'Minutes', align: 'right', value: 'min' },
          { text: 'Points', align: 'right', value: 'pts' },
          { text: 'Rebounds', align: 'right', value: 'reb' }, //TODO sum dreb and oreb
          { text: 'Assists', align: 'right', value: 'ast' },
          { text: 'Blocks', align: 'right', value: 'blck' },
          { text: 'Steals', align: 'right', value: 'stl' },
          { text: 'TTFL', align: 'right', value: 'ttfl' },
          { text: 'JDE', align: 'right', value: 'jde' }
        ],
    }),
    computed: {
        players () {
           let awayPlayers = this.$store.state.teams.find((team) => {
                return team.teamId === this.$route.params.awayTeamId
            }).stats.players

            let homePlayers = this.$store.state.teams.find((team) => {
                return team.teamId === this.$route.params.homeTeamId
            }).stats.players

            return [...awayPlayers, ...homePlayers]
        },
        enrichedPlayers() {
            return this.players.map( p => {
                return {...p, 
                        reb:p.oreb+p.dreb,
                        ttfl:this.calculateTTFL(p),
                        jde:this.calculateJDE(p)}
            })
        }
    },
    methods: {
        calculateTTFL(player) {
            const {pts, oreb, dreb, ast, stl, blck, fg3a, fg3m, fga, fgm, fta, ftm, to} = player
            let calcul = pts + oreb + dreb + ast + stl + blck + fg3m + fgm + ftm 
                            - (to + (fg3a - fg3m) + (fga - fgm) + (fta - ftm))
            return calcul.toFixed(1)
        },
        calculateJDE(player) {
            const {pts, oreb, dreb, ast, stl, blck, fg3a, fg3m, fga, fgm, fta, ftm, to, plus_minus, pf} = player
            let calcul = plus_minus * 0.15
            calcul += (fgm - fg3m) * 2
            calcul += (fga - fgm - fg3m) * -0.5
            calcul += fg3m * 3
            calcul += (fg3a - fg3m) * -0.5
            calcul += ftm 
            calcul += (fta - ftm) * -0.5
            calcul += dreb *0.75
            calcul += oreb
            calcul += ast
            calcul += stl * 2
            calcul += blck * 2
            calcul += to * -0.75
            calcul += pf * -0.5
            return calcul.toFixed(2)
        }

    },

   
   
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
