# CopterCode Website

This is a comprehensive, responsive React application for CopterCode, built with Vite and Tailwind CSS.

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    ```

## Project Structure

-   `src/components`: Reusable UI components (Hero, Navbar, Footer, etc.)
-   `src/pages`: Page components (Home, About, Services, etc.)
-   `src/layouts`: Layout wrappers
-   `public/assets`: Static assets (images, videos, documents)

## Tech Stack

-   React
-   Vite
-   Tailwind CSS
-   Framer Motion (Animations)
-   Lucide React (Icons)
-   React Router DOM

## SEO

SEO meta tags are managed via the `SEO` component in `src/components/SEO.jsx`. Each page automatically updates the document title and meta description.

## Assets

All assets are located in `public/assets`. The project is configured to reference them relative to the root path (e.g., `/assets/logo.png`).
