const axios = require("axios");


module.exports.mapEvento = async (list) => {
    var map = new Map()
    for (const listObj of list) {
        for (const obj of listObj) {
            var eventoRep = await axios.get('http://localhost:7779/evento/' + obj.codEvento)
            var evento = eventoRep.data
            map.set(evento._id, evento)
        }
    }
    return map
}