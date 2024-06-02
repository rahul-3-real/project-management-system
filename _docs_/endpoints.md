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

#### Get User Profile

- **URL:** `http://localhost:8000/api/user/profile`
- **Method:** GET
- **Description:** Retrieves the profile information of the authenticated user.

### Role

#### Create

- **URL:** `http://localhost:8000/api/role`
- **Method:** POST
- **Description:** Allows the creation of a new role. Only users with the admin role can create roles.

#### Get List

- **URL:** `http://localhost:8000/api/role`
- **Method:** GET
- **Description:** Retrieves a list of all roles.

#### Get Detail

- **URL:** `http://localhost:8000/api/role/:id`
- **Method:** GET
- **Description:** Retrieves the details of a specific role by its ID.

#### Update

- **URL:** `http://localhost:8000/api/role/:id`
- **Method:** PATCH
- **Description:** Allows updating of role details. Only users with the admin role can update roles.

#### Delete

- **URL:** `http://localhost:8000/api/role/:id`
- **Method:** DELETE
- **Description:** Allows deleting of role. Only users with the admin role can delete roles.
