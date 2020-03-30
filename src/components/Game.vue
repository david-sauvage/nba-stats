<template>
  <v-row  justify="center" class="game">
    <v-col cols="4"  >
        <Team :team="awayTeam"/>
    </v-col>
    <v-col cols="1" class="at-symbol" >
        @
    </v-col>
    <v-col cols="4" >
        <Team :team="homeTeam"/>
    </v-col>

  </v-row>
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.at-symbol{
    height: 1px;
    align-self: center;
    text-align: center;
    font-size: x-large;
}

</style>
