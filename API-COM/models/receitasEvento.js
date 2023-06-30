var mongoose = require('mongoose')

var receitaEventoSchema = new mongoose.Schema({
    codEvento: {type: mongoose.Schema.Types.ObjectId, ref: 'evento'},
    userId:String,
    valor:Number,
    categoria:String
})

module.exports.model = mongoose.model('receitasevento',receitaEventoSchema)
module.exports.schema = receitaEventoSchema