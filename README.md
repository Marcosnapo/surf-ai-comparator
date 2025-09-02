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

Despliegue en la Nube: Arquitectura completamente desplegada en Render, demostrando un ciclo de vida de desarrollo completo.

🛠️ Stack Tecnológico
Área	Tecnología	Justificación
Frontend	React, Vue, Vanilla JS	Sujetos del análisis comparativo.
Backend	Python, FastAPI	Alto rendimiento y facilidad para la creación de APIs asíncronas.
IA	Google Gemini	Capacidad de generación de texto avanzada para las recomendaciones.
Contenerización	Docker	Garantiza un entorno de desarrollo y despliegue consistente y reproducible.
Desarrollo	GitHub Codespaces	Entorno de desarrollo ágil, colaborativo y basado en la nube.
Despliegue	Render	Plataforma PaaS con un excelente soporte para Docker y sitios estáticos en su plan gratuito.

Exportar a Hojas de cálculo
📊 Análisis de Rendimiento y Conclusiones
Se realizaron dos tipos de pruebas para obtener una visión completa del rendimiento de cada framework.

1. Rendimiento de Carga Inicial (Lighthouse)
Se midió la velocidad de la carga inicial de la página desde cero, simulando la primera visita de un usuario.

Métrica	Vanilla JS	React	Vue
Puntuación de Performance	64	68	86
First Contentful Paint (FCP)	4.3 s	3.6 s	2.9 s
**Largest Contentful Paint (LCP)	4.5 s	3.8 s	3.1 s
Total Blocking Time (TBT)	290 ms	440 ms	160 ms

Exportar a Hojas de cálculo
2. Rendimiento en Ejecución (Chrome Performance)
Se midió el tiempo total de trabajo del navegador para actualizar la interfaz después de recibir la respuesta de la API.

Métrica	Vanilla JS	React	Vue
Tiempo de Actualización (Total)	714 ms	856 ms	810 ms

Exportar a Hojas de cálculo
🧠 Conclusiones de Ingeniería
Vue demuestra el mejor equilibrio: Obtuvo la puntuación más alta en la carga inicial gracias a las optimizaciones de su compilador y fue altamente competitivo en la actualización en tiempo real.

Vanilla JS es el rey de la ejecución: Para tareas específicas de manipulación del DOM, la ausencia de capas de abstracción lo convierte en la opción más rápida en tiempo de ejecución.

El "costo" de React es medible: Presentó el mayor Tiempo de Bloqueo (TBT) durante la carga y fue el menos performante en la actualización de la UI, lo que refleja el overhead de su arquitectura de Virtual DOM para esta aplicación específica.

La importancia del "Build Process": El hecho de que Vanilla JS tuviera la peor puntuación de carga inicial subraya que, en el desarrollo web moderno, un proceso de optimización y empaquetado (como el que Vite ofrece a React y Vue) es crucial para el rendimiento.
