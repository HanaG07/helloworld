import {defineStore} from 'pinia'
import {ref, computed} from 'vue'

export const useWeatherStore = defineStore('weather', () =>{

    const ciudad = ref('Cancun')
    const latitud = ref(27.97)
    const longitud = ref(-86.79)
    const temperatura = ref(null)
    const viento = ref(null)
    const cargando = ref(false)
    const error = ref('')
    const codigoClima = ref(null)

    //Computados

const tieneClima = computed(() => temperatura.value!==null)

    const descripcionClima = computed(()=> {
    if (!tieneClima.value) return 'Sin datos'
    if(temperatura.value > 35) return 'Muy caluroso'
    if(temperatura.value > 25) return 'Calido'
    if(temperatura.value > 15) return 'Templado'
    return 'Frio'
    })

    //Acciones
    function setCiudad(nombre, lat, len){
        ciudad.value=nombre
        latitud.value=lat
        longitud.value=len
    }

    function setClima(temp, vientoKMH){
        temperatura.value=temp
        viento.value=vientoKMH
    }

    function limpiarError(){
        error.value=''
    }
    //exponer todo lo que van a poder acceder a los ocmponentes 

    return{
        ciudad,latitud,longitud,temperatura,viento,codigoClima,cargando,error,tieneClima,descripcionClima,setCiudad,setClima,limpiarError   
    }

})