var mongoose = require('mongoose')

var receitaEventoSchema = new mongoose.Schema({
    codEvento: {type: mongoose.Schema.Types.ObjectId, ref: 'evento'},
    codTransporte: {type: mongoose.Schema.Types.ObjectId, ref: 'transporte'},
    codApoioKm: {type: mongoose.Schema.Types.ObjectId, ref: 'apoioKm'},
    codInscrito:{type: mongoose.Schema.Types.ObjectId, ref: 'inscrito'},
    userID:String,
    valor:Number
})

module.exports = mongoose.model('receitasevento',receitaEventoSchema)