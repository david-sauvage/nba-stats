<template>
  <div>
    <div>
    <img :src="getLogo()"/>
    </div>
    <div>
    {{ team.fullName }}
    </div>
  </div>
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

</style>
