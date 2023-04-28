<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div
      v-if="route.query.preview"
      class="text-white p-3 bg-weather-secondary w-full text-center drop-shadow-md"
    >
      <p>
        You are current Previewing this city, click the "+" icon to start
        tracking this city.
      </p>
    </div>
    <!-- weather overview -->
    <div class="flex flex-col items-center text-white pt-4">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p v-if="weatherData.hourly[0].currentTime" class="text-sm mb-3">
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
      <p class="text-8xl mb-3">
        {{ Math.round(weatherData.current.temp) }}&deg;
      </p>
      <p>Feels like {{ Math.round(weatherData.current.feels_like) }}&deg;</p>
      <p class="capitalize pb-0">
        {{ weatherData.current.weather[0].description }}
      </p>

      <img
        class="w-[105px] h-auto"
        :src="`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
        alt=""
      />
    </div>
    <hr class="border-white border border-opacity-10 w-full" />

    <!-- Hourly weather -->

    <div class="max-w-screen-md w-full pt-4 pb-4">
      <div class="mx-8 text-white">
        <h2>Hourly Weather</h2>

        <div
          class="flex gap-8 scroll-box"
          style="padding-bottom: 8px !important"
        >
          <div
            v-for="hourData in weatherData.hourly"
            v-bind:key="hourData.dt"
            class="flex flex-col gap-1 items-center"
          >
            <!-- {{hourData}} -->
            <p class="whitespace-nowrap text-md">
              {{
                new Date(hourData.currentTime).toLocaleTimeString("en-us", {
                  hour: "numeric",
                })
              }}
            </p>
            <!-- img -->
            <img
              class="w-auto h-[45px] object-cover"
              :src="`https://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              alt=""
            />
            <!-- temp -->
            <p class="text-md">{{ Math.round(hourData.temp) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-white border border-opacity-10 w-full" />

    <!-- Weekly wetther -->

    <div class="max-w-screen-md w-full pt-4 pb-4">
      <div class="mx-8 text-white">
        <h2>7 Day Forcast</h2>
        <div
          v-for="day in weatherData.daily"
          v-bind:key="day.dt"
          class="flex items-center"
        >
          <p class="flex-1">
            {{
              new Date(day.dt * 1000).toLocaleDateString("en-us", {
                weekday: "long",
              })
            }}
          </p>

          <img
            class="w-[65px] h-[50px] object-cover"
            :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            alt="img"
          />

          <div class="flex gap-2 flex-1 justify-end">
            <p>H: {{ Math.round(day.temp.max) }}</p>
            <p>L: {{ Math.round(day.temp.min) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- romove city -->
    <div
      @click="removeCity"
      class="flex items-center gap-2 py-8 text-white cursor-pointer duration-150 hover:text-red-700"
    >
      <i class="fa-solid fa-trash"></i>
      <p>Remove city</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
    );

    // call currentr data and time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;

    // call hourly weather offset

    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });

    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};

const weatherData = await getWeatherData();

// ----Remove city ----------
const router = useRouter();
const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));
  const updatedCities = cities.filter((city) => city.id !== route.query.id);
  localStorage.setItem("savedCities", JSON.stringify(updatedCities));
  router.push({
    name: "home",
  });
};
</script>

<style scoped>
.scroll-box {
  overflow-x: scroll;
  padding-bottom: 25px;
  padding-top: 10px;
}

/* Track */
.scroll-box::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #00668a;
}

/* height & width */
.scroll-box::-webkit-scrollbar {
  height: 6px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb {
  background: #004e71;
  border: 1px solid #004e71;
  padding: 20px;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #012a3f;
}
</style>