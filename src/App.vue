<template>
  <div class="flex z-0 flex-col min-h-screen font-Roboto bg-weather-primary">
    <SiteNavigation />
    <router-view />
  </div>
</template>

<script>
import SiteNavigation from "./components/SiteNavigation.vue";
export default {
  components: {
    SiteNavigation,
  },
};
</script>

