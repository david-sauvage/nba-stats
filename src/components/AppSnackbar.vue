<template>
    <v-snackbar
        v-model="snackbar.isDisplayingSnackBar"
        top
        right
        color="error"
        :timeout=3000
    >
        {{snackbar.message}}
        <v-btn
            icon
            @click="snackbar.isDisplayingSnackBar = false"
        >
            <v-icon>close</v-icon>
        </v-btn>
    </v-snackbar>
</template>

<script>

export default {
  name: 'AppSnackbar',
  computed: {
    snackbar () {
      return this.$store.state.snackbar
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
