<template>
  <div class="flex py-5 px-3 bg-weather-secondary rounded-md shadow-lg my-3">
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3>{{ city.state }}</h3>
    </div>

    <div class="flex flex-col gap-2">
      <p class="text-3xl self-end">
        {{
          Math.round(((Math.round(city.weather.current.temp) - 32) * 5) / 9)
        }}&deg;<sup class="text-lg">C</sup>
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});
</script>
