'use strict';

var url = require('url');
var loopback = require('loopback');
var boot = require('loopback-boot');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = module.exports = loopback();

// Passport configurators..
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

var bodyParser = require('body-parser');
var flash      = require('express-flash');

// attempt to build the providers/passport config
var config = {};
try {
  config = require('../providers.json');
} catch (err) {
  console.trace(err);
  process.exit(1); // fatal
}

// boot scripts mount components like REST API
boot(app, __dirname);

app.middleware('parse', bodyParser.json());
app.middleware('parse', bodyParser.urlencoded({
  extended: true,
}));

// The access token is only available after boot
app.middleware('auth', loopback.token({
  model: app.models.accessToken,
}));

app.middleware('session:before', cookieParser(app.get('cookieSecret')));
app.middleware('session', session({
  secret: 'kitty',
  saveUninitialized: true,
  resave: true,
}));

passportConfigurator.init();

// We need flash messages to see passport errors
app.use(flash());

passportConfigurator.setupModels({
  userModel: app.models.User,
  userIdentityModel: app.models.userIdentity,
  userCredentialModel: app.models.userCredential,
});

for (var s in config) {
  var c = config[s];
  c.session = c.session !== false;
  console.log(c.session);
  passportConfigurator.configureProvider(s, c);
}
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

app.get('/auth/account', ensureLoggedIn('/login'), function(req, res, next) {
  console.log(req);
  console.log('referer = ' + req.headers.referer);
  var urlObj = url.parse(req.headers.referer);
  var newUrl = urlObj.protocol + '//' + urlObj.host + '/auth/account';
  console.log('redirect to ' + newUrl);

  res.redirect(newUrl);
});

app.get('/login', function(req, res, next) {
  res.send({});
});

/*
app.get('/auth/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});
*/

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// start the server if `$ node server.js`
if (require.main === module)
  app.start();
