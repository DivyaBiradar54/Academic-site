# Frontend
## What is React?
React is a JavaScript library for building user interfaces, primarily for single-page applications (SPAs) where dynamic content updates without requiring a full page reload. It was developed by Facebook (now Meta) and is widely used for its component-based architecture, performance optimizations, and ease of development.
## Why Use React in This Project?
1.Component-Based Architecture – React allows developers to create reusable UI components, making the application modular and maintainable.
2.Efficient Rendering – The Virtual DOM optimizes rendering by updating only the necessary components, improving performance.
3.State Management – React provides built-in state management with useState and advanced management with libraries like Redux or Context API.
4.Rich Ecosystem – It integrates well with tools like React Router (for navigation), CSS (for styling), and Axios (for API calls).
5.SEO & Server-Side Rendering (SSR) – Using Next.js (a React framework), we can improve SEO and load times.
## Getting Started with Create React App
First create react the app 
### npx create-react-app my-app
### cd my-app
### npm start
Your app will run on 
#### http://localhost:3000/

## What is the DOM?
The DOM (Document Object Model) represents the structure of a webpage as a tree of elements. JavaScript can manipulate the DOM to change HTML content dynamically.
React uses a Virtual DOM, which is a lightweight copy of the actual DOM. React updates the Virtual DOM first, compares it with the previous version, and only updates the necessary parts of the real DOM. This makes React fast and efficient.

##  Install React and ReactDOM
### npm install react react-dom

### Open src/index.js and check the ReactDOM connection:
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

# Backend
## What is next.js ?
Next.js is a React framework that enables server-side rendering (SSR), static site generation (SSG), and client-side rendering (CSR). It provides an optimized development experience by handling routing, performance, and SEO out of the box.

## Why Use Next.js in This Project?
1.Server-Side Rendering (SSR) – Improves performance by rendering pages on the server before sending them to the client.
2.Static Site Generation (SSG) – Pre-generates pages at build time for faster loading speeds and better SEO.
3.SEO Optimization – Next.js helps with better search engine rankings through pre-rendering and meta tag management.
4.Automatic Routing – Built-in file-based routing system simplifies navigation.
5.API Routes – Allows creating backend API endpoints within the project, eliminating the need for a separate backend.
6.Performance Optimizations – Features like image optimization, lazy loading, and built-in caching make web apps more efficient.

## Install Prisma and MySQL Client
### npm install prisma @prisma/client mysql2
prisma → The Prisma CLI for database management.
@prisma/client → The Prisma client for interacting with the database in a Node.js app.
mysql2 → A MySQL database driver for Node.js, required for Prisma to connect to a MySQL database.

## Initialize Prisma
### npx prisma init
Creates a prisma/ folder with a default schema.prisma file, where you define your database models.
Generates an .env file to store database connection credentials.


## Apply Migrations
### npx prisma migrate dev --name init
migrate dev → Applies database migrations in a development environment.
--name init → Names the migration "init" (initial migration).
This command:
Creates a migrations/ folder inside the prisma/ directory.
Generates SQL migration files based on the schema.
Applies the changes to the connected MySQL database.

# Database
## Install XAMPP
### https://www.apachefriends.org/

## Connect with Phpmyadmin
### http://localhost/phpmyadmin/


