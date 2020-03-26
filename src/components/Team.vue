<template>
  <v-card>

     <v-card-text class="team-presentation">
        <div class="logo">
    <img :src="team.logo"/>
    </div>
      <p class="text-md-center">
        {{ team.fullName }} <br>
        {{ team.stats.win }} / {{ team.stats.loss }}
      </p>
      <p class="text-md-center">
        <v-tooltip bottom>
          <v-chip outline color="red darken-2" slot="activator" >
            <v-avatar>
              <v-icon>colorize</v-icon>
            </v-avatar>
            {{ team.stats.offRat }}
          </v-chip>
          <span>Offensive Rating</span>
        </v-tooltip>

        <v-tooltip bottom>
          <v-chip outline color="indigo darken-2" slot="activator" >
            <v-avatar>
              <v-icon>security</v-icon>
            </v-avatar>
            {{ team.stats.defRat }}
          </v-chip>
          <span>Defensive Rating</span>
        </v-tooltip>

        <v-tooltip bottom>
          <v-chip outline color="yellow darken-2" slot="activator" >
            <v-avatar>
              <v-icon>flash_on</v-icon>
            </v-avatar>
            {{ team.stats.pac }}
          </v-chip>
          <span>Pace</span>
        </v-tooltip>
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
.logo{
  text-align: center;
}
.team-presentation {
  padding-top: 0;
}
</style>
