<template>
    <v-container fluid grid-list-xl >
        <div class="flex-container">
        <v-flex xs2 v-for="(game, index) in schedule" :key="index" >
            <v-card class="card" @click.native="goToDetails(game.visitor, game.home)" >
                <img class="logo" :src="getTeam(game.visitor).logo"/>
                <img class="logo" :src="getTeam(game.home).logo"/>
            </v-card>
        </v-flex>
        </div>
        <PlayersTable :players="players"/>
    </v-container>
</template>

<script>
import PlayersTable from '../components/PlayersTable.vue'

export default {
  name: 'Home',
  components: {
    PlayersTable
  },
  computed: {
    today () {
      return new Date('2019-02-01T00:00:00').toISOString().slice(0, 10)
      // return new Date().toISOString().slice(0, 10)
    },
    schedule () {
      return this.$store.state.schedule[this.today.replace(/[-]+/g, '')]
    },
    players () {
      let players = []
      this.schedule.forEach(game => {
        players = [...players, ...this.getTeam(game.visitor).players, ...this.getTeam(game.home).players]
      })
      return players
    }

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
