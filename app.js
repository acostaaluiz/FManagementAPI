var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/categoryapi');
var categoryIncomeRouter = require('./routes/categoryincomeapi');
var creditCardRouter = require('./routes/creditcardapi');
var dateRouter = require('./routes/dateapi');
var expenseRouter = require('./routes/expenseapi');
var frequencyRouter = require('./routes/frequencyapi');
var incomeRouter = require('./routes/incomeapi');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categorycontroller', categoryRouter);
app.use('/categoryincomecontroller', categoryIncomeRouter);
app.use('/creditcardcontroller', creditCardRouter);
app.use('/datecontroller', dateRouter);
app.use('/expensecontroller', expenseRouter);
app.use('/frequencycontroller', frequencyRouter);
app.use('/incomecontroller', incomeRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
