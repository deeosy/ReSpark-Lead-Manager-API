const LeadModel = require('../model/LeadModel')

const createLead = async (req, res) => {
  try {
    const lead = new LeadModel(req.body)
    const savedLead = await lead.save()

    res.status(201).json(savedLead)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const getLeads = async (req,res) => {
    try {
        const leads = await LeadModel.find()
        res.status(200).json(leads)
    } catch (error) {
        console.error('Error fetching leads: ', error);        
        res.status(500).json({error: 'Internal server error'})
    }
}


module.exports = {createLead, getLeads}