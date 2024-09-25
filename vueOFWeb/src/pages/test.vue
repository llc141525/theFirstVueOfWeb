<template class="v-bg">
  <v-table class="ma-12">
    <thead color="primary">
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
        <td>
          <v-btn color="error" @click="del(i + 1)" text="删除我" slim></v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>

  <div>
    <login v-model="showLogin"> </login>
  </div>

  <div class="text-center mt-9">
    <v-btn
      color="primary"
      @click="showLogin = !showLogin"
      class="text-none"
      prepend-icon="mdi-plus"
      slim
      variant="flat"
      text="添加数据"
    >
    </v-btn>
  </div>

  <v-container class="pa-md-12">
    <v-text-field
      name="name"
      label="密码"
      class="mx-auto" 
      prefix="输入:"     
      placeholder="xxx-xxx-xxx"
      variant="outlined"
      
    ></v-text-field>
  </v-container>
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

const fetchData = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/user");
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

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.v-bg {
  filter: blur(56px);
  pointer-events: none;
}

.v-bg > div {
  background: linear-gradient(
    to bottom right,
    rgb(var(--v-theme-primary)),
    rgb(var(--v-theme-error))
  );
  z-index: -10;
  clip-path: polygon(
    20% 50%,
    27% 66%,
    41% 66%,
    50% 50%,
    41% 34%,
    27% 34%,
    20% 50%,
    55% 50%,
    62% 66%,
    76% 66%,
    85% 50%,
    76% 34%,
    62% 34%,
    55% 50%,
    30% 50%,
    37% 66%,
    51% 66%,
    60% 50%,
    51% 34%,
    37% 34%,
    30% 50%
  );
}
</style>
