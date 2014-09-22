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




	
// ROUTES


function defineRoutes(router) {
	
	// route middleware that will happen on every request
	router.use(function(req, res, next) {
		console.log('route matched:');
		console.log('method='+req.method);
		console.log('url='+req.url);
		console.log('path='+req.path);
		//check valid user (apart from login page)
		if ( req.url.substring(0, 6) != "/login" ) {
			req.app.sbam.sess.checkValidUser(req, res, next);
		} else {
			next();	
		}
	});
	
	
	
	//SESSIONS ROUTES
	
	//GET: mail page dell'applicazione. qui dentro ci sono tutte le pagine jQueryMobile
	router.get('/', function(req, res){ 
		res.render('home', {
			'userName':req.cookies.userName
		});
	});
	
	router.get('/login/:username?', function(req, res){ 
		res.render('login', {
			username:req.params.username
		});
	});
	
	router.post('/login/:username?', function(req, res){ 
		//il parametro username lo devo leggere perchè a volte arriva nell'url, ma qui non mi serve perchè leggo tutto in POST
		//console.log(req.body.username);
		//console.log(req.body.password);
		//app.sbam.routes.routeInit(req,res);
		req.app.sbam.sess.checkWordpressValidUser(req,res,req.body.username,req.body.password,function(msg){
			//on success
			//redirect to home
			res.redirect("/");
		},function(msg){
			//on fail
			console.log("wp login failed for user: "+req.body.username+ ", and pw: "+req.body.password);
			//ributto fuori la pagina di login con form precompilato + msg errore
			res.render('login', {
				username:req.body.username,
				//password:req.body.password,
				password:"",//per sicurezza la pw non la ritorno
				errormsg:msg
			});
		});
		
		
	});

	router.get('/logout', function(req, res){ 
		req.app.sbam.sess.logout(req,res,function(){
			res.redirect("/");
		});
	});

	
	
	//MEDIA ROUTES
		
	//routes to be called from client via ajax (return json)
	router.post('/getWidgetImg', function(req, res){ 
		var url = req.body.url;
		var projectId = req.body.projectId;
		console.log("##### chiamata route /getWidgetImg con url="+url+" e projectId="+projectId);
		if ( !url || url == "") {
			var err = "getWidgetImg: error, missing url!";
			console.log(err);
			res.send(err);
		} else if ( !projectId || projectId == "") {
			var err = "getWidgetImg: error, missing projectId!";
			console.log(err);
			res.send(err);
		} else {
			req.app.sbam.utils.getWidgetImg(req,res,url,req.cookies.userID,projectId, function(widgetResult){
				res.end(JSON.stringify(widgetResult));
			});
		}
	});
	router.post('/getMedia', function(req, res){ 
		var repoSubdir = req.body.path;
		if ( !repoSubdir ) repoSubdir = "";
		if ( !req.body.projectId || req.body.projectId == "") {
			var err = "getMedia: error, missing projectId!";
			console.log(err);
			res.send(err);
		} else {
			
			console.log("getMedia con path="+repoSubdir+" e user_id:"+req.cookies.userID+" e project_id:"+req.body.projectId);
			var repoPath = req.app.sbam.utils.getRepoPath(req.cookies.userID, req.body.projectId) + repoSubdir;
			console.log("repoPath:"+repoPath);
			var fs   = require('fs');
			fs.readdir(repoPath, function(err, files) {
				if (err) {
					console.log("getMedia:error "+err);
					res.send(err);
				} else if (files) {
					console.log("files:");
					console.log(files);
					var filesDetail = [];
					//loop sui files (ho solo i nomi files) per trovare altre info
					for ( var x=0; x<files.length; x++ ) {
						//controllo se è file o dir
						
						if ( fs.statSync(repoPath + files[x]).isDirectory() ) {
							var type = "folder";
							var thumbUrl = "images/icon-folder-128.png";
						} else {
							var type = "file";
							var thumbUrl = req.app.sbam.utils.getImg(req,res,req.cookies.userID,req.body.projectId,files[x],repoSubdir,80,80,true);
						}
						filesDetail.push({
							'name': files[x], 
							'thumbUrl': thumbUrl,  
							'type': type
						});
					}
					res.end(JSON.stringify(filesDetail));
				} else {
					console.log("getMedia: empty result");
					res.end(JSON.stringify({errormsg: req.app.i18n.__("Empty result") }));
				}
			});
		}
	});

	
	
	//PROJECTS ROUTES
		
	//routes to be called from client via ajax (return json)
	router.post('/getProject', function(req, res){ 
		//console.log("provo la query getProject su id:"+req.body.id);
		req.app.sbam.project.findById( req.body.id, function(err, project) {
			if (err) {
				console.log("findOne:error "+err);
				res.send(err);
			} else if (project) {
				//console.log("project:");
				//console.log(project);
				res.end(JSON.stringify(project));
			} else {
				console.log("find: empty result");
				res.end(JSON.stringify({errormsg: req.app.i18n.__("Empty result") }));
			}
		});
	});
	router.post('/getProjects', function(req, res){ 
		//console.log("provo la query getProjects");
		req.app.sbam.project.find(
			{'user':req.cookies.userID},
			//['xxx','yyy'], // Columns to Return
			null,
			{
				//skip:0, // Starting Row
				//limit:10, // Ending Row
				sort:{
					created_at: 1
				}
			}, 
			function(err, projects) {
				if (err) {
					console.log("findOne:error "+err);
					res.send(err);
				} else if (projects) {
					//console.log("projects:");
					//console.log(projects);
					//res.setHeader('Content-Type', 'application/json');//ma serve?
					res.end(JSON.stringify(projects));				
				} else {
					console.log("find: empty result");
					//res.setHeader('Content-Type', 'application/json');//ma serve?
					res.end(JSON.stringify({errormsg: req.app.i18n.__("Empty result") }));
				}
			}
		);
	});
	router.post('/addProject', function(req, res) {
		//helper functions
		var pagesRemaining = 0;
		function syncTheAsyncLoop(req,res,project) {
			if ( pagesRemaining > 0 ) {
				var i = req.body.pages.length - pagesRemaining;
				console.log("syncTheAsyncLoop: starei per gestire questa page:");
				console.log(req.body.pages[i]);
				//console.log(req.body.pages[i].num);
				//if ( !req.body.pages[i].num ) console.log("EPPURE PER ME NON ESISTE DIOCANE!!!!");
				var pageType = req.body.pages[i].type;
				if ( req.body.pages[i].num ) {
					var pageNum = req.body.pages[i].num;
				} else {
					var pageNum = -1;
				}
				console.log(pageNum);
				console.log(pageType);
				if ( req.body.pages[i].tpl ) {
					//devo aprire il mio tpl
					var tplFile = req.app.sbam.config.templatesDir + req.body.pages[i].tpl + "." + req.app.sbam.config.templatesExt;
					var tplFile = "templates/02-txts_00-imgs.xml";
					//console.log(tplFile);
					//var pageNumBis = pageNum;
					//var pageTypeBis = pageType;
					fs.readFile(tplFile, 'utf8', function(err, data) {
						if ( data ) {
							//console.log("e comunque dopo che ho letto il file xml pageNumBis="+pageNumBis+" e pageTypeBis="+pageTypeBis);
							console.log("fs.readFile ALE': arrivata data!");
							console.log(data);
							//var pageNumTris = pageNumBis;
							//var pageTypeTris = pageTypeBis;
							parser.parseString(data, function (err, result) {
								//console.log("e comunque dopo che ho oarsato il file xml pageNumTris="+pageNumTris+" e pageTypeTris="+pageTypeTris);
								
								if ( err ) {
									console.log("xml layout parsing: error "+err);
									//res.send(err);
								} else {
									console.dir("ma dove...");
									console.dir(result);
									console.dir("...di preciso?");
									//console.log(result.elements);
									var elements = result.elements.element;
									console.log("elements:"); //questo è esattamente un array con i miei elements
									console.log(elements); //questo è esattamente un array con i miei elements
									addPage(req,res,project,elements);
									//console.log('Done');
								}								
							});
						} else if ( err ) {
							console.log("xml layout fs.readFile: error "+err);
						}
					});						
				} else {
					//se non è specificato un template, creo un array vuoto di elements e basta
					addPage(req,res,project,[]);
				}
			} else {
				//ho finito!!
				console.log("syncTheAsyncLoop: finito!!!!!!!!! chiamo il save....");
				//ho aggiunto tutte le pagine in modo async, posso procdere col save vero e proprio
				addProjectSave(project);
				
			}
		}
		
		function addPage(req,res,project,elements) {
			console.log("addPage con pagesRemaining="+pagesRemaining);
			console.log("addPage con project:");
			console.log(project);
			var i = req.body.pages.length - pagesRemaining;
			console.log("addPage con i="+i);
			var num = req.body.pages[i].num;
			var type = req.body.pages[i].type;
			if (num) {
				project.pages.push({
					'type':type,
					'num':Number(num),
					'elements':elements
				});
			} else {
				project.pages.push({
					'type':type,
					'elements':elements
				});
			}
			pagesRemaining--;
			syncTheAsyncLoop(req,res,project);

		}
		function addProjectSave(project){
			console.log("addProjectSave:");
			console.log("ecco tutto il mio project:");
			console.log(project);
			project.save(function (err) {
				if ( err ) {
					console.log("save:error "+err);
					res.send(err);
				} else {
					//dopo che ho salvato il project, devo creare una sua cartella dentro al repo dell'utente
					var fs   = require('fs');
					var projectDir = "repo/"+req.cookies.userID+"/files/project_"+project._id;
					fs.mkdir(projectDir, 0775, function(err) {
						if (err) {
							if (err.code == 'EEXIST') {
								// ignore the error if the folder already exists
							} else {
								// something else went wrong
								console.log("addProjectSave: error creating folder "+projectDir+" for user "+req.cookies.userID);
								console.log("addProjectSave: error: "+err);
								res.send(err);
							}
						} else {
							// successfully created folder
							//res.setHeader('Content-Type', 'application/json');//ma serve?
							//res.end(JSON.stringify(project));	
							//res.redirect("/");
							res.end(JSON.stringify(project));	
						}
					});
					
					
				}
			});
		}
		//dopo aver definito tutti gli helper che mi servono, 
		//valido il contenuto e se ok lancio lo script syncTheAsyncLoop per aggiungere le pagine al mio project
		//leggendo per ciascuna pagina il template da file xml e trasfromandolo in json
		//console.log("provo la query addProject");
		console.log("ecco tutto il mio body:");
		console.log(req.body);
		if ( 
			req.body.form.name && 
			req.body.form.name != "" && 
			req.body.form.type && 
			req.body.form.type != "" &&
			req.body.form.width && 
			req.body.form.width != "" &&
			req.body.form.height && 
			req.body.form.height != ""
		) {
			var project = new req.app.sbam.project();
			//popolo i campi obbligatori che mi arrivano dal form
			project.user = req.cookies.userID;
			project.name = req.body.form.name;
			project.type = req.body.form.type;
			project.width = req.body.form.width;
			project.height = req.body.form.height;
			//poi popolo quelli facoltativi
			if ( req.body.form.minPageQuantity ) project.minPageQuantity = req.body.form.minPageQuantity;
			if ( req.body.form.variant ) project.variant = req.body.form.variant;
			if ( req.body.form.spline ) {
				project.spline = req.body.form.spline;
			} else {
				project.spline = project.name; //se non specificato il dorso, lo preimposto uguale al titolo
			}
			if ( req.body.pages && req.body.pages.length > 0 ) {
				pagesRemaining = req.body.pages.length;
				var fs = require('fs');
				var xml2js = require('xml2js');
				var parser = new xml2js.Parser({'explicitArray':false});
				syncTheAsyncLoop(req,res,project);
			}
		} else {
			var errormsg = "";
			if ( !req.body.form.name ) errormsg += req.app.i18n.__("Titolo obbligatorio.") + " ";
			if ( !req.body.form.type ) errormsg += req.app.i18n.__("Tipo obbligatorio.") + " ";
			if ( !req.body.form.width || !req.body.form.height ) errormsg += req.app.i18n.__("Formato obbligatorio.") + " ";
			console.log("parametri mancanti:");
			console.log("req.body.form");
			console.log(req.body.form);
			res.end(JSON.stringify({'errormsg': errormsg }));
		}
	});
	router.post('/saveProject', function(req, res) {
		//console.log("provo la query saveProject");
		console.log("PRIMA ecco il mio project da salvare come mi arriva dal client:");
		console.log(req.body.project);
		if ( req.body.project ) {
			req.app.sbam.project.findById( req.body.project._id, function(err, project) {
				if (err) {
					console.log("findOne:error "+err);
					res.send(err);
				} else if (project) {
					//console.log("PRIMA ecco il mio project da salvare come è nel db:");
					//console.log(project);
					
					//////project = req.body.project; //goffo tentativo di merge di ciò che mi arriva dal client con ciò che c'è nel db
					//ciclo su tutte le properties dell'oggetto project che mi arriva dal client
					//e ne replico il contenuto nell'oggetto da salvare nel db
					for (var project_field in req.body.project) {
						if ( 
							req.body.project.hasOwnProperty(project_field) 
							&& 
							typeof req.body.project[project_field] !== 'function' 
							&& 
							project_field != "_id"
							&& 
							project_field != "created_at"
							&& 
							project_field != "updated_at"
							&& 
							project_field != "user" //lo user non lo cambio mai, a parte quanto si passa da utente anonimo a utente loggato, poi resta sempre invariato
							&& 
							project_field != "__v"
						) {
							//console.log("uella gente!, questa la terrei ;-) "+project_field+" con contenuto: "+req.body.project[project_field]);
							project[project_field] = req.body.project[project_field];
						}
					}
					console.log("POI ecco il mio project come lo sto per salvare nel db:");
					console.log(project);
					//console.log("ma");
					project.save(function (err) {
						//console.log("dove");
						if ( err ) {
							console.log("save:error "+err);
							res.send(err);
						} else {
							//console.log("INFINE salvato!");
							res.end(JSON.stringify(project));	
						}
						//console.log("cazzo?!");
					});
				} else {
					console.log("find: empty result");
					res.end(JSON.stringify({errormsg: req.app.i18n.__("Empty result") }));
				}
			});			
		} else {
			var errormsg = "";
			errormsg += req.app.i18n.__("Campo project obbligatorio.");
			res.end(JSON.stringify({errormsg: errormsg }));
		}
	});
	router.post('/delProject', function(req, res) {
		console.log("provo la query delProject su id:"+req.body.id);
		req.app.sbam.project.findById( req.body.id ).remove( function(err) {
			if (err) {
				console.log("findById:error "+err);
				res.send(err);
			} else {
				//dopo aver cancellato il project dal db, ne cancello anche la cartella dei file
				var rimraf = require("rimraf");
				var prjDir = req.app.sbam.utils.getRepoPath(req.cookies.userID, req.body.id);
				rimraf(prjDir, function (err) {
					if (err) {
						console.log("delProject: error deleting project folder "+prjDir);
						console.log(err);
						res.send(err);
					} else {
						//ritorno
						res.end(JSON.stringify({}));
					}
				});
			}
		});
	});

	
}


exports.defineRoutes = defineRoutes; 
//exports.routeInit = routeInit; serve? viene usata solo qui



