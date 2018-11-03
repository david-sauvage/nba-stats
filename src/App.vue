<template>
  <v-app v-if="isDataReady">
    <v-toolbar
      app
      :clipped-left="clipped"  >
      <v-toolbar-title v-text="title"></v-toolbar-title>
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
      clipped: false,
      title: 'NBA Schedule'
    }
  },
  beforeCreate () {
    this.$store.dispatch('LOAD_SCHEDULE')
    this.$store.dispatch('LOAD_TEAMS')
  },
  computed: {
    isDataReady () {
        return this.$store.state.schedule != null
              && this.$store.state.teams != null
    },
  },
}
</script>
