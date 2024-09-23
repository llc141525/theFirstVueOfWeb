<template>
  <!-- <v-card v-for="(id, name, email) in User" :key="id">
    <li>{{ id }} {{ name }} {{ email }}</li>
  </v-card> -->
  <v-card>
    {{ User }}
  </v-card>
</template>

<script lang="ts" setup>
import axios from "axios";
import { error } from "console";
// import { log } from "console";
import { onMounted, ref } from "vue";
let User = ref([]);

const loadUser = () => {
  const storeUser = localStorage.getItem("User");
  // console.log(User.value);
  if (storeUser) {
    // User.value ` = storeUser;
    console.log(localStorage)
  } else {
    fetchUser();
  }
  // console.log(storeUser);
};
const fetchUser = async () => {
  try {
    console.log(User.value);
    const response = await axios.get("http://localhost:8080/User");
    User.value = response.data;
    localStorage.setItem("User", response.data);
    console.log("res is", response);
  } catch (error) {
    console.log(error);
  }
};

onMounted(loadUser);
</script>
