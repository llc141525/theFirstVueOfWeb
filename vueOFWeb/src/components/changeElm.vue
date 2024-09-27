<template>
  <!-- <v-container> -->
  <v-dialog max-width="800">
    <v-card class="text-center mt-10 justify-center">
      <v-container>
        <v-card-title primary-title class="text-h4 py-4">
          修改数据
        </v-card-title>
        <v-text-field
          v-model="name"
          label="name"
          variant="outlined"
          prepend-inner-icon="mdi-account"
          prefix="输入你的名字:"
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
        <v-btn color="success" class="my-4" @click="changeStu">修改数据</v-btn>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useStudentStore } from "@/stores/student";
// import {Student} from "@/interface/Student";

let name = ref();
let age = ref();
let salary = ref();
let gender = ref();

const student = useStudentStore();

const props = defineProps({
  preStu: Object,
});
onMounted(() => {
  name.value = props.preStu.name;
  age.value = props.preStu.age;
  salary.value = props.preStu.salary;
  gender.value = props.preStu.gender;
});

const fetchData = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/user");
    student.cleanArry();
    const studentWithId = res.data.map((item, index) => {
      return { ...item, id: index + 1 };
    });
    student.setStudent(studentWithId);
  } catch (err) {
    console.log(err);
  }
};

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
    fetchData();
  };
  chnage();
}
</script>
