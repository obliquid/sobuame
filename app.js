/* ok per debug
var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Hello Http');
});
server.listen(3000);

return;
*/

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
//////var cookieSessions = require('cookie-sessions');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('sonbulacco'));
//////app.use(cookieSessions('songaglioffo'));
app.use(express.static(path.join(__dirname, 'public')));

//mongoose
app.mongoose = require('mongoose');
app.mongoose.connect('mongodb://localhost/sobuame');


//sbam initialization and configuration specific 
app.sbam = {};
app.locals.sbam = app.sbam;
app.sbam.config = {
	'locales':['en','it'],
	'defaultLocale':'en',
	'cookiesDurationMs':'64800000',
	'wpSiteUrl':'http://my-e.eu',
	'rpc_options' : {
		https : false,
		host : 'my-e.eu',
		port : 80,
		path : '/xmlrpc.php'
	}
};
//init wordpress rpc
console.log("A");
console.log("B");
app.sbam.rpc = require('wordpress-rpc'); 
console.log(app.sbam.rpc);
console.log("C");
//esempio da usare nelle route:
/*
		var wp = new app.sbam.rpc(app.sbam.config.rpc_options);
		console.log(wp);
		console.log("D");
		var parameter = [
			1,
			'administer',         //set your username
			'cecronespe'          //set your password
		];

		console.log("E");
		// http://codex.wordpress.org/XML-RPC_WordPress_API/Users
		wp.call('wp.getUsers', parameter, function(err, data){
			if (err) {
				console.log("err");
				console.log(err);
			} else {
				console.log("data");
				console.log(data);
				console.log(data.methodResponse.params[0]);
				console.log(data.methodResponse.params[0].length);
			}
		});
		console.log("F");
*/


/* figo ma non va se wp è su un dominio diverso...
//init wordpress authentication
app.sbam.wp_auth = require('wordpress-auth').create( 'http://my-e.eu',
	'FA*|.XN+Pn@C|J> #v^vO45Y)9v{~$1k>cIC=g=p{kE9H@,8B3n8juUT~CIU(U_8',//'LOGGED_IN_KEY from wp-config.php',
	'JGa;AB*#O@k5r~EB?*Wv,qKYjd0{^P5(?|vGUkEA[idXI;cW!Rnf9imdf^.[- 6Q',//'LOGGED_IN_SALT from wp-config.php',
	'bavosa.obliquid.org',//'MySQL host',
	'c109myeeu',//'MySQL username',
	'cecronespe',//'MySQL password',
	'c109myeeu',//'MySQL database',
	'wp_'//'WordPress table prefix (eg. wp_)' 
);
*/





//i18n
app.i18n = require("./core/i18n");
app.i18n.configure({
	// setup some locales - other locales default to en silently
	locales: app.sbam.config.locales,
	defaultLocale: app.sbam.config.defaultLocale
});
app.use(app.i18n.init);


//load sbam core modules
//models
app.sbam.models = require('./core/models');
//sessions
app.sbam.sess = require('./core/sessions');
//users
app.sbam.users = require('./core/users');
/*
//pagination
app.sbam.pag = require('./core/pagination');
*/
//utils
app.sbam.utils = require('./core/utils');
app.sbam.utils.app = app; //mi serve che utils conosca internamente app
//routes
app.sbam.routes = require('./core/routes');
app.sbam.routes.defineRoutes(app);
/*
//Static Helpers
app.locals({
	encURI: function(content){ return encodeURIComponent(content) },
	decURI: function(content){ return decodeURIComponent(content) },
	esc: function(content){ return escape(content) },
	uesc: function(content){ return unescape(content) },
	trunc: app.sbam.utils.trunc,
	getImg: app.sbam.utils.getImg,
	emailObfuscate: app.sbam.utils.emailObfuscate,
	renderJson: app.sbam.utils.renderJson
});


//Dynamic Helpers
app.dynamicHelpers({
	session: function (req, res) {
		return req.session;
	},
	app: function (req, res) {
		return req.app;
	},
	req: function (req, res) {
		return req;
	},
	res: function (req, res) {
		return res;
	},
	__i: function (req, res) {
		if ( req.cookies && req.cookies.currentlocale ) app.i18n.setLocale(req.cookies.currentlocale);
		return app.i18n.__;
	},
	__n: function (req, res) {
		if ( req.cookies && req.cookies.currentlocale ) app.i18n.setLocale(req.cookies.currentlocale);
		return app.i18n.__n;
	}
});
*/

//Dynamic Helpers
app.locals.__i = app.i18n.__;



/*
//configurazioni dell'app differenziate in base alla modalità del server (sviluppo/produzione)
app.configure('development', function(){
	//aumento il livello di debug
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
	//livello di debug al minimo
	app.use(express.errorHandler()); 
});
*/


//carico i modelli del DB, e li salvo a livello di app
app.sbam.models.defineModels(app.mongoose, app, function() {
	app.sbam.user = app.mongoose.model('user');
	app.sbam.debuggin = app.mongoose.model('debuggin');
	//console.log("finito coi modelli!");
})












/* some error handling */


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

