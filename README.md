## Overview

This project is a Task Manager application built with React, Redux Toolkit, React Router, and Tailwind CSS.
It was developed as part of the Frontend Programming final exam to demonstrate modern React concepts,
state management, role-based authentication, asynchronous API integration, and reusable UI components.

## Setup

Clone or download the repository, then run:

npm install
npm run dev

The app will be available at [http://localhost:5173](http://localhost:5173/).

Test accounts:

- Admin → username: admin, password: admin123
- User → username: user, password: user123

## Features

- Tasks
    - List of tasks with search, filters (all/completed/pending), and client-side pagination
    - Task detail page at /task/:id
    - Add, Edit, and Delete tasks with validation
    - Loading spinners during API calls
- Authentication
    - Fake login system with two roles: admin and user
    - Protected routes for profile and admin dashboard
- Users
    - Profile page for updating username
    - Admin dashboard to manage users (add, delete, assign roles)
- Styling
    - Responsive UI with Tailwind CSS
    - Dark mode toggle
    - Colored status badges for tasks

## Tech

- React 18 (JavaScript + SWC, via Vite)
- Redux Toolkit for global state
- Redux Thunk for async actions
- React Router for navigation and dynamic routes
- Tailwind CSS for responsive styling
- JSONPlaceholder API for fetching tasks
