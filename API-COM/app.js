var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

var mongoDB = 'mongodb://127.0.0.1/COM'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
var db = mongoose.connection
db.on('error', console.error.bind(console,'MongoDB connection error...'))
db.once('open',function(){
  console.log("Conexão ao MongoDB realizada com sucesso...")
})

var equipamentoRouter = require('./routes/equipamento');
var dividasEquipamentoRouter = require('./routes/dividasEquipamento');
var eventoRouter = require('./routes/evento');
var contabilidadeRouter = require('./routes/contabilidade');
var tamanhoEquipamentoRouter = require('./routes/tamanhoEquipamento');
var inscritoRouter = require('./routes/inscrito');
var transporteRouter = require('./routes/transporte');
var apoioKmRouter = require('./routes/apoioKm');
var dividaEventoRouter = require('./routes/dividaEvento');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/equipamento', equipamentoRouter);
app.use('/dividasEquipamento', dividasEquipamentoRouter);
app.use('/tamanhoEquipamento', tamanhoEquipamentoRouter);
app.use('/evento', eventoRouter);
app.use('/contabilidade',contabilidadeRouter);
app.use('/inscrito',inscritoRouter);
app.use('/transporte',transporteRouter);
app.use('/apoioKm', apoioKmRouter);
app.use('/dividaEvento', dividaEventoRouter);

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
