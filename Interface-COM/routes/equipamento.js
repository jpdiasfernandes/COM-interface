/*
  Módulo equipamentos.js
  
  descrição: rotas associadas aos equipamentos e dívidas sobre equipamentos,
  tanto na vista de um sócio tanto na vista de um diretor. No caso de ser um diretor,
  este terá acesso a operações de edição, remoção e adição de equipamentos, assim como
  a visualização e edição do estado das dívidas dos utilizadores sobre os equipamentos 
  (requisições realizadas). No caso de ser um sócio, este terá acesso aos equipamentos
  disponibilizados, assim como a opção de poder requisitá-los.
*/

var express = require('express');
var router = express.Router();
var axios = require('axios')
var auth = require('../helpers/auth')

/*
  descrição: renderiza a página de equipamentos na vista do sócio ou do diretor segundo o nível de acesso.
  Se for sócio a vista apresenta os equipamentos com a opção de requisitá-los.
  Se for diretor apresenta os equipamentos com as opções de editá-los, criá-los e
  removê-los, assim como a visualização das dívidas de equipamentos dos utilizadores
  que fizeram uma requisição. O diretor ainda pode atualizar o estado destas requisições.
*/
router.get('/', auth.verificaAcessoSocioOuDiretor, function(req, res, next) {
  axios.get("http://localhost:7779/equipamento")
    .then(function(resp){
        var equipamentos = resp.data
        nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
        if (nivelAcesso == "socio"){
          res.render('equipamentosSocio', {equipamentos:equipamentos})
        }else if (nivelAcesso == "diretor"){
          axios.get("http://localhost:7779/dividasEquipamento")
            .then(function(resp){
                var dividasEquipamento = resp.data
                res.render('equipamentosDiretoria', {dividasEquipamento:dividasEquipamento,equipamentos:equipamentos})
            })
            .catch( erro => {
              res.render('error', {error: erro, message: "Erro!"})
            })
        }
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro!"})
    })
})


/*
  descrição: remove o equipamento com id <idEquipamento>
*/
router.get('/remover/:idEquipamento', auth.verificaAcessoDiretor, function(req, res, next) {
  console.log("cheguei")
  axios.delete("http://localhost:7779/equipamento/"+req.params.idEquipamento)
    .then(function(resp){
        res.render('feedbackServidor', {texto:"Equipamento removido com sucesso",voltarUrl:"/equipamento/"})
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro!"})
    })
})

/*
  descrição: renderiza a página de requisição de um equipamento.
  Após modificar selecionar o tamanho que pretende, o utilizador pode enfim
  requisitar o equipamento ou cancelar a operação
*/
router.get('/requisitar/:idEquipamento', auth.verificaAcessoSocio,function(req, res, next) {
  axios.get("http://localhost:7779/equipamento/" + req.params.idEquipamento)
    .then(function(resp){
        var equipamento = resp.data
        res.render('requisitarEquipamento', {equipamento:equipamento})
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro!"})
    })
});

/*
  descrição: renderiza a página de edição de um equipamento.
  Após modificar os campos que pretende, o diretor pode cancelar a edição
  e voltar a página principal ou atualizar os tais valores que modificou do equipamento.
*/
router.get('/editar/:idEquipamento', auth.verificaAcessoDiretor,function(req, res, next) {
  axios.get("http://localhost:7779/equipamento/" + req.params.idEquipamento)
    .then(function(resp){
        var equipamento = resp.data
        axios.get("http://localhost:7779/tamanhoEquipamento/")
        .then(function(resp){
            var tamanhosEquipamentos = resp.data
            res.render('editarEquipamento', {equipamento:equipamento,tamanhosEquipamentos:tamanhosEquipamentos})
        })
        .catch( erro => {
          res.render('error', {error: erro, message: "Erro!"})
        })
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro!"})
    })
});

/*
  descrição: renderiza a página de adição de um equipamento.
*/
router.get('/adicionar', auth.verificaAcessoDiretor,function(req, res, next) {
  axios.get("http://localhost:7779/tamanhoEquipamento/")
    .then(function(resp){
        var tamanhosEquipamentos = resp.data
        res.render('adicionarEquipamento', {tamanhosEquipamentos:tamanhosEquipamentos})
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro!"})
    })

})

/*
  descrição: atualiza os valores de um equipamento.
  O equipamento é enviado através do req.body (juntamente
  com o seu ID)
*/
router.post('/editar', auth.verificaAcessoDiretor,function(req, res, next) {
  
  equipamento = {}
  equipamento["codEquipamento"] = req.body.codEquipamento
  equipamento["tipo"] = req.body.tipo
  equipamento["custo"] = req.body.custo 
  equipamento["_id"] = req.body._id
  equipamento["stock"] = []
  
  for (i = 0; i < req.body.tamanho.length; i++){
      equipamento["stock"].push({
        "tamanho":req.body.tamanho[i],
        "quantidade":req.body.quantidade[i]
      })
  }

  axios.put("http://localhost:7779/equipamento/"+equipamento._id,equipamento)
    .then(function(resp){
      res.render('feedbackServidor', {texto:"Equipamento alterado com sucesso",voltarUrl:"/equipamento/"})
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro!"})
    })
})

/*
  descrição: adiciona um novo equipamento
  O equipamento é enviado através do req.body 
*/
router.post('/adicionar', auth.verificaAcessoDiretor,function(req, res, next) {
  console.log(req.body)
  equipamento = {}
  equipamento["codEquipamento"] = req.body.codEquipamento
  equipamento["tipo"] = req.body.tipo
  equipamento["custo"] = req.body.custo 
  equipamento["stock"] = []
  
  for (i = 0; i < req.body.tamanho.length; i++){
      equipamento["stock"].push({
        "tamanho":req.body.tamanho[i],
        "quantidade":req.body.quantidade[i]
      })
  }

  axios.post("http://localhost:7779/equipamento",equipamento)
    .then(function(resp){
      res.render('feedbackServidor', {texto:"Equipamento adicionado com sucesso",voltarUrl:"/equipamento/"})
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro!"})
    })
})

/*
  descrição: requisita um equipamento X de tamanho Y
  Os dados são enviados através do body
*/
router.post('/requisitar', auth.verificaAcessoSocio,function(req, res, next) {
  idUtilizador = auth.getID(req.cookies.token)
  var dividaEquipamento = {
    codEquipamento:req.body.codEquipamento,
    userID:idUtilizador,
    estado:"não entregue",
    tamanho:req.body.tamanho
  }

  axios.post("http://localhost:7779/dividasEquipamento",dividaEquipamento)
    .then(function(resp){
      res.render('feedbackServidor', {texto:"Equipamento requisitado adicionado com sucesso",voltarUrl:"/equipamento/"})
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro!"})
    })
})

/*
  descrição: renderiza a página de edição de uma divida de um equipamento.
  Após modificar o estado da divida, o diretor pode cancelar a edição
  e voltar a página principal ou atualizao tal estado que modificou da divida.
*/
router.get('/dividaEquipamento/editar/:idDividaEquipamento', auth.verificaAcessoDiretor,function(req, res, next) {
  axios.get("http://localhost:7779/dividasEquipamento/" + req.params.idDividaEquipamento)
    .then(function(resp){
        var dividaEquipamento = resp.data
        res.render('editarDividaEquipamento', {dividaEquipamento:dividaEquipamento})
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro!"})
    })
})

/*
  descrição: atualiza o estado da dívida de um equipamento.
  A dívida do equipamento é enviada através do req.body (juntamente
  com o seu ID)
*/
router.post('/dividaEquipamento/editar', auth.verificaAcessoDiretor,function(req, res, next) {
  axios.put("http://localhost:7779/dividasEquipamento/"+req.body._id,req.body)
    .then(function(resp){
      res.render('feedbackServidor', {texto:"Estado da dívida do equipamento alterada com sucesso",voltarUrl:"/equipamento/"})
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro!"})
    })

})

module.exports = router;