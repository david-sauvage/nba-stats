<template>
    <v-container  fluid grid-list-xl >
        <v-flex xs12 sm6>
            <v-select
                v-model="selectedTeams"
                :items="teams"
                item-text="fullName"
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
                        <span>{{ item.fullName }}</span>
                    </v-chip>
                    <span
                        v-if="index === 3"
                        class="grey--text caption"
                    >(+{{ selectedTeams.length - 3 }} others)
                    </span>
                </template>

            </v-select>
        </v-flex>
        <PlayersTable :players="players"/>
    </v-container>
</template>

<script>
import PlayersTable from '../components/PlayersTable.vue'

export default {
  name: 'Players',
  components: {
    PlayersTable
  },
  data: () => ({
    selectedTeams: []
  }),
  computed: {
    teams () {
      return this.$store.state.teams
    },
    players () {
      return Array.from(this.selectedTeams, t => t.players).flat()
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
