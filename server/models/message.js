const mongoose = require('mongoose')

const MsgSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Message', MsgSchema)
