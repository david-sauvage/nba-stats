<template>
  <div>
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
    computed: {
        schedule () {
            return this.$store.state.schedule
        }
    },
    mounted() {
        this.$store.dispatch('LOAD_SCHEDULE')
        this.$store.dispatch('LOAD_TEAMS')
    }

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
