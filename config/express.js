var express = require('express'),
  session = require('express-session'),
  MongoStore = require('connect-mongo')(session),
  http = require('http'),
  socketio = require('socket.io'),
  morgan = require('morgan'),
  compress = require('compression'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  passport = require('passport'),
  flash = require('connect-flash');

var config = require('../config/env/development');


module.exports = function(db) {
  var app = express();
  var server = http.createServer(app);
  var io = socketio.listen(server);

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  var mongoStore = new MongoStore({
    url: 'mongodb://localhost/mean-book'
  });

  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret,
    store: mongoStore
  }));

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());
  app.use(methodOverride());

  app.set('views', './app/views');
  app.set('view engine', 'ejs');

  app.use(flash());

  app.use(passport.initialize());
  app.use(passport.session());


  app.use(express.static('./public'));

  require('../app/routes/vehicle.server.routes.js')(app);
  require('../app/routes/articles.server.routes.js')(app);
  require('../app/routes/users.server.routes.js')(app);
  require('../app/routes/index.server.routes.js')(app);
  require('./socketio')(server, io, mongoStore);

  return server;
};
