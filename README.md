# Package-Tracker
A MEAN stack-based package tracking web application with real-time updates, user roles (customer, driver, admin), and REST APIs, utilizing Docker for containerization and Jasmine for back-end testing.

## Table of Contents

1. [Backend](#backend)
2. [Frontend](#frontend)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)



## Frontend

### Angular Delivery Tracking System

This project is an **Angular 18** application that tracks deliveries for drivers. It features real-time updates using **WebSockets**, role-based routing for drivers, and an admin dashboard for managing packages and deliveries. The app dynamically updates delivery statuses and logs timestamp events for critical actions like `Picked Up`, `In Transit`, and `Delivered`.


### Features

- **Role-based Authentication**: Driver, Admin, and Customer roles with different views and functionalities.
- **Real-time Delivery Status Updates**: Live tracking using WebSockets for location and status changes.
- **Delivery Status Management**: Change delivery statuses (`Picked Up`, `In Transit`, `Delivered`, `Failed`) with timestamps.
- **Package Management**: Admins can create, edit, and delete packages and deliveries.
- **Geolocation**: Use browser-based geolocation to track driver movements.
- **Responsive UI**: Built with SCSS for responsive and clean UI.

### Getting Started

#### Prerequisites

Make sure you have the following installed:

- **Node.js** (>= v16)
- **npm** (>= v7)
- **Angular CLI** (for development purposes)
- **Docker** (for production and containerization)
- **Backend API** for handling deliveries (can be built with Node.js, Firebase, or other backend solutions)


## Setup and Installation

1. **Clone the repository**:

   ```
   git clone https://github.com/DriZy/Package-Tracker.git
   cd frontend
    ```
2. **Install dependencies:**:

   ```
   npm install
   ```
   
3. **Set up environment variables**:

   Modify the environment variables in the `frontend/src/environment.ts` file and add the following environment variables:

   ```
   API_URL=http://localhost:3000/api
   WEBSOCKET_URL=ws://localhost:3000
    ```
4. **Start the development server**:
   ```
   npm start
   ```
5. **Build the production app**:
   ```
    npm run build
    ```
6. **Docker Setup**:
7. **Build the Docker image**:
   ```
   docker build -t image_name .
   ```
8. **Run the container**:
   ```
    docker run -p 4200 image_name
    ```
The app will now be available at http://localhost:4200.

**Production Build**:

To create a production build, run:

```
cd frontend
npm run build
```
The build artifacts will be stored in the dist/ directory. You can deploy these files using any static hosting service (e.g., Firebase Hosting, Netlify).

**Docker Setup:**

To run the application in Docker:

Build the Docker image:

```
docker build -t image_name .
```
Run the container:

```
docker run -p 8080:80 image_name
```
The app will now be available at http://localhost:8080.

## Project Structure
The project is structured as follows:

## Technologies Used
- **Node.js:** Server-side JavaScript runtime.
- **Express.js:** Web framework for building the REST API.
- **MongoDB:** NoSQL database for storing packages and deliveries.
- **JWT:** Authentication and role-based authorization.
- **WebSockets:** Real-time communication for location and status updates.
- **TypeScript:** Strong typing for Node.js and JavaScript.
- **Jest:** Testing framework.
- **Docker:** Containerization for easy deployment and testing.
- **Angular 18 (Standalone Components)**: Modern Angular framework with standalone component architecture.
- **WebSockets**: Real-time updates for delivery tracking.
- **Leaflet.js**: Interactive maps for delivery locations.
- **SCSS**: Styling with modern CSS features.
- **RxJS**: Reactive programming for handling WebSocket events.