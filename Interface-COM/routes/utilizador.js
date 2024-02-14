/*
  Módulo users.js

  descrição: rotas associadas aos utilizadores do sistema
  Estas rotas envolvem:
    - listagem dos utilizadores (tanto sócios como diretores);
    - registo de um utilizador (tanto sócio como diretor);
    - edição de um utilizador;
    - visualização de um utilizador.
*/

var express = require('express');
var router = express.Router();
var axios = require('axios')
var auth = require('../helpers/auth')
var eventos = require('../helpers/eventos')
var users = require('../helpers/users')

/*
  descrição: renderiza a página de utilizadores. Esta página contém:
    - formulário para adição de um novo utilizador (sócio ou diretor);
    - listagem de todos os utilizadores, com a opção de edição de todos
    os campos do utilizador, assim como a remoção de um utilizador;
  Apenas diretores podem acessar a esta página.
*/
router.get('/', auth.verificaAcessoDiretor, function(req, res, next) {
    let user = auth.getUser(req.cookies.token)
    axios.get('http://localhost:7780/user/')
    .then(resp =>{
        utilizadores = resp.data
        nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
        res.render('utilizadores',{utilizadores:utilizadores,nivelAcesso:nivelAcesso, user:user})
    })
    .catch( erro => {
        res.render('error', {error: erro, message: "Erro!", user:user})
    })
})

/*
  descrição: renderiza a página do perfil do utilizador. Esta página contém:
    - informações do utilizador (com opção para edição de qualquer campo com exceção do nível da credencial);
    - listagem das dívidas sobre equipamentos do utilizador;
    - listagem das dívidas sobre eventos do utilizador;
    - listagem das receitas do utilizador;
    - balanço (saldo do utilizador).
*/
router.get('/perfil', auth.verificaAcessoSocio, async function(req, res, next) {
    let user = auth.getUser(req.cookies.token)
  nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
  idUtilizador = auth.getID(req.cookies.token)
    try {
        var utilizadorRep = await axios.get('http://localhost:7780/user/' + idUtilizador)
        var utilizador = utilizadorRep.data

        var dividasEquipamentosRep = await axios.get('http://localhost:7779/dividasEquipamento/')
        var dividasEquipamentos = dividasEquipamentosRep.data

        var dividasEventoRep = await axios.get('http://localhost:7779/dividaEvento?user=' + utilizador.nSocio)
        var dividasEvento = dividasEventoRep.data

        var receitasEventoRep =  await axios.get('http://localhost:7779/receitaEvento?user=' + utilizador.nSocio)
        var receitasEvento = receitasEventoRep.data

        var eventosMap = await eventos.mapEvento([dividasEvento, receitasEvento])

        console.log(eventosMap)

        var dividasUtilizador = []
        for (const divida of dividasEquipamentos){
            if (divida.userID == idUtilizador) {
                dividasUtilizador.push(divida)
            }
        }

        var balanco = users.balanco(receitasEvento, dividasEvento)
        console.log(dividasEvento.length)
        res.render('meuPerfil',{utilizador:utilizador,dividasEquipamentos:dividasUtilizador,dividasEvento:dividasEvento,eventosMap:eventosMap,nivelAcesso:nivelAcesso, receitasEvento: receitasEvento, balanco: balanco, user:user})

    } catch(erro) {
        res.render('error', {error: erro, message: "Erro!", user:user})
    }
  //.then(resp =>{
  //    utilizador = resp.data
  //    axios.get('http://localhost:7779/dividasEquipamento/')
  //    .then(resp =>{
  //        dividasEquipamentos = resp.data
  //        dividasUtilizador = []
  //        for (var divida of dividasEquipamentos){
  //          if (divida.userID == idUtilizador){
  //            dividasUtilizador.push(divida)
  //          }
  //        }
  //        res.render('meuPerfil',{utilizador:utilizador,dividasEquipamentos:dividasUtilizador,nivelAcesso:nivelAcesso})
  //    })
  //    .catch( erro => {
  //        res.render('error', {error: erro, message: "Erro!"})
  //    })
  //})
  //.catch( erro => {
  //    res.render('error', {error: erro, message: "Erro!"})
  //})
})

/*
  descrição: realiza o registo de um utilizador. Os dados do utilizador
  são enviados através do req.body. Apenas diretores podem criar novos utilizadores.
*/
router.post('/adicionar', auth.verificaAcessoDiretor, function(req, res, next) {
    let user = auth.getUser(req.cookies.token)
  axios.post('http://localhost:7780/user/registo',req.body)
    .then(resp =>{
      nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
      res.status(200).render('feedbackServidor',{texto:"Utilizador adicionado com sucesso",voltarUrl:"/utilizador",nivelAcesso:nivelAcesso, user:user})
    })
    .catch(erro =>{
      if (erro.response.status == 520){
        nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
        res.status(520).render('feedbackServidor',{texto:erro.response.data.message,voltarUrl:"/utilizador",nivelAcesso:nivelAcesso, user:user})
      }else{
        res.render('error', {error: erro, message: erro, user:user})
      }
    })
})

/*
  descrição: renderiza a página de edição de um utilizador.
  Após modificar os campos que pretende, o diretor pode cancelar a edição
  e voltar a página de utilizadores ou atualizar os tais valores que modificou do utilizador.
*/
router.get('/editar/:idUtilizador', auth.verificaAcessoSocioOuDiretor, function(req, res, next) {
    let user = auth.getUser(req.cookies.token)
  axios.get("http://localhost:7780/user/" + req.params.idUtilizador)
    .then(function(resp){
        var utilizador = resp.data
        nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
        res.render('editarUtilizador', {utilizador:utilizador, nivelAcesso:nivelAcesso, user:user})
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro!", user:user})
    })
})

/*
  descrição: realiza a edição de um utilizador. Os dados do utilizador
  são enviados através do req.body.
*/
router.post('/editar', auth.verificaAcessoSocioOuDiretor, function(req, res, next) {
    let user = auth.getUser(req.cookies.token)
  axios.put('http://localhost:7780/user/' + req.body._id,req.body)
    .then(resp =>{
      nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
      if (nivelAcesso == "diretor"){
        res.status(200).render('feedbackServidor',{texto:"Utilizador alterado com sucesso",voltarUrl:"/utilizador",nivelAcesso:nivelAcesso, user:user})
      }else{
        res.status(200).render('feedbackServidor',{texto:"Utilizador alterado com sucesso",voltarUrl:"/utilizador/perfil" ,nivelAcesso:nivelAcesso, user:user})
      }
    })
    .catch(erro =>{
      res.render('error', {error: erro, message: erro, user:user})
    })
})

/*
  descrição: renderiza a página de visualização dos dados de um utilizador (tanto para o diretor como para o sócio)
*/
router.get('/:idUtilizador', auth.verificaAcessoSocioOuDiretor, function(req, res, next) {
    let user = auth.getUser(req.cookies.token)
  axios.get("http://localhost:7780/user/" + req.params.idUtilizador)
    .then(function(resp){
        var utilizador = resp.data
        res.render('utilizador', {utilizador:utilizador, user:user})
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro!", user:user})
    })
})

/*
  descrição: remove o utilizador com id <idUser>
*/
router.get('/remover/:idUser', auth.verificaAcessoDiretor, function(req, res, next) {
    let user = auth.getUser(req.cookies.token)
  axios.delete("http://localhost:7780/user/"+req.params.idUser)
    .then(function(resp){
        res.render('feedbackServidor', {texto:"Utilizador removido com sucesso",voltarUrl:"/utilizador/", user:user})
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro!", user:user})
    })
})

module.exports = router;