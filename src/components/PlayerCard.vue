<template>
    <v-card>
        <v-list-item>
            <v-list-item-avatar color="grey">{{player.ttfl}}</v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title>{{player.player.lastName}}</v-list-item-title>
                <v-list-item-subtitle>{{player.player.firstName}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-img
                :src="player.player.officialImageSrc"
        ></v-img>
    </v-card>
</template>

<script>
export default {
  name: 'PlayerCard',
  props: ['player']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
