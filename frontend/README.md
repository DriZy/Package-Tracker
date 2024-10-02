# Package Tracker Frontend

![Package Tracker Screenshot](../package-tracker.png)

This is the frontend of the **Package Tracker** application, built with Angular 18. The application allows users to manage and track deliveries and packages.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Development Setup](#development-setup)
  - [Production Setup](#production-setup)
- [Running with Docker](#running-with-docker)
  - [Development with Docker](#development-with-docker)
  - [Production with Docker](#production-with-docker)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, view, update, and delete packages and deliveries.
- Track the status of packages in real-time.
- Driver and admin dashboards.
- Role-based authentication (Admin, Driver, Customer).
- WebSocket support for live updates on package status.

## Technologies Used

- **Angular 18**: Framework for building the frontend.
- **SCSS**: CSS pre-processor for enhanced styling.
- **Leaflet**: Library for interactive maps.
- **Docker**: For containerizing the app.
- **Nginx**: Web server for serving production builds.

## Installation

### Development Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/DriZy/Package-Tracker.git
    cd frontend
    ```

2. **Install dependencies**:
   Make sure you have Node.js and npm installed. Then run:
    ```bash
    npm install
    ```

3. **Run the development server**:
    ```bash
    npm start
    ```
   The app will be available at `http://localhost:4200`.

4. **Environment Configuration**:
   Ensure you have the correct API endpoint set in your environment variables. You can configure this in `src/environments/environment.ts`:
    ```typescript
    export const environment = {
      production: false,
      apiUrl: 'http://localhost:3000/api'
    };
    ```

### Production Setup

1. **Build the app**:
    ```bash
    npm run build
    ```
   This will create a `dist` folder with the production-ready application.

2. **Serve the app**:
   You can use a web server like **Nginx** or **Apache** to serve the production files located in the `dist` folder.

   Example for Nginx:
    ```bash
    server {
      listen 80;
      server_name yourdomain.com;

      location / {
        root /path/to/your/app/dist/frontend;
        try_files $uri $uri/ /index.html;
      }
    }
    ```

## Running with Docker

You can run the application in both development and production environments using Docker.

### Development with Docker

1. **Build the Docker image for development**:
    ```bash
    docker build -t package-tracker-frontend-dev --target development .
    ```

2. **Run the development server**:
    ```bash
    docker run -p 4200:4200 package-tracker-frontend-dev
    ```

3. The app will be available at `http://localhost:4200`.

### Production with Docker

1. **Build the Docker image for production**:
    ```bash
    docker build -t package-tracker-frontend-prod --target production .
    ```

2. **Run the production server**:
    ```bash
    docker run -p 80:80 package-tracker-frontend-prod
    ```

3. The app will be available at `http://localhost`.

## Scripts

- `npm start`: Runs the Angular app in development mode.
- `npm run build`: Builds the app for production.
- `npm run test`: Runs the unit tests.
- `npm run lint`: Lints the code for errors.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
