<template>
  <v-table>
    <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>age</th>
        <th>salary</th>
        <th>gender</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) in students" :key="i">
        <td>{{ i }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.age }}</td>
        <td>{{ item.salary }}</td>
        <td>{{ item.gender }}</td>
        <td><v-btn color="error" @click="del(i + 1)">删除我</v-btn></td>
      </tr>
    </tbody>
  </v-table>

  <div>
    <login v-model="showLogin"> </login>
  </div>

  <!-- <v-card width="70vw" class="text-center mt-10">
    name : <v-text-field v-model="name"></v-text-field> age :
    <v-text-field v-model="age"></v-text-field> salary :
    <v-text-field v-model="salary"></v-text-field> gender :
    <v-text-field v-model="gender"> </v-text-field>

    <v-btn color="success" @click="adduser">添加数据</v-btn>
  </v-card> -->

  <div class="text-center mt-9">
 
    <v-btn color="primary" @click="toshowLogin"> 添加数据 </v-btn>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import login from "./login.vue";
import { onMounted, ref } from "vue";
import { useStudentStore } from "@/stores/student";
import { storeToRefs } from "pinia";
import { Student } from "@/interface/Student";
const student = useStudentStore();
const { students } = storeToRefs(student);
const showLogin = ref(false);

// let name = ref();
// let age = ref();
// let salary = ref();
// let gender = ref();

// function adduser() {
//   postData();
//   // console.log(name.value, age.value, salary.value, gender.value);
// }

function toshowLogin() {
  showLogin.value = !showLogin.value;
}

const fetchData = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/user");
    // console.log(res.data);
    // console.log(res.d  ata.length);
    student.cleanArry();
    res.data.forEach((element: Student) => {
      student.addStudent(element);
    });
  } catch (err) {
    console.log(err);
  }
};

function del(i: number) {
  console.log("id is", i);
  const delData = async () => {
    try {
      const response = axios.post(`http://localhost:8080/api/del?id=${i}`);
      console.log(response);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };
  delData();
  fetchData();
}
// const postData = async () => {
//   try {
//     const response = axios.post("http://localhost:8080/api/postUser", {
//       age: age.value,
//       gender: gender.value,
//       name: name.value,
//       salary: salary.value,
//     });

//     student.addStudent({
//       name: name.value,
//       age: age.value,
//       salary: salary.value,
//       gender: gender.value,
//     });

//     // console.log("student.value");
//     // console.log(students.value);
//   } catch (err) {
//     console.log(err);
//   }
// };

onMounted(() => {
  fetchData();
});
</script>
