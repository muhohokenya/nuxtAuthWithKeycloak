<template>
  <main class="container p-11">
    <!-- Horizontal Menu -->
    <div class="mb-6" v-if="!isForbidden">
      <ul class="flex space-x-4">
        <li>
          <NuxtLink to="/library" class="text-green-500 hover:text-blue-800 transition duration-300 ease-in-out">
            Books
          </NuxtLink>

          <NuxtLink to="/library/books/add" class="text-blue-600 pl-5 hover:text-blue-800 transition duration-300 ease-in-out">
            Add
          </NuxtLink>

          <NuxtLink to="/library/books/issue" class="text-orange-800 pl-5 hover:text-blue-800 transition duration-300 ease-in-out">
            Issue
          </NuxtLink>
        </li>
        <!-- Add more menu items here if needed -->
      </ul>
    </div>


    <div v-if="isForbidden">
      You are not allowed to access this resource.
    </div>

    <div v-else class="overflow-x-auto relative">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th>#</th>
          <th scope="col" class="py-3 px-6">Title</th>
          <th scope="col" class="py-3 px-6">Author</th>
          <th scope="col" class="py-3 px-6">ISBN</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(book,index) in books" :key="book.isbn" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td class="py-4 px-6">{{index+=1}}</td>
          <td class="py-4 px-6">{{ book.title }}</td>
          <td class="py-4 px-6">{{ book.author }}</td>
          <td class="py-4 px-6">{{ book.isbn }}</td>
          <td class="py-4 px-6">
            <ul>
              <NuxtLink :to="`/students/${book.isbn}`">
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

const books = ref([]);
// New state for handling 403 Forbidden response
const isForbidden = ref(false);


// let students = []
onBeforeMount(async () => {
  const config = useRuntimeConfig();
  let API = config.public.LIBRARY_API
  let token = sessionStorage.getItem("token")
  const { data, pending, error ,response} = await useFetch(API+'/books/all',{
    method: "get",
    headers: {
      Authorization: "Bearer " + token
    }
  })



  watchEffect(() => {
    if (error && error.value && error.value.statusCode === 403) {
      // Handle 403 Forbidden response
      isForbidden.value = true;
    } else if (!pending.value && !error.value) {
      // Handle successful response
      books.value = data.value;
    }
  });

  return {
    // other reactive properties
    isForbidden,
    // ... other properties
  }
})
</script>
<style>
</style>
