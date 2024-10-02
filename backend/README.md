
## Running the Project

### 1. Run with Docker

To run the backend with **Docker**, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/package-tracking-backend.git
    cd package-tracking-backend
    ```

2. Ensure you have Docker and Docker Compose installed.

3. Build and run the Docker containers:
    ```bash
    docker-compose up --build
    ```

4. Once the build is complete, the backend will be running at `http://localhost:3000` and connected to a MongoDB instance running in a container.

5. To stop the containers, run:
    ```bash
    docker-compose down
    ```

### 2. Run with Node.js (Bare Metal)

To run the backend without Docker, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/package-tracking-backend.git
    cd package-tracking-backend
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Ensure MongoDB is running locally or update the `MONGO_URI` in the `.env` file to point to your MongoDB instance.

4. Run the application:
    ```bash
    npm run dev
    ```

5. The backend will be running at `http://localhost:3000`.

## API Endpoints

### Authentication

- **POST** `/api/users/signup`: Register a new user.
- **POST** `/api/users/login`: Login and retrieve a JWT token.

### Packages (Requires Authentication)

- **GET** `/api/packages`: Get all packages.
- **GET** `/api/packages/:id`: Get a package by ID.
- **POST** `/api/packages`: Create a new package.
- **PUT** `/api/packages/:id`: Update a package.
- **DELETE** `/api/packages/:id`: Delete a package.

### Deliveries (Requires Authentication)

- **GET** `/api/deliveries`: Get all deliveries.
- **GET** `/api/deliveries/:id`: Get a delivery by ID.
- **POST** `/api/deliveries`: Create a new delivery.
- **PUT** `/api/deliveries/:id`: Update a delivery.
- **DELETE** `/api/deliveries/:id`: Delete a delivery.

### WebSocket Events 

- **location_changed**: Update delivery location.
- **status_changed**: Update delivery status.

## Running Tests

The project uses **Jest** for testing.

1. Run tests:
    ```bash
    npm test
    ```

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building the REST API.
- **MongoDB**: NoSQL database for storing packages and deliveries.
- **JWT**: Authentication and role-based authorization.
- **WebSockets**: Real-time communication for location and status updates.
- **TypeScript**: Strong typing for Node.js and JavaScript.
- **Jest**: Testing framework.
- **Docker**: Containerization for easy deployment and testing.

## Contribution

Feel free to submit issues and pull requests to improve this project. Contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
