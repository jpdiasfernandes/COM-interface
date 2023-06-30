var mongoose = require("mongoose");
var dividasEvento = require("./dividasEvento");

var inscritoSchema = new mongoose.Schema({
    codEvento: {type: mongoose.Schema.Types.ObjectId, ref: 'evento'},
    userID:String,
    despesaExtra: String,
    descricao: String
})

module.exports = mongoose.model('inscrito',inscritoSchema)