require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const Message = require('./models/Message')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || ''

// Warn if no DB
if(!MONGO_URI){
  console.warn('Warning: MONGO_URI not set — contact form will not save messages.')
}