const express = require('express')
const routes = express.Router()


const Deliveries = require('./controllers/DeliveriesController')


routes.post('/createDeliveries', Deliveries.strore)
routes.get('/index', Deliveries.index)
routes.delete('/delete', Deliveries.delete)


routes.get('/', Deliveries.getApiKey)












module.exports = routes