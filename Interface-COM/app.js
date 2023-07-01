var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var homeRouter = require('./routes/home');
var equipamentoRouter = require('./routes/equipamento');
var autenticacaoRouter = require('./routes/autenticacao');
var utilizadorRouter = require('./routes/utilizador');
var eventoRouter = require('./routes/evento');
var inscritoRouter = require('./routes/inscrito');
var transporteRouter = require('./routes/transporte');
var apoioKmRouter = require('./routes/apoioKm');
var notificacaoRouter = require('./routes/notificacao');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/home', homeRouter);
app.use('/equipamento', equipamentoRouter);
app.use('/autenticacao', autenticacaoRouter);
app.use('/utilizador', utilizadorRouter);
app.use('/evento', eventoRouter);
app.use('/inscrito', inscritoRouter);
app.use('/transporte', transporteRouter);
app.use('/apoioKm', apoioKmRouter);
app.use('/notificacao', notificacaoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
