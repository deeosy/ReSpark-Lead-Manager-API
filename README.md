Lead Manager
This application can be used to manage Leads, it was built with a Node.js/Express backend and a React/Vite frontend. 
Create and view leads with details like name, email, status, and creation date. The backend is hosted on Render, the frontend on Netlify, and data is stored in MongoDB Atlas.

Local Setup
You’ll need Node.js, Yarn, and MongoDB (Atlas) to run this locally.

Backend

Go to the backend folder:cd backend

Install dependencies:yarn install


Create a .env file with:MONGO_DB=<your-mongodb-connection-string>
PORT=4004
FRONTEND_URL=http://localhost:5173 ( or http://localhost:5174)

Start the backend:yarn dev



Frontend

Go to the frontend folder:cd frontend

Install dependencies:yarn install

Create a .env file with:VITE_API_URL=http://localhost:4004/api/leads


Start the frontend:yarn dev



The app should now be running at http://localhost:5173 (frontend or http://localhost:5174 ) and http://localhost:4004 (backend).
API Documentation

POST /api/leads: Add a new lead

Body: { "name": "string", "email": "string", "status": "string" }
Status must be one of: New, Engaged, Proposal Sent, Closed-Won, Closed-Lost


Response: 
201: Created lead (e.g., { "name": "John Doe", "email": "john@example.com", ... })
400: Validation error (e.g., missing fields)


Example:curl -X POST http://localhost:4004/api/leads -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com","status":"New"}'




GET /api/leads: Get all leads

Response: 200 with an array of leads (e.g., [{ "name": "John Doe", ... }, ...])
Example:curl http://localhost:4004/api/leads





Deployment

Frontend: Hosted on Netlify at https://elegant-trifle-92ec82.netlify.app

Build command: yarn build
Publish directory: dist
Environment variable:VITE_API_URL=https://respark-lead-manager-api.onrender.com/api/leads




Backend: Hosted on Render at https://respark-lead-manager-api.onrender.com

Build command: yarn install
Start command: yarn start
Environment variables:MONGO_DB=<mongodb-atlas-connection-string>
FRONTEND_URL=https://elegant-trifle-92ec82.netlify.app




Database: MongoDB Atlas (free tier cluster)


Environment Variables

Backend (backend/.env):

MONGO_DB: MongoDB Atlas connection string
PORT: Server port (default: 4004)
FRONTEND_URL: Frontend URL for CORS (e.g., http://localhost:5173 or http://localhost:5174 or Netlify URL)


Frontend (frontend/.env):

VITE_API_URL: Backend API URL (e.g., http://localhost:4004/api/leads or Render URL)



