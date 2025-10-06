# Max AI Streaming Platform

## Overview

Max AI is an interactive AI-powered streaming platform featuring a 3D robotic rabbit character named "Max" that responds to user messages in real-time. The application combines live streaming aesthetics with AI chat capabilities, powered by BNB Chain branding and blockchain technology. Users can interact with Max through a chat interface while viewing an animated 3D character display, creating an engaging live-streaming experience similar to platforms like Twitch or YouTube Live.

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

### Backend Architecture

**Server Framework:**
- Express.js server handling HTTP requests and WebSocket connections
- Custom Vite middleware integration for development (HMR support)
- WebSocket server (ws library) for real-time chat communication

**AI Integration:**
- Dual AI provider support: OpenAI (GPT-3.5-turbo) and Anthropic (Claude Haiku)
- Fallback mechanism between providers based on API key availability
- Spanish-language personality: Max is characterized as a friendly robotic rabbit with blockchain knowledge
- Streaming response handling with thinking/speaking state indicators

**Data Layer:**
- Drizzle ORM configured for PostgreSQL database interactions
- Schema definitions for users and chat messages using Zod validation
- In-memory storage implementation (MemStorage) for development/testing
- Migration system through drizzle-kit for schema versioning

**Real-time Communication Flow:**
1. Client sends user message via WebSocket
2. Server broadcasts message to all connected clients
3. Server triggers "thinking" state indicator
4. AI provider generates response (OpenAI or Anthropic)
5. Server broadcasts AI response and "speaking" state
6. Visual feedback displayed to all users

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