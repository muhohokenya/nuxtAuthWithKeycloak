<template>
  <section>
    <div v-if="showAlert"
         class="fixed top-5
         right-5 bg-green-100
         border border-green-400
         md:w-96
          text-green-700 px-4 py-3 rounded r
         elative" role="alert">
      <strong class="font-bold">Success!</strong>
      <span class="block sm:inline">The student has been saved.</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="showAlert = false">
      <svg class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <title>Close</title>
        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 1.697L10 13.246 7.351 15.896a1.2 1.2 0 1 1-1.697-1.697l2.649-2.649-2.649-2.649a1.2 1.2 0 1 1 1.697-1.697l2.649 2.648 2.649-2.648a1.2 1.2 0 1 1 1.697 1.697L12.754 10l2.648 2.649z"/>
      </svg>
    </span>
    </div>

<h6>Heading 6</h6>
    <main class="content-around h-full bg-gray p-7 w-1/2">
      <form @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="admNo">
            Admission Number
          </label>
          <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="admNo" type="text" placeholder="A1017" v-model="formData.admNo" required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="age">
            Age
          </label>
          <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="age" type="number" placeholder="22" v-model="formData.age" required>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Name
          </label>
          <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="name" type="text" placeholder="John Doe" v-model="formData.name" required>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Courses
          </label>
          <div v-for="course in courses_available" :key="course.id" class="mb-2">
            <input
                type="checkbox"
                :id="'course-' + course.id"
                :value="course"
                v-model="formData.courses"
            />
            <label :for="'course-' + course.id" class="ml-2 text-gray-700">
              {{ course.name }}
            </label>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <button
              :class="{'bg-blue-500 hover:bg-blue-700': formData.courses.length <= 2, 'bg-red-500 cursor-not-allowed': formData.courses.length > 2}"
              class="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
            Submit
          </button>
        </div>
      </form>
    </main>
  </section>
</template>

<script setup lang="js">
import {ref, onBeforeMount} from 'vue';
const showAlert = ref(false);
const config = useRuntimeConfig();
let API = config.public.STUDENTS_API

const courses_available = ref([]);
onBeforeMount(async () => {
  let token = sessionStorage.getItem("token")

  let url = API+"/courses"
  const { data, pending, error } = await useFetch(url,{
    method: "get",
    headers: {
      Authorization: "Bearer " + token
    }
  })
  watchEffect(() => {
    if (!pending.value && !error.value) {
      courses_available.value = data.value;
    }
  });
})

definePageMeta({
  layout: 'auth'
})

const formData = ref({
  admNo: '',
  age: '',
  name: '',
  courses:[],
});

const submitForm = async () => {
  try {
    let url = API+'/save'
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      },
      body: JSON.stringify(formData.value)
    });

    if (response.ok) {
      showAlert.value = true;
      setTimeout(() => {
        showAlert.value = false;
      }, 3000);
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response Data:', data);
    // Handle the response data as needed
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

</script>