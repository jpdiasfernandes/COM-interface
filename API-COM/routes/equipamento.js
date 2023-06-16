var express = require('express');
var router = express.Router();
var Equipamento = require('../controllers/equipamento')

router.get('/', function(req, res, next) {
  Equipamento.getEquipamentos()
    .then(dados => {
      res.status(200).json(dados)
    })
    .catch(erro => {
      res.status(520).json({erro:erro,mensagem:"Erro na listagem dos equipamentos"})
    })
})

router.get('/:idEquipamento', function(req, res, next) {
  Equipamento.getEquipamento(req.params.idEquipamento)
    .then(dados => {
      res.status(200).json(dados)
    })
    .catch(error => {
      res.status(521).json({error:error,mensagem:"Erro na recuperação do Equipamento"})
    })
})

router.post('/', function(req, res, next) {
  Equipamento.addEquipamento(req.body)
    .then(dados => {
      res.status(201).json(dados)
    })
    .catch(error => {
      res.status(522).json({error:error,mensagem:"Erro na criação do Equipamento"})
    })
})

router.delete('/:idEquipamento', function(req, res, next) {
  Equipamento.removeEquipamento(req.params.idEquipamento)
    .then(dados => {
      res.status(200).json(dados)
    })
    .catch(error => {
      res.status(523).json({error:error})
    })
});

router.put('/:idEquipamento', function(req, res, next) {
  Equipamento.updateEquipamento(req.params.idEquipamento,req.body)
    .then(equipamentos => {
      res.status(200).json(equipamentos)
    })
    .catch(error => {
      res.status(524).json({error:error})
    })
});

module.exports = router;