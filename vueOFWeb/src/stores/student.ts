import { defineStore } from "pinia";
import { ref } from "vue";
import { Student } from "@/interface/Student";

export const useStudentStore = defineStore("student", () => {
  const students = ref<Student[]>([]);
  function addStudent(student: Student) {
    // 清除students的所有信息
    students.value.push(student);
  }
  function cleanArry() {
    students.value = [];
  }
  return { students, addStudent , cleanArry};
});
