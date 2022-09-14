<template>

    <div v-for="city in savedCities" :key="city.id">
       <CityCard v-bind:city="city" @click="goToCityView(city)" />

    </div>

    <p v-if="savedCities.length===0">
        No location . To start tracking a location, search in the field above.
    </p>
    
</template>

<script setup>
import axios from 'axios'
import { useRouter } from "vue-router";
import CityCard from '../components/CityCard.vue'
import { ref } from 'vue'
 
const savedCities=ref([]);
const getCities= async ()=>{
 if(localStorage.getItem("savedCities")){
    savedCities.value=JSON.parse(
        localStorage.getItem("savedCities")
    );

    const requests=[];
    savedCities.value.forEach((city)=>{
        requests.push(
            axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.coords.lat}&lon=${city.coords.lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`)
        );
    });

    const weatherData=await Promise.all(requests);
    weatherData.forEach((value,index)=>{
        savedCities.value[index].weather=value.data;
    })
 }
};
await getCities();

    // goToCityView

const router = useRouter();
const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: { state: city.state, city: city.city },
    query: {
      lat: city.coords.lat,
      lng: city.coords.lng,
    },
  });
};






</script>


<style scoped>

</style>