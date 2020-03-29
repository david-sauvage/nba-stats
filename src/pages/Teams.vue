<template>
    <v-container  fluid>
        <v-data-table
            :headers="headers"
            :items="teams"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            hide-default-footer
            class="elevation-1">
            <template v-slot:item.logo="{ item }">
                <img class="logo" :src="item.logo"/>
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
      { text: 'Franchise', align: 'left', value: 'fullName' },
      { text: 'Win%', align: 'right', value: 'stats.winPct' },
      { text: 'W', align: 'right', value: 'stats.win' },
      { text: 'L', align: 'right', value: 'stats.loss' },
      { text: 'Offensive Rating', align: 'right', value: 'stats.offRat' },
      { text: 'Defensive Rating', align: 'right', value: 'stats.defRat' },
      { text: 'Pace', align: 'right', value: 'stats.pac' }
    ],
    sortBy: 'stats.winPct',
    sortDesc: true
  }),
  computed: {
    teams () {
      return this.$store.state.teams
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
