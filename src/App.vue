<template>
  <v-app v-if="isDataReady">
    <v-navigation-drawer
      :clipped="clipped"
      v-model="drawer"
      fixed
      app >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to=item.route>
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>NBA Stats</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'home',
          title: 'Today',
          route: '/'
        },
        {
          icon: 'date_range',
          title: 'Schedule',
          route: '/schedule'
        },
        {
          icon: 'people',
          title: 'Players',
          route: '/players'
        },
        {
          icon: 'supervised_user_circle',
          title: 'Teams',
          route: '/teams'
        }

      ]
    }
  },
  beforeCreate () {
    this.$store.dispatch('LOAD_SCHEDULE')
    this.$store.dispatch('LOAD_TEAMS')
  },
  computed: {
    isDataReady () {
      return this.$store.state.schedule != null &&
              this.$store.state.teams != null
    }
  }
}
</script>
