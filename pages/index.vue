<!--<script setup lang="ts">-->
<!--const { data: students } = await useFetch('http://localhost:8081/api/students')-->
<!--</script>-->

<script setup lang="js">

const config = useRuntimeConfig();
let API = config.public.STUDENTS_API


definePageMeta({
  layout: 'auth'
})

onMounted(async () => {
  // alert("Mounted")
})
</script>

<template>
  <div class="w-full h-screen p-11">
    <div class="flex flex-row h-full">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <!-- Card 1 -->
        <div class="bg-blue-500 text-white p-4 rounded-lg shadow-lg h-48">
          <h2 class="font-bold text-xl mb-2">Card Title 1</h2>
          <h3 class="font-bold text-xl mb-2">ENV {{API}}</h3>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        <!-- Card 2 -->
        <div class="bg-green-500 text-white p-4 rounded-lg shadow-lg h-48">
          <h2 class="font-bold text-xl mb-2">Card Title 2</h2>
          <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>

        <!-- Card 3 -->
        <div class="bg-pink-500 text-white p-4 rounded-lg shadow-lg h-48">
          <h2 class="font-bold text-xl mb-2">Card Title 3</h2>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        </div>

        <!-- Card 4 -->
        <div class="bg-purple-500 text-white p-4 rounded-lg shadow-lg h-48">
          <h2 class="font-bold text-xl mb-2">Card Title 4</h2>
          <p>Exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
      </div>

    </div>
  </div>
</template>
