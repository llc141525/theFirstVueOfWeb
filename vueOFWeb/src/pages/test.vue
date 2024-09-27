<template class="v-bg">
  

  <div></div>

  <div class="text-center mt-9"></div>

  <v-container class="pa-md-12">
    <v-text-field
      name="name"
      label="密码"
      class="mx-auto"
      prefix="输入:"
      placeholder="xxx-xxx-xxx"
      variant="outlined"
      max-width="400px"
    ></v-text-field>
  </v-container>

  <v-container class="pa-md-12">
    <v-data-table :headers="headers" :items="students">
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>my CRUD</v-toolbar-title>
          <addElm v-model="showLogin"> </addElm>
          <v-btn
            color="primary"
            @click="showLogin = !showLogin"
            class="text-none mx-4"
            prepend-icon="mdi-plus"
            slim
            variant="flat"
            text="添加数据"
          >
          </v-btn>
        </v-toolbar>
        <changeElm v-model="showChange" :preStu="newStudent"></changeElm>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon @click="edit(item)">mdi-pencil</v-icon>
        <v-icon @click="del(item.id)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts" setup>
import axios from "axios";
import addElm from "@/components/addElm.vue";
import changeElm from "@/components/changeElm.vue";
import { onMounted, ref } from "vue";
import { useStudentStore } from "@/stores/student";
import { storeToRefs } from "pinia";
import { Student } from "@/interface/Student";

const student = useStudentStore();
const { students } = storeToRefs(student);
const showLogin = ref(false);
const showChange = ref(false);
const headers = [
  { title: "id", value: "id" },
  { title: "name", value: "name" },
  { title: "age", value: "age" },
  { title: "salary", value: "salary" },
  { title: "gender", value: "gender" },
  { text: "actions", value: "actions" },
];

const newStudent = ref<Student>({
  name: "",
  age: 0,
  salary: 0,
  gender: "",
  id: 0,
});
function edit(preStu: Student) {
  newStudent.value = preStu;
  showChange.value = !showChange.value;
}
const fetchData = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/user");
    student.cleanArry();
    const studentWithId = res.data.map((item: Student, index: number) => {
      return { ...item, id: index + 1 };
    });
    student.setStudent(studentWithId);
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
