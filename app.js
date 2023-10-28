const express = require('express');
const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/ems'; // Specify the IPv4 loopback address
const app = express();

mongoose.connect(url, { useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(express.json());

const employeeRouter = require('./Routes/employeeRoute');
app.use('/employee', employeeRouter);

app.listen(9000, () => {
    console.log('http://localhost:9000');
});

