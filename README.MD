# Task Management System - Backend

This is the backend for a Task Management System built using Node.js and Express.

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Endpoints](#endpoints)
- [Database](#database)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before running the application, make sure you have the following software installed on your machine:

- Node.js (v12 or higher)
- npm (Node Package Manager)

### Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/task-management-backend.git
cd task-management-backend
```
2. Install the Dependencies.
```bash
npm install
```

3. Set up Environment Variables:

Create a .env file in the root directory and provide the following environment variables:
```bash
# MySQL database configurations
DB_NAME=todoApp
DB_USER=user
DB_PASSWORD=password
DB_HOST=127.0.0.1
DB_PORT=3306
PORT=8080
# CORS
ALLOWED_ORIGINS=example.com
# Cookies 
COOKIE_SECRET = secret123
## Log Directory
LOG_DIR=./logs
```
`DB_NAME`: The name of your MySQL database.


`DB_USER`: The username for the MySQL database.

`DB_PASSWORD`: The password for the MySQL database user.

`DB_HOST`: The host address where the MySQL database is running (e.g., 127.0.0.1 for localhost).

`DB_PORT`: The port number on which the MySQL database is running (default is 3306).

`PORT`: The port on which the server will run. You can set it to any available port, e.g., 8080.

`ALLOWED_ORIGINS`: A comma-separated list of origins that are allowed to access the backend server via CORS. Replace http://example.com with your actual domain(s) or frontend application URL(s).

`COOKIE_SECRET`: A secret string used for encrypting cookies. Replace secret123 with your preferred secret.

`LOG_DIR`: The directory where log files will be stored. Replace ./logs with the desired directory path.


### Running the Application
To start the backend server, use the following command:
```bash
npm start
```

The server will run on http://localhost:3000 by default. You can change the port in the .env file if needed.

### Endpoints

The following API endpoints are available:

  
GET /api/tasks: Get a list of all tasks.

GET /api/tasks/:id: Get a specific task by its ID.

POST /api/tasks: Create a new task.

PUT /api/tasks/:id: Update a task by its ID.

DELETE /api/tasks/:id: Delete a task by its ID.

GET /api/tasks/:id/completed: Marks task as completed

### Database
 It's recommended to use a proper database (e.g.MySQL, PostgreSQL) to store and manage tasks.


### Testing
To run the tests, use the following command:
```bash
npm test
```

### Contributing 
Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.


Fork the repository on GitHub.

Create a new branch with a descriptive name: git checkout -b feature/your-feature-name.

Make your changes and commit them: git commit -m "Add feature".

Push to the branch: git push origin feature/your-feature-name.

Open a pull request and provide a detailed description of your changes.

### License
This project is licensed under the MIT License - see the LICENSE file for details.
```bash
    In this continuation, we added information about setting up environment variables using a `.env` file to store configuration data. We also included instructions for running tests with `npm test`. Additionally, the sections for "Testing" and "Contributing" were added to provide more information on how to contribute to the project and run tests to ensure the application's correctness. As always, customize the content to match your project's specifics and requirements.
```
