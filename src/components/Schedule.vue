<template>
  <div>
    <div v-for="(games, date) in schedule" :key="date">
        {{ date }}:
        <div v-for="(value, key, index) in games" :key="index">
           {{ value.home }} @ {{ value.home }}  
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Schedule',
    computed: {
        schedule () {
            return this.$store.state.schedule
        }
    },
    mounted() {
        this.$store.dispatch('LOAD_SCHEDULE')
        this.$store.dispatch('LOAD_TEAMS')
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
