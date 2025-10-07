# 🎭 Palu AI Streaming Platform

Una plataforma de streaming en vivo con un avatar 3D interactivo de Palu (la mascota oficial de Binance) que funciona como un AI conversacional.

## ✨ Características

- **🎮 Avatar 3D de Palu**: Modelos FBX con múltiples animaciones (idle, talking, thinking, angry, celebrating, etc.)
- **💬 Chat en tiempo real**: Comunicación instantánea vía WebSocket
- **🤖 AI Conversacional**: Integración con OpenAI/Anthropic APIs
- **🎵 Text-to-Speech**: Generación de audio para las respuestas del AI
- **😊 Análisis de emociones**: El avatar cambia de animación según la emoción detectada
- **🔗 Integración BNB Chain**: Conexión de wallet para usuarios
- **🎨 Diseño moderno**: Tema oscuro con acentos amarillos (branding BNB Chain)
- **📱 Responsive**: Optimizado para móvil y desktop

## 🛠 Stack Tecnológico

### Frontend
- **React** + **TypeScript**
- **Three.js** para renderizado 3D
- **TailwindCSS** para estilos
- **Radix UI** + **shadcn/ui** para componentes
- **Wouter** para routing

### Backend
- **Express.js** + **Node.js**
- **WebSocket** para comunicación en tiempo real
- **Drizzle ORM** para base de datos

### 3D & Animaciones
- **Three.js** con modelos FBX
- **@react-three/fiber** y **@react-three/drei**
- Múltiples animaciones por emoción

### AI & Audio
- **OpenAI API** (GPT-3.5-turbo)
- **Anthropic API** (Claude Haiku)
- **OpenAI TTS** para síntesis de voz

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/SolClaude33/paluagent.git
cd paluagent

# Instalar dependencias
npm install

# Configurar variables de entorno (opcional)
# Crear archivo .env con:
# OPENAI_API_KEY=tu_clave_openai
# ANTHROPIC_API_KEY=tu_clave_anthropic

# Ejecutar en desarrollo
npm run dev
```

### Variables de Entorno (Opcional)
```env
OPENAI_API_KEY=tu_clave_openai_aqui
ANTHROPIC_API_KEY=tu_clave_anthropic_aqui
```

Sin estas variables, el chat funcionará con respuestas de fallback.

## 📦 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run start` - Servidor de producción
- `npm run vercel-build` - Build para Vercel
- `npm run check` - Verificación de TypeScript

## 🌐 Deploy

### Vercel (Recomendado)
1. Conectar repositorio a Vercel
2. El archivo `vercel.json` ya está configurado
3. Deploy automático en cada push

### Otros Proveedores
- **Railway**: Compatible con Node.js
- **Render**: Soporte completo para Express + WebSocket
- **Heroku**: Requiere configuración adicional para WebSocket

## 🎮 Uso

1. **Conectar Wallet**: Usa tu wallet BNB Chain para interactuar
2. **Chat en Vivo**: Escribe mensajes y recibe respuestas del AI
3. **Avatar 3D**: Observa las animaciones de Palu según las emociones
4. **Audio**: Escucha las respuestas generadas por TTS

## 🎨 Diseño

- **Tema**: Oscuro con acentos amarillos (BNB Chain branding)
- **Tipografía**: Inter (principal), Space Grotesk (headers)
- **Layout**: 70% avatar 3D / 30% chat en desktop
- **Responsive**: Stack vertical en móvil

## 🔧 Configuración Avanzada

### Modelos 3D
Los modelos FBX están en `/client/public/`:
- `idle.fbx` - Animación por defecto
- `talking.fbx` - Cuando habla
- `thinking.fbx` - Cuando procesa
- `angry.fbx` - Emoción de enojo
- `celebrating.fbx` - Celebración
- `crazy_dance.fbx` - Baile loco
- `confused.fbx` - Confusión

### WebSocket Events
- `user_message` - Mensaje del usuario
- `max_message` - Respuesta del AI
- `max_emotion` - Cambio de emoción
- `viewer_count` - Contador de espectadores

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Binance** por la mascota Palu
- **BNB Chain** por el ecosistema
- **OpenAI** y **Anthropic** por las APIs de AI
- **Three.js** por el motor 3D
- **Vercel** por el hosting

---

⭐ **¡Dale una estrella al repo si te gusta!** ⭐
