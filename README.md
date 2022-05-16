# Community Events Map

An Interactive Community Events Map that allows Users to view and create events in their area. 

---------

### Server

An Express app using Mongoose to handle database connections.

### Dependencies:
- express
- mongoose
- express-async-handler
- bcrypt
- dotenv
- colors
- nodemon

In the server directory run the following command to install all the dependencies.
- *npm install* 

Once installed, run *npm start* to spin up the server. 

---------

### Client


A React app using Axios to handle HTTP requests to the Server endpoints.

### Dependencies:
- axios
- @emotion/react
- @emotion/styled
- @mui/icons-material
- @mui/material
- @mui/x-data-grid
- @react-google-maps/api
- react-router-dom
- react-moment


In the client directory run the following command to install all the dependencies. 
- *npm install* 

Once installed, run *npm start* to spin up the application. 

---------

### BUGS 

- When Selecting a marker on the map, this will bring up a secondary, smaller window.
- Filtered events don't reflect on the map. 

