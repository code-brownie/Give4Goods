require('dotenv').config({path:'../.env'});
const express = require('express');
const app = express();
const port = 5000;
const connectTomongo = require('./db');
const cors = require('cors');
connectTomongo();
app.use(cors({
  origin: 'http://localhost:3000', // Replace with the URL of your React app
  // origin: 'https://checkout.stripe.com', // Replace with the URL of your React app
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
// Available Routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/auth', require('./routes/displaydata'));
app.use('/api/auth', require('./routes/stripe'));
app.use('/api/auth', require('./routes/Success'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})