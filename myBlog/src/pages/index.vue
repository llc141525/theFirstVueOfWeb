<template>
  <v-app :theme="theme">
    <v-app-bar color="primary">
      <v-icon />
      <v-spacer />
      <v-btn
        :prepend-icon="theme==='light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        slim
        @click="theme=theme==='light'?'dark':'light'"
      >主题</v-btn>
    </v-app-bar>
    <v-card />
    <v-main>
      <v-card
        vertical
      />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  const theme = ref('dark')
</script>
