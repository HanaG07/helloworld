<template>
    <div class="card">
        <header>
            <div>
            <h2>{{ store.ciudad }}</h2>
            <span class="actualizado">{{ store.tiempoActualizado }}</span>
            </div>
            <span class="badge">{{ store.descripcionClima }}</span>
        </header>
        <div class="estado" v-if="store.cargando">
            <span class ="spinner">⏳</span> Actualizando....
        </div>
        <div v-else-if ="store.error" class="estado error">
            ⚠️{{ store.error }}
        </div>
        <div v-else class="datos">
            <p class="icono">{{ store.iconoClima }}</p>
            <p class="temp">{{ store.clima.temperatura }} °C</p>
            <p class="viento">🍃{{ store.clima.viento }} km/h</p>
        </div>
   

        <div class="historial">
            <div v-if="store.historial.length">
                <p class="lista-historial">Recientes:</p>
                <span class="hCiudad" v-for="ciudad in store.historial" :key='ciudad'>{{ ciudad }}</span>
            </div>
        </div>        <button @click="cargarClima" :disabled="store.cargando">
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
.icono{
  font-size: 48px; margin:16px 0 0;   
}
.historial{
    margin-top: 12px; padding-top:12px; border-top: 1px solid #2b7685;
}
.hciudad{
   display: inline-block; background-color:#2b7685; border-radius: 12px; padding: 3px 10px; font-size: 12px; margin:2px; cursor: pointer;
}
.spinner{
    animation: giro 1s linear infinite;
}

.actualizado{
    margin-top: 12px;padding-top: 12px; color: #94a3b8 ;
}
.lista-historial{
    font-size: 14px; color: #2b7685; margin-bottom: 8px;
}
.hCiudad:hover{
    background-color: #4e535f;
}
</style>
<script setup>
    import {onMounted, watch,onUnmounted} from 'vue'
    import {useWeatherStore} from '../stores/WeatherStore'
    import {obtenerClima} from '../services/WeatherService'
    
    const store = useWeatherStore()
    let timer = null
    
    async function cargarClima(){
        store.cargando = true
        store.limpiarError()
        try{
            const datos = await obtenerClima(store.latitud, store.longitud)
            store.setClima(datos.temperatura, datos.viento, datos.codigoClima)
           

        }catch{
            store.error="No se pudo obtener el clima. Intenta nuevamente."

        }finally{
            store.cargando = false
        }
    }


    //wacth: recargar cuando el usuario cambie de ciudad
    watch (
        [()=>store.latitud, ()=>store.longitud],
        ()=>cargarClima()
    )

    onMounted(
        async()=>{
            await cargarClima()
            timer=setInterval(cargarClima, 5*60*1000) //actualizar cada 5 minutos
        }
    )
    onUnmounted(
        ()=>{
            clearInterval(timer)
        }
    )
</script>