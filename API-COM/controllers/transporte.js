const Transporte = require("../models/transporte");
const Equipamento = require("../models/equipamento");
module.exports.addTransporte = async function(transporte) {
    try {
        return await Transporte.create(transporte)
    } catch (erro) {
        return erro
    }
}

module.exports.getTransporte = (transporteID) => {
    return Transporte.findOne({_id: transporteID})
        .then(transporte => {
            return transporte
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getTransportesFromEvento = (eventoID) => {
    return Transporte.find({codEvento: eventoID})
        .then(transportes => {
            return transportes
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getTransportesFromDistancia = (dist, interval) => {
    return Transporte.find({distancia: {$gte: dist - interval, $lte: dist + interval}})
        .then(transportes => {
            return transportes
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getTransportes = () => {
    return Transporte.find({})
        .then(transportes => {
            return transportes
        })
        .catch(erro => {
            return erro
        })
}

module.exports.deleteTransporte = (transporteID) => {
    return Transporte.deleteOne({_id: transporteID})
        .then(transporte => {
            return transporte
        })
        .catch(erro => {
            return erro
        })
}

module.exports.updateTransporte = (id,transporte) => {
    return Transporte.
    updateOne({_id:id},transporte)
        .then(transporte => {
            return transporte
        })
        .catch(erro => {
            return erro
        })
}