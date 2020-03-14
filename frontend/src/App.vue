<template>
  <v-app>
    <v-content>
      <app-bar></app-bar>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from '@/components/layout/AppBar'

export default {
  name: 'App',
  components: {
    AppBar
  }
}
</script>
