<template>
  <!-- <v-container> -->
  <v-dialog max-width="800">
    <v-card class="text-center mt-10 justify-center">
      <v-container>
        <v-card-title primary-title class="text-h4 py-4">
          添加数据
        </v-card-title>
        <v-text-field
          v-model="name"
          label="name"
          variant="outlined"
          prepend-inner-icon="mdi-account"
          prefix="输入你的名字:"
          autofocus
          v-on:click:clear="name = ''"
          clearable
          max-width="500"
          class="mx-auto"
        >
        </v-text-field>
        <v-text-field
          v-model="age"
          label="age"
          prepend-inner-icon="mdi-calendar"
          variant="outlined"
          prefix="输入你的年龄:"
          clearable
          v-on:click:clear="age = ''"
          max-width="500"
          class="mx-auto"
        ></v-text-field>
        <v-text-field
          v-model="salary"
          label="salary"
          variant="outlined"
          prefix="输入你的薪水:"
          prepend-inner-icon="mdi-sack"
          clearable
          v-on:click:clear="salary = ''"
          max-width="500"
          class="mx-auto"
        ></v-text-field>

        <v-text-field
          v-model="gender"
          label="gender"
          prepend-inner-icon="mdi-gender-male"
          variant="outlined"
          prefix="输入你的性别:"
          clearable
          v-on:click:clear="gender = ''"
          max-width="500"
          class="mx-auto"
        ></v-text-field>

        <v-btn color="success" @click="adduser" class="my-4">添加数据</v-btn>
      </v-container>
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
