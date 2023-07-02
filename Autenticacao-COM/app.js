var createError = require('http-errors');
var express = require('express');
var session = require('express-session')
var cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid')
var logger = require('morgan');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('./models/user')
var mongoose = require('mongoose')

var mongoDB = process.env.MONGODB_URL

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
var db = mongoose.connection
db.on('error', console.error.bind(console,'MongoDB connection error...'))
db.once('open',function(){
  console.log("Conexão ao MongoDB realizada com sucesso...")
})

var usersRouter = require('./routes/user');
var app = express();

app.use(session({
  genid: req => {
    return uuidv4()},
  secret: 'com',
  resave: false,
  saveUninitialized: true
}))

// Configuração do passport
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize())
app.use(passport.session())

app.use('/user', usersRouter);

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
  console.log(err)
  res.json({error:err});
});

module.exports = app;
