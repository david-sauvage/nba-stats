<template>
  <v-card>
    <div id="logo">
    <img  :src="getLogo()"/>
    </div>
     <v-card-text>
    <p class="text-md-center">
      {{ team.fullName }} <br>
      {{ team.stats.win }} / {{ team.stats.loss }}
    </p>
     </v-card-text>
  </v-card>
</template>

<script>
export default {
    name: 'Team',
    props: ['team'],
    methods: {
      getLogo: function () {
        var images = require.context('../assets/team-logos', false, /\.svg$/)
        return images('./' + this.team.tricode + ".svg")
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#logo{
  text-align: center;
}
</style>
