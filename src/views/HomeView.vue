<template>
      <!-- home page component -->


   <main class="container text-white">
      <div class="pt-4 mb-8 relative">
         <input v-model="searchQuery" @input="getSearchResults" type="text" placeholder="Search for a city or state" class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px-1px-0-0-#004E71] ">

            <ul class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px] " v-if=" mapboxSearchResults">

               <!-- error -->
               <p v-if="searchError">Sorry, something went wrong, Please try Again !</p>
               <p v-if="!serverError && mapboxSearchResults.length===0">No result match your query, try a different term.</p>
               <template v-else>
                  <li v-for="searchResult in mapboxSearchResults" v-bind:key="searchResult.id" class="py-2 cursor-pointer" @click="previewCity(searchResult)">
                     {{searchResult.place_name}}
                  </li>
               </template>
            </ul>

      </div>

      <!-- cities list -->
    <Suspense>
        <CityList/>
        <template #fallback>
          <p>Loading...</p>
        </template>
      </Suspense>


   </main>

</template>

<script setup>
   import CityList from '../components/CityList.vue'
  import { ref } from 'vue'
 
import axios from 'axios'
import {useRouter} from 'vue-router'
   const router=useRouter();
  const mapboxAPIKey =
  "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q"; 

  const searchQuery=ref("");
  const queryTimeout=ref(null);
  const mapboxSearchResults=ref(null)
  const searchError=ref(null)


//   preview city
const previewCity=(searchResult)=>{
   // console.log(searchResult)
   const [city,state,country]=searchResult.place_name.split(',')

   router.push({
      name:'cityview',
      params:{state:state.replace(" ",""),city:city},
      query:{
         lat:searchResult.geometry.coordinates[1],
         lng:searchResult.geometry.coordinates[0],
         preview:true
      }
   })

   // console.log(city,state,country)
}


const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {

      try{
          const result = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
      );
      mapboxSearchResults.value = result.data.features;
      console.log(result)
      } catch{
         searchError.value=true
      }
     
      return;
    }
    mapboxSearchResults.value = null;
  }, 300);
};


</script>

<style scoped>

</style>
