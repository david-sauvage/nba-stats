<template>
    <v-container v-if="isDataReady" grid-list-md text-xs-center>

    <v-flex xs12 sm6 md4>
      <v-menu
        ref="menuForDataPicker"
        :close-on-content-click="false"
        v-model="showMenuForDataPicker"
        :nudge-right="40"
        :return-value.sync="date"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="chosenDate"
          label="Date of games"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="chosenDate" @input="$refs.menuForDataPicker.save(chosenDate)"></v-date-picker>
      </v-menu>
    </v-flex>


    <div v-for="(game, index) in schedule" :key="index">
        <Game :game="game"/>
    </div>

    </v-container>
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
        isDataReady () {
            return this.$store.state.schedule != null
                 && this.$store.state.teams != null
        },
        schedule () {
            return this.$store.state.schedule[this.chosenDate.replace(/[-]+/g, '')]
        }
    },
    data: () => ({
      chosenDate: new Date().toISOString().slice(0, 10),
      showMenuForDataPicker: false
    })

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
