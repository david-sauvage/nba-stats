<template>
  <v-app>
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
  }
}
</script>
