<template>
  <main class="container p-11">
    <!-- Horizontal Menu -->
    <div class="mb-6">
      <ul class="flex space-x-4">
        <li>
          <NuxtLink to="/students/add" class="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
            Students Add
          </NuxtLink>
        </li>
        <!-- Add more menu items here if needed -->
      </ul>
    </div>
    <div class="overflow-x-auto relative">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th>#</th>
          <th scope="col" class="py-3 px-6">Admission No</th>
          <th scope="col" class="py-3 px-6">Name</th>
          <th scope="col" class="py-3 px-6">Age</th>
          <th scope="col" class="py-3 px-6">Courses</th>
          <th scope="col" class="py-3 px-6">View</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(student,index) in students" :key="student.admNo" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td class="py-4 px-6">{{index+=1}}</td>
          <td class="py-4 px-6">{{ student.admNo }}</td>
          <td class="py-4 px-6">{{ student.name }}</td>
          <td class="py-4 px-6">{{ student.age }}</td>
          <td class="py-4 px-6">
            <ul>
              <li v-for="course in student.courses" :key="course.id">{{ course.name }}</li>
            </ul>
          </td>
          <td class="py-4 px-6">
            <ul>
              <NuxtLink :to="`/students/${student.admNo}`">
                <Icon name="lucide:users" color="white" />
                View
              </NuxtLink>
            </ul>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup lang="js">
import { ref, onBeforeMount } from 'vue';

// import postcss from "tailwindcss"

definePageMeta({
  layout: 'auth'
})

const students = ref([]);

// let students = []
onBeforeMount(async () => {
  const config = useRuntimeConfig();
  let API = config.public.STUDENTS_API
  let token = sessionStorage.getItem("token")
  console.log(API + " Is the API")
  console.log("Any")
  console.log("Please Log")
  const { data, pending, error } = await useFetch(API+'/all',{
    method: "get",
    headers: {
      Authorization: "Bearer " + token
    }
  })

  watchEffect(() => {
    if (!pending.value && !error.value) {
      students.value = data.value;
    }
  });

})
</script>
<style>
</style>
