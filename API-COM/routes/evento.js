var express = require('express');
var router = express.Router();
var Evento = require('../controllers/evento')

/* GET home page. */
router.get('/', function(req, res, next) {
    Evento.getEventos()
        .then(dados => {
        res.status(200).json(dados)
        })
        .catch(error => {
        res.status(521).json({error:error,mensagem:"Erro na recuperação dos Eventos"})
        })
});

router.post('/', function(req, res, next) {
      Evento.addEvento(req.body)
     .then(dados => {
        res.status(201).json(dados)
     })
     .catch(error => {
        res.status(522).json({error:error,mensagem:"Erro na criação do Evento"})
     })
})

router.get('/:idEvento', function(req, res, next) {
    Evento.getEvento(req.params.idEvento)
        .then(dados => {
        res.status(200).json(dados)
        })
        .catch(error => {
        res.status(521).json({error:error,mensagem:"Erro na recuperação do Evento"})
        })
})

module.exports = router;
