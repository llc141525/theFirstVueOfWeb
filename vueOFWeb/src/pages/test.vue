<template class="v-bg">
  <v-container class="pa-md-12">
    <v-data-table :items="students">
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>my CRUD</v-toolbar-title>
          <addElm v-model="showLogin"
          @close="showLogin = !showLogin"
          > </addElm>
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
        <changeElm
          v-model="showChange"
          :preStu="newStudent"
          :fetchData="fetchData"
          @close="showChange = !showChange"
        ></changeElm>
      </template>
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.salary }}</td>
          <td>{{ item.gender }}</td>
          <td>
            <v-icon @click="edit(item)">mdi-pencil</v-icon>
            <v-icon @click="del(item.id)">mdi-delete</v-icon>
          </td>
        </tr>
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
