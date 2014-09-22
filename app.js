/**
 * SOBUAME
 *
 *
 * Copyright (C) 2014 Federico Carrara (federico@obliquid.it)
 *
 * For more information http://obliquid.org/
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */




	
// APPLICATION




//process.env.TZ = 'Europe/Rome';

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
app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/javascripts')); //serve??

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
	'wpSiteUrl':'my-e.eu',
	'rpc_options' : {
		https : false,
		host : 'my-e.eu',
		port : 80,
		path : '/xmlrpc.php'
	},
	'mysqlHost'     	: 'bavosa.obliquid.org',
	'mysqlDatabase' 	: 'c109myeeu',
	'mysqlUser'     	: 'c109myeeu',
	'mysqlPassword' 	: 'cecronespe',
	'fontDir'			: 'fonts/', //this is intended as a subfolder of public/ and should not be changed since it's defined also in client file sobuame.js
	'templatesImagesDir': 'templates/images/',
	'templatesDir'		: 'templates/',
	'templatesExt'		: 'xml',
	'cacheDir'			: 'public/cache/', //questa deve essere una sottocartella di public/ altrimenti i file cachati non sarebbero visibili da fuori
	'cacheUrl'			: 'cache/', //questa deve essere uguale a cacheDir meno il prefisso "public/"
	'pdfPdi'			:  300, //è la risoluzione di riferimento per la generazione dei pdf. se cambiata qui va cambiata anche nel frontend sobuame.js
	'imgWidgetMaxSize'	:  100000 //per il widget di editing immagini (quello con lo zoom, per inenderci) non passo mai immagini il cui numero di pixel sia maggiore di questo limite

};

//i18n
app.i18n = require("./core/i18n");
app.i18n.configure({
	// setup some locales - other locales default to en silently
	locales: app.sbam.config.locales,
	defaultLocale: app.sbam.config.defaultLocale
});
app.use(app.i18n.init);



//load sbam core modules
//OKKIO: spesso i nomi dei modules sono plurali (es. app.sbam.users), i nomi dei models sono singolari (es. app.sbam.user)

//models
app.sbam.models = require('./core/models');

//sessions
app.sbam.sess = require('./core/sessions');

//users
app.sbam.users = require('./core/users');

//projects
app.sbam.projects = require('./core/projects');

/*
//pagination
app.sbam.pag = require('./core/pagination');
*/

//utils
app.sbam.utils = require('./core/utils');
app.sbam.utils.app = app; //mi serve che utils conosca internamente app


//routes
// get an instance of router
var router = express.Router();
app.use('/', router);
app.sbam.routes = require('./core/routes');
app.sbam.routes.defineRoutes(router);
// apply the routes to our application



//Dynamic Helpers
app.locals.__i = app.i18n.__;


//carico i modelli del DB, e li salvo a livello di app
app.sbam.models.defineModels(app.mongoose, app, function() {
	app.sbam.user = app.mongoose.model('user');
	app.sbam.project = app.mongoose.model('project');
	app.sbam.debuggin = app.mongoose.model('debuggin');
	//console.log("finito coi modelli!");
	//i primi a consumare i modelli saranno le routes, che ragionevolmente verranno chiamate dopo che i modelli sono stati caricati in fase di boot dell'applicazione
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



















/*
		//esempio funzionante di richiamo metodi wordpress via rpc:
		//aggiugnere dependence in package.json
		//"wordpress-rpc": ">= 0.1.3"
		 
		//init wordpress rpc
		console.log("A");
		console.log("B");
		app.sbam.rpc = require('wordpress-rpc'); 
		console.log(app.sbam.rpc);
		console.log("C");

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


/*
//Static Helpers
app.locals({
	encURI: function(content){ return encodeURIComponent(content) },
	decURI: function(content){ return decodeURIComponent(content) },
	esc: function(content){ return escape(content) },
	uesc: function(content){ return unescape(content) },
	trunc: app.sbam.utils.trunc,
	getImago: app.sbam.utils.getImago,
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

