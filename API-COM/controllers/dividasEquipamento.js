var DividasEquipamento = require('../models/dividasEquipamento')

module.exports.getDividasEquipamento = () =>{
    return DividasEquipamento
        .find()
        .then(dados =>{
            return dados
        })
        .catch(erro =>{
            console.log(erro)
            return erro
        })
}

module.exports.getDividaEquipamento = id => {
    return DividasEquipamento
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

module.exports.addDividaEquipamento = dividaEquipamento => {
    return DividasEquipamento
        .create(dividaEquipamento)
        .then(dados =>{
            return dados
        })
        .catch(erro =>{
            return erro
        })
}

module.exports.updateDividaEquipamento = (id,dividaEquipamento) => {
    return DividasEquipamento.
        updateOne({_id:id},dividaEquipamento)
        .then(dividasEquipamento => {
            return dividasEquipamento
        })
        .catch(erro => {
            return erro
        })
}