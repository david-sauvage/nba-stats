<template>
    <v-container  fluid grid-list-xl >
        <Game :awayTeamId="$route.params.awayTeamId" :homeTeamId="$route.params.homeTeamId"/>
        <PlayersTable :players="players"/>
    </v-container>
</template>

<script>
import Game from '../components/Game.vue'
import PlayersTable from '../components/PlayersTable.vue'

export default {
    name: 'GameDetails',
    components: {
        Game, PlayersTable
    },
    computed: {
        players () {
           let awayPlayers = this.$store.state.teams.find((team) => {
                return team.teamId === this.$route.params.awayTeamId
            }).players

            let homePlayers = this.$store.state.teams.find((team) => {
                return team.teamId === this.$route.params.homeTeamId
            }).players

            return [...awayPlayers, ...homePlayers]
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
