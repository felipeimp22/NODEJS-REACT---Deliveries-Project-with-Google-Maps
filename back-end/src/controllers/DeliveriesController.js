const mongoose = require('mongoose')
const Deliveries = mongoose.model('Deliveries')
require('dotenv').config()


module.exports = {

  async strore(req, res) {
    const deliveries = await Deliveries.create(req.body)
    return res.json(deliveries), console.log(req.body)
  },

  async index(req, res) {
    // const deliveries = await Deliveries.find({}).select('peso')
    const deliveries = await Deliveries.find({})


    return res.json({ data: deliveries })
  },

  async getApiKey(req, res) {

    return res.json(process.env.API_KEY)
  },

  async delete(req, res) {

    await Deliveries.remove({})

    return res.json("Deleted")
  }


}