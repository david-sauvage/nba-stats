<template>
  <div class="schedule">
      Schedule
  </div>
</template>

<script>
export default {
    name: 'Schedule',
    props: {
        msg: String
    },
    mounted() {
        this.$store.dispatch('LOAD_SCHEDULE')
    }

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
