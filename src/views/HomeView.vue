<script setup>
    import WeatherCard from '../components/WeatherCard.vue'
</script>

<template>
    <section class="home">
        <h1>WeatherScope</h1>
        <p class="subtitle">Clima en tiempo real</p>
        <WeatherCard />
    </section>
</template>
<style scoped>
.home{
    padding: 40px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
h1{
    color: #2b8ea0; font-size: 2rem; margin-bottom: 8px;
}
.subtitle{
    color:aquamarine; margin-bottom: 32px;
}
</style>
