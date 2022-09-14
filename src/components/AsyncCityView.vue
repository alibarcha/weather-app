<template>
    <div class="flex flex-col flex-1 items-center">
        <!-- Banner -->
        <div v-if="route.query.preview" class="text-white p-4 bg-weather-secondary w-full text-center">
            <p>You are current Previewing this city, click the "+" icon to start tracking this city.</p>
        </div>
        <!-- weather overview -->
         <div class="flex flex-col items-center text-white py-10">
            <h1 class="text-4xl mb-2">{{route.params.city}}</h1>

             <p v-if="weatherData.hourly[0].currentTime"  class="text-sm mb-8"> 
                {{
                  // new Date()
               new Date(weatherData.hourly[0].currentTime).toLocaleDateString(
                    "en-us",
                    {
                    weekday: "short",
                    day: "2-digit",
                    month: "long",
                    }
                )
                }}
                    {{
                new Date(weatherData.hourly[0].currentTime).toLocaleTimeString(
                    "en-us",
                    {
                    timeStyle: "short",
                    }
                )
                }}
            </p> 
          
                <!-- temp -->
            <p class="text-8xl mb-6">
                {{Math.round(weatherData.current.temp)}}&deg;
            </p>

                <p>Feels like {{Math.round(weatherData.current.feels_like)}}&deg;</p>
                <p class="capitalize">
                    {{weatherData.current.weather[0].description}}
                </p>

                <img class="w-[150px] h-auto " :src="`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`" alt="">
         </div>

         <hr class="border-white  border border-opacity-10 w-full"/>

         <!-- Hourly weather -->

         <div class="max-w-screen-md w-full py-12">
            <div class="mx-8 text-white"> 
                <h2 class="mb-4">Hourly Weather</h2>

                <div class="flex gap-10 overflow-x-scroll  ">
                    <div v-for="hourData in weatherData.hourly" v-bind:key="hourData.dt" class="flex flex-col gap-4 items-center">
                        <!-- {{hourData}} -->

                        <p class="whitespace-nowrap text-md">
                            {{
                                new Date(hourData.currentTime).toLocaleTimeString("en-us",{
                                    hour:"numeric"
                                })
                            }}
                        </p>
                         <!-- img -->
                        <img class="w-auto h-[50px] object-cover" :src="`https://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`" alt="">
                        <!-- temp -->
                        <p class="text-xl">
                            {{Math.round(hourData.temp)}}&deg;
                        </p>
                            
                    </div>
                </div>

            </div>
         </div>

           <hr class="border-white  border border-opacity-10 w-full"/>

           <!-- Weekly wetther -->

           <div class="max-w-screen-md w-full  py-12">
            <div class="mx-8 text-white">
                <h2>7 Day Forcast</h2>
                <div v-for="day in weatherData.daily" v-bind:key="day.dt" class="flex items-center">
                    <p class="flex-1">
                        {{
                            new Date(day.dt*1000).toLocaleDateString(
                                "en-us",
                                {
                                    weekday:"long"
                                }
                            )
                        }}
                    </p>

                        <img class="w-[50px] h-[50px] object-cover" :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" alt="img">

                        <div class="flex gap-2 flex-1 justify-end">
                            <p>H: {{ Math.round(day.temp.max) }}</p>
                            <p>L: {{ Math.round(day.temp.min) }}</p>
                        </div>

                </div>
            </div>
           </div>


    </div>
</template>

<script setup>
import axios from 'axios'
import { useRoute } from 'vue-router'
const route=useRoute();

const getWeatherData=async()=>{
    try {
 
      const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lag}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
    );

  
        // call currentr data and time

        const localOffset=new Date().getTimezoneOffset()*60000;
        const utc=weatherData.data.dt * 1000+localOffset;
         weatherData.data.currentTime=utc+1000*weatherData.data.timezone_offset;
       
        

        // call hourly weather offset

          weatherData.data.hourly.forEach((hour)=>{
         
             const utc=hour.dt * 1000+localOffset;
              hour.currentTime=utc+1000*weatherData.data.timezone_offset;
             
         });
           
        return weatherData.data;

    }
    catch(err){
        console.log(err)
    }
};

const weatherData=await getWeatherData();
console.log("weather data",weatherData)
// console.log("houl",weatherData.hourly[0].currentTime)

</script>

<style scoped>

</style>