<script setup>
import { ref } from 'vue';

// --- 1. ESTADOS REACTIVOS ---
// 'ref' es el equivalente de Vue a 'useState' de React.
// Crea una "caja" reactiva que Vue observa para actualizar la vista.
const formData = ref({
  wave_size: 'Pequeñas',
  wind_condition: 'Sin viento',
  advice_type: 'Análisis Rápido',
});
const aiResponse = ref(null);
const isLoading = ref(false);
const error = ref(null);

// La URL de tu backend. ¡Asegúrate de que sea la correcta!
const API_URL = 'https://super-funicular-pj6vp95wpxj9c99q-8000.app.github.dev/';

// --- 2. FUNCIÓN DE ENVÍO ---
const handleSubmit = async () => {
  isLoading.value = true;
  error.value = null;
  aiResponse.value = null;

  try {
    const response = await fetch(`${API_URL}api/surf-recommendation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData.value), // Enviamos el valor del 'ref'
    });

    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status}`);
    }

    aiResponse.value = await response.json(); // Guardamos la respuesta en el 'ref'
  } catch (err) {
    error.value = 'Lo siento, ocurrió un error al contactar al Surf Guru.';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <main class="container">
    <h1>Surf AI Advisor 🏄</h1>
    <p>Vue Version</p>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="wave-size">Tamaño de la Ola:</label>
        <select id="wave-size" name="wave-size" v-model="formData.wave_size">
          <option value="Pequeñas">Pequeñas</option>
          <option value="Medianas">Medianas</option>
          <option value="Grandes">Grandes</option>
        </select>
      </div>

      <div class="form-group">
        <label for="wind-condition">Condición del Viento:</label>
        <select id="wind-condition" name="wind-condition" v-model="formData.wind_condition">
          <option value="Sin viento">Sin viento</option>
          <option value="Suave">Suave</option>
          <option value="Fuerte">Fuerte</option>
        </select>
      </div>

      <div class="form-group">
        <label for="advice-type">Tipo de Consejo:</label>
        <select id="advice-type" name="advice-type" v-model="formData.advice_type">
          <option value="Análisis Rápido">Análisis Rápido</option>
          <option value="Consejos Técnicos">Consejos Técnicos</option>
          <option value="Plan de Seguridad">Plan de Seguridad</option>
        </select>
      </div>

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Pensando...' : 'Obtener Recomendación' }}
      </button>
    </form>

    <div v-if="isLoading" class="loading-spinner"></div>

    <p v-if="error" class="error-message">{{ error }}</p>

    <article v-if="aiResponse" class="response-container">
      <h2>Recomendación del Guru:</h2>
      <p>{{ aiResponse.recomendacion }}</p>
      <h3>Explicación:</h3>
      <p>{{ aiResponse.explicacion }}</p>
      <h3>Tips:</h3>
      <ul>
        <li v-for="(tip, index) in aiResponse.tips" :key="index">
          {{ tip }}
        </li>
      </ul>
    </article>
  </main>
</template>

<style scoped>
/* Estilos Globales (inyectados desde el componente) */
:global(body) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background-color: #f4f7f6;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
}

/* Estilos del Componente */
.container {
    background-color: white;
    padding: 2rem 3rem;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    width: 100%;
    max-width: 500px;
    text-align: center;
}

h1 {
    color: #1a2a3a;
    margin-bottom: 0.5rem;
}

.container p {
    color: #666;
    margin-top: 0;
}

form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 2rem;
}

.form-group {
    text-align: left;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #444;
}

select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    background-color: #fff;
}

button {
    background-color: #007aff;
    color: white;
    border: none;
    padding: 1rem;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
}

button:hover {
    background-color: #0056b3;
}

.hidden {
    display: none;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #007aff;
  margin: 2rem auto;
  animation: spin 1s ease infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  color: #d32f2f;
  background-color: #ffcdd2;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1.5rem;
}

.response-container {
    margin-top: 2rem;
    text-align: left;
    padding: 1.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #fafafa;
}
</style>