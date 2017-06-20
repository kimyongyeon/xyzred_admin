var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var logout = require('./routes/logout');
var inputs = require('./routes/inputs');
var regs = require('./routes/regs');
var session = require('express-session');

var app = express();
var port = 8100;
var mongoPort = 8003;

var mongoose    = require('mongoose');
// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});
mongoose.connect(`mongodb://comblue.xyz:${mongoPort}/mongodb_tutorial`);
var Agent = require('./models/agent');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'xyzred.com-secret',
    resave: false,
    saveUninitialized: true
}));

app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/users', users);
app.use('/inputs', inputs);
app.use('/regs', regs);
var rests = require('./routes/rests')(app, Agent);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
