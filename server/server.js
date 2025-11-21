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

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.warn('MongoDB connection error:', err))

// CONTACT API
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body

  if (!email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const msg = new Message({ name, email, message })
    await msg.save()

    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// PRODUCTION MODE
if (process.env.NODE_ENV === 'production') {
  const clientPath = path.join(__dirname, '..', 'client', 'dist')

  app.use(express.static(clientPath))

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})