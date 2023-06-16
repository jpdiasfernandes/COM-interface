var express = require('express');
var router = express.Router();
var User = require('../controllers/user')
var userModel = require('../models/user')
var passport = require('passport')
var jwt = require('jsonwebtoken')

/*
  descrição: lista os utilizadores da aplicação (tanto sócios como diretores)
*/
router.get('/', function(req, res) {
  User.list()
  .then(users => {
    res.jsonp(users)
  })
  .catch(err => {
    res.jsonp({error: err, message: "Erro na obtenção da lista de utilizadores"})
  })
});

/*
  descrição: retorna o utilizador com id = <id>
*/
router.get('/:id', function(req, res) {
  User.getUser(req.params.id)
    .then(u => {
      res.jsonp(u)
    })
    .catch(erro => {
      res.jsonp({error: erro, message: "Erro na obtenção do utilizador " + req.params.id})
    })
});

/*
  descrição: realiza o registo de um utilizador. Os dados do utilizador
  são recebidos através do req.body. O campo req.body.password é utilizado
  como senha da conta do utilizador. É utilizado o método register do modelo
  user do mongoose para salvar o utilizador. Este método, do plugin passportLocalMongoose,
  recebe um model de utilizador e salva automaticamente a senha hasheada para questões 
  de segurança.
  Erros no registo, por haver já um utilizador com <username>, são enviados com
  status code 520.
*/
router.post('/registo', function(req, res) {
  var data = new Date().toISOString().substring(0,16)
  userModel.register(
    new userModel({ 
      username: req.body.username,
      nome: req.body.nome,
      nivel: req.body.nivel,
      active: true,
      dateCreated: data,
      nFPO: req.body.nFPO,
      nSocio: req.body.nSocio,
      idade: req.body.idade,
      sexo: req.body.sexo,
      cc: req.body.cc,
      email: req.body.email,
      telFixo: req.body.telFixo,
      telMovel: req.body.telMovel,
      morada: req.body.morada
    }), 
    req.body.password, 
    function(err, user) {
      console.log(err)
      if (err) 
        res.status(520).jsonp({error: err, message: "Erro no registo: " + err})
      else
        res.status(201).jsonp('OK')      
    })
})  

/*
  descrição: realiza o login de um utilizador. O login é feito através do username
  e da password no moddileware passport.authenticate. Caso for bem sucedido (username
  e password correctas) então é executado o jwt.sign, caso contrário é enviado um erro
  com status code 401. O username e a password são enviadas recebidas do req.body.
*/
router.post('/login', passport.authenticate('local'), function(req, res){
  console.log(req.user._id)
  jwt.sign({ 
    username: req.user.username,
    id: req.user._id,
    nivel: req.user.nivel,  
    sub: 'com'}, 
    "com",
    {expiresIn: 3600},
    function(e, token) {
      if(e){ 
        res.status(500).jsonp({error: "Erro na geração do token: " + e}) 
      }else{
        res.status(201).jsonp({token: token})
      }
    })
})

/*
  descrição: atualiza o utilizador com id = <id>
*/
router.put('/:id', function(req, res){
  User.updateUser(req.params.id, req.body)
  .then(u => {
    res.jsonp(u)
  })
  .catch(erro => {
    res.jsonp({error: erro, message: "Erro na alteração do utilizador " + req.params.id})
  })
})

router.put('/:id/ativar', function(req, res){
  User.updateUserStatus(req.params.id, true)
  .then(u => {
    res.jsonp(u)
  })
  .catch(erro => {
    res.jsonp({error: erro, message: "Erro na alteração do utilizador " + req.params.id})
  })
})

router.put('/:id/desativar', function(req, res){
  User.updateUserStatus(req.params.id, false)
  .then(u => {
    res.jsonp(u)
  })
  .catch(erro => {
    res.jsonp({error: erro, message: "Erro na alteração do utilizador " + req.params.id})
  })
})

router.delete('/:id', function(req, res){
  User.deleteUser(req.params.id)
  .then(u => {
    res.jsonp(u)
  })
  .catch(erro => {
    res.jsonp({error: erro, message: "Erro na remoção do utilizador " + req.params.id})
  })
})

module.exports = router;