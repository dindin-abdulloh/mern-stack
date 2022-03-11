const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Connect to DB
const uri = 'mongodb+srv://user_test:inipassword@cluster0.x44fv.mongodb.net/' +
  'test?retryWrites=true&w=majority';
mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000
}).catch(err => console.log(err.reason));

// const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser : true, useCreateIndex : true})

const connection = mongoose.connection
connection.once('open', () => {
    console.log("Connection to mongodb success !!!");
})

// Router
const exerciseRouter = require('./routes/exercises')
const userRouter = require('./routes/users')
// <=======================================================>
app.use('/exercises', exerciseRouter)
app.use('/users', userRouter)
// <=======================================================>



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})