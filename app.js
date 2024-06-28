// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import User from '../models/User';


// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use(User);
// // MongoDB connection setup
// mongoose.connect('mongodb+srv://webprokunal:lAs7zbmXPIvUEHn9@shopclus.cc7grak.mongodb.net/', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Use authRoutes for handling authentication-related routes
// /

// // Start the server


// const port = process.env.PORT || '8000'
// app.listen(port,()=>{
//     console.log(`Server listening at http://localhost:${port}`)

// })

// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const User = require('./models/User');

// mongoose.connect('enter your mongodb url here');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// //routes
// app.post('/signup', (req, res, next) => {
//   const newUser = new User({
//     email: req.body.email,
//     name: req.body.name,
//     password: bcrypt.hashSync(req.body.password, 10)
//   })
//   newUser.save(err => {
//     if (err) {
//       return res.status(400).json({
//         title: 'error',
//         error: 'email in use'
//       })
//     }
//     return res.status(200).json({
//       title: 'signup success'
//     })
//   })
// })
// app.post('/login', (req, res, next) => {
//   User.findOne({ email: req.body.email }, (err, user) => {
//     if (err) return res.status(500).json({
//       title: 'server error',
//       error: err
//     })
//     if (!user) {
//       return res.status(401).json({
//         title: 'user not found',
//         error: 'invalid credentials'
//       })
//     }
//     //incorrect password
//     if (!bcrypt.compareSync(req.body.password, user.password)) {
//       return res.status(401).json({
//         tite: 'login failed',
//         error: 'invalid credentials'
//       })
//     }
//     //IF ALL IS GOOD create a token and send to frontend
//     let token = jwt.sign({ userId: user._id}, 'secretkey');
//     return res.status(200).json({
//       title: 'login sucess',
//       token: token
//     })
//   })
// })

// //grabbing user info
// app.get('/user', (req, res, next) => {
//   let token = req.headers.token; //token
//   jwt.verify(token, 'secretkey', (err, decoded) => {
//     if (err) return res.status(401).json({
//       title: 'unauthorized'
//     })
//     //token is valid
//     User.findOne({ _id: decoded.userId }, (err, user) => {
//       if (err) return console.log(err)
//       return res.status(200).json({
//         title: 'user grabbed',
//         user: {
//           email: user.email,
//           name: user.name
//         }
//       })
//     })

//   })
// })
// const port = process.env.PORT || 8000;

// app.listen(port, (err) => {
//   if (err) return console.log(err);
//   console.log('server running on port ' + port);
// })

import express from 'express';
import mongoose from 'mongoose';
import crypto from 'crypto'
import authRoutes from './routes/authRoutes.js';
import { secretKey } from './config.js';
import cors from 'cors'
const app = express();

// Connect to MongoDB Atlas
mongoose.connect(process.env.PUBLIC_MONGO_ID, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(error => console.error(error));

app.use(express.json());
// app.use(cors({ origin: '*' }));
// Routes
app.use('/api', authRoutes);
 console.log("server reached")

 app.get('/', (req, res) => {
  res.send('API is running!');
});

// const generateSecretKey = () => {
//   return crypto.randomBytes(32).toString('hex');
// };

// console.log(generateSecretKey());
// Start the server

const port = process.env.PORT || '8000'
app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`)

})

