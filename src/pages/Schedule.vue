<template>
    <v-container fluid >
    <v-col cols="6" sm="3" md="2">
        <v-menu
                v-model="showMenuForDataPicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px">
            <template v-slot:activator="{ on }">
                <v-text-field
                        label="Date of games"
                        prepend-icon="event"
                        readonly
                        :value="chosenDate"
                        v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker
                    locale="en"
                    v-model="chosenDate"
                    no-title
                    @input="fromDateMenu = false"
            ></v-date-picker>
        </v-menu>
    </v-col>

    <v-col v-for="(game, index) in schedule" :key="index">
        <Game :awayTeamId="game.schedule.awayTeam.id"
              :homeTeamId="game.schedule.homeTeam.id"
              @click.native="goToDetails(game.schedule.awayTeam.id, game.schedule.homeTeam.id)"
              class="game"/>
    </v-col>
    </v-container>
</template>

<script>
import Game from '../components/Game.vue'

export default {
  name: 'Schedule',
  components: {
    Game
  },
  computed: {
    schedule () {
      return this.$store.state.schedule[this.chosenDate]
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
    goToDetails (visitorId, homeId) {
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
.game {
    cursor: pointer;
}
</style>
