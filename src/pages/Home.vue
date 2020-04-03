<template>

    <v-container fluid v-if="isScheduleFetched">
        <div class="flex-container">
            <v-col cols="2" v-for="(game, index) in schedule" :key="index" >
                <v-card class="card" @click.native="goToDetails(game.vTeam.teamId, game.hTeam.teamId)" >
                    <img class="logo" :src="getTeam(game.vTeam.teamId).logo"/>
                    <img class="logo" :src="getTeam(game.hTeam.teamId).logo"/>
                </v-card>
            </v-col>
        </div>
        <PlayersTable :players="players"/>
    </v-container>
</template>

<script>
import PlayersTable from '../components/PlayersTable.vue'
import scheduleService from '../services/scheduleService'

export default {
  name: 'Home',
  components: {
    PlayersTable
  },
  data: function () {
    return {
      today: new Date().toISOString().slice(0, 10),
      isScheduleFetched: false,
      schedule: [],
      players: []
    }
  },
  mounted () {
    scheduleService.getGames(this.today.replace(/[-]+/g, '')).then(response => {
      this.schedule = response.data
      let p = []
      this.schedule.forEach(game => {
        p = [...p, ...this.getTeam(game.vTeam.teamId).players, ...this.getTeam(game.hTeam.teamId).players]
      })
      this.players = p
      this.isScheduleFetched = true
    })
      .catch(error => {
        // handle error
        console.log(error)
      })
  },
  methods: {
    getTeam (teamId) {
      return this.$store.state.teams.find((team) => {
        return team.teamId === teamId
      })
    },
    goToDetails (visitorId, homeId) {
      this.$router.push({ path: `/gameDetails/${visitorId}/${homeId}` })
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .logo {
        width: 60px
    }

    .flex-container {
        display: flex;
        flex-wrap: wrap;
        justify-content:space-evenly;
        margin-bottom: 15px;
    }

    .card {
        margin: 5px;
        text-align: center;
        cursor: pointer;
    }
</style>
