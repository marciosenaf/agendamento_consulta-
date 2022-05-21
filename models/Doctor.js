const mongoose = require('mongoose')

const Doctor = mongoose.model('Doctor' ,{
   nome: String,
    dia : String,
    horario: String
})

module.exports = Doctor    