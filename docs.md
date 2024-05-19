# Project Management System Documentation

## Data Model Overview

This data model represents a system designed to manage projects, tasks, teams, users, and companies. The schema includes tables for Users, Roles, Departments, Teams, Team Members, Projects, Tasks, Companies, and Statuses.

For a visual representation of the data model, please visit [this link](https://drawsql.app/teams/rahul-yadavs-team-1/diagrams/project-management-system).

_Note: The visual representation of the data model in the provided link is created in reference to an SQL database as it does not support MongoDB. However, the documentation is created for MongoDB._

## Table Descriptions

### 1. User

The User table stores information about the users in the system.

- **\_id** (ObjectId): Unique identifier for each user.
- **first_name** (string): The user's first name.
- **last_name** (string): The user's last name.
- **email** (string): The primary email address of the user.
- **phone** (string): The primary phone number of the user.
- **password** (string): The user's password (should be stored securely, e.g., hashed).
- **avatar** (string): URL to the user's avatar image.
- **email_alt** (string): The alternative email address of the user.
- **phone_alt** (string): The alternative phone number of the user.
- **role** (ObjectId): The role assigned to the user, references Role table.
- **department** (ObjectId): The department the user belongs to, references Departments table.
- **status** (ObjectId): The current status of the user, references Status table.
- **date_joined** (date): The date and time when the user joined the system.
- **last_login** (date): The date and time of the user's last login.

### 2. Role

The Role table defines the various roles that users can have.

- **\_id** (ObjectId): Unique identifier for each role.
- **title** (string): The title of the role.
- **description** (string): A brief description of the role.

### 3. Departments

The Departments table stores information about the different departments in the organization.

- **\_id** (ObjectId): Unique identifier for each department.
- **title** (string): The title of the department.
- **description** (string): A brief description of the department.

### 4. Team

The Team table stores information about different teams.

- **\_id** (ObjectId): Unique identifier for each team.
- **title** (string): The title of the team.
- **description** (string): A brief description of the team.
- **leader** (ObjectId): The leader of the team, references User table.

### 5. Team Members

The Team Members table maps users to teams.

- **\_id** (ObjectId): Unique identifier for each team member entry.
- **team_id** (ObjectId): The ID of the team, references Team table.
- **user_id** (ObjectId): The ID of the user, references User table.

### 6. Project

The Project table stores information about the projects.

- **\_id** (ObjectId): Unique identifier for each project.
- **title** (string): The title of the project.
- **description** (string): A brief description of the project.
- **company** (ObjectId): The company associated with the project, references Company table.
- **start_date** (date): The start date of the project.
- **end_date** (date): The end date of the project.
- **manager_id** (ObjectId): The manager of the project, references User table.
- **team_id** (ObjectId): The team responsible for the project, references Team table.
- **status** (ObjectId): The current status of the project, references Status table.

### 7. Task

The Task table stores information about tasks within projects.

- **\_id** (ObjectId): Unique identifier for each task.
- **project** (ObjectId): The project to which the task belongs, references Project table.
- **title** (string): The title of the task.
- **description** (string): A brief description of the task.
- **created_at** (date): The creation date and time of the task.
- **due_date** (date): The due date and time of the task.
- **status** (ObjectId): The current status of the task, references Status table.
- **assigned_by** (ObjectId): The user who assigned the task, references User table.
- **assigned_to** (ObjectId): The user to whom the task is assigned, references User table.

### 8. Company

The Company table stores information about the companies involved.

- **\_id** (ObjectId): Unique identifier for each company.
- **title** (string): The name of the company.
- **description** (string): A brief description of the company.
- **industry** (string): The industry the company belongs to.
- **website** (string): The company's website URL.
- **email** (string): The primary email address of the company.
- **phone** (string): The primary phone number of the company.
- **email_alt** (string): The alternative email address of the company.
- **phone_alt** (string): The alternative phone number of the company.
- **address** (string): The physical address of the company.

### 9. Status

The Status table defines the various statuses that can be assigned to users, projects, and tasks.

- **\_id** (ObjectId): Unique identifier for each status.
- **title** (string): The title of the status.
- **description** (string): A brief description of the status.

## Relationships

- **User-Role**: A user is assigned a role (role in User references id in Role).
- **User-Department**: A user belongs to a department (department in User references id in Departments).
- **User-Status**: A user has a status (status in User references id in Status).
- **Team-Leader**: A team has a leader (leader in Team references id in User).
- **Team Members**: Users can be members of teams (team_id and user_id in Team Members reference id in Team and User respectively).
- **Project-Company**: A project is associated with a company (company in Project references id in Company).
- **Project-Manager**: A project has a manager (manager_id in Project references id in User).
- **Project-Team**: A project is assigned to a team (team_id in Project references id in Team).
- **Project-Status**: A project has a status (status in Project references id in Status).
- **Task-Project**: A task belongs to a project (project in Task references id in Project).
- **Task-Status**: A task has a status (status in Task references id in Status).
- **Task-AssignedBy**: A task is assigned by a user (assigned_by in Task references id in User).
- **Task-AssignedTo**: A task is assigned to a user (assigned_to in Task references id in User).

This documentation outlines the structure and relationships of the database, helping to understand how different entities interact within the system.
