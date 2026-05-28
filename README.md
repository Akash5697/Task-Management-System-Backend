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
