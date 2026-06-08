import {defineStore} from 'pinia'
import {ref, reactive, computed} from 'vue'
import {interpretarCodigoClima} from '../services/WeatherService'

export const useWeatherStore = defineStore('weather', () =>{

    const ciudad = ref('Cancun')
    const latitud = ref(27.97)
    const longitud = ref(-86.79)
   // const temperatura = ref(null)
    //const viento = ref(null)
    const cargando = ref(false)
    const error = ref('')
    const codigoClima = ref(null)


//Datos del clima agrupados con reactive
const clima = reactive({
    temperatura: null,
    viento: null,
    codigoClima: 0,
    ultimaActualizacion: null
})
//Historial de ciudades consultadas
const historial = ref([])
    //Computados

const tieneClima = computed(() => clima.temperatura!==null)

    const descripcionClima = computed(()=> {
    if (!tieneClima.value) return 'Sin datos'
    if(clima.temperatura > 35) return 'Muy caluroso'
    if(clima.temperatura > 25) return 'Calido'
    if(clima.temperatura > 15) return 'Templado'
    return 'Frio'
    })

    //computada: Obtener icono segun codigo OpenMeteo
    const iconoClima = computed(()=>{
        return tieneClima.value ? interpretarCodigoClima(clima.codigoClima).emoji : '🌎'
    })

    const tiempoActualizado = computed(()=>{
        if(!clima.ultimaActualizacion){
            return 'Nunca'

            const minutos = Math.floor((Date.now())-clima.ultimaActualizacion) /60000
            if(minutos<1) return 'Hace menos de un minuto'
            if(minutos<60) return `Hace ${minutos} minutos`
            return `Hace ${Math.floor(minutos/60)} horas`
        }
    })


    //Acciones
    function setCiudad(nombre, lat, len){
        ciudad.value=nombre
        latitud.value=lat
        longitud.value=len
    }

    function setClima(temp, vientoKMH, codigo){
        clima.temperatura=temp
        clima.viento=vientoKMH
        clima.codigoClima=codigo
        clima.ultimaActualizacion =Date.now()
    }

    function limpiarError(){
        error.value=''
    }
    //exponer todo lo que van a poder acceder a los ocmponentes 

    return{
        ciudad,latitud,longitud,codigoClima,cargando,error,
        clima,historial,
        tieneClima,descripcionClima,
        iconoClima,tiempoActualizado,
        setCiudad,setClima,limpiarError   
    }

})