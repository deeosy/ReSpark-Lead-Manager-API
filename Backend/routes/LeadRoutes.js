const express = require('express')
const { createLead, getLeads } = require('../controllers/LeadControllers')

const router = express.Router()

router.post('/api/leads', createLead)
router.get('/api/leads', getLeads)

module.exports = router