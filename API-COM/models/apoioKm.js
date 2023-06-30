var mongoose = require("mongoose");
var receitasEvento = require("./receitasEvento");

var apoioKmSchema = new mongoose.Schema({
    codEvento: {type: mongoose.Schema.Types.ObjectId, ref: 'evento'},
    userID: String,
    atletas: Number,
    distancia: Number,
    receitaApoioKm: receitasEvento.schema,
})

module.exports =  mongoose.model("apoioKm", apoioKmSchema);