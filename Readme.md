# Trustana Encrypted User Profile With CV

Trustana Encrypted user profile allows the user to create a user an encrypted profile where they can enter some details and attach a CV file, which can be accessed only with a secret code that the user also enters while creating the profile. This secret code is only with the user neither the CV nor the data can be accessed without this secret code. The user also gets an option to log in to view their data by entering the secret code and also create a public link to allow access of his data on this link with an expiry time. 

## Installation

Use Docker (https://www.docker.com/) to run the application

```bash
docker-compose up
```

This will serve the reactJS application via nginx on http://localhost/ and API's can be accessed via http://localhost:4000/


## App Structure

The frontend is built using create-react-app in typescript and backend is expressjs based API's.
Two main folders segregate both applications into frontend and backend.

Database in use is MongoDB.

```js
/backend
/frontend
```

## User Journey
When the application starts, the user will be taken to the login page with an option to register, user can click on register to create a profile or log in with an existing username, password combination. 

While creating a new profile, the user is required to input all fields with a CV file and a secret code, once registration is done, user can log in with the same username, password combination on the login screen.

Once Logged in, user gets two option on the dashboard:
1) To decrypt their own profile data using the secret code
2) Generate a public link with secret code and expiry time in format specified. This public link can be used to access the user's data without any secret code or authentication required and will expire as per the expiry time specified by the user.

## API Documentation
A postman (https://www.postman.com/) collection file (Trustana.postman_collection.json) has been added to root directory of this project, the same can be imported in Postman to try API's

## Running Application Without Docker
To start the application without docker, the environment file needs to be created inside both the frontend folder and backend folder, the structure of the file needs to be as followed:

### Frontend:
```json
REACT_APP_API_URL = 'http://localhost:4000'
REACT_APP_URL = 'http://localhost:3000'
```

### Backend:
```json
PORT=4000
MONGODBURL=<URL FOR MONGO DB CONNECTION>
JWT_SECRET=<SECRET>
JWT_PUBLICDATA_SECRET=<ANOTHER SECRET>
```

### Backend Setup:
```cmd
cd backend
npm install
npm start
```

API will start on http://localhost:4000/

### Frontend setup:
```cmd
cd frontend
npm install
npm start
```
The frontend will start on http://localhost:3000/
