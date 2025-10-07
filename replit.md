# Max AI Streaming Platform

## Overview

Max AI is an interactive AI-powered streaming platform featuring a 3D robotic rabbit character named "Max" that responds to user messages in real-time in English. The application combines live streaming aesthetics with AI chat capabilities, powered by BNB Chain branding and blockchain technology. Users can interact with Max through a chat interface while viewing an animated 3D character display, creating an engaging live-streaming experience similar to platforms like Twitch or YouTube Live. The platform displays the BNB Chain smart contract address with easy copy-to-clipboard functionality for blockchain integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing (alternative to React Router)
- TanStack Query (React Query) for server state management and caching

**UI Component System:**
- Shadcn/ui component library with Radix UI primitives for accessible, unstyled components
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for type-safe component variants
- Custom theming system supporting dark/light modes with BNB Chain brand colors (pastel yellows)

**Design System:**
- Dark-first approach with near-black backgrounds (HSL: 0 0% 8%)
- BNB Chain yellow accent colors (HSL: 48 85% 75%) for primary interactions
- Typography: Inter (body), Space Grotesk (headers), JetBrains Mono (technical)
- Reference-based design inspired by aikotv.com and streaming platforms

**State Management:**
- WebSocket hook for real-time bidirectional communication with AI
- React hooks for local component state
- React Query for API data fetching and caching

**3D Visualization (Max3DViewer):**
- Pure Three.js implementation (vanilla, not React Three Fiber due to Replit environment constraints)
- Multi-model FBX loading system for emotion-based animations:
  - Each FBX file (idle.fbx, talking.fbx, thinking.fbx, angry.fbx, celebrating.fbx) contains a complete model with integrated animation
  - Separate AnimationMixer per model for independent animation control
  - Visibility-based model switching (only active emotion model is visible)
  - Emotion states: idle (default), talking (neutral response), thinking (explanatory), angry (concerned), celebrating (positive/encouraging)
- OrbitControls for interactive camera manipulation (zoom disabled, limited vertical rotation)
- Real-time synchronization with AI emotion state via WebSocket emotion messages
- BNB Chain themed lighting setup with ambient, directional, and colored point lights

### Backend Architecture

**Server Framework:**
- Express.js server handling HTTP requests and WebSocket connections
- Custom Vite middleware integration for development (HMR support)
- WebSocket server (ws library) for real-time chat communication

**AI Integration:**
- Dual AI provider support: OpenAI (GPT-3.5-turbo) and Anthropic (Claude Haiku)
- Fallback mechanism between providers based on API key availability
- English-language personality: Max is characterized as a friendly robotic rabbit with blockchain knowledge
- Emotion-based response system with sentiment analysis:
  - Analyzes AI responses to detect emotional tone
  - Keyword-based detection for celebrating (positive), thinking (explanatory), angry (concerned), talking (neutral)
  - EmotionType shared across frontend/backend via @shared/schema for type safety

**Data Layer:**
- Drizzle ORM configured for PostgreSQL database interactions
- Schema definitions for users and chat messages using Zod validation
- In-memory storage implementation (MemStorage) for development/testing
- Migration system through drizzle-kit for schema versioning

**Real-time Communication Flow:**
1. Client sends user message via WebSocket
2. Server broadcasts user message to all connected clients
3. Server sends 'thinking' emotion state to trigger thinking animation
4. AI provider generates response with sentiment analysis (OpenAI or Anthropic)
5. Server broadcasts emotion metadata (celebrating/thinking/talking/angry) based on response tone
6. Server broadcasts AI message with detected emotion
7. After 3 seconds, server resets to 'idle' emotion state
8. Max3DViewer switches models and animations based on emotion state

### External Dependencies

**AI Services:**
- OpenAI API (GPT-3.5-turbo model) - Primary AI provider requiring `OPENAI_API_KEY`
- Anthropic API (Claude Haiku model) - Secondary AI provider requiring `ANTHROPIC_API_KEY`
- At least one API key must be configured for AI functionality

**Database:**
- PostgreSQL (via Neon serverless driver)
- Connection configured through `DATABASE_URL` environment variable
- Drizzle ORM handles migrations and type-safe queries

**Development Tools:**
- Replit-specific plugins for runtime error handling and development banners
- Cartographer plugin for code navigation in Replit environment

**UI & Styling:**
- Google Fonts: Inter, Space Grotesk, JetBrains Mono
- Radix UI component primitives (20+ component packages)
- Tailwind CSS with PostCSS for processing

**Key Environment Variables Required:**
- `DATABASE_URL` - PostgreSQL connection string
- `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` - AI service authentication
- `NODE_ENV` - Environment mode (development/production)

## Recent Changes (October 2025)

### Language & Localization
- Converted all application content from Spanish to English
- Updated AI personality prompts for English communication
- Translated all error messages, placeholders, and UI text to English

### Features
- Replaced "API Keys" information section with "Contract Address" feature
- Implemented ContractAddress component with clipboard copy functionality
- Displays BNB Chain smart contract address: `0x1234567890ABCDEF1234567890ABCDEF12345678`
- Toast notifications confirm successful copying to clipboard

### UI/UX Enhancements
- Enhanced minimalist design with improved visual hierarchy
- Added subtle shadows and glows to key UI elements (chat panel, 3D viewer)
- Improved status indicators with labeled badges (Online/Offline)
- Enhanced button styles with gradient effects and better hover states
- Better spacing and padding throughout the interface
- Upgraded loading states with spinner animation and backdrop blur
- Improved audio wave visualization with enhanced gradients and container styling