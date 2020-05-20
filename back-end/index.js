const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const requireDir = require('require-dir')

//Start Api
const App = express()
App.use(express.json())
App.use(cors())

//DB start
mongoose.connect('mongodb://127.0.0.1:27017/api', { useNewUrlParser: true, useUnifiedTopology: true })





requireDir('./src/models')




App.use(require('./src/routes'))

App.listen(3333)