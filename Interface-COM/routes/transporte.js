/*
    Módulo transporte.js

    descrição: rotas associadas às inscrições do sistema
    Estas rotas envolvem:
        - registo de um novo transporte(para diretores);
        - listagem dos transportes num evento(para diretores);
        - Edição de um transporte (para diretores)
 */

var express = require('express');
var router = express.Router();
var axios = require('axios')
var auth = require('../helpers/auth')

router.post('/', auth.verificaAcessoDiretor, function(req, res, next) {
    axios.post('http://localhost:7779/inscrito', req.body)
        .then(resp =>{
            var nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
            res.redirect('/evento/' + req.body.codEvento)
        })
        .catch( erro => {
            res.render('error', {error: erro, message: "Erro!"})
        })
})

router.get('/remover/:idTransporte', auth.verificaAcessoDiretor, async function(req, res, next) {
    try {
        var transporte = await axios.get('http://localhost:7779/transporte/' + req.params.idTransporte)
        var deleted = await axios.delete('http://localhost:7779/transporte/' + req.params.idTransporte)
        res.redirect('/evento/' + transporte.data.codEvento)
    } catch (erro) {
        res.render('error', {error: erro, message: "Erro!"})
    }
})

router.get('/adicionar/:idEvento', auth.verificaAcessoDiretor, function(req, res, next) {
    var nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
    res.render('adicionarTransporte', {codEvento: req.params.idEvento, nivelAcesso: nivelAcesso})
})

router.post('/adicionar', auth.verificaAcessoDiretor, function(req, res, next) {
    axios.post('http://localhost:7779/transporte', req.body)
        .then(resp =>{
            var nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
            res.redirect('/evento/' + req.body.codEvento)
        })
        .catch( erro => {
            res.render('error', {error: erro, message: "Erro!"})
        })
})

router.post('/editar', auth.verificaAcessoDiretor, async function(req,res,next) {
    try {
        await axios.put('http://localhost:7779/transporte/' + req.body._id, req.body)
        res.redirect('/transporte/' + req.body._id)
    } catch(erro) {
        res.render('error', {error: erro, message: "Erro!"})
    }
})

router.get('/remover/:idTransporte', auth.verificaAcessoDiretor, async function(req, res, next) {
    try {
        var transporteRep = await axios.get('http://localhost:7779/transporte/' + req.params.idTransporte)
        var transporte = transporteRep.data
        await axios.delete('http://localhost:7779/transporte/' + req.params.idTransporte)
        res.redirect('/evento/' + transporte.codEvento)
    } catch (erro) {
        res.render('error', {error: erro, message: "Erro!"})
    }
})

router.get('/editar/:idTransporte', auth.verificaAcessoDiretor, async function(req, res, next) {
    try {
        var nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
        var transporteRep = await axios.get('http://localhost:7779/transporte/' + req.params.idTransporte)
        var transporte = transporteRep.data
        res.render('editarTransporte', {transporte: transporte, nivelAcesso: nivelAcesso})
    } catch (erro) {
        res.render('error', {error: erro, message: "Erro!"})
    }


})
router.get('/:idTransporte', auth.verificaAcessoDiretor, async function(req, res, next) {
    try {
        var repTransporte = await axios.get('http://localhost:7779/transporte/' + req.params.idTransporte)
        var transporte = repTransporte.data

        var repUtilizadores = await axios.get('http://localhost:7780/user/')
        var utilizadores = repUtilizadores.data

        var transportados = new Set()

        var condutores = new Set()

        for (const transportado of transporte.transportados)
            transportados.add(transportado)

        for (const condutor of transporte.condutores)
            condutores.add(condutor)

        var transportadosList = []

        var condutoresList = []

        for (const user of utilizadores) {
            if (transportados.has(user.nSocio))
                transportadosList.push(user)
            if (condutores.has(user.nSocio))
                condutoresList.push(user)
        }
        nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
        res.render('transporteDiretoria', {transporte: transporte, nivelAcesso: nivelAcesso, transportados: transportadosList, condutores: condutoresList})
    } catch (error) {
        res.render('error', {error: error, message: "Erro!"})
    }

})
module.exports = router
