<template>
    <div class="search-bar">
      <input v-model="ciudadInput"
      type="text"
      placeholder="Ingresa una ciudad"
      @keyup="buscarCiudad" />

      <button @click="buscarCiudad">Buscar</button>
    </div>
</template>

<script setup>
    import {ref} from 'vue'
    const ciudadInput = ref('')
    const emit = defineEmits(['buscar'])
    function buscarCiudad(){
        emit('buscar',ciudadInput.value)
    }
</script>

<style scoped>
.search-bar{
    display: flex; gap: 8px; margin-bottom: 16px;
}
    input{
        flex: 1; padding: 10px; border: 2px solid #2b7685; border-radius: 8px;
    }
button{
    background: #2b7685; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;
}
button:hover{
    background: #2563EB;
}
</style>