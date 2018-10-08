<template>
  <div>
    <Team :team="awayTeam"/> @ <Team :team="homeTeam"/>
  </div>
</template>

<script>
import Team from './Team.vue'

export default {
    name: 'Game',
    props: ['game'],
    components: {
        Team
    },
    computed: {
        homeTeam () {
            return this.$store.state.teams.find((team) => {
                return team.teamId === this.game.home
            })
        },
        awayTeam () {
            return this.$store.state.teams.find((team) => {
                return team.teamId === this.game.visitor
            })
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
