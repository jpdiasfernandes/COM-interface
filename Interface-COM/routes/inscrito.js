/*
    Módulo inscrito.js

    descrição: rotas associadas às inscrições do sistema
    Estas rotas envolvem:
        - registo de uma inscrição num evento(para diretores e sócios);
        - listagem das inscrições num evento(para diretores e sócios);
        - Remoção de uma inscrição (para sócios);
        - Edição de uma inscrição
 */

var express = require('express');
var router = express.Router();
var axios = require('axios')
var auth = require('../helpers/auth')
var users = require('../helpers/users')
//router.get('/remover', auth.verificaAcessoSocioOuDiretor, function(req, res, next) {
//    if (req.query.evento && req.query.socio) {
//        axios.delete('http://localhost:7779/inscrito?evento=' + req.query.evento + '&socio=' + req.query.socio)
//            .then(resp =>{
//                res.redirect('/evento/' + req.query.evento)
//            })
//            .catch( erro => {
//                res.render('error', {error: erro, message: "Erro!"})
//            })
//    } else {
//        res.render('error', {error: erro, message: "Erro!"})
//    }
//})

router.get('/remover/:idInscrito', auth.verificaAcessoSocioOuDiretor, async function(req, res, next) {
    let user = auth.getUser(req.cookies.token)
    try {
        var inscritoRep = await axios.get('http://localhost:7779/inscrito/' + req.params.idInscrito)
        var inscrito = inscritoRep.data

        await axios.delete('http://localhost:7779/dividaEvento?inscrito=' + req.params.idInscrito)

        await axios.delete('http://localhost:7779/inscrito/' + req.params.idInscrito)
        res.redirect('/evento/' + inscrito.codEvento)
    } catch (erro) {
        res.render('error', {error: erro, message: "Erro!", user:user})
    }
})

router.get('/:idInscrito', auth.verificaAcessoDiretor, async function(req, res, next) {
    let user = auth.getUser(req.cookies.token)
    try {
       var inscritoRep = await axios.get('http://localhost:7779/inscrito/' + req.params.idInscrito)
       var inscrito = inscritoRep.data
       var usersMap = await users.mapSocioUser([[inscrito]])
       var nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
       res.render('inscritoDiretoria', {inscrito: inscrito, nivelAcesso: nivelAcesso, usersMap:usersMap, user:user})
   } catch (erro) {
       res.render('error', {error: erro, message: "Erro!", user:user})
   }
})
router.post('/', auth.verificaAcessoSocioOuDiretor, async function(req, res, next) {
    let user = auth.getUser(req.cookies.token)
    try {
        var inscritosRep = await axios.get('http://localhost:7779/inscrito?evento=' + req.body.codEvento + '&user=' + req.body.userID)
        var inscritos = inscritosRep.data
        // Só inscrever se não houver nenhuma inscrição com o mesmo evento e sócio
        if (inscritos.length == 0) {
            var inscritoRep =  await axios.post('http://localhost:7779/inscrito', req.body)
            var inscrito = inscritoRep.data

            console.log(inscritos)

            // Se houver um despesaExtra da inscrição é necessário criar uma divida
            if (req.body.despesaExtra) {
                var divida = {
                    codEvento: req.body.codEvento,
                    codInscrito: inscrito._id,
                    userID: req.body.userID,
                    valor: req.body.despesaExtra
                }
                var resp = await axios.post('http://localhost:7779/dividaEvento', divida)
                console.log(resp.data)
            }
        }

        res.redirect('/evento/' + req.body.codEvento)
    } catch(erro) {
        res.render('error', {error: erro, message: "Erro!", user:user})
    }

})

router.get('/editar/:idInscrito', auth.verificaAcessoDiretor, async function(req, res, next) {
    let user = auth.getUser(req.cookies.token)
    try {
        var inscritoRep = await axios.get('http://localhost:7779/inscrito/' + req.params.idInscrito)
        var inscrito = inscritoRep.data
        var nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)

        res.render('editarInscrito', {nivelAcesso: nivelAcesso, inscrito: inscrito, user:user})
    } catch (erro) {
        res.render('error', {error: erro, message: "Erro!", user:user})
    }
})
router.post('/editar', auth.verificaAcessoDiretor, async function(req, res, next) {
    let user = auth.getUser(req.cookies.token)
    try {
        var inscritoRep = await axios.get('http://localhost:7779/inscrito/' + req.body._id)
        var inscrito = inscritoRep.data

        // Se houver um despesaExtra da inscrição é necessário criar uma divida
        var dividaEventoRep = await axios.get('http://localhost:7779/dividaEvento?inscrito=' + req.body._id)
        var dividaEvento = dividaEventoRep.data
        // Já houve uma inscrição com despesaExtra e houve a criação de uma dividaEvento com o id da inscrição
        if (inscrito.despesaExtra && dividaEvento.length == 1) {
            // Se já não houver despesa apagar a dívida
            if (!req.body.despesaExtra) {
                await axios.delete('http://localhost:7779/dividaEvento/' + dividaEvento[0]._id)
            } else if(req.body.despesaExtra != inscrito.despesaExtra) {
                // Se a despesa foi alterada atualizar a dívida
                var divida = {
                    codEvento: req.body.codEvento,
                    codInscrito: req.body._id,
                    userID: req.body.userID,
                    valor: req.body.despesaExtra
                }
                await axios.put('http://localhost:7779/dividaEvento/' + dividaEvento[0]._id, divida)
            }
        } else if (!inscrito.despesaExtra && req.body.despesaExtra) {
            // Se não havia despesa extra e começou a haver criar uma dívida
            var divida = {
                codEvento: req.body.codEvento,
                codInscrito: req.body._id,
                userID: req.body.userID,
                valor: req.body.despesaExtra
            }
            await axios.post('http://localhost:7779/dividaEvento', divida)
        }

        await axios.put('http://localhost:7779/inscrito/' + req.body._id, req.body)
        res.redirect('/inscrito/' + req.body._id)
    } catch(erro) {
        res.render('error', {error: erro, message: "Erro!", user:user})
    }
})

module.exports = router
