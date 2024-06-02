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

#### Create User

- **URL:** `http://localhost:8000/api/user/create`
- **Method:** POST
- **Description:** Creation of a new User, Only users with the admin role can create new users.

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

### Department

#### Create

- **URL:** `http://localhost:8000/api/department`
- **Method:** POST
- **Description:** Allows the creation of a new department. Only users with the admin role can create department.

#### Get List

- **URL:** `http://localhost:8000/api/department`
- **Method:** GET
- **Description:** Retrieves a list of all departments.

#### Get Detail

- **URL:** `http://localhost:8000/api/department/:id`
- **Method:** GET
- **Description:** Retrieves the details of a specific department by its ID.

#### Update

- **URL:** `http://localhost:8000/api/department/:id`
- **Method:** PATCH
- **Description:** Allows updating of department details. Only users with the admin role can update department.

#### Delete

- **URL:** `http://localhost:8000/api/department/:id`
- **Method:** DELETE
- **Description:** Allows deleting of department. Only users with the admin role can delete department.

### Status

#### Create

- **URL:** `http://localhost:8000/api/status`
- **Method:** POST
- **Description:** Allows the creation of a new status. Only users with the admin role can create status.

#### Get List

- **URL:** `http://localhost:8000/api/status`
- **Method:** GET
- **Description:** Retrieves a list of all status.

#### Get Detail

- **URL:** `http://localhost:8000/api/status/:id`
- **Method:** GET
- **Description:** Retrieves the details of a specific status by its ID.

#### Update

- **URL:** `http://localhost:8000/api/status/:id`
- **Method:** PATCH
- **Description:** Allows updating of status details. Only users with the admin role can update status.

#### Delete

- **URL:** `http://localhost:8000/api/status/:id`
- **Method:** DELETE
- **Description:** Allows deleting of status. Only users with the admin role can delete status.
