const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express();

const corsOptions = {
    origin: "*",
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    exposedHeaders: ['auth-token']
}

app.use(cors(corsOptions))

const port = process.env.PORT || 5000;
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connected established')
})

app.listen(port, () => {
    console.log('connected')
})

