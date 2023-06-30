/*
    Módulo evento.js

    descrição: rotas associadas aos eventos do sistema
    Estas rotas envolvem:
        - listagem dos eventos (tanto sócios como diretores)
        - registo de um evento (para diretores);
        - edição de um evento (para diretores);
 */
var express = require('express');
var router = express.Router();
var axios = require('axios')
var auth = require('../helpers/auth')

/*
    descrição: renderiza a página de eventos. Esta página contém:
        - formulário para adição de um novo evento; (apenas diretores)
        - listagem de todos os eventos. (tanto sócios como diretores)
 */
router.get('/', auth.verificaAcessoSocioOuDiretor, function(req, res, next) {
    axios.get('http://localhost:7779/evento')
        .then(resp =>{
            eventos = resp.data
            nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
            res.render('eventos',{eventos:eventos,nivelAcesso:nivelAcesso})
        })
        .catch( erro => {
            res.render('error', {error: erro, message: "Erro!"})
        })
})



router.get('/:idEvento', auth.verificaAcessoSocioOuDiretor, async function(req, res, next) {
    try {
        var eventoResp = await axios.get('http://localhost:7779/evento/' + req.params.idEvento)
        var evento = eventoResp.data

        var incritosRep = await axios.get('http://localhost:7779/inscrito?evento=' + req.params.idEvento)
        var inscritos = incritosRep.data

        var users = new Map()
        for (const inscrito of inscritos) {
            // Pode ser otimizado se se fizesse um get de todos os users de uma vez
            var userRep = await axios.get('http://localhost:7780/user/socio/' + inscrito.userID)
            var user = userRep.data
            users.set(user._id, user)
        }

        inscritos = Array.from(users.values())

        nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
        if (nivelAcesso == "diretor") {
            var transportesRep = await axios.get('http://localhost:7779/transporte?evento=' + req.params.idEvento)
            var transportes = transportesRep.data

            res.render('eventoDiretoria',{evento:evento,nivelAcesso:nivelAcesso, inscritos: inscritos, transportes: transportes})
        } else if (nivelAcesso == "socio") {
            const myId = auth.getID(req.cookies.token)
            const myUserRep = await axios.get('http://localhost:7780/user/' + myId)
            const myUser = myUserRep.data
            res.render('eventoSocio',{evento:evento,nivelAcesso:nivelAcesso, inscritos: inscritos, myUser:myUser})
        }
    } catch (error) {
        res.render('error', {error: error, message: "Erro!"})
    }
})

module.exports = router
