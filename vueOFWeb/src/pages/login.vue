<template>
  <!-- <v-main> -->
  <v-dialog width="800px">
    <v-card class="pa-16">
      <v-row>
      </v-row>
      <v-row>
        <v-col>
          <v-card-title class="text-center text-h4">Login</v-card-title>
        </v-col>
      </v-row>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field label="username" v-model="username"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="password" v-model="password"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-row>
        <v-col class="text-center">
          <v-btn color="success" class="mb-7">login</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>

  <!-- </v-main> -->
</template>

<script setup>
</script>
