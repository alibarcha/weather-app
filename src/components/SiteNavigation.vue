<template>
  <header class="sticky z-20 shadow-lg top-0">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-4"
    >
      <router-link :to="{ name: 'home' }">
        <div class="flex items-center gap-3 flex-1">
          <i class="fa-solid fa-sun text-xl"></i>
          <p class="text-2xl">The Local Wether</p>
        </div>
      </router-link>

      <div class="flex gap-3 flex-1 justify-end">
        <i
          v-on:click="toggleModal"
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
        ></i>
        <i
          @click="addCity"
          v-if="route.query.preview"
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
        ></i>
      </div>

      <BaseModal v-bind:modalActive="modalActive" @close-modal="toggleModal">
        <div class="text-black">
          <h1 class="text-xl mb-1">About:</h1>
          <p class="mb-2">
            The Local wether allows to track the current and future wether of
            cities of your choisen.
          </p>
          <h2 class="text-xl">How it Works:</h2>
          <ol class="list-decimal list-inside mb-2">
            <li>
              Search for your city by entering the name into the search bar.
            </li>
            <li>
              Select a city within the results, this will take you to the
              current weather for your selection.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the top right. This
              will save the city to view at a later time on the home page.
            </li>
          </ol>
          <h2 class="text-xl">Removing a city</h2>
          <p>
            If you no longer wish to track a city, simply select the city within
            the home page. At the bottom of the page, there will be am option to
            delete the city.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

 <script setup>
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import BaseModal from "./BaseModal.vue";
import { uid } from "uid";
 
const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

// add city

const savedCities = ref([]);
const route = useRoute();
const router = useRouter();

const addCity = () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }

  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };
  savedCities.value.push(locationObj);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObj.id;
  router.replace({ query });
};

</script>
<style scoped>
header{
  background: #00668a !important;
}
</style>