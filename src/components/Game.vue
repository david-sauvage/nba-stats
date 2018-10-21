<template>
  <v-layout row justify-center >
    <v-flex xs4  >
        <Team :team="awayTeam"/>  
    </v-flex>
    <v-flex xs1 >
        @
    </v-flex>
    <v-flex xs4 >
        <Team :team="homeTeam"/>
    </v-flex>
    
  </v-layout>
</template>

<script>
import Team from './Team.vue'

export default {
    name: 'Game',
    props: ['awayTeamId', 'homeTeamId'],
    components: {
        Team
    },
    computed: {
        homeTeam () {
            return this.$store.state.teams.find((team) => {
                return team.teamId === this.homeTeamId
            })
        },
        awayTeam () {
            return this.$store.state.teams.find((team) => {
                return team.teamId === this.awayTeamId
            })
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
