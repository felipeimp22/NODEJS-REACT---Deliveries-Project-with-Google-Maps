const mongoose = require('mongoose')
const Deliveries = mongoose.model('Deliveries')

module.exports = {

  async strore(req, res) {
    const deliveries = await Deliveries.create(req.body)
    return res.json(deliveries)
  },

  async index(req, res) {
    // const deliveries = await Deliveries.find({}).select('peso')
    const deliveries = await Deliveries.find({})


    return res.json(deliveries)
  }


}