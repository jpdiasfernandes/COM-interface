var express = require('express');
var router = express.Router();
var User = require('../controllers/user')
var userModel = require('../models/user')
var passport = require('passport')
var jwt = require('jsonwebtoken')

router.get('/', function(req, res) {
    User.list()
    .then(users => {
      res.jsonp(users)
    })
    .catch(err => {
      res.jsonp({error: err, message: "Erro na obtenção da lista de utilizadores"})
    })
});

router.get('/:id', function(req, res) {
  User.getUser(req.params.id)
    .then(u => {
      res.jsonp(u)
    })
    .catch(erro => {
      res.jsonp({error: erro, message: "Erro na obtenção do utilizador " + req.params.id})
    })
});

router.post('/registo', function(req, res) {
  var data = new Date().toISOString().substring(0,16)
  console.log(req.body)
  res.status(200)
  /*
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
      if (err) 
        res.status(520).jsonp({error: err, message: "Register error: " + err})
      else
        res.status(201).jsonp('OK')      
    })
    */
})  

router.post('/login', passport.authenticate('local'), function(req, res){
  jwt.sign({ 
    username: req.user.username,
    nivel: req.user.nivel,  
    sub: 'com'}, 
    "com",
    {expiresIn: 3600},
    function(e, token) {
      if(e) res.status(500).jsonp({error: "Erro na geração do token: " + e}) 
      else res.status(201).jsonp({token: token})
    });
})

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