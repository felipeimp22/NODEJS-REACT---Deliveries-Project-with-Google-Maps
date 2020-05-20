const mongoose = require('mongoose')

const geo = mongoose.Schema({
  latitude: {
    type: String
  },
  longitude: {
    Type: String
  }
})

const adress = mongoose.Schema({
  logradouro: {
    type: String,
  },
  numero: {
    type: String,
  },
  bairro: {
    type: String,
  },
  complemento: {
    type: String,
  },
  cidade: {
    type: String,
  },
  estado: {
    type: String,
  },
  pais: {
    type: String,
  },
  geolocalizacao: [geo]
})

const deliveriesSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  peso: {
    type: String,
  },
  endereço: [adress]
})
mongoose.model('Deliveries', deliveriesSchema)

