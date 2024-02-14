<script setup lang="js">
import { ref, onMounted } from 'vue';

definePageMeta({
  layout: 'auth'
})
// 0720781218
const courses = ref([]);
onBeforeMount(async () => {
  const config = useRuntimeConfig();
  let API = config.public.STUDENTS_API
  let token = sessionStorage.getItem("token")
  const { data, pending, error } = await useFetch(API+'/courses',{
    method: "get",
    headers: {
      Authorization: "Bearer " + token
    }
  })

  watchEffect(() => {
    if (!pending.value && !error.value) {
      courses.value = data.value
    }
  });
})
</script>
<template>
  <main class="container p-11">
    <!-- Horizontal Menu -->
    <div class="mb-6">
      <ul class="flex space-x-4">
        <li>
          <NuxtLink to="/courses/add" class="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
            Course Add
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
          <th scope="col" class="py-3 px-6">Course name</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(course,index) in courses" :key="course.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td class="py-4 px-6">{{index+=1}}</td>
          <td class="py-4 px-6">{{ course.name }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>
<style>
</style>
