# Crystals for Kids Web Application

## Overview

This is a full-stack web application for "Crystals for Kids", a nonprofit organization that donates display crystals as visual therapy tools to children in hospitals. The application features:

- A responsive, modern UI built with React and shadcn/ui components
- Server-side rendering and API endpoints with Express
- Database interactions using Drizzle ORM with PostgreSQL
- Contact form submission functionality
- Dark/light theme support

The project uses a single codebase approach with client and server directories. It employs modern TypeScript practices and follows a component-based architecture for the frontend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with React and uses the following key technologies:

- **UI Components**: shadcn/ui components with Tailwind CSS for styling
- **Routing**: wouter for lightweight client-side routing
- **State Management**: 
  - React Query for server state management 
  - React Context for theme management
- **Animations**: Framer Motion for smooth UI animations

The frontend is organized into a component-based structure with:
- Shared components (navbar, footer)
- Page-specific components (home page sections)
- UI components (shadcn component library)

### Backend Architecture

The backend is powered by Express.js and provides:

- API routes for data operations (particularly contact form submissions)
- Server-side rendering of the React application
- Database access layer through Drizzle ORM

### Data Storage

The application uses:
- Drizzle ORM for database interactions
- PostgreSQL as the database (as configured in the Replit environment)
- Schema definitions for users and contact form submissions

### Authentication

The application has user schema definitions, but the current code doesn't implement full authentication features. This could be a potential area for expansion.

## Key Components

### Frontend Components

1. **Layout Components**:
   - `Navbar`: Site navigation with support for mobile responsive design
   - `Footer`: Site footer with links and contact information

2. **Home Page Sections**:
   - `HeroSection`: Main landing area with call-to-action buttons
   - `MissionSection`: Information about the organization's mission
   - `AboutSection`: Details about the organization
   - `GallerySection`: Showcase of crystals with images and descriptions
   - `ImpactSection`: Information about the organization's impact
   - `DonateSection`: Form for donations and contact

3. **UI Components**:
   - Comprehensive set of shadcn/ui components for consistent design
   - Theme toggle for dark/light mode

### Backend Components

1. **API Routes**:
   - `/api/contact`: Endpoint for handling contact form submissions

2. **Database Models**:
   - `users`: User information storage
   - `contacts`: Storage for contact form submissions

3. **Storage Service**:
   - Abstraction layer for database operations
   - Currently includes both in-memory and database implementations

## Data Flow

1. **Contact Form Submission Flow**:
   - User fills out contact form on the frontend
   - Form data is validated using Zod schema
   - Validated data is sent to the `/api/contact` API endpoint 
   - Server validates the data again
   - Data is stored in the database using the storage service
   - Response is sent back to the client
   - Success/error toast notification is displayed to the user

2. **Theme Switching Flow**:
   - User toggles theme via the UI
   - Theme preference is stored in localStorage
   - Theme context updates the application's theme
   - CSS variables change to reflect the selected theme

## External Dependencies

### Frontend Dependencies
- React and React DOM for UI rendering
- wouter for routing
- Tailwind CSS for styling
- Radix UI components (via shadcn/ui)
- React Query for data fetching
- Framer Motion for animations
- Lucide React for icons

### Backend Dependencies
- Express for the web server
- Drizzle ORM for database operations
- Zod for schema validation

## Deployment Strategy

The application is configured for deployment on Replit with:

1. **Development Mode**:
   - Uses `npm run dev` to start the development server
   - Hot module reloading for a better development experience

2. **Production Mode**:
   - Build step: `npm run build` compiles both client and server code
   - Start command: `npm run start` runs the production server

3. **Database Setup**:
   - PostgreSQL is configured as a Replit module
   - Drizzle ORM is used to interact with the database
   - `drizzle-kit push` command updates the database schema

The application exposes port 5000 internally, which is mapped to port 80 externally as defined in the `.replit` configuration.

## Future Enhancement Areas

1. **Authentication**: Implement user authentication using the existing user schema
2. **Payment Processing**: Add donation payment processing functionality
3. **Admin Dashboard**: Create an admin interface to manage contact submissions
4. **Image Upload**: Add functionality for uploading and managing crystal images
5. **Hospital Partner Portal**: Develop a portal for hospital partners to request crystals