<template>
    <v-container  fluid grid-list-xl >
        <v-data-table
            :headers="headers"
            :items="teams"
            :pagination.sync="pagination"
            hide-actions
            class="elevation-1">

            <template slot="items" slot-scope="props">
                <td><img class="logo" :src="props.item.logo"/></td>
                <td>{{ props.item.fullName }}</td>
                <td class="text-xs-right">{{ props.item.stats.winPct }}</td>
                <td class="text-xs-right">{{ props.item.stats.win }}</td>
                <td class="text-xs-right">{{ props.item.stats.loss }}</td>
                <td class="text-xs-right">{{ props.item.stats.offRat }}</td>
                <td class="text-xs-right">{{ props.item.stats.defRat }}</td>
                <td class="text-xs-right">{{ props.item.stats.pac }}</td>
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
      { text: 'Offensive Rating', align: 'right', value: 'stats.off_rat' },
      { text: 'Defensive Rating', align: 'right', value: 'stats.defRat' },
      { text: 'Pace', align: 'right', value: 'stats.pac' }
    ],
    pagination: {
      sortBy: 'stats.winPct',
      descending: true,
      rowsPerPage: -1
    }
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
