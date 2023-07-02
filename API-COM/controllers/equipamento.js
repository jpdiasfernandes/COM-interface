var Equipamento = require('../models/equipamento')

module.exports.getEquipamentos = (filter,sort) =>{
    return Equipamento
        .find(filter)
        .sort(sort)
        .then(dados =>{
            return dados
        })
        .catch(erro =>{
            return erro
        })
}

module.exports.addEquipamento = contrato =>{
    return Equipamento
        .create(contrato)
        .then(dados =>{
            return dados
        })
        .catch(erro =>{
            return erro
        })
}

module.exports.getEquipamento = id => {
    return Equipamento
        .findOne({
            _id:id,
        })
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.removeEquipamento = id => {
    return Equipamento.
        deleteOne({
            _id:id
        })
        .then(docs => {
            return docs
        })
        .catch(erro => {
            return erro
        })
}

module.exports.updateEquipamento = (id,equipamento) => {
    return Equipamento.
        updateOne({_id:id},equipamento)
        .then(equipamento => {
            return equipamento
        })
        .catch(erro => {
            return erro
        })
}