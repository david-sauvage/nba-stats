<template>
  <div v-if="isDataReady">
    <div v-for="(games, date) in schedule" :key="date">
        {{ date }}:
        <div v-for="(game, key, index) in games" :key="index">
           <Game :game="game"/>
        </div>
    </div>
</div>
</template>

<script>
import Game from './Game.vue'

export default {
    name: 'Schedule',
    components: {
        Game
    },
    beforeCreate () {
        this.$store.dispatch('LOAD_SCHEDULE')
        this.$store.dispatch('LOAD_TEAMS')
    },
    computed: {
        schedule () {
            return this.$store.state.schedule
        },
        isDataReady () {
            return this.$store.state.schedule != null
                 && this.$store.state.teams != null
        }
    }
   

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
