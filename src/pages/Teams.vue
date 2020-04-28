<template>
    <v-container  fluid>
        <v-data-table
            :headers="headers"
            :items="teams"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :items-per-page="-1"
            hide-default-footer
            class="elevation-1">
            <template v-slot:item.logo="{ item }">
                <img class="logo" :src="item.team.officialLogoImageSrc"/>
            </template>
            <template v-slot:item.franchise="{ item }">
                {{item.team.city}} {{item.team.name}}
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon
                        small
                        class="mr-2"
                        @click="goToPlayers(item)" >
                    people
                </v-icon>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>

export default {
  name: 'Teams',
  data: () => ({
    headers: [
      { text: '', align: 'center', value: 'logo', sortable: false },
      { text: 'Franchise', align: 'left', value: 'franchise' },
      { text: 'Win%', align: 'right', value: 'stats.standings.winPct' },
      { text: 'W', align: 'right', value: 'stats.standings.wins' },
      { text: 'L', align: 'right', value: 'stats.standings.losses' },
      { text: 'Off', align: 'right', value: 'stats.offense.ptsPerGame' },
      { text: 'Def', align: 'right', value: 'stats.defense.ptsAgainstPerGame' },
      { text: '', value: 'actions', sortable: false }
    ],
    sortBy: 'stats.standings.winPct',
    sortDesc: true
  }),
  computed: {
    teams () {
      return this.$store.state.teams
    }
  },
  methods: {
    goToPlayers (team) {
      this.$router.push({ path: '/players', query: { teamIds: team.team.id } })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo{
    width: 40px;
}
</style>
