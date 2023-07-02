var express = require('express');
var router = express.Router();
var DividasEquipamento = require('../controllers/dividasEquipamento')

router.get('/', function(req, res, next) {
  var filter = {}

  if (req.query.codEquipamento){
    filter["codEquipamento"] = req.query.codEquipamento
  }

  if (req.query.idUser){
    filter["userID"] = req.query.idUser
  }

  if (req.query.estado){
    filter["estado"] = req.query.estado
  }

  DividasEquipamento.getDividasEquipamento(filter)
    .then(dados => {
      res.status(200).json(dados)
    })
    .catch(erro => {
      res.status(520).json({erro:erro,mensagem:"Erro na listagem das dívidas dos equipamentos"})
    })
})

router.get('/:idDividaEquipamento', function(req, res, next) {
  DividasEquipamento.getDividaEquipamento(req.params.idDividaEquipamento)
    .then(dados => {
      res.status(200).json(dados)
    })
    .catch(error => {
      res.status(524).json({error:error})
    })
});

router.post('/', function(req, res, next) {
  DividasEquipamento.addDividaEquipamento(req.body)
    .then(dados => {
      res.status(201).json(dados)
    })
    .catch(error => {
      res.status(522).json({error:error,mensagem:"Erro na criação da divida do equipamento"})
    })
})

router.put('/:idDividaEquipamento', function(req, res, next) {
  DividasEquipamento.updateDividaEquipamento(req.params.idDividaEquipamento,req.body)
    .then(dados => {
      res.status(200).json(dados)
    })
    .catch(error => {
      res.status(524).json({error:error})
    })
});

module.exports = router;