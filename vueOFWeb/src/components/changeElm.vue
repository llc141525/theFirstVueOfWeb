<template>
  <v-dialog max-width="800" persistent>
    <v-card class="text-center mt-10 justify-center">
      <v-card-title primary-title class="text-h4 py-6"> 修改数据 </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="name"
          label="name"
          variant="outlined"
          prepend-inner-icon="mdi-account"
          placeholder="输入你的名字:"
          v-on:click:clear="name = ''"
          clearable
          max-width="500"
          class="mx-auto"
          color="primary"
          autofocus
        >
        </v-text-field>
        <v-text-field
          v-model="age"
          label="age"
          prepend-inner-icon="mdi-calendar"
          variant="outlined"
          placeholder="输入你的年龄:"
          clearable
          v-on:click:clear="age = ''"
          max-width="500"
          class="mx-auto"
          color="primary"
        ></v-text-field>
        <v-text-field
          v-model="salary"
          label="salary"
          variant="outlined"
          placeholder="输入你的薪水:"
          prepend-inner-icon="mdi-sack"
          clearable
          color="primary"
          v-on:click:clear="salary = ''"
          max-width="500"
          class="mx-auto"
        ></v-text-field>
        <v-select
          label="gender"
          :items="['男', '女']"
          v-model="gender"
          autocomplete
          variant="outlined"
          class="mx-auto"
          max-width="500"
          color="primary"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="null" class="font-weight-light" @click="$emit('close')">关闭窗口</v-btn>
        <v-btn color="primary" class="my-4" @click="changeStu">修改数据</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import axios from "axios";
import {  ref, watch } from "vue";

let name = ref();
let age = ref();
let salary = ref();
let gender = ref();

const props = defineProps({
  preStu: Object,
  fetchData: Function,
});

watch(
  () => props.preStu,
  (newValue) => {
    if (newValue) {
      name.value = newValue.name;
      age.value = newValue.age;
      salary.value = newValue.salary;
      gender.value = newValue.gender;
    }
  }
);
const emit= defineEmits(['close'])

function changeStu() {
  const chnage = async () => {
    const res = await axios.put(
      `http://localhost:8080/api/change/${props.preStu.id}`,
      {
        name: name.value,
        age: age.value,
        salary: salary.value,
        gender: gender.value,
      }
    );
    props.fetchData();
  };
  chnage();
  emit('close')
}
</script>
