<template>
  <!-- <v-main> -->
  <v-dialog width="800px" lazy="true">
    <v-card width="70vw" class="text-center mt-10">
      <v-container grid-list-xs>
        <v-row class="justify-center ma-6"><h1>添加数据</h1></v-row>
        <v-row class="justify-center">
          <v-col cols="7">
            <v-text-field
              v-model="name"
              label="name"
              variant="outlined"
              prepend-inner-icon="mdi-account"
              prefix="输入你的名字:"
              autofocus="true"
              v-on:click:clear="name = ''"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="7">
            <v-text-field
              v-model="age"
              label="age"
              prepend-inner-icon="mdi-cash"
              variant="outlined"
              prefix="输入你的年龄:"
              clearable
              v-on:click:clear="age = ''"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="7">
            <v-text-field
              v-model="salary"
              label="salary"
              variant="outlined"
              prefix="输入你的薪水:"
              prepend-inner-icon="mdi-home"
              clearable
              v-on:click:clear="salary = ''"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="7">
            <v-text-field
              v-model="gender"
              label="gender"
              prepend-inner-icon="mdi-gender-male"
              variant="outlined"
              prefix="输入你的性别:"
              clearable
              v-on:click:clear="gender = ''"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="success" @click="adduser">添加数据</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>

  <!-- </v-main> -->
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
