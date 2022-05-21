const mongoose = require('mongoose')

const Person = mongoose.model('Person' ,{
    nome: String,
    phone: Number,
    dia : String,
    horario: String
})

module.exports = Person 