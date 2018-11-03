<template>
    <v-container  fluid grid-list-xl >
        <PlayersTable :players="players"/>
    </v-container>
</template>

<script>
import PlayersTable from './PlayersTable.vue'

export default {
    name: 'Players',
    components: {
        PlayersTable
    },
    computed: {
        players () {
            return Array.from(this.$store.state.teams, t => t.players).flat()
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
