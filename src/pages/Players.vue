<template>
    <v-container  fluid >
        <v-col cols="12" sm="6">
            <v-select
                v-model="selectedTeams"
                :items="teams"
                :item-text="item => item.team.city +' '+ item.team.name"
                :return-object="true"
                chips
                label="Franchise"
                solo
                multiple>

                <v-list-item
                    slot="prepend-item"
                    ripple
                    @click="toggleSelectAllTeams">
                    <v-list-item-action>
                        <v-icon :color="selectedTeams.length > 0 ? 'primary' : ''">{{ selectAllIcon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>Select All</v-list-item-title>
                </v-list-item>
                <v-divider
                    slot="prepend-item"
                    class="mt-2"
                ></v-divider>

                <template
                    slot="selection"
                    slot-scope="{ item, index }"
                    >
                    <v-chip v-if="index <= 2">
                        <span>{{ item.team.name }}</span>
                    </v-chip>
                    <span
                        v-if="index === 3"
                        class="grey--text caption"
                    >(+{{ selectedTeams.length - 3 }} others)
                    </span>
                </template>

            </v-select>
        </v-col>
        <PlayersTable :players="players"/>
    </v-container>
</template>

<script>
import PlayersTable from '../components/PlayersTable.vue'
import mySportsFeedService from '../services/mySportsFeedService'

export default {
  name: 'Players',
  components: {
    PlayersTable
  },
  data: () => ({
    selectedTeams: [],
    players: []
  }),
  created () {
    if (this.$route.query.teamIds) {
      const aTeam = this.$store.state.teams.find((team) => {
        return team.team.id === Number(this.$route.query.teamIds)
      })
      this.selectedTeams.push(aTeam)
    }
  },
  computed: {
    teams () {
      return this.$store.state.teams
    },
    selectedAllTeams () {
      return this.selectedTeams.length === this.teams.length
    },
    selectedSomeTeams () {
      return this.selectedTeams.length > 0 && !this.selectedAllTeams
    },
    selectAllIcon () {
      if (this.selectedAllTeams) return 'check_box'
      if (this.selectedSomeTeams) return 'indeterminate_check_box'
      return 'check_box_outline_blank'
    }
  },
  watch: {
    selectedTeams: function (newValue) {
      this.players = []
      if (newValue.length > 0) {
        const teamIds = newValue.map(t => t.team.id).join(',')
        mySportsFeedService.getPlayersStats(teamIds)
          .then(response => {
            this.players = response.data.playerStatsTotals
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  },
  methods: {
    toggleSelectAllTeams () {
      this.$nextTick(() => {
        if (this.selectedAllTeams) {
          this.selectedTeams = []
        } else {
          this.selectedTeams = this.teams.slice()
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
