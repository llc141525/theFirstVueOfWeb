<template>
  <v-table>
    <thead>
      <tr>
        <th>name</th>
        <th>age</th>
        <th>salary</th>
        <th>gender</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) in students" :key="i">
        <td>{{ item.name }}</td>
        <td>{{ item.age }}</td>
        <td>{{ item.salary }}</td>
        <td>{{ item.gender }}</td>
      </tr>
    </tbody>
  </v-table>
  <div class="text-center mt-9">
    <v-btn color="primary" @click="toshowLogin"> 按我 </v-btn>
  </div>
  <div>
    <login v-model="showLogin"> </login>
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
const {students} = storeToRefs(student);
const showLogin = ref(true);

function toshowLogin() {
  showLogin.value = !showLogin.value;
}

const fetchData = async () => {
  try {
    const res = await axios.get("http://localhost:8080/user");
    console.log(res.data);
    console.log(res.data.length)
    res.data.forEach((element:Student)  => {
      student.addStudent(element);
    });
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  fetchData();
});


</script>
