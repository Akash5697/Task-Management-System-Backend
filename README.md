Environment Variables
Create a .env file in the root directory.

Installation & Setup
1. Clone Repository
git clone <your_repository_url(from production Breanch)>

2. Install Dependencies
npm install

3. Setup Environment Variables
Create a .env file and add:
MONGO_URI=mongodb://127.0.0.1:27017/task-management
JWT_SECRET=change_this_to_a_secure_secret
PORT=4000

Production Start
npm start 

Default Backend URL
http://localhost:4000


BackEnd Architecture Explanation
---------------------------------------------
The backend is a Node.js + Express + MongoDB app.
It follows a simple layered structure:
Routes → Controllers → Services → Models
Shared cross-cutting logic lives in middleware and config.
Main Layers

backend/index.js:1
Starts the server
Connects to MongoDB
Registers API routes

backend/routes/*.js:1
Defines endpoints like auth, admin, employee, manager/tasks
Applies auth and role checks where needed

backend/controllers/*.js:1
Handles request/response objects
Calls service functions
Returns JSON and HTTP status codes

backend/services/*.js:1
Contains business logic
Handles user creation, login, task CRUD, role updates, statistics, etc.
backend/models/*.js:1

Mongoose schemas for User and Task
Enforces DB structure and constraints

backend/middleware/*.js:1
auth verifies JWT and loads the current user
roles enforces role-based access like Admin / Manager / Employee

backend/config/db.js:1
Handles MongoDB connection setup
Request Flow

Client sends request to a route
Route checks auth/role middleware
Controller receives the request
Controller calls the service layer
Service talks to MongoDB through models
Response is sent back as JSON
Security / Access

Authentication uses JWT
Roles are enforced for:
Admin
Manager
Employee
Admin can manage users and view stats
Manager can manage tasks and assign employees
Employee can view assigned tasks and update task status
