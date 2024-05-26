# API Endpoints

## Base URL

http://localhost:8000

## API Endpoints

### Hello World

- **URL:** `http://localhost:8000/api`
- **Method:** GET
- **Description:** Sends a "Hello World" response.

### Authentication

#### Register

- **URL:** `http://localhost:8000/api/user/register`
- **Method:** POST
- **Description:** Registers a new user.

#### Login

- **URL:** `http://localhost:8000/api/user/login`
- **Method:** POST
- **Description:** Logs in an existing user.

#### Logout

- **URL:** `http://localhost:8000/api/user/logout`
- **Method:** POST
- **Description:** Logs out an authenticated user.

#### Refresh Access Token

- **URL:** `http://localhost:8000/api/user/refresh-access-token`
- **Method:** POST
- **Description:** Generates a new access token using a valid refresh token.
