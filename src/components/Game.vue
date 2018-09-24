<template>
  <div>
    {{ awayTeam.fullName }} @ {{ homeTeam.fullName }}  
  </div>
</template>

<script>
export default {
    name: 'Game',
    props: ['game'],
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
