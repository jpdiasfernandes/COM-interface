var mongoose = require("mongoose");
var dividasEvento = require("./dividasEvento");

var transporteSchema = new mongoose.Schema({

    codEvento: {type: mongoose.Schema.Types.ObjectId, ref: 'evento'},
    condutores: [String],
    distancia: Number,
    transportados: [String],
    custo: Number
})

module.exports = mongoose.model("transporte", transporteSchema);