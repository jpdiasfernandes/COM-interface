var express = require('express');
var router = express.Router();
var Notificacao = require('../controllers/notificacao')

router.get('/', function(req, res, next) {
  var sort = {}

  if (req.query.sort){
    sort[req.query.sort] = req.query.order == "asc" ? 1 : -1
  }

  Notificacao.getNotificacoes(sort)
    .then(dados => {
      res.status(200).json(dados)
    })
    .catch(erro => {
      res.status(520).json({erro:erro,mensagem:"Erro na listagem das notificações"})
    })
})

router.get('/:idNotificacao', function(req, res, next) {
  Notificacao.getNotificacao(req.params.idNotificacao)
    .then(dados => {
      res.status(200).json(dados)
    })
    .catch(error => {
      res.status(521).json({error:error,mensagem:"Erro na recuperação da Notificação"})
    })
})

router.post('/', function(req, res, next) {
  Notificacao.addNotificacao(req.body)
    .then(dados => {
      res.status(201).json(dados)
    })
    .catch(error => {
      res.status(522).json({error:error,mensagem:"Erro na criação da Notificação"})
    })
})

router.delete('/:idNotificacao', function(req, res, next) {
  Notificacao.removeNotificacao(req.params.idNotificacao)
    .then(dados => {
      res.status(200).json(dados)
    })
    .catch(error => {
      res.status(523).json({error:error})
    })
});

router.put('/:idNotificacao', function(req, res, next) {
  Notificacao.updateNotificacao(req.params.idNotificacao,req.body)
    .then(dados => {
      res.status(200).json(dados)
    })
    .catch(error => {
      res.status(524).json({error:error})
    })
});

module.exports = router;