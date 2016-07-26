
var config = require('./config'),
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session');
    fs= require('fs');
    path=require('path');



module.exports = function() {
  var app = express();

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());

  app.use(methodOverride());

  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }));

  app.use(function(req, res, next) {
    	res.header('Access-Control-Allow-Origin', 'http://localhost');
    	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    	next();
  });

  var store = new session.MemoryStore();

  app.use(session({ secret: 'something', store: store }));

  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000/auth/facebook');
    next();
  });

  app.use(express.static('./public'));


  /********************************router files*****************************************/


  /********************************router files*****************************************/
  return app;
};