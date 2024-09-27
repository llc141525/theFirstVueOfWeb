import { defineStore } from "pinia";
import { ref, toRef } from "vue";
import { Student } from "@/interface/Student";

export const useStudentStore = defineStore("student", () => {
  const students = ref<Student[]>([]);
  function addStudent(student: Student) {
    students.value.push(student);
  }
  function cleanArry() {
    students.value = [];
  }
  function setStudent(newStu: Student[]) {
    students.value.splice(0, students.value.length, ...newStu);
  }

  return { students, addStudent, cleanArry, setStudent };
});
