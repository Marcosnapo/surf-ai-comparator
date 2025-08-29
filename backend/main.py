import os
import json
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# --- Carga y Configuración de la API Key ---
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise ValueError("No se encontró la GOOGLE_API_KEY en el archivo .env")

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash-latest')


# --- Definición del Modelo de Datos de Entrada ---
class SurfRequest(BaseModel):
    wave_size: str
    wind_condition: str
    advice_type: str


# --- Creación y Configuración de la App FastAPI ---
app = FastAPI()

# --- Bloque CORS Robusto ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite cualquier origen
    allow_credentials=True,
    allow_methods=["*"],  # Permite cualquier método (incluido OPTIONS)
    allow_headers=["*"],  # Permite cualquier cabecera
)
@app.post("/api/surf-recommendation")
async def get_surf_recommendation(request: SurfRequest):
    prompt = f"""
    Eres un 'Surf Guru', un asistente experto en surf con un tono amigable y alentador.
    Analiza las siguientes condiciones:
    - Tamaño de ola: {request.wave_size}
    - Condición del viento: {request.wind_condition}
    Basado en esto, genera una respuesta de tipo '{request.advice_type}'.
    Responde únicamente en un formato JSON como este, sin añadir nada más antes o después:
    {{
      "recomendacion": "Una frase corta y directa.",
      "explicacion": "Un párrafo breve explicando el porqué de la recomendación.",
      "tips": [
        "Un consejo de apoyo relacionado a las condiciones.",
        "Otro consejo útil.",
        "Un último tip para motivar."
      ]
    }}
    """
    try:
        # Llamamos a la IA con el prompt que creamos
        response = model.generate_content(prompt)
        
        # --- Limpieza de la respuesta ---
        # 1. Quita los caracteres extra de "bloque de código"
        cleaned_text = response.text.strip().replace('```json', '').replace('```', '')
        
        # 2. Convierte el texto limpio a un diccionario de Python
        ai_response_dict = json.loads(cleaned_text)
        
        # 3. Devuelve el diccionario
        return ai_response_dict
        
    except Exception as e:
        # Si algo sale mal (incluido un error al convertir a JSON), enviamos un error
        error_message = f"Error procesando la respuesta de la IA: {str(e)}"
        print(error_message) # Imprime el error en la terminal del backend para depurar
        print("Respuesta recibida de la IA:", response.text) # Imprime la respuesta cruda
        raise HTTPException(status_code=500, detail=error_message)