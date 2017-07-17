var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var port = 8100;
var mongoPort = 8003;
var postgresPort = 8000;
var postgresId = 'bustabit';
var postgresPw = '1234';

const pg = require('pg');
const connectionString = process.env.DATABASE_URL || `postgres://${postgresId}:${postgresPw}@comblue.xyz:${postgresPort}/bustabitdb`;
const client = new pg.Client(connectionString);
client.connect();

var index = require('./routes/index');
var users = require('./routes/test/users');
var login = require('./routes/login');
var logout = require('./routes/logout');
var regs = require('./routes/test/regs');

var agent_create = require('./routes/agent_mng/agent_create');
var agent_list = require('./routes/agent_mng/agent_list');
var agent_share = require('./routes/agent_mng/agent_share');
var agent_trade = require('./routes/agent_mng/agent_trade');

var agent1 = require('./routes/agents/agent1');

var agent_summary = require('./routes/reports/agent_summary');
var round_summary = require('./routes/reports/round_summary');


var session = require('express-session');

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
app.use('/regs', regs);

app.use('/agent_create', agent_create);
app.use('/agent_list', agent_list);
app.use('/agent_share', agent_share);
app.use('/agent_trade', agent_trade);

app.use('/agent1', agent1);

app.use('/agent_summary', agent_summary);
app.use('/round_summary', round_summary);
require('./routes/reports/rest/round_rest')(app, client);

// postgres 처리 할때는 아래와 같이 db정보를 넘겨야 함
require('./routes/test/inputs')(app, client);
require('./routes/test/rests')(app, Agent);


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
