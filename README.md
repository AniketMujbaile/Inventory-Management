# Inventory-Management
    Created an Inventory Management utility with an additional feature to fetch item details from an external API The utility should allow users to add, edit, delete, and list inventory items. It should also provide functionality to fetch item details (like price, supplier info) from an external API based on the items ID or name.

## Features

- Backend (Node.js, Express, MongoDB):
     - Node.js and Express server.
     - MongoDB to store Inventory Item form submissions.
     - RESTful API endpoints for handling users to add, edit, delete, and list inventory items.

- Frontend (React): 
     - Implementd secure user authentication.    
     - Develop a React application to interact with the backend.
     - The utility allows users to add, edit, delete, and list inventory items.
     - functionality to fetch item details from an external API based on the items ID or name..

## Technologies Used

- Node.js
- React.js
- Express.js
- MongoDB
 

## Project Structure

The project is organized into two main folders: `frontend` and `backend`.

### Frontend

The `client` folder contains the React.js application.

#### Installation

```bash
cd client
npm install
```

#### Usage

```bash
npm start
```

### Backend

The `server` folder contains the Node.js and Express backend, along with the MongoDB database.

#### Installation

1. Create a MongoDB database and update the connection details in `server/config/mongoose.js`.

## Configuration File

 .env then modify to your environment variables PORT, mongodb uri.

```ENV

PORT= 3000

MONGO_URI= YOUR_URL

JWT_SECRET= YOUR_KEY
 
```
2. Install dependencies:

```bash
cd server
npm install
```

3. Run the server:

```bash
npm start
```
 
## Screenshots
<img src="https://github.com/AniketMujbaile/Inventory-Management/blob/main/Images/Img1.png" width="500px">
<hr/>
<img src="https://github.com/AniketMujbaile/Inventory-Management/blob/main/Images/Img2.png" width="500px">
<hr/>
<img src="https://github.com/AniketMujbaile/Inventory-Management/blob/main/Images/Img3.png" width="500px">

