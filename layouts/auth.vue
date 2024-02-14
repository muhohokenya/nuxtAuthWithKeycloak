<template>
    <div class="w-full h-screen">
        <div class="flex flex-row h-full">
            <div class="bg-gray-700 dark:text-gray-400 w-[230px]">
              <div class="mt-14 px-3 flex flex-col h-1/6">
                <ul class="flex flex-col items-start gap-5 mb-9">
                  <li class="text-gray-50 text-[16px] font-[700] dark:text-gray-400 cursor-pointer
                   hover:text-blue-200">
                    <NuxtLink to="/home" class="dark:text-white-50">
                      <Icon name="lucide:home" color="white" />
                      Home</NuxtLink>
                  </li>
                  <li class="text-gray-50 text-[16px] font-[700] dark:text-gray-400 cursor-pointer
                  hover:text-blue-200">
                    <NuxtLink to="/courses" v-if="isAdmin">
                      <Icon name="lucide:graduation-cap" color="white" />
                      Courses</NuxtLink>
                  </li>
                  <li class="text-gray-50 text-[16px] font-[700] dark:text-gray-400 cursor-pointer
                  hover:text-blue-200">
                    <NuxtLink to="/students">
                      <Icon name="lucide:users" color="white" />
                      Students</NuxtLink>
                  </li>

                  <li class="text-gray-50 text-[16px] font-[700] dark:text-gray-400 cursor-pointer
                  hover:text-blue-200">
                    <NuxtLink to="/library">
                      <Icon name="lucide:users" color="white" />
                      Library</NuxtLink>
                  </li>
                </ul>
                <div class="mt-auto">
                  <ul class="flex flex-col items-start">
                    <li class="text-red-400 text-[16px] font-[700] dark:text-red-600 cursor-pointer
                    hover:text-red-600">
                      <NuxtLink @click="logout">Logout</NuxtLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="bg-gray-100 flex-1 overflow-auto">
                <NuxtPage />
            </div>
        </div>
    </div>
</template>

<script>
export default {

  data(){
    return{
      isAdmin:false
    }
  },
  mounted() {
    try {
      const config = useRuntimeConfig();
      const CLIENT = config.public.CLIENT_ID
      const LIBRARY_ROLE = config.public.LIBRARY_ROLE
      let token = sessionStorage.getItem("token")
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      let response = JSON.parse(jsonPayload);
      this.isAdmin = response.resource_access[CLIENT].roles.includes(LIBRARY_ROLE)
      console.log(response.resource_access[CLIENT].roles)
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  },

  methods:{
    logout(){
      const config = useRuntimeConfig();
      const UI_URL = config.public.UI_URL
      this.$keycloak.logout({
        redirectUri: UI_URL }).then(() => {
        sessionStorage.removeItem("token")
      }).catch(err => {
        console.error('Logout failed', err);
      });
    }
  }
}
</script>