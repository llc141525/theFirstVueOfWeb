<template>
  <!-- <v-main> -->
  <v-dialog width="800px">
     <v-card width="70vw" class="text-center mt-10">
    name : <v-text-field v-model="name"></v-text-field> age :
    <v-text-field v-model="age"></v-text-field> salary :
    <v-text-field v-model="salary"></v-text-field> gender :
    <v-text-field v-model="gender"> </v-text-field>

    <v-btn color="success" @click="adduser">添加数据</v-btn>
  </v-card>
  </v-dialog>

  <!-- </v-main> -->
</template>

<script setup>
import axios from "axios";
import { Student } from "@/interface/Student";
import { onMounted, ref } from "vue";
let name = ref();
let age = ref();
let salary = ref();
let gender = ref();

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

    // console.log("student.value");
    // console.log(students.value);
  } catch (err) {
    console.log(err);
  }
};
function adduser() {
  postData();
  // console.log(name.value, age.value, salary.value, gender.value);
}

</script>
