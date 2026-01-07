# MySession (Therapist Portal)

## Overview

MySession is a premium, therapist-led therapy practice companion application. It's a minimalist, dark-themed, mobile-first web app that helps therapists organize sessions, schedules, payments, and client management. The application is built as a polished demo with seeded data and in-memory state, designed to feel like a real production app when navigating between screens.

The design philosophy emphasizes "quiet luxury" - emotionally calm UI with soft gradients, frosted glass surfaces, and modern typography. Language throughout the app uses ordinary, non-clinical vocabulary to maintain warmth while remaining professional.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter for client-side routing with bottom tab navigation on mobile and sidebar on desktop
- **State Management**: TanStack React Query for server state caching and synchronization
- **UI Components**: Shadcn/UI component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom dark theme configuration, featuring frosted glass effects using backdrop-blur and CSS variables for theming

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod schema validation
- **Storage Pattern**: In-memory storage implementation (`MemStorage`) with seeded demo data - designed to work without a real database while maintaining the interface for potential PostgreSQL integration

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect (schema defined for type consistency)
- **Schema Location**: `shared/schema.ts` contains table definitions for clients, sessions, and invoices
- **Validation**: Drizzle-Zod integration for automatic schema-to-validation conversion

### Key Design Patterns
- **Shared Types**: The `shared/` directory contains schemas and route definitions used by both client and server, ensuring type safety across the stack
- **Path Aliases**: TypeScript path aliases configured for clean imports (`@/` for client, `@shared/` for shared code)
- **Demo Mode**: Built-in demo scenario system that triggers pre-scripted changes (reschedule requests, payment received, etc.) to demonstrate app reactivity

### Build System
- **Development**: TSX for running TypeScript directly with hot module replacement via Vite
- **Production**: esbuild bundles the server, Vite builds the client to `dist/public`

## External Dependencies

### Database
- **PostgreSQL**: Configured via `DATABASE_URL` environment variable
- **Connection**: Uses `pg` package with connection pooling
- **Sessions**: `connect-pg-simple` available for session storage

### UI Framework
- **Radix UI**: Complete primitive component library for accessible UI elements
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel functionality
- **Vaul**: Drawer component
- **CMDK**: Command palette component

### Form & Validation
- **React Hook Form**: Form state management with `@hookform/resolvers`
- **Zod**: Runtime type validation and schema definition

### Date Handling
- **date-fns**: Date formatting and manipulation throughout the application

### Development Tools
- **Replit Plugins**: Runtime error overlay, cartographer, and dev banner for Replit environment integration