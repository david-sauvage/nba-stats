<template>
  <div>
    {{ team.fullName }}
  </div>
</template>

<script>
export default {
    name: 'Team',
    props: ['team']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
