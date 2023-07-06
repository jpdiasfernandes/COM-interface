/*
  Módulo notificacao.js
  
  descrição: rotas associadas as notificações, tanto na vista de um sócio tanto na vista de um diretor. 
  No caso de ser um diretor, este terá acesso a operações de edição, remoção e adição de notificações. 
  No caso de ser um sócio, este somente poderá visualizar as notificações do sistema.
*/

var express = require('express');
var router = express.Router();
var axios = require('axios')
var auth = require('../helpers/auth')

/*
  descrição: renderiza a página de notificações do sócio ou do diretor segundo o nível de acesso.
*/
router.get('/', auth.verificaAcessoSocioOuDiretor, function(req, res, next) {
    axios.get("http://localhost:7779/notificacao")
        .then(function(resp){
            var notificacoes = resp.data
            nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
            if (nivelAcesso == "socio"){
                res.render('notificacaoSocio', {notificacoes:notificacoes})
            }else if (nivelAcesso == "diretor"){
                res.render('notificacaoDiretoria', {notificacoes:notificacoes})
            }
        })
        .catch( erro => {
            res.render('error', {error: erro, message: "Erro!"})
        })
})

/*
  descrição: adiciona uma nova notificação
  A notificação é enviada através do req.body 
*/
router.post('/adicionar', auth.verificaAcessoDiretor,function(req, res, next) {
    req.body.data = new Date().toISOString().substring(0, 16)
    axios.post("http://localhost:7779/notificacao",req.body)
      .then(function(resp){
        res.render('feedbackServidor', {texto:"Notificação adicionada com sucesso",voltarUrl:"/notificacao/",})
      })
      .catch( erro => {
        res.render('error', {error: erro, message: "Erro!"})
      })
})

/*
  descrição: renderiza a página de edição de uma notificação.
  Após modificar a notificação, o diretor pode cancelar a edição
  e voltar a página de notificações ou confirmar a modificação da notificação.
*/
router.get('/editar/:idNotificacao', auth.verificaAcessoDiretor,function(req, res, next) {
    axios.get("http://localhost:7779/notificacao/" + req.params.idNotificacao)
      .then(function(resp){
          var notificacao = resp.data
          res.render('editarNotificacao', {notificacao:notificacao})
      })
      .catch( erro => {
        res.render('error', {error: erro, message: "Erro!"})
      })
})
  
/*
  descrição: atualiza uma notificação. Os dados a serem alterados
  da notificação são enviados através do req.body (juntamente
  com o seu ID)
*/
router.post('/editar', auth.verificaAcessoDiretor,function(req, res, next) {
axios.put("http://localhost:7779/notificacao/"+req.body._id,req.body)
    .then(function(resp){
    res.render('feedbackServidor', {texto:"Notificação alterada com sucesso",voltarUrl:"/notificacao/"})
    })
    .catch( erro => {
    res.render('error', {error: erro, message: "Erro!"})
    })

})


/*
  descrição: remove a notificação com id <idNotificacao>
*/
router.get('/remover/:idNotificacao', auth.verificaAcessoDiretor, function(req, res, next) {
    axios.delete("http://localhost:7779/notificacao/"+req.params.idNotificacao)
      .then(function(resp){
          res.render('feedbackServidor', {texto:"Notificação removida com sucesso",voltarUrl:"/notificacao/"})
      })
      .catch( erro => {
        res.render('error', {error: erro, message: "Erro!"})
      })
})


/*
  descrição: renderiza a página das notificações segundo o filtro selecionado para as notificações
*/
router.post('/filtro', auth.verificaAcessoSocioOuDiretor,function(req, res, next) {
  queryString = '?'
  
  // Parse dos filtros na query string
  if (req.body.campo != ''){
    queryString += 'sort=' + req.body.campo + "&"
  }
  if (req.body.ordem != ''){
    queryString += 'order=' + req.body.ordem + "&"
  }
  
  axios.get("http://localhost:7779/notificacao" + queryString)
    .then(function(resp){
        var notificacoes = resp.data
        nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
        if (nivelAcesso == "socio"){
            res.render('notificacaoSocio', {notificacoes:notificacoes})
        }else if (nivelAcesso == "diretor"){
            res.render('notificacaoDiretoria', {notificacoes:notificacoes})
        }
    })
    .catch( erro => {
        res.render('error', {error: erro, message: "Erro!"})
    })
})

/*
  descrição: renderiza a página da notificação com id <idNotificacao>
*/
router.get('/:idNotificacao', auth.verificaAcessoDiretor, function(req, res, next) {
  axios.get("http://localhost:7779/notificacao/"+req.params.idNotificacao)
    .then(function(resp){
        var notificacao = resp.data
        res.render('notificacao', {notificacao:notificacao})
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro!"})
    })
})

module.exports = router;