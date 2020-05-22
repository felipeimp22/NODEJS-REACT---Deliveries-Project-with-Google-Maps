const mongoose = require('mongoose')



const adress = mongoose.Schema({
  logradouro: {
    type: String,
  },
  numero: {
    type: Number,
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

})

const deliveriesSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  peso: {
    type: String,
  },
  geolocalizacao: [],
  endereço: [adress]
})
mongoose.model('Deliveries', deliveriesSchema)

