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
- Giggle Academy-inspired high-contrast design with strategic color accents
- Background: Pure white (0 0% 100%) for clean, professional appearance
- Foreground: Dark gray (0 0% 10%) for maximum legibility and contrast
- Primary: Vibrant yellow (48 95% 50%) for BNB Chain branding (used sparingly)
- Secondary: Saturated blue (210 80% 50%) for interactive elements and accents
- Accent: Dark emerald (165 70% 45%) for emphasis and variety
- Muted: Very light gray (0 0% 96%) for subtle backgrounds and secondary surfaces
- Card: Pure white with subtle borders for elevated surfaces
- Typography: Inter (body), Space Grotesk (headers), JetBrains Mono (technical)
- Design principle: ~90% black/dark text on white/light backgrounds, vibrant colors only for emphasis and states

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

### Transparent Background Assets (Latest - October 7, 2025)
- **Max Rabbit Sticker Variations**: Using 3 different Max character images with transparent backgrounds for visual variety
  - **Max Classic** (`attached_assets/1211_1759804535402.png`): Blue rabbit with yellow shirt, blue overalls, and Giggles logo
  - **Max Red Jacket** (`attached_assets/image-removebg-preview (32)_1759804532428.png`): Max wearing traditional red Chinese jacket
  - **Max BNB Season** (`attached_assets/image-removebg-preview (31)_1759804533638.png`): Max with BNB Season flag
  - All transparent PNGs allow perfect integration on any background
  - 6 stickers total distributed across Max3DViewer with adjusted positioning to prevent overlap
  - Different rotations and opacity levels (18-25%) for dynamic visual variety
  
- **Giggles Academy Logo**: Using authentic Giggles logo with transparent background
  - Asset: `attached_assets/image-removebg-preview (30)_1759804538074.png`
  - Yellow flower-shaped badge with friendly smiling face design
  - Transparent PNG enables seamless overlay on any background color
  - Used as floating decorative elements in Max3DViewer (3 instances) and ChatPanel (2 instances)

### Giggles Academy Integration & Yellow Accents (October 7, 2025)
- **Yellow Contract Address Button**: Changed to vibrant yellow background with dark text for maximum visibility
  - Used primary color (BNB Chain yellow) for brand consistency
  - Dark foreground text ensures WCAG contrast compliance
  - Icon also adapted to dark color for consistency

- **Vibrant Animation Controls**: Enhanced emotion controls with saturated colors
  - Active states: gray-500, blue-500, purple-500, green-500, red-500
  - Scale animation (scale-105) when active for better feedback
  - Stronger shadows (shadow-lg) for depth and emphasis
  - White text on colored backgrounds for legibility

- **Yellow Border Dividers**: Strategic yellow borders for visual hierarchy
  - 4px yellow border between 3D viewer and chat panel (desktop only)
  - ContractAddress card with 4px yellow border
  - Internal sections with yellow accent borders (30-50% opacity)
  - Creates visual contrast aligned with BNB Chain branding

- **Max Rabbit Stickers**: Enhanced decorative elements from Giggles character
  - Asset: `attached_assets/image_1759799065070.png` (blue rabbit with phone)
  - Six stickers placed strategically throughout 3D viewer background
  - Significantly increased sizes (w-28 to w-40) for better visibility
  - Enhanced opacity (20-30%) for more prominent decoration while maintaining subtlety
  - Different rotations and positions for dynamic visual variety
  - `pointer-events-none` ensures no interaction interference

- **Giggles Logo References**: Expanded integration of Giggles Academy branding
  - Asset: `attached_assets/image_1759802470289.png` (improved quality logo)
  - **5 strategic placements** across the interface with enhanced visibility:
    1. StreamHeader: Next to "Max AI" title (h-7 w-7) with "Powered by BNB Chain & Giggles Academy" + "Inspired by Max from Giggles Academy"
    2. ChatPanel header: Large animated logo (h-12 w-12) next to "Live Chat" title
    3. ChatPanel footer: Prominent logo (h-10 w-10) next to message input field
    4. ContractAddress: Logo (h-8 w-8) in Smart Contract Address header
    5. ChatMessages: Dynamically appears (h-5 w-5) in celebration messages
  - Smart detection of positive words (great, awesome, excellent, brilliant, superb, etc.)
  - Animated pulse effect for eye-catching brand presence
  - "Inspired by Max from Giggles Academy" text displayed in header
  
- **Yellow Border Separators**: Enhanced visual hierarchy with horizontal borders
  - 4px yellow border between header and 3D viewer section
  - 4px yellow border between header and chat panel
  - Creates consistent visual separation aligned with BNB Chain branding
  - Complements existing vertical yellow border between 3D viewer and chat

### High-Contrast Design Redesign (October 7, 2025)
- **Professional Logo**: Generated custom Max AI logo featuring robotic rabbit with BNB Chain elements
  - Asset location: `attached_assets/generated_images/Max_AI_robotic_rabbit_logo_439e99f8.png`
  - Integrated into StreamHeader replacing generic Lucide icon
  - Professional branding aligned with blockchain/crypto aesthetic

- **High-Contrast Color System**: Complete redesign following Giggle Academy principle
  - Strategy: Clean white/light backgrounds with dark text for maximum legibility
  - Background: Pure white (0 0% 100%) replacing pastel gradients
  - Foreground: Dark gray (0 0% 10%) for all body text
  - Vibrant colors (yellow, blue, green, red) reserved exclusively for accents and active states
  - Eliminated visual noise from excessive pastel color mixing

- **Component Updates with High Contrast**:
  - **StreamHeader**: White background, dark text, generated logo, yellow accent button
  - **ChatPanel**: White background, dark text, colorful badges only for status (green/red)
  - **ChatMessage**: Light gray (muted) for Max messages, blue for user messages, all with dark text
  - **Max3DViewer**: Subtle gradient background, solid color badges (LIVE/Thinking) with high contrast
  - **AnimationControls**: White buttons with dark text, vibrant colors only when active
  - **ContractAddress**: White card with dark text, green/yellow accents for info sections

- **Design Principles Applied**:
  - 90% of interface uses black/dark gray text on white/light backgrounds
  - Color saturation used sparingly for emphasis (buttons, states, badges)
  - Maximum WCAG contrast ratios for accessibility
  - Strategic use of muted gray (96% lightness) for secondary surfaces
  - Borders and shadows kept subtle for clean, professional appearance

### Previous Updates

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
- Improved status indicators with labeled badges (Online/Offline)
- Better spacing and padding throughout the interface
- Loading states with spinner animation and backdrop blur
- Audio wave visualization for talking/celebrating states