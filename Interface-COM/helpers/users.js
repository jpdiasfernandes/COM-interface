const axios = require("axios");

module.exports.mapSocioUser = async (list) => {
    var map = new Map()
    for (const listSocio of list) {
        for (const obj of listSocio) {
            var socioRep = await axios.get('http://localhost:7780/user/socio/' + obj.userID)
            var socio = socioRep.data
            map.set(obj.userID, socio)
        }
    }
    return map
}

module.exports.balanco = (receitas, dividas) => {
    var sum = 0

    for (const receita of receitas) {
        sum += receita.valor
    }

    for (const divida of dividas) {
        sum -= divida.valor
    }

    return sum
}