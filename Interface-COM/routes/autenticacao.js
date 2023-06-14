var express = require('express');
var router = express.Router();
var axios = require('axios')

/*
  descrição: renderiza a página de login do utilizador
*/
router.get('/login', function(req, res, next) {
    res.render('login')
})

/*
  descrição: renderiza a página de registo de utilizador
*/
router.get('/registo', function(req, res, next) {
    res.render('registo')
})

module.exports = router;