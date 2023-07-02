var express = require('express');
var router = express.Router();
var Receitas = require('../controllers/receitasEvento')

router.get('/', function(req, res, next) {
    if (req.query.apoio) {
        Receitas.getReceitasByApoio(req.query.apoio)
            .then(dados => {
                res.status(200).json(dados)
            })
            .catch(erro => {
                res.status(520).json({erro:erro,mensagem:"Erro na listagem das Receitas"})
            })
    }
    else if (req.query.user) {
        console.log(req.query.user)
        Receitas.getReceitasByUser(req.query.user)
            .then(dados => {
                res.status(200).json(dados)
            })
            .catch(erro => {
                res.status(520).json({erro:erro,mensagem:"Erro na listagem das Receitas"})
            })
    }
    else {
        Receitas.getReceitas()
            .then(dados => {
                res.status(200).json(dados)
            })
            .catch(erro => {
                res.status(520).json({erro:erro,mensagem:"Erro na listagem das Receitas"})
            })
    }
})

router.delete('/', async function(req, res, next) {
    if (req.query.apoio)  {
        try {
            var dados = await Receitas.deleteReceitaByApoio(req.query.apoio)
            res.status(200).json(dados)
        } catch (erro) {
            res.status(204).json({erro:erro,mensagem:"Erro na remoção da Receita"})
        }
    }
    else {
        res.status(204).json({mensagem:"Erro na remoção da Divida"})
    }
})

router.delete('/:idDivida', function(req, res, next) {
    Receitas.deleteReceita(req.params.idReceita)
        .then(dados => {
            res.status(200).json(dados)
        })
        .catch(error => {
            res.status(522).json({error:error,mensagem:"Erro na remoção da Receita"})
        })
})

router.post('/', function(req, res, next) {
        console.log(req.body)
        Receitas.addReceita(req.body)
            .then(dados => {
                res.status(201).json(dados)
            })
            .catch(error => {
                res.status(522).json({error:error,mensagem:"Erro na criação da Receita"})
            })
})

router.put('/:idReceita', function(req, res, next) {
    Receitas.updateReceita(req.params.idReceita, req.body)
        .then(dados => {
            console.log(dados)
            res.status(201).json(dados)
        })
        .catch(error => {
            res.status(522).json({error:error,mensagem:"Erro na atualização da Receita"})
        })
})
module.exports = router;