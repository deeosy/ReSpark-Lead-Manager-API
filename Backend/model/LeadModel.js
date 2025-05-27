const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LeadSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'], },
    status: {type: String, enum: ['New', 'Engaged', 'Proposal Sent', 'Closed-Won', 'Closed-Lost' ], default: 'New' },
    createdAt: {type: Date, default: Date.now }
})

const LeadModel = mongoose.model('leads', LeadSchema)

module.exports = LeadModel