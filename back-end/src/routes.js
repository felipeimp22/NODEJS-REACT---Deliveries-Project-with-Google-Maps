const express = require('express')
const routes = express.Router()


const Deliveries = require('./controllers/DeliveriesController')


routes.post('/createDeliveries', Deliveries.strore)
routes.get('/index', Deliveries.index)











module.exports = routes