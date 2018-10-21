<template>
    <v-container  fluid grid-list-xl >
        <Game :awayTeamId="$route.params.awayTeamId" :homeTeamId="$route.params.homeTeamId"/>

        <v-data-table
            :headers="headers"
            :items="players"
            hide-actions
            class="elevation-1">

            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.min }}</td>
                <td class="text-xs-right">{{ props.item.pts }}</td>
                <td class="text-xs-right">{{ props.item.dreb }}</td>
                <td class="text-xs-right">{{ props.item.ast }}</td>
                <td class="text-xs-right">{{ props.item.blck }}</td>
                <td class="text-xs-right">{{ props.item.stl }}</td>
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
          {
            text: 'Name',
            align: 'left',
            value: 'name'
          },
          { text: 'Minutes', value: 'min' },
          { text: 'Points', value: 'pts' },
          { text: 'Rebounds', value: 'dreb' }, //TODO sum dreb and oreb
          { text: 'Assists', value: 'ast' },
          { text: 'Blocks', value: 'blck' },
          { text: 'Steals', value: 'stl' }
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
    },
   
   
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
