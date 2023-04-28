<template>
  <div>
    <Suspense>
      <AsyncCityView />
      <template #fallback>
        <p class="text-white py-4 text-center text-2xl">Loading...</p>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityView from "../components/AsyncCityView.vue";
</script>

