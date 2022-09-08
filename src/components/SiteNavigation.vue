<template>
    
    <header class="sticky bg-wether-primary shadow-lg top-0">
        <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6 ">
            <router-link :to="{name:'home'}">
                <div class="flex items-center gap-3 flex-1">
                    <i class="fa-regular fa-sun"></i>
                    <p class="text-2xl">The Local Wether</p>
                </div>
            </router-link>

            <div class="flex gap-3 flex-1 justify-end">
                <i class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"></i>
                <i class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"></i>
            </div>
            
        </nav>
    </header>

</template>

<script>
export default {
    name:'SiteNavigation',

}
</script>

<style scoped>

</style>