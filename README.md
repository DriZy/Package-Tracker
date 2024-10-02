# Package-Tracker
A MEAN stack-based package tracking web application with real-time updates, user roles (customer, driver, admin), and REST APIs, utilizing Docker for containerization and Jasmine for back-end testing.
## Backend

This project implements the backend for a Package Tracking web application using the **MEAN stack (MongoDB, Express, Angular, Node.js)**. It handles package and delivery management via a **REST API**, supports **real-time updates** via **WebSockets**, and provides **JWT-based authentication** for different roles (Customer, Driver, Admin).

### Features

- **RESTful API** to manage packages and deliveries:
    - Full **CRUD operations** for `Package` and `Delivery` entities.
    - **User authentication** with **JWT**, supporting roles (Customer, Driver, Admin).
- **WebSockets** for real-time updates:
    - Delivery status and location updates.
    - Broadcast events for delivery changes.
- **Role-based access control** for Customers, Drivers, and Admins.
- **MongoDB** for flexible data management.
- **Test Coverage** using **Jest** for unit and integration tests.
- **Dockerized Environment** using **Docker Compose** for easy deployment.

### Project Structure

### Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Setup Instructions

1. Clone the repository:

   ```
   git clone https://github.com/your-username/package-tracking-backend.git
   cd package-tracking-backend
   
2. Install the dependencies:

    ```
    npm install
    ```
   
3. Set up the environment variables:

   Create a `.env` file in the root directory and add the following environment variables:

   ```
   PORT=3000
   MONGODB_URI=mongodb://mongo:27017/package-tracker
   JWT_SECRET=your-secret-key
   ```
   
4. Start the server

   docker environment: 
    ``` 
    docker compose up --build
    ```
    node environment :
    ```
     npm run start
    ```

### API Endpoints
#### Authentication
- **POST /api/users/signup**: Register a new user returns JWT token and user.
- **POST /api/users/login**: Login returns JWT token and user.

#### Packages
- **GET /api/packages**: Get all packages required **token**.
- **GET /api/packages/:id**: Get a package by ID required **token**.
- **POST /api/packages/new**: Create a new package required **token**.
- **PUT /api/packages/:id**: Update a package required **token**.
- **DELETE /api/packages/:id**: Delete a package required **token**.

#### Deliveries
- **GET /api/deliveries**: Get all deliveries required **token**.
- **GET /api/deliveries/:id**: Get a delivery by ID required **token**.
- **POST /api/deliveries/new**: Create a new delivery required **token**.
- **PUT /api/deliveries/:id**: Update a delivery required **token**.
- **DELETE /api/deliveries/:id**: Delete a delivery required **token**.

#### WebSocket Events
- **connection**: Establish a WebSocket connection.
- **disconnect**: Close a WebSocket connection.
- **delivery_updated**: Update delivery details.

### Running Tests
The project uses Jest for testing.

#### Run tests: 

docker environment:
``` 
 docker exec -it container_name npm run test
```
node environment :
```
 npm run test
```


### Docker Setup
The project includes a Dockerfile and docker-compose.yml for containerization.

To run the application using Docker:

#### Build and run the containers:

```
docker-compose up --build
```
Access the app at 
```
 http://localhost:3000.
```

## Frontend

# Angular Delivery Tracking System

This project is an **Angular 18** application that tracks deliveries for drivers. It features real-time updates using **WebSockets**, role-based routing for drivers, and an admin dashboard for managing packages and deliveries. The app dynamically updates delivery statuses and logs timestamp events for critical actions like `Picked Up`, `In Transit`, and `Delivered`.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
4. [Project Structure](#project-structure)
5. [Setup and Installation](#setup-and-installation)
6. [Running the Application](#running-the-application)
7. [API Integration](#api-integration)
8. [WebSocket Integration](#websocket-integration)
9. [Usage](#usage)
10. [Development Guidelines](#development-guidelines)
11. [Contributing](#contributing)
12. [License](#license)

## Features

- **Role-based Authentication**: Driver, Admin, and Customer roles with different views and functionalities.
- **Real-time Delivery Status Updates**: Live tracking using WebSockets for location and status changes.
- **Delivery Status Management**: Change delivery statuses (`Picked Up`, `In Transit`, `Delivered`, `Failed`) with timestamps.
- **Package Management**: Admins can create, edit, and delete packages and deliveries.
- **Geolocation**: Use browser-based geolocation to track driver movements.
- **Responsive UI**: Built with SCSS for responsive and clean UI.

## Technologies Used


## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (>= v16)
- **npm** (>= v7)
- **Angular CLI** (for development purposes)
- **Docker** (for production and containerization)
- **Backend API** for handling deliveries (can be built with Node.js, Firebase, or other backend solutions)

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