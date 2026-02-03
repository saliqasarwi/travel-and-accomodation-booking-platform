# Travel & Accommodation Booking Platform

A modern web application for browsing hotels, booking rooms, and managing reservations.  
Built with **React 19**, **TypeScript**, and a feature-based folder architecture.

## Tech Stack

- **React 19.2** – UI rendering
- **TypeScript** – Static type checking
- **Vite** – Fast development & build tooling
- **React Router** – Client-side routing
- **Formik** – Form state management
- **ESLint + Prettier** – Code quality & formatting
- **Husky + lint-staged** – Pre-commit quality checks
- **Storybook** – Component isolation
- **React Testing Library** – Unit testing

## Requirements

- Node.js 
- npm

Check your versions:
```bash
node -v
npm -v
## Setup Instructions

Clone the repository:Bashgit clone https://github.com/sali.qasarwi/travel-and-accomodation-booking-platform.git
Navigate to the project directory: cd travel-and-accomodation-booking-platform
Install dependencies:npm install
Start the development server:npm run dev
The app will be available at:
http://localhost:5173
## Code Quality Commands
npm run lint          # Check linting issues
npm run lint:fix      # Auto-fix linting issues
npm run format        # Format all files with Prettier
npm run format:check  # Check formatting consistency
## Pre-commit Hooks
This project uses Husky + lint-staged to automatically run ESLint and Prettier on staged files before every commit.
