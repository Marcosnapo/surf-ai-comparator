// 1. Seleccionar los elementos importantes del HTML
const form = document.getElementById('surf-form');
const responseContainer = document.getElementById('response-container');
const loadingSpinner = document.getElementById('loading-spinner');

// 2. La URL de tu backend público en Codespaces
const API_URL = 'https://super-funicular-pj6vp95wpxj9c99q-8000.app.github.dev/';

// 3. Escuchar el envío del formulario
form.addEventListener('submit', async (event) => {
    // Evita que la página se recargue al enviar el formulario
    event.preventDefault();

    // Mostrar el spinner y ocultar respuestas anteriores
    loadingSpinner.classList.remove('hidden');
    responseContainer.classList.add('hidden');

    // Recolectar los datos seleccionados por el usuario
    const formData = new FormData(form);
    const requestData = {
        wave_size: formData.get('wave-size'),
        wind_condition: formData.get('wind-condition'),
        advice_type: formData.get('advice-type')
    };

    try {
        // Enviar los datos al backend usando fetch
        const response = await fetch(`${API_URL}api/surf-recommendation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        // Si la respuesta del servidor no es exitosa (ej: error 500), lanzar un error
        if (!response.ok) {
            throw new Error('La respuesta del servidor no fue exitosa');
        }

        // Convertir la respuesta del backend a un objeto JSON
        const aiResponse = await response.json();
        
        // Llamar a la función para mostrar los datos en la página
        displayResponse(aiResponse);

    } catch (error) {
        // Si algo falla en el bloque 'try', mostrar un error en la consola y en la página
        console.error('Hubo un error:', error);
        responseContainer.innerHTML = '<p>Lo siento, ocurrió un error al contactar al Surf Guru. Inténtalo de nuevo.</p>';
    
    } finally {
        // Este bloque se ejecuta siempre, haya error o no
        // Ocultar el spinner y mostrar el contenedor de la respuesta
        loadingSpinner.classList.add('hidden');
        responseContainer.classList.remove('hidden');
    }
});

// 4. Función auxiliar para mostrar los datos en el HTML
function displayResponse(data) {
    document.getElementById('recommendation-text').textContent = data.recomendacion;
    document.getElementById('explanation-text').textContent = data.explicacion;

    const tipsList = document.getElementById('tips-list');
    tipsList.innerHTML = ''; // Limpiar la lista de tips anteriores
    
    // Crear un elemento <li> por cada tip en la lista y añadirlo a la página
    data.tips.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        tipsList.appendChild(li);
    });
}