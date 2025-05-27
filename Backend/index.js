const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const leadRouter = require('./routes/LeadRoutes')
require('dotenv').config()

const server = express()
const port = process.env.PORT || 4004

//middleware
server.use(cors({
  origin: process.env.FRONTEND_URL
}))
server.use(express.json())

//routes
server.use(leadRouter)


//mongoose connection
mongoose.connect(process.env.MONGO_DB).then( (result) => {
    console.log('MongoDB Connected')    
    server.listen(port, () => {
      console.log(`Server is live at http://localhost:${port}`)
    })  
}).catch((err) => {
  console.error('MongoDB connection error: ', err);
  process.exit(1);
})

