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

router.post('/', auth.verificaAcessoDiretor, async function(req, res, next) {
    let user = auth.getUser(req.cookies.token)
    try {
        var transporteRep = await axios.post('http://localhost:7779/transporte', req.body)
        var transporte = transporteRep.data

        if (req.body.custo) {
            for (const transportado of req.body.transportados) {
                var divida = {
                    codEvento: req.body.codEvento,
                    codTransporte: transporte._id,
                    userID: transportado,
                    valor: req.body.custo
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

router.get('/remover/:idTransporte', auth.verificaAcessoDiretor, async function(req, res, next) {
    try {
        var transporte = await axios.get('http://localhost:7779/transporte/' + req.params.idTransporte)

        await axios.delete('http://localhost:7779/dividaEvento?transporte=' + req.params.idTransporte)

        var deleted = await axios.delete('http://localhost:7779/transporte/' + req.params.idTransporte)

        res.redirect('/evento/' + transporte.data.codEvento)
    } catch (erro) {
        res.render('error', {error: erro, message: "Erro!", user:user})
    }
})

router.get('/adicionar/:idEvento', auth.verificaAcessoDiretor, async function(req, res, next) {
    let user = auth.getUser(req.cookies.token)
    var nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)

    var userListRep = await axios.get('http://localhost:7780/user/')
    var userList = userListRep.data
    res.render('adicionarTransporte', {codEvento: req.params.idEvento, nivelAcesso: nivelAcesso, users:userList, user: user})
})

router.post('/editar', auth.verificaAcessoDiretor, async function(req,res,next) {
    let user = auth.getUser(req.cookies.token)
    try {
        var transporteRep = await axios.get('http://localhost:7779/transporte/' + req.body._id)
        var transporte = transporteRep.data

        if (!Array.isArray(req.body.transportados)) {
            req.body.transportados = [req.body.transportados]
        }
        console.log(req.body.transportados)
        var novosTransportados = req.body.transportados.filter(x => !transporte.transportados.includes(x))
        var transportadosRemovidos = transporte.transportados.filter(x => !req.body.transportados.includes(x))
        var transportadosMantidos = transporte.transportados.filter(x => req.body.transportados.includes(x))

        for (const transportado of novosTransportados) {
            var divida = {
                codEvento: req.body.codEvento,
                codTransporte: transporte._id,
                userID: transportado,
                valor: req.body.custo
            }

            var resp = await axios.post('http://localhost:7779/dividaEvento', divida)
        }

        for (const transportado of transportadosRemovidos) {
            await axios.delete('http://localhost:7779/dividaEvento?transporte=' + transporte._id + '&user=' + transportado)
        }

        var dividasEventoRep = await axios.get('http://localhost:7779/dividaEvento?transporte=' + req.body._id)
        var dividasEvento = dividasEventoRep.data

        for (const transportado of transportadosMantidos) {
            var dividaRep = await axios.get('http://localhost:7779/dividaEvento?transporte=' + transporte._id + '&user=' + transportado)
            var divida = dividaRep.data

            // Se já não houver custo, apagar as dívidas
            if (!req.body.custo) {
                for (const divida of dividasEvento) {
                    await axios.delete('http://localhost:7779/dividaEvento/' + divida._id)
                }
            }  else if (req.body.custo && !transporte.custo) {
                var dividaPost = {
                    codEvento: req.body.codEvento,
                    codTransporte: req.body._id,
                    userID: transportado,
                    valor: req.body.custo
                }
                await axios.post('http://localhost:7779/dividaEvento', dividaPost)
            }
            else if(req.body.custo != transporte.custo) {
                // Se o custo foi alterado atualizar as dívidas
                var dividaPut = {
                    codEvento: req.body.codEvento,
                    codTransporte: req.body._id,
                    userID: divida.userID,
                    valor: req.body.custo
                }
                await axios.put('http://localhost:7779/dividaEvento/' + divida._id, dividaPut)
            }
        }

        await axios.put('http://localhost:7779/transporte/' + req.body._id, req.body)
        res.redirect('/transporte/' + req.body._id)
    } catch(erro) {
        res.render('error', {error: erro, message: "Erro!", user:user})
    }
})

router.get('/remover/:idTransporte', auth.verificaAcessoDiretor, async function(req, res, next) {
    let user = auth.getUser(req.cookies.token)
    try {
        var transporteRep = await axios.get('http://localhost:7779/transporte/' + req.params.idTransporte)
        var transporte = transporteRep.data

        await axios.delete('http://localhost:7779/dividaEvento?transporte=' + req.params.idTransporte)

        await axios.delete('http://localhost:7779/transporte/' + req.params.idTransporte)
        res.redirect('/evento/' + transporte.codEvento)
    } catch (erro) {
        res.render('error', {error: erro, message: "Erro!", user:user})
    }
})

router.get('/editar/:idTransporte', auth.verificaAcessoDiretor, async function(req, res, next) {
    let user = auth.getUser(req.cookies.token)
    try {
        var nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
        var transporteRep = await axios.get('http://localhost:7779/transporte/' + req.params.idTransporte)
        var transporte = transporteRep.data
        res.render('editarTransporte', {transporte: transporte, nivelAcesso: nivelAcesso, user:user})
    } catch (erro) {
        res.render('error', {error: erro, message: "Erro!", user:user})
    }


})
router.get('/:idTransporte', auth.verificaAcessoDiretor, async function(req, res, next) {
    let user = auth.getUser(req.cookies.token)
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
        res.render('transporteDiretoria', {transporte: transporte, nivelAcesso: nivelAcesso, transportados: transportadosList, condutores: condutoresList, user:user})
    } catch (error) {
        res.render('error', {error: error, message: "Erro!", user:user})
    }

})
module.exports = router
