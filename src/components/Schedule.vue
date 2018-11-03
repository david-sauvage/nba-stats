<template>
    <v-container fluid grid-list-xl >
    <v-flex xs6 sm3 md2>
      <v-menu
        ref="menuForDataPicker"
        :close-on-content-click="false"
        v-model="showMenuForDataPicker"
        :nudge-right="40"
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

    <v-flex v-for="(game, index) in schedule" :key="index">
        <Game :awayTeamId="game.visitor" 
              :homeTeamId="game.home"
              @click.native="goToDetails(game.visitor, game.home)"/>
    </v-flex>
    </v-container>
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
            return this.$store.state.schedule[this.chosenDate.replace(/[-]+/g, '')]
        },
        chosenDate: {
            get () {
                return this.$store.state.chosenDate
            },
            set (value) {
                this.$store.commit('setChosenDate', value)
            }
        }
    },
    methods: {
        goToDetails(visitorId, homeId) {
             this.$router.push({ path: `/gameDetails/${visitorId}/${homeId}` })
        }
    },
    data: () => ({
      showMenuForDataPicker: false
    })

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
