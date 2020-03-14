<template>
  <v-app>
    <v-content>
      <app-bar></app-bar>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
    <app-messages></app-messages>
  </v-app>
</template>

<script>
import AppBar from '@/components/layout/AppBar'
import AppMessages from '@/common/plugins/message/AppMessages'

export default {
  name: 'App',
  components: {
    AppBar,
    AppMessages
  },
  data: () => ({
    //
  })
}
</script>
