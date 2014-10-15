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
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));
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
	'templatesImagesLink': 'libreria/', //questo è un link simbolico che viene creato dentro al repo dell'utente, per ogni project, e che linka a templatesImagesDir
	'templatesDir'		: 'templates/',
	'templatesExt'		: 'xml',
	'cacheDir'			: 'public/cache/', //questa deve essere una sottocartella di public/ altrimenti i file cachati non sarebbero visibili da fuori
	'cacheUrl'			: 'cache/', //questa deve essere uguale a cacheDir meno il prefisso "public/"
	'pdfDir'			: 'public/pdf/', //questa deve essere una sottocartella di public/ altrimenti i pdf generati non sarebbero visibili da fuori
	'pdfUrl'			: 'pdf/', //questa deve essere uguale a pdfDir meno il prefisso "public/"
	'defaultPdfDpi'			:  300, //è la risoluzione di riferimento dei pdf generati dai projects. cioè quando creo un nuovo project gli assegno questa risoluzione, e poi uso la risoluzione del project per il relativo pdf. (se cambio questa variabile qui la devo cambiare anche in sobuame.js)
	'imgWidgetMaxSize'	:  100000, //per il widget di editing immagini (quello con lo zoom, per inenderci) non passo mai immagini il cui numero di pixel sia maggiore di questo limite
	'uploaderOptions'	: {
		tmpDir:  'public/uploaded/tmp', //uso la cartella comune di cache? meglio tenere in altra cartella? ma deve essere in "public/"?
		publicDir: 'public/uploaded', //QUI qui va usata la cartella privata del cliente
		uploadDir: 'public/uploaded/files', //QUI qui va usata la cartella privata del cliente
		uploadUrl:  '/uploaded/files/', //QUI questo non lo voglio abilitare, posso toglierlo?
		maxPostSize: 104857600, // 100 MB - nota che va cambiato anche nel client sobuame.js
		minFileSize:  1,
		maxFileSize:  104857600, // 100 MB - nota che va cambiato anche nel client sobuame.js
		acceptFileTypes:  /.+/i,
		// Files not matched by this regular expression force a download dialog,
		// to prevent executing any scripts in the context of the service domain:
		inlineFileTypes:  /\.(gif|jpe?g|png)$/i,
		imageTypes:  /\.(gif|jpe?g|png)$/i,
		//imageVersions: {
		//	width:  80,
		//	height: 80
		//},
		accessControl: {
			allowOrigin: '*',
			allowMethods: 'OPTIONS, HEAD, GET, POST, PUT, DELETE',
			allowHeaders: 'Content-Type, Content-Range, Content-Disposition'
		},
		storage : {
			type : 'local'
		},
		nodeStatic: {
			cache:  3600 // seconds to cache served files //QUI come la gestisce? mi serve?
		}
	}



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

//renderer
app.sbam.renderer = require('./core/renderer');

/*
//pagination
app.sbam.pag = require('./core/pagination');
*/

//utils
app.sbam.utils = require('./core/utils');
app.sbam.utils.app = app; //mi serve che utils conosca internamente app




// config the uploader
//lasciare questa var globale perchè la leggo anche nelle route (oppure modificare anche le route)
app.sbam.uploader = require('blueimp-file-upload-expressjs')(app.sbam.config.uploaderOptions);


//routes
//get an instance of router
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

