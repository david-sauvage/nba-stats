<template>

    <v-container fluid>
        <div class="flex-container">
            <v-col cols="2" v-for="(game, index) in schedule" :key="index" >
                <v-card class="card" @click.native="goToDetails(game.schedule.awayTeam.id, game.schedule.homeTeam.id)" >
                    <img class="logo" :src="getTeam(game.schedule.awayTeam.id).team.officialLogoImageSrc"/>
                    <img class="logo" :src="getTeam(game.schedule.homeTeam.id).team.officialLogoImageSrc"/>
                </v-card>
            </v-col>
        </div>
        <PlayersTable :players="players"/>
    </v-container>
</template>

<script>
import PlayersTable from '../components/PlayersTable.vue'
import mySportsFeedService from '../services/mySportsFeedService'

export default {
  name: 'Home',
  components: {
    PlayersTable
  },
  data: function () {
    return {
      today: new Date().toISOString().slice(0, 10),
      players: []
    }
  },
  computed: {
    schedule () {
      return this.$store.state.schedule[this.today]
    }
  },
  async mounted () {
    this.players = []
    if (this.schedule) {
      const homeTeams = this.schedule.map(g => g.schedule.homeTeam.id)
      const awayTeams = this.schedule.map(g => g.schedule.awayTeam.id)
      const response = await mySportsFeedService.getPlayersStats(this.$store, homeTeams.concat(awayTeams).join(','))
      this.players = response.data.playerStatsTotals
    }
  },
  methods: {
    getTeam (teamId) {
      return this.$store.state.teams.find((team) => {
        return team.team.id === teamId
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
