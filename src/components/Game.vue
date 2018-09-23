<template>
  <div>
    {{ game.home }} @ {{ game.home }}  
  </div>
</template>

<script>
export default {
    name: 'Game',
    props: ['game'],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
