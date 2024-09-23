import { defineStore } from "pinia";
import { ref } from "vue";
import { Student } from "@/interface/Student";

export const useStudentStore = defineStore("student", () => {
  const students = ref<Student[]>([]);
  function addStudent(student: Student) {
    students.value.push(student);
  }
  return { students, addStudent };
});
