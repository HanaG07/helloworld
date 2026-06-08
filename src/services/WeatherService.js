import axios from 'axios';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * obtener clima a partir de las coordenadas dadas.
 * @param {number} lat latitud
 * @param {number} len longitud
 * @param {Promise} < {temperatura:number, viento:number}> }
 */
export async function obtenerClima(lat, len){
    const respuesta = await axios.get(BASE_URL,{
        params:{
            latitude: lat,
            longitude: len,
            current: 'temperature_2m,wind_speed_10m,weather_code',
            timezone: 'auto'
        }
    })
    const {temperature_2m, wind_speed_10m, weather_code} = respuesta.data.current
    console.log(respuesta.status)
    console.log(respuesta.statusText)
    return{
        temperatura: temperature_2m,
        viento: wind_speed_10m,
        codigoClima: weather_code
    }
}

export function interpretarCodigoClima(codigo){
    if(codigo === 0) return {emoji:'☼	', descripcion:'Despejado'}
    if(codigo <= 3) return {emoji:'☁️', descripcion:'Parcialmente nublado'}
    if(codigo <=48) return {emoji:'🌫', descripcion:'Niebla'}
    if(codigo <=67) return {emoji:'🌧', descripcion:'LLuvia'}
    if(codigo <=77) return {emoji:'⛷', descripcion: 'Nieve'}
    if(codigo <=82) return {emoji:'🌧', descripcion: 'Chubasco'}
    return {emoji:'⛈', descripcion: 'Tormenta'}
}