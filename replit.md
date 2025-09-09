# Overview

This is a modern full-stack event management web application called "Find E-Event" built with a React frontend and Express.js backend. The application allows users to discover, create, and manage events with features like categorization, user favorites, event attendance tracking, and newsletter subscriptions. The frontend uses modern React patterns with TypeScript, shadcn/ui components, and TanStack Query for state management, while the backend provides a RESTful API with PostgreSQL database integration via Drizzle ORM.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side application is built with React 18+ and TypeScript, utilizing a component-based architecture with shadcn/ui design system. The application uses Wouter for lightweight client-side routing and TanStack Query for server state management and caching. The styling is implemented with Tailwind CSS using a comprehensive design token system with CSS variables for theming support. The build process is handled by Vite for fast development and optimized production builds.

## Backend Architecture  
The server follows a REST API architecture built on Express.js with TypeScript. The application uses a layered approach with route handlers, storage abstraction, and schema validation. The storage layer provides an interface-based abstraction that can be implemented with different data stores, though the current setup is configured for PostgreSQL. Route validation is handled using Zod schemas shared between frontend and backend for type safety.

## Database Design
The application uses PostgreSQL as the primary database with Drizzle ORM for type-safe database operations. The schema includes core entities: users (authentication and profiles), categories (event classification), events (main content), event attendees (many-to-many relationship), favorites (user bookmarks), and newsletter subscriptions. The database uses UUID primary keys and includes proper indexing for performance.

## State Management Strategy
The frontend implements a hybrid state management approach using TanStack Query for server state (API data, caching, synchronization) and React's built-in state hooks for local component state. This eliminates the need for complex global state management while providing excellent developer experience with automatic background refetching, optimistic updates, and error handling.

## Component Architecture
The UI follows atomic design principles with shadcn/ui as the base component library. Components are organized into ui (base components), layout (page structure), and feature-specific directories (events). The design system uses CSS variables for consistent theming and supports both light and dark modes. All components are built with accessibility in mind using Radix UI primitives.

## Development Workflow
The application supports full-stack development with hot module replacement via Vite. The development server integrates both frontend and backend, with the Express server serving API routes and Vite handling frontend assets. TypeScript provides end-to-end type safety with shared schemas between client and server.

# External Dependencies

## Database and ORM
- **PostgreSQL**: Primary database with connection via DATABASE_URL environment variable
- **Neon Database**: Serverless PostgreSQL provider (@neondatabase/serverless)
- **Drizzle ORM**: Type-safe database operations with automatic migration support
- **Drizzle Kit**: Database schema management and migration tools

## UI and Styling
- **Radix UI**: Headless component primitives for accessibility and behavior
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **shadcn/ui**: Pre-built component library built on Radix and Tailwind
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Utility for managing component variants

## Frontend Libraries
- **React**: UI library with hooks and modern patterns
- **TanStack Query**: Server state management, caching, and synchronization
- **Wouter**: Lightweight client-side routing
- **React Hook Form**: Form handling with validation
- **date-fns**: Date manipulation and formatting utilities

## Backend Infrastructure
- **Express.js**: Web framework for RESTful API development
- **Zod**: Schema validation library for type-safe data validation
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## Development Tools
- **Vite**: Build tool and development server with HMR
- **TypeScript**: Type system for JavaScript with full-stack type safety
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind integration