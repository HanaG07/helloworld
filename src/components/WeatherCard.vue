<template>
    <div class="card">
        <header>
            <h2>{{ store.ciudad }}</h2>
            <span class="badge">{{ store.descripcionClima }}</span>
        </header>
        <div class="estado" v-if="store.cargando">
            Obteniendo clima...
        </div>
        <div v-else-if ="store.error" class="estado error">
            {{ store.error }}
        </div>
        <div v-else class="datos">
            <p class="temp">{{ store.temperatura }} °C</p>
            <p class="viento">{{ store.viento }} km/h</p>
        </div>
        <button @click="cargarClima" :disabled="store.cargando">
            {{ store.cargando? "Actualizando...": "Actualizar..." }}
        </button>
    </div>
</template>

<style scoped>
.card {
    border:2px solid #2b7685;
    border-radius: 16px;
}
header {
    display: flex; justify-content:space-between; align-items: center;
}
.badge {
    background: #2b7685; padding: 5px 10px;
}
.temp{
    font-size: 48px; font-weight: 800; color: #2563EB; margin: 16px 0;
}
.viento{
    color: #2563EB; margin:4px 0;
}
.estado{
    padding: 20px 0 ; columns: #373737;
}
.error{color: #991b1b;}

button{
    margin-top: 16px; background: #2b7685; color: white;
    border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;
}
button:disabled{
    opacity: 0.5; cursor:not-allowed;
}
</style>
<script setup>
    import {onMounted} from 'vue'
    import {useWeatherStore} from '../stores/WeatherStore'
    import {obtenerClima, interpretaCodigoClima} from '../services/WeatherService'
    
    const store = useWeatherStore()
    async function cargarClima(){
        store.cargando = true
        store.limpiarError()
        try{
            const datos = await obtenerClima(store.latitud, store.longitud)
            store.setClima(datos.temperatura, datos.viento)
            store.codigoClima = datos.codigoClima

        }catch{
            store.error="No se pudo obtener el clima. Intenta nuevamente."

        }finally{
            store.cargando = false
        }
    }

    onMounted(cargarClima)
</script>