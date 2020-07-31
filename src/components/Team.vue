<template>
  <v-card>
     <v-card-text class="team-presentation">
        <div class="logoContainer">
          <img class="logo" :src="team.team.officialLogoImageSrc"/>
        </div>
        <p class="text-md-center">
          {{ team.team.city }} {{ team.team.name }}<br>
          {{ team.stats.standings.wins }} / {{ team.stats.standings.losses }}
        </p>

         <p class="text-md-center">
             <v-chip outlined color="red darken-2" >
                 <v-avatar>
                     <v-icon>colorize</v-icon>
                 </v-avatar>
                 {{ team.stats.offense.ptsPerGame}}
             </v-chip>

             <v-chip outlined color="indigo darken-2" >
                 <v-avatar>
                     <v-icon>security</v-icon>
                 </v-avatar>
                 {{ team.stats.defense.ptsAgainstPerGame }}
             </v-chip>
         </p>
     </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Team',
  props: ['team']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logoContainer{
  text-align: center;
}
.logo{
  width: 80px;
}
.team-presentation {
  padding-top: 0;
}
</style>
