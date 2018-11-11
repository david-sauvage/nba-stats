<template>
  <v-card>
    <div class="logo">
    <img  :src="team.logo"/>
    </div>
     <v-card-text class="team-presentation">
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo{
  text-align: center;
}
.team-presentation {
  padding-top: 0;
}
</style>
