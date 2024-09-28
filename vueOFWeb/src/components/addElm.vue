<template>
  <!-- <v-container> -->
  <v-dialog max-width="800" persistent>
    <v-card class="text-center mt-10 justify-center">
      <v-card-title primary-title class="text-h4 py-4"> 添加数据 </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="name"
          label="name"
          variant="outlined"
          prepend-inner-icon="mdi-account"
          placeholder="输入你的名字:"
          autofocus
          v-on:click:clear="name = ''"
          clearable
          max-width="500"
          class="mx-auto"
          color="primary"
        >
        </v-text-field>
        <v-text-field
          v-model="age"
          label="age"
          prepend-inner-icon="mdi-calendar"
          variant="outlined"
          placeholder="输入你的年龄:"
          clearable
          color="primary"
          v-on:click:clear="age = ''"
          max-width="500"
          class="mx-auto"
        ></v-text-field>
        <v-text-field
          v-model="salary"
          label="salary"
          variant="outlined"
          placeholder="输入你的薪水:"
          prepend-inner-icon="mdi-sack"
          clearable
          v-on:click:clear="salary = ''"
          max-width="500"
          class="mx-auto"
          color="primary"
        ></v-text-field>
        <v-text-field
          color="primary"
          v-model="gender"
          label="gender"
          prepend-inner-icon="mdi-gender-male"
          variant="outlined"
          placeholder="输入你的性别:"
          clearable
          v-on:click:clear="gender = ''"
          max-width="500"
          class="mx-auto"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn  text class="font-weight-light" color="null" @click="$emit('close')">关闭窗口</v-btn>
        <v-btn color="primary" @click="adduser" class="my-4">添加数据</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- </v-container> -->
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useStudentStore } from "@/stores/student";
let name = ref();
let age = ref();
let salary = ref();
let gender = ref();

const student = useStudentStore();
const postData = async () => {
  try {
    const response = axios.post("http://localhost:8080/api/postUser", {
      age: age.value,
      gender: gender.value,
      name: name.value,
      salary: salary.value,
    });

    student.addStudent({
      name: name.value,
      age: age.value,
      salary: salary.value,
      gender: gender.value,
    });
  } catch (err) {
    console.log(err);
  }
};
function adduser() {
  postData();
  name.value = "";
  age.value = "";
  salary.value = "";
  gender.value = "";
}
</script>
