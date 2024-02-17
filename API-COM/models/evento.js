var mongoose = require('mongoose')

var dividasEvento = require('./dividasEvento')
var apoioKm = require('./apoioKm')
var transporte = require('./transporte')
var inscrito = require('./inscrito')

var eventoSchema = new mongoose.Schema({
    nome:String,
    descricao: String,
    dataInicio: Date,
    dataFim: Date,
    local: String
})

module.exports = mongoose.model('evento', eventoSchema)