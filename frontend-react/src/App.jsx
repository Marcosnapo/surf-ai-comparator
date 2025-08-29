import { useState } from 'react';
import './App.css';

// La URL de tu backend. ¡Asegúrate de que sea la correcta!
const API_URL = 'https://super-funicular-pj6vp95wpxj9c99q-8000.app.github.dev/';

function App() {
  // --- 1. ESTADOS ---
  // Para guardar los datos del formulario
  const [formData, setFormData] = useState({
    wave_size: 'Pequeñas',
    wind_condition: 'Sin viento',
    advice_type: 'Análisis Rápido',
  });
  // Para guardar la respuesta de la IA
  const [aiResponse, setAiResponse] = useState(null);
  // Para saber si estamos esperando una respuesta
  const [isLoading, setIsLoading] = useState(false);
  // Para guardar cualquier error
  const [error, setError] = useState(null);

  // --- 2. MANEJADORES DE EVENTOS ---
  // Se ejecuta cada vez que el usuario cambia una opción del formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Se ejecuta cuando el usuario envía el formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que la página se recargue
    setIsLoading(true); // Muestra el spinner
    setError(null); // Limpia errores anteriores
    setAiResponse(null); // Limpia respuestas anteriores

    try {
      const response = await fetch(`${API_URL}api/surf-recommendation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();
      setAiResponse(data); // Guarda la respuesta de la IA en el estado
    } catch (err) {
      setError('Lo siento, ocurrió un error al contactar al Surf Guru.'); // Guarda el error
      console.error(err);
    } finally {
      setIsLoading(false); // Oculta el spinner
    }
  };

  // --- 3. RENDERIZADO (JSX) ---
  return (
    <main className="container">
      <h1>Surf AI Advisor 🏄</h1>
      <p>React Version</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="wave-size">Tamaño de la Ola:</label>
          <select id="wave-size" name="wave-size" value={formData.wave_size} onChange={handleChange}>
            <option value="Pequeñas">Pequeñas</option>
            <option value="Medianas">Medianas</option>
            <option value="Grandes">Grandes</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="wind-condition">Condición del Viento:</label>
          <select id="wind-condition" name="wind-condition" value={formData.wind_condition} onChange={handleChange}>
            <option value="Sin viento">Sin viento</option>
            <option value="Suave">Suave</option>
            <option value="Fuerte">Fuerte</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="advice-type">Tipo de Consejo:</label>
          <select id="advice-type" name="advice-type" value={formData.advice_type} onChange={handleChange}>
            <option value="Análisis Rápido">Análisis Rápido</option>
            <option value="Consejos Técnicos">Consejos Técnicos</option>
            <option value="Plan de Seguridad">Plan de Seguridad</option>
          </select>
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Pensando...' : 'Obtener Recomendación'}
        </button>
      </form>

      {/* Renderizado condicional */}
      {isLoading && <div className="loading-spinner"></div>}

      {error && <p className="error-message">{error}</p>}

      {aiResponse && (
        <article className="response-container">
          <h2>Recomendación del Guru:</h2>
          <p>{aiResponse.recomendacion}</p>
          <h3>Explicación:</h3>
          <p>{aiResponse.explicacion}</p>
          <h3>Tips:</h3>
          <ul>
            {aiResponse.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </article>
      )}
    </main>
  );
}

export default App;