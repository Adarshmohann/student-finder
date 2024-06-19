const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require("mongoose")
const path = require("path")


const app = express();
const port = process.env.port || 3050


const studentRoutes = require('./routes/student.js')

app.use((req, res, next) => {
  if (req.method == 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
  } else {
    res.on('finish', () => {
      if (req.method == 'POST' || req.method == 'DELETE' || req.method == 'PUT') {
        // console.log('Response headers:', res.getHeaders());
      }
    });
    next()
  }
})

// app.use(express.static(path.join(__dirname, "frontend", "build")))
app.use(express.static(path.join(__dirname,'frontend', 'build')));
app.use(cors());
app.use(bodyparser.json())


// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', "build", "index.html" ))
// })

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

app.use('/student', studentRoutes)

mongoose.connect(process.env.mongo_connection_url)
  .then(() => {
    console.log('db connected')
  }).catch((error) => {
    console.log("error", error)
  })

mongoose.connection.on('error',error => {
  console.log('error', error.message)
  
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
