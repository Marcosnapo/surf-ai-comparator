🏄‍♂️ Surf AI Comparator: Un Análisis Cuantitativo de Rendimiento Frontend

📖 Resumen del Proyecto

Este proyecto es un estudio de ingeniería de software diseñado para medir, analizar y comparar objetivamente el rendimiento de tres enfoques de desarrollo frontend: Vanilla JS, React y Vue.

Para lograr una comparación justa, se desarrolló una aplicación full-stack idéntica para cada tecnología. La aplicación consume un backend en Python que se conecta a una API de Inteligencia Artificial (Google Gemini) para generar recomendaciones de surf basadas en las condiciones meteorológicas.

El objetivo principal no es la aplicación en sí, sino el análisis de datos de rendimiento extraídos de herramientas de desarrollo profesionales, con el fin de entender los trade-offs (compensaciones) de cada tecnología en un entorno real.

✨ Características Principales

Interfaz Triple: Tres versiones del frontend con idéntica funcionalidad, desarrolladas en Vanilla JS, React y Vue.

Backend Robusto: Una API RESTful construida con FastAPI y servida en un entorno containerizado con Docker.

Inteligencia Artificial: Integración con la API de Google Gemini para generar contenido dinámico y relevante.

Análisis de Rendimiento Profundo: Informes detallados utilizando Lighthouse y el panel de Performance de Chrome DevTools.


📊 Análisis de Rendimiento y Conclusiones
Se realizaron dos tipos de pruebas para obtener una visión completa del rendimiento de cada framework.

1. Rendimiento de Carga Inicial (Lighthouse)
Se midió la velocidad de la carga inicial de la página desde cero, simulando la primera visita de un usuario.


2. Rendimiento en Ejecución (Chrome Performance)
Se midió el tiempo total de trabajo del navegador para actualizar la interfaz después de recibir la respuesta de la API.

Métrica	                        vanilla	React	 Vue
Tiempo de Actualización (Total)	714 ms	856 ms	810 ms


🧠 Conclusiones de Ingeniería
Vue demuestra el mejor equilibrio: Obtuvo la puntuación más alta en la carga inicial gracias a las optimizaciones de su compilador y fue altamente competitivo en la actualización en tiempo real.

Vanilla JS es el rey de la ejecución: Para tareas específicas de manipulación del DOM, la ausencia de capas de abstracción lo convierte en la opción más rápida en tiempo de ejecución.

El "costo" de React es medible: Presentó el mayor Tiempo de Bloqueo (TBT) durante la carga y fue el menos performante en la actualización de la UI, lo que refleja el overhead de su arquitectura de Virtual DOM para esta aplicación específica.

La importancia del "Build Process": El hecho de que Vanilla JS tuviera la peor puntuación de carga inicial subraya que, en el desarrollo web moderno, un proceso de optimización y empaquetado (como el que Vite ofrece a React y Vue) es crucial para el rendimiento.


⚙️ Cómo Ejecutar el Proyecto Localmente

Para clonar y ejecutar este proyecto en tu propio entorno:

Clona el repositorio:

Bash

git clone https://github.com/Marcosnapo/surf-ai-comparator.git
cd surf-ai-comparator
Configura las variables de entorno:

Crea un archivo llamado .env dentro de la carpeta backend.

Añade tu clave de API de Google: GOOGLE_API_KEY="TU_API_KEY_AQUI"

Levanta el backend con Docker:

Bash

cd backend
docker-compose up --build
La API estará disponible en http://localhost:8000.

Ejecuta los frontends:

Para Vanilla JS:

Bash

# (Necesitas tener 'serve' instalado: npm install -g serve)
cd frontend-vanilla
serve .
Para React o Vue:

Bash

# cd frontend-react O cd frontend-vue
npm install
npm run dev
