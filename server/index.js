const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const port = process.env.PORT;
const userRoute = require('./routes/userRoutes');
const eventRoute = require('./routes/eventRoutes');

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/users', userRoute);
app.use('/api/events', eventRoute);

app.listen(port, () => console.log(`Server listening on Port: ${port}`));
