require('dotenv').config({ path: '../.env' });
const express = require('express');
const app = express();
const port = 5000;
const connectTomongo = require('./db');
const cors = require('cors');
connectTomongo();

app.use(cors());
// app.use(cors({
//   // origin: 'http://localhost:3000',
//   origin: 'https://give4-goods.vercel.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

app.use(express.json());
// Available Routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/auth', require('./routes/displaydata'));
app.use('/api/auth', require('./routes/stripe'));
app.use('/api/auth', require('./routes/Success'));  
app.use('/api/auth', require('./routes/displayUserDetails'));  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
