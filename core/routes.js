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


if ( true ) {

	
// ROUTES
var cluster = require('cluster');


function defineRoutes(router) {
	
	// route middleware that will happen on every request
	router.use(function(req, res, next) {
		console.log("==============================================================");
		console.log('route matched from worker '+cluster.worker.id+':');
		console.log('method='+req.method);
		console.log('url='+req.url);
		console.log('path='+req.path);
		//console.log("cookies:");
		//console.log(req.cookies);
		//console.log('body:');
		//console.log(req.body);
		console.log("--------------------------------------------------------------");
		
		//in base alla piattaforma customizzo alcune variabili
		//il cookie platform lo devo controllare in questo middleware perchè cambia alcuni valori di app.sbam.config usati poi da molte route
		//prima reimposto sempre i valori di default, poi se è specificata una platform, li cambio
		//devo farlo se no restano impostati anche per il cliente successivo che accede all'app
		req.app.sbam.config.wpSiteUrl = 'my-e.eu';
		req.app.sbam.config.platform = 'mye';
		req.app.sbam.config.mysql = {
			'host'     	: 'bavosa.obliquid.org',
			'database' 	: 'c109myeeu',
			'user'     	: 'c109myeeu',
			'password' 	: 'cecronespe'
		};
		/* non usate
		req.app.sbam.config.rpc_options = {
			https : false,
			host : 'my-e.eu',
			port : 80,
			path : '/xmlrpc.php'
		};
		*/
		
		if ( req.cookies.platform ) {
			//NOTA: per aggiungere una nuova platform wordpress:
			//caricarci il file wp-auth-sobuame.php
			//verificare che db e user esistano sia per "localhost" che per "%" in mysql
			//verificare che esistano nel db e abbiamo gli ID giusti i prodotti linkati negli ordini
			//aggiungere la piattaforma qui
			//aggiungerla in sobuame.js dove customizzo l'interfaccia
			switch ( req.cookies.platform ) {
				case "mye":
					//è il default definito prima, non faccio nulla
					break;
				case "tuolibro":
					//console.log("qua non ci devo mai passare se non ho il cookie platform");
					req.app.sbam.config.wpSiteUrl = 'tuolibro.it/it';
					req.app.sbam.config.platform = 'tuolibro';
					req.app.sbam.config.mysql = {
						'host'     	: 'bavosa.obliquid.org',
						'database' 	: 'c109_default',
						'user'     	: 'c109_user',
						'password' 	: 'gaBuw2KacrEw'
					};
					/* non usate
					req.app.sbam.config.rpc_options = {
						https : false,
						host : 'tuolibro.it/it',
						port : 80,
						path : '/xmlrpc.php'
					};
					*/
					break;
			}
		}		
		
		//console.log("finisco il middleware con cookies:");
		//console.log(req.cookies);
		//console.log("e con req.app.sbam.config.wpSiteUrl:");
		//console.log(req.app.sbam.config.wpSiteUrl);

		
		//check valid user (apart from login page)
		var urlChunk = req.url.substring(0, 6);
		if ( urlChunk != "/login" && urlChunk != "/admin" ) {
			req.app.sbam.sess.checkValidUser(req, res, next);
		} else if ( urlChunk == "/admin" ) {
			console.log("caso di middleware che controlla accesso di admin");
			if ( req.url == "/admin" && req.method == "GET" ) {
				console.log("sono in GET su admin, procedo");
				next();
			} else {
				console.log("sono in qualche rotta che richiede il login, verifico per mio username="+req.body.username+" e password="+req.body.password);
				if ( req.body.username == req.app.sbam.config.adminUser && req.body.password == req.app.sbam.config.adminPassword ) {
					console.log("YESSSSSSSS procedo");
					next();
				} else {
					console.log("NOOOOOOOOOOOOOO torno al login (/admin in GET)");
					res.redirect("/admin");
				}			
			}
		} else {
			next();	
		}
	});
	
	
	

	
	
	
	//HOME (MAIN APP ROUTE)
	
	
	
	//GET: main page dell'applicazione. è l'unica pagina, qui dentro ci gira tutto in js senza mai ricaricare
	router.get('/', function(req, res){ 
		//console.log("entro in HOME con cookies:");
		//console.log(req.cookies);
		//se c'è qualcosa da fare al bootstrap lo faccio
		var bootstrap = "";
		//il cookie bootstrap lo gestisco solo nella home, perchè serve solo per comunicare all'app eventuali actions da fare al boot, e l'app esce solo in home
		if ( req.cookies.bootstrap ) {
			//salvo il contenuto del bootstrap
			bootstrap = req.cookies.bootstrap;
			//dopo averlo salvato, cancello il cookie di bootstrap, perchè questa è la logica scelta
			//cioè le actions sono intese una tantum
			req.app.sbam.sess.resetCookieBootstrap(req,res);
		}
		//se è l'admin che forza un login come utente, allora c'è questo cookie, e lo devo passare al tpl
		var fromadmin = 'no';
		if ( req.cookies.fromadmin && req.cookies.fromadmin == 'yes' ) {
			fromadmin = 'yes';
		}
		//questo lo gestisco qui (perchè devo passare il suo valore al tpl) e lo gestisco nel middleware,
		//dove lo uso per modificare i valori del config
		//console.log("finisco HOME con cookies:");
		//console.log(req.cookies);
		//console.log("e con platform: "+req.app.sbam.config.platform);
		res.render('home', {
			'userName':req.cookies.userName,
			'platform':req.app.sbam.config.platform,
			'bootstrap':bootstrap,
			'fromadmin':fromadmin
		});
	});

	
	
	
	

	//SESSIONS ROUTES
	
	
	router.get('/login/:username?', function(req, res){ 
		console.log("entro in LOGIN con cookies:");
		console.log(req.cookies);
		res.render('login', {
			'username':req.params.username,
			'platform':req.app.sbam.config.platform
			
		});
	});
	
	router.post('/login/:username?', function(req, res){ 
		//il parametro username lo devo leggere perchè a volte arriva nell'url, ma qui non mi serve perchè leggo tutto in POST
		//console.log(req.body.username);
		//console.log(req.body.password);
		//app.sbam.routes.routeInit(req,res);
		req.app.sbam.sess.checkWordpressValidUser(req,res,req.body.username,req.body.password,function(msg){
			//on success
			console.log("wp login succeded for user: "+req.body.username+ ", and pw: "+req.body.password);
			//redirect to home
			res.redirect("/");
		},function(msg){
			//on fail
			console.log("wp login failed with error: '"+msg+"' for user: "+req.body.username+ ", and pw: "+req.body.password);
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

	
	
	//UPLOAD ROUTES
    router.post('/upload/:projectId/:subPathEncoded?', function (req, res) {
        req.app.sbam.uploader.post(req, res, function (obj) {
			if ( req.params.subPathEncoded ) {
				var subPath = decodeURIComponent(req.params.subPathEncoded);
			} else {
				var subPath = "";
			}
			/*
			console.log("finito di caricare il file!");
			console.log("obj:");
			console.log(obj);
			console.log("req.params.projectId:");
			console.log(req.params.projectId);
			console.log("req.params.subPathEncoded:");
			console.log(req.params.subPathEncoded);
			console.log("subPath:");
			console.log(subPath);
			*/
			//ora devo muoverli nella cartella dell'utente
			if ( req.cookies.userID != "" && req.params.projectId != "" ) {
				var fs = require('fs');
				for ( var x=0; x<obj.files.length; x++ ) {
					var file = obj.files[x];
					var oldPath = req.app.sbam.config.uploaderOptions.uploadDir+"/"+file.name;
					var newPath = "repo/"+req.cookies.userID+"/files/project_"+req.params.projectId+"/"+subPath+file.name;
					//console.log("sposterei da "+oldPath+" a "+newPath);
					fs.rename(oldPath, newPath, function (err) {
						//console.log('finito spostamento con result: ', err);
					});
				}
			}
            res.send(JSON.stringify(obj));
        });
    });




	
	//MEDIA ROUTES
		
	//routes to be called from client via ajax (return json)
	router.post('/getWidgetInfo', function(req, res){ 
		var element = req.body.element;
		//var url = element.image.url;
		//var effects = element.image.effects;
		var projectId = req.body.projectId;
		//console.log("##### chiamata route /getWidgetInfo con element=");
		//console.log(element);
		if ( !element ) {
			var err = "getWidgetInfo: error, missing element!";
			console.log(err);
			res.send(err);
		} else if ( !projectId || projectId == "") {
			var err = "getWidgetInfo: error, missing projectId!";
			console.log(err);
			res.send(err);
		} else {
			req.app.sbam.utils.getWidgetInfo(req,res,element,req.cookies.userID,projectId, function(widgetResult){
				if ( widgetResult ) {
					res.end(JSON.stringify(widgetResult));
				} else {
					res.end(false);
				}
			});
		}
	});
	router.post('/getWidgetImg', function(req, res){ 
		var element = req.body.element;
		//var url = element.image.url;
		//var effects = element.image.effects;
		var projectId = req.body.projectId;
		//console.log("##### chiamata route /getWidgetImg con element=");
		//console.log(element);
		if ( !element ) {
			var err = "getWidgetImg: error, missing element!";
			console.log(err);
			res.send(err);
		} else if ( !projectId || projectId == "") {
			var err = "getWidgetImg: error, missing projectId!";
			console.log(err);
			res.send(err);
		} else {
			req.app.sbam.utils.getWidgetImg(req,res,element,req.cookies.userID,projectId, function(widgetResult){
				if ( widgetResult ) {
					res.end(JSON.stringify(widgetResult));
				} else {
					res.end(false);
				}
			});
		}
	});
	router.post('/getMedia', function(req, res){ 
		var repoSubdir = req.body.path;
		if ( !repoSubdir ) repoSubdir = "";
		var isRepo = true;
		if ( req.app.sbam.utils.stringStartWith(repoSubdir,req.app.sbam.config.templatesImagesLink) ) {
			repoSubdir = repoSubdir.replace(req.app.sbam.config.templatesImagesLink, req.app.sbam.config.templatesImagesDir);
		}
		if ( req.app.sbam.utils.stringStartWith(repoSubdir,req.app.sbam.config.templatesImagesDir) ) {
			var isRepo = false;
		}
		if ( !req.body.projectId || req.body.projectId == "") {
			var err = "getMedia: error, missing projectId!";
			console.log(err);
			res.send(err);
		} else {
			//console.log("getMedia con path="+repoSubdir+" e user_id:"+req.cookies.userID+" e project_id:"+req.body.projectId);
			if ( req.app.sbam.utils.isTemplateImage(req,res,repoSubdir) ) {
				var repoPath = req.app.sbam.utils.getAppPath() + repoSubdir;
			} else {
				var repoPath = req.app.sbam.utils.getRepoPath(req.cookies.userID, req.body.projectId) + repoSubdir;
			}
			//console.log("repoPath:"+repoPath);
			var fs   = require('fs');
			fs.readdir(repoPath, function(err, files) {
				if (err) {
					console.log("getMedia:error "+err);
					res.send(err);
				} else if (files) {
					//console.log("route getMedia: arrivati i files:");
					//console.log(files);
					var filesDetail = [];
					//loop sui files (ho solo i nomi files) per trovare altre info
					//devo usare un loop async
					//prima clono l'array dei file, perchè devo tenerne una copia da ritornare!
					var filesBuffer = files.slice(0);
					//poi lancio il ciclo ricorsivo async
					recurse(function(){
						//fine del ciclo async!!!! tutti i file sono stati processati
						//ritorno la lista dei file dettagliata
						res.end(JSON.stringify(filesDetail));
					});
					function recurse(next) {
						if ( filesBuffer.length > 0 ) {
							//prendo il prossimo file da processare
							var file = filesBuffer.pop();
							//controllo se è file o dir
							var stats = fs.statSync(repoPath + file);
							console.log("getMedia() considero il file con stats:");
							var mtime = stats.mtime.getTime();
							if ( stats.isDirectory() ) {
								addToFilesDetail(file,"images/icon-folder-128.png","folder");
								recurse(next);
							} else {
								//qui devo fare chiamata async a getImg per ottenere la miniatura dell'immagine
								//in questo caso non applico nessun effetto
								req.app.sbam.utils.getImg(req,res,req.cookies.userID,req.body.projectId,file,repoSubdir,120,80,true,false,false,function(thumbUrl){
									addToFilesDetail(file,thumbUrl,"file");
									recurse(next);
								}); 
							}
							function addToFilesDetail(file,thumbUrl,type){
								//aggiungo all'array dei file dettagliati
								filesDetail.push({
									'name': file, 
									'thumbUrl': thumbUrl+'?mtime='+mtime,  
									'type': type,
									'isRepo': isRepo
								});
							}
						} else {
							//finito il loop
							//prima aggiungo all'array dei files la dir ".." (pertornare su) ma solo se la mia repoSubdir non è nulla
							if ( repoSubdir && repoSubdir != "" ) {
								filesDetail.push({
									'name': "..", 
									'thumbUrl': "images/icon-folder-128.png",  
									'type': "folder",
									'isRepo': isRepo
								});
							}
							
							next();
						}
					}
				} else {
					console.log("getMedia: empty result");
					res.end(JSON.stringify({errormsg: req.app.i18n.__("Empty result") }));
				}
			});
		}
	});
	router.post('/editMedia', function(req, res) {
		var url = req.body.url; //deve essere un path+filename corretto all'interno del repo dell'utente
		var projectId = req.body.projectId;
		var action = req.body.action;
		req.app.sbam.utils.editMedia(req,res,url,projectId,action,function(result){
			if ( result && result == "ok" ) {
				res.end(JSON.stringify({'msg': 'ok' }));
			} else {
				res.end(JSON.stringify({'errormsg': "/editMedia: req.app.sbam.utils.editMedia() mi ha ritornato picche: result="+result }));
			}
		});
	});
	router.post('/addFolder', function(req, res) {
		var errormsg = "";
		if ( req.body.folder && req.body.folder.name && req.body.projectId ) {
			//controllo against reserved words
			if ( req.body.folder.name+"/" == req.app.sbam.config.templatesImagesLink || req.body.folder.name+"/" == req.app.sbam.config.templatesDir ) {
				errormsg += req.app.i18n.__("Nome di cartella riservato. Usare un nome diverso.") + " ";
				console.log("bloccata reserved folder name:");
				console.log("req.body.folder");
				console.log(req.body.folder);
				res.end(JSON.stringify({'errormsg': errormsg }));
			} else {
				if ( !req.body.path ) req.body.path = "";
				//creo la cartella 
				var fs   = require('fs');
				var newFolder = "repo/"+req.cookies.userID+"/files/project_"+req.body.projectId+"/"+req.body.path+req.body.folder.name;
				//console.log("mo creo: "+newFolder);
				fs.mkdir(newFolder, 0775, function(err) {
					console.log("ah!?!?");
					if (err) {
						if (err.code == 'EEXIST') {
							// ignore the error if the folder already exists
							res.end(JSON.stringify({'msg': 'ok' }));
						} else {
							// something else went wrong
							console.log("addFolder: error creating folder "+newFolder+" for user "+req.cookies.userID);
							console.log("addFolder: error: "+err);
							res.send(err);
						}
					} else {
						// successfully created folder
						res.end(JSON.stringify({'msg': 'ok' }));
					}
				});
			}
		} else {
			if ( !req.body.folder.name ) errormsg += req.app.i18n.__("Nome obbligatorio.") + " ";
			console.log("parametri mancanti:");
			console.log("req.body.folder");
			console.log(req.body.folder);
			res.end(JSON.stringify({'errormsg': errormsg }));
		}
	});

	
	
	
	
	
	//PAGES ROUTES
		
	//routes to be called from client via ajax (return json)
	/*
	legge i template (file xml) disponibili e li ritorna
	è usata questa naming convention:
	
	standard_album-poster-annuario-libro_02txt-02img.xml
	- conrollo che l'estensione sia quella i chiarata nell'app config, e poi la tolgo
	- faccio uno .split("_") e ottengo 3 parti
		- la prima parte è il nome del template: "standard"
		- la seconda parte subisce un secondo .split("-") e ottengo 4 parti: sono i nomi dei project type per cui questo template è valido
			- vale anche la singola keyword "all" per tutti i project types:
				standard_all_02txt-02img.xml
		- la terza parte è la variante del template, è libera e ora ci sto mettendo il numero di elementi di testo e di quelli immagine, ma non è una regola
		
	grazie a questa naming convention posso filtrare i template per project type, e infatti mi aspetto il parametro projectType
	*/
	router.post('/getPageTemplates', function(req, res){ 
		var projectType = req.body.projectType;
		var projectPreset = req.body.projectPreset;
		var projectW = projectPreset.width;
		var projectH = projectPreset.height;
		if ( !projectType || !projectPreset ) {
			console.log("getPageTemplates:error missing parameters");
			res.send("getPageTemplates:error missing parameters");
		}
		//leggo tutti i template intesi come file nella cartella dei templates
		//console.log("getPageTemplates: con projectType = "+projectType);
		//console.log("getPageTemplates: con projectPreset.code = "+projectPreset.code);
		var fs   = require('fs');
		fs.readdir(req.app.sbam.config.templatesDir, function(err, files) {
			if (err) {
				console.log("getPageTemplates:error leggendo la lista dei file nella cartella dei templates "+err);
				res.send(err);
			} else if (files) {
				//console.log("getPageTemplates readdir: arrivati i files:");
				//console.log(files);
				//ciclo e filtro solo i file che hanno estensione corretta
				var validatedFiles = [];
				for (var x=0; x<files.length; x++) {
					var fileName = files[x];
					//controllo l'estensione
					//console.log("getPageTemplates: loop sul file:"+fileName);
					var ext = "."+req.app.sbam.config.templatesExt.toLowerCase();
					//procedo solo con i file che hanno l'estensione corretta
					if ( fileName.toLowerCase().indexOf(ext, fileName.toLowerCase().length - ext.length) !== -1 ) {
						//console.log("getPageTemplates: questo lo tengo:"+fileName+" finisce con l'estensione giusta: "+ext);
						//ora devo controllare se la parola projectType è nella prima componente del nome file del template
						//tolgo l'estensione
						fileName = fileName.substring(0, fileName.length - ext.length);
						//parso il template name
						var templateParts = req.app.sbam.utils.parseTemplateFilename(fileName);
						var projectTypes = templateParts.projectTypes;
						var projectPresets = templateParts.projectPresets;
						var templateVariant = templateParts.templateVariant;
						//se qualche parametro manca (malfromed filename secondo la naming convention) skippo
						if ( !projectTypes || projectTypes.length == 0 || !projectPresets || projectPresets.length == 0 || !templateVariant || templateVariant == "" ) {
							//skippo
						} else {
							//console.log("getPageTemplates: questo lo tengo:"+fileName+" naming convention rispettata");
							//controllo: se tra i project types c'è il mio projectType
							for ( var i=0; i<projectTypes.length; i++ ) {
								if ( projectTypes[i] == projectType ) {
									//console.log("getPageTemplates: DAJE ho beccato il type!");
									//controllo: se tra i project presets specificati c'è il mio projectPreset
									for ( var j=0; j<projectPresets.length; j++ ) {
										//console.log("getPageTemplates: confronto se "+projectPresets[j]+" == "+projectPreset.code);
										if ( projectPresets[j] == projectPreset.code ) {
											//olè!!! questo lo tengo!
											//console.log("getPageTemplates: questo lo tengo:"+fileName+" project type rispettato!");
											validatedFiles.push({
												"variant":templateVariant,
												"filename":fileName
											});
											/* prima ritornavo questi valori
											validatedFiles.push({
												"label":templateName,
												"size":projectSize[0]+"x"+projectSize[1]+"mm",
												"variant":templateVariant,
												"filename":fileName
											});
											*/
										}
									}
								}									
							}
						}
						
					}
				}
				
				//ora che ho lista dei nomi dei file dei template devo fare un loop async per generarne le thumb
				var validatedFilesBuffer = validatedFiles.slice(0); //tengo copia dell'originale, visto che il clone lo spolpo
				var validatedFilesWithThumb = [];
				recurse();
				function recurse() {
					if ( validatedFilesBuffer.length > 0 ) {
						var tpl = validatedFilesBuffer.pop();
						req.app.sbam.renderer.renderBitmap(req,res,false,tpl.filename,projectPreset,60,60,function(tplThumbUrl){
							//salvo l'url della miniatura così ottenuta
							//tpl.thumbUrl = tplThumbUrl+"?"+Math.random();
							tpl.thumbUrl = tplThumbUrl;
							validatedFilesWithThumb.push(tpl);
							recurse();
						});
					} else {
						//finito
						//ritorno
						res.end(JSON.stringify(validatedFilesWithThumb.reverse()));
					}
				}
				//res.end(JSON.stringify(validatedFiles));
				
				
			} else {
				console.log("getPageTemplates readdir: empty result");
				res.end(JSON.stringify({errormsg: req.app.i18n.__("Empty result") }));
			}
		});
	});
	router.post('/getPageTemplate', function(req, res){ 
		var tplFilename = req.body.tplFilename;
		if ( !tplFilename ) tplFilename = "";
		var tplFile = req.app.sbam.config.templatesDir + tplFilename + "." + req.app.sbam.config.templatesExt;
		
		req.app.sbam.utils.getTempate(req, res, tplFile, function(elements_array){
			if ( elements_array ) {
				res.end(JSON.stringify(elements_array));	
				//console.log('Done');
			}
		});
	});
	
	
	
	
	
	
	//PROJECTS ROUTES
	
	
    router.get('/platform/:platform', function (req, res) {
		req.app.sbam.sess.setCookiePlatform(req,res,req.params.platform);
		res.redirect('/');
    });	
    router.get('/startWithProject/:type/:preset/:platform?', function (req, res) {
		req.app.sbam.sess.setCookieBootstrap(req,res,"createDefaultProject:"+req.params.type+":"+req.params.preset);
		if ( req.params.platform ) req.app.sbam.sess.setCookiePlatform(req,res,req.params.platform);
		res.redirect('/');
    });	
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
			'name preset width height type status pages updated_at', // Columns to Return
			//null,
			{
				//skip:0, // Starting Row
				//limit:10, // Ending Row
				sort:{
					created_at: 1
				}
			}, 
			function(err, projects) {
				if (err) {
					console.log("/getProjects find:error "+err);
					res.send(err);
				} else if (projects) {
					//ora per ogni project devo renderizzare la miniatura chiamando renderBitmap() che me ne ritorna l'url
					//ma devo farlo con un loop async perchè renderBitmap è async
					var projectsBuffer = projects.slice(0); //tengo copia dell'originale, visto che il clone lo spolpo
					var projectsWithThumb = [];
					recurse();
					function recurse() {
						if ( projectsBuffer.length > 0 ) {
							var prj = projectsBuffer.pop().toObject();
							req.app.sbam.renderer.renderBitmap(req,res,prj,false,false,80,80,function(prjThumbUrl){
								//salvo l'url della miniatura così ottenuta
								prj.thumbUrl = prjThumbUrl+"?"+Math.random();
								//poi butto le pages dal prj e metto al loro posto solo il numero di pagine, per non appesantire la response alla chiamata ajax
								prj.pagesNum = prj.pages.length;
								delete prj.pages;
								projectsWithThumb.push(prj);
								recurse();
							});
						} else {
							//finito
							res.end(JSON.stringify(projectsWithThumb.reverse()));
						}
					}
				} else {
					console.log("find: empty result");
					//res.setHeader('Content-Type', 'application/json');//ma serve?
					res.end(JSON.stringify({errormsg: req.app.i18n.__("Empty result") }));
				}
			}
		);
	});
	router.post('/projectExist', function(req, res){ 
		//console.log("provo la query projectExist");
		if ( req.body.defaultPreset && req.body.defaultType && req.body.defaultName ) {
			req.app.sbam.project.find(
				{
					'user':req.cookies.userID, 
					'name':req.body.defaultName,
					'type':req.body.defaultType,
					'preset.code':req.body.defaultPreset
				},
				null, // Columns to Return
				null, //sorting and options
				function(err, projects) {
					//console.log("SSSSSSSSSSSS il find mi ritorna projects:");
					//console.log(projects);
					if (err) {
						console.log("find: error: "+err);
						res.end(JSON.stringify({errormsg: req.app.i18n.__("find: error: "+err) }));
					} else if (projects && projects.length > 0) {
						//il project esiste
						//console.log("il project esiste");
						//finito
						res.end(JSON.stringify(projects));
					} else {
						//console.log("il project NON esiste");
						//il project non esiste
						res.end(false);
					}
				}
			);
		} else {
			console.log("projectExist: missing params");
			res.end(JSON.stringify({errormsg: req.app.i18n.__("projectExist: missing params") }));
		}
	});
	router.post('/addProject', function(req, res) {
		
		//helper functions
		var pagesRemaining = 0;
		function syncTheAsyncLoop(req,res,project) {
			if ( pagesRemaining > 0 ) {
				var i = req.body.preset.defaultPages.length - pagesRemaining;
				//console.log("syncTheAsyncLoop: starei per gestire questa page:");
				//console.log(req.body.preset.defaultPages[i]);
				//console.log(req.body.preset.defaultPages[i].num);
				//if ( !req.body.preset.defaultPages[i].num ) console.log("EPPURE PER ME NON ESISTE DIOCANE!!!!");
				var pageType = req.body.preset.defaultPages[i].type;
				if ( req.body.preset.defaultPages[i].num ) {
					var pageNum = req.body.preset.defaultPages[i].num;
				} else {
					var pageNum = -1;
				}
				//console.log(pageNum);
				//console.log(pageType);
				if ( req.body.preset.defaultPages[i].tpl ) {
					//leggo il contenuto del template, e ci popolo la pagina
					var tplFile = req.app.sbam.config.templatesDir + req.body.preset.defaultPages[i].tpl + "." + req.app.sbam.config.templatesExt;
					//var tplFile = "templates/02-txts_00-imgs.xml"; //esempio, usare per debug
					//console.log(tplFile);
					//var pageNumBis = pageNum;
					//var pageTypeBis = pageType;
					req.app.sbam.utils.getTempate(req, res, tplFile, function(elements_array){
						if ( elements_array ) {
							addPage(req,res,project,elements_array);
						}
					});					
				} else {
					//se non è specificato un template, creo un array vuoto di elements e basta
					addPage(req,res,project,[]);
				}
			} else {
				//ho finito!!
				//console.log("syncTheAsyncLoop: finito!!!!!!!!! chiamo il save....");
				//ho aggiunto tutte le pagine in modo async, posso procdere col save vero e proprio
				addProjectSave(project);
				
			}
		}
		
		function addPage(req,res,project,elements) {
			//console.log("addPage con pagesRemaining="+pagesRemaining);
			//console.log("addPage con project:");
			//console.log(project);
			var i = req.body.preset.defaultPages.length - pagesRemaining;
			//console.log("addPage con i="+i);
			var num = req.body.preset.defaultPages[i].num;
			var type = req.body.preset.defaultPages[i].type;
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
			//console.log("addProjectSave:");
			//console.log("ecco tutto il mio project:");
			//console.log(project);
			project.save(function (err) {
				if ( err ) {
					console.log("save:error "+err);
					res.send(err);
				} else {
					//dopo che ho salvato il project, devo creare una sua cartella dentro al repo dell'utente
					req.app.sbam.projects.createProjectFolders(req,res,req.cookies.userID,project._id,function(){
						res.end(JSON.stringify(project));
					});
				}
			});
		}
		//dopo aver definito tutti gli helper che mi servono, 
		//valido il contenuto e se ok lancio lo script syncTheAsyncLoop per aggiungere le pagine al mio project
		//leggendo per ciascuna pagina il template da file xml e trasfromandolo in json
		//console.log("provo la query addProject");
		//console.log("ecco tutto il mio body:");
		//console.log(req.body);
		if ( 
			req.body.form.name && 
			req.body.form.name != "" && 
			req.body.form.type && 
			req.body.form.type != "" &&
			req.body.preset
		) {
			var project = new req.app.sbam.project();
			//popolo i campi obbligatori che mi arrivano dal form
			project.user = req.cookies.userID;
			project.name = req.body.form.name;
			project.type = req.body.form.type;
			project.preset = req.body.preset;
			project.status = 'editing'; //default per i nuovi projects
			//poi popolo quelli facoltativi
			if ( req.body.form.spline ) {
				project.spline = req.body.form.spline;
			} else {
				project.spline = project.name; //se non specificato il dorso, lo preimposto uguale al titolo
			}
			if ( req.body.preset.defaultPages && req.body.preset.defaultPages.length > 0 ) {
				pagesRemaining = req.body.preset.defaultPages.length;
				syncTheAsyncLoop(req,res,project);
			}
		} else {
			var errormsg = "";
			if ( !req.body.form.name ) errormsg += req.app.i18n.__("Titolo obbligatorio.") + " ";
			if ( !req.body.form.type ) errormsg += req.app.i18n.__("Tipo obbligatorio.") + " ";
			if ( !req.body.preset ) errormsg += req.app.i18n.__("Preset obbligatorio.") + " ";
			console.log("parametri mancanti:");
			console.log("req.body.form");
			console.log(req.body.form);
			console.log("req.body.preset");
			console.log(req.body.preset);
			res.end(JSON.stringify({'errormsg': errormsg }));
		}
	});
	router.post('/saveProject', function(req, res) {
		//console.log("provo la query saveProject");
		//console.log("PRIMA ecco il mio project da salvare come mi arriva dal client:");
		//console.log(req.body.project);
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
					//console.log("POI ecco il mio project come lo sto per salvare nel db:");
					//console.log(project);
					
					/*
					for ( var s=0; s<project.pages.length; s++ ) {
						var page = project.pages[s];
						for ( var a=0; a<page.elements.length; a++ ) {
							var elm = page.elements[a];
							if ( elm.type == "image" ) {
								//console.log("EHI! DUDU! QUI C'E' UN'IMMAGINE PERDIO!!!!");
								//console.log(elm.image);
								//console.log(elm.image.offsety);
								//console.log(elm.image.offsetx);
								//console.log(elm.image.dpi);
								//console.log(elm.image.url);
								//console.log(typeof(elm.image.offsety));
								//console.log(typeof(elm.image.offsetx));
								//console.log(typeof(elm.image.dpi));
								//console.log(typeof(elm.image.url));
							}
						}
					}
					*/
					
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
	router.post('/cloneProject', function(req, res) {
		if ( req.body.id ) {
			//prima leggo il project originale, quello da clonare
			req.app.sbam.project.findById( req.body.id, function(err, project) {
				if (err) {
					console.log("findById:error "+err);
					res.send(err);
				} else if (project) {
					//clonare un document di mongoose è un bordello
					//devo sia fare un clone con JSON.parse e stringify,
					//e poi devo copiare tutti gli attr uno per uno
					var clonedProjectFinal = new req.app.sbam.project();
					var clonedProjectTemp = JSON.parse(JSON.stringify(project));
					for (var prop in clonedProjectTemp) {
						if ( prop != "_id" && prop != "created_at" && prop != "updated_at" && prop != "__v" && clonedProjectTemp.hasOwnProperty(prop) && typeof clonedProjectTemp[prop] !== 'function') {
							clonedProjectFinal[prop] = clonedProjectTemp[prop];
						}
					}
					clonedProjectFinal.name = "COPY "+clonedProjectFinal.name;
					clonedProjectFinal.status = "editing";
					//risalvo con nuovo id, ovvero clono
					clonedProjectFinal.save(function (err) {
						//console.log("dove");
						if ( err ) {
							console.log("save:error "+err);
							res.send(err);
						} else {
							var ncp = require('ncp').ncp;
							var mkdirp = require('mkdirp');
							//finito di clonare il project nel db, 
							//creo le cartelle del nuovo project
							req.app.sbam.projects.createProjectFolders(req,res,req.cookies.userID,clonedProjectFinal._id,function(){
								//faccio un parsing di tutti gli elements in tutte le pagine
								//e se sono immagini, devo copiarle
								var originalRepoPath = req.app.sbam.utils.getRepoPath(req.cookies.userID,project._id);
								var clonedRepoPath = req.app.sbam.utils.getRepoPath(req.cookies.userID,clonedProjectFinal._id);
								var toBeCopiedFiles = [];
								for ( var i=0; i<clonedProjectFinal.pages.length; i++ ) {
									var page = clonedProjectFinal.pages[i];
									for ( var j=0; j<page.elements.length; j++ ) {
										var elm = page.elements[j];
										if ( elm.type == "image" && elm.image && elm.image.url && !req.app.sbam.utils.isTemplateImage(req,res,elm.image.url) ) {
											console.log("EHI! DUDU! QUI C'E' UN'IMMAGINE PERDIO!!!! alla pagina "+i+" elemento "+j+" dovrei copiarla da "+originalRepoPath+elm.image.url+" >>> "+clonedRepoPath+elm.image.url);
											toBeCopiedFiles.push({
												from:originalRepoPath+elm.image.url,
												to:clonedRepoPath+elm.image.url
											});
										}
									}
								}
								//ora che ho una lista con le operazioni di copia da fare, 
								//uso un loop async per farle, con ncp
								var toBeCopiedFilesCloned = toBeCopiedFiles.slice(0); //tengo copia dell'originale, visto che il clone lo spolpo
								asyncLoop();
								function asyncLoop() {
									if ( toBeCopiedFilesCloned.length > 0 ) {
										var copy = toBeCopiedFilesCloned.pop();
										//trovo il solo path di destinazione
										var clonePathParts = copy.to.split("/");
										clonePathParts.pop();
										copy.toPath = clonePathParts.join("/");
										//se i folder di destinazione non ci sono li creo
										console.log("chiamo mkdirp su "+copy.toPath);
										mkdirp.sync(copy.toPath);
										//e poi copio i file
										console.log("chiamo ncp da "+copy.from+" a "+copy.to);
										ncp(copy.from, copy.to, function (err) {
											if (err) {
												console.log("ncp: error: "+err);
												res.end(JSON.stringify({errormsg: err }));
											} else {
												asyncLoop();
											}
										});											
									} else {
										//finito asyncLoop
										res.end(JSON.stringify(clonedProjectFinal));
									}
								}
							});							
						}
					});					
				} else {
					console.log("find: empty result");
					res.end(JSON.stringify({errormsg: req.app.i18n.__("Empty result") }));
				}
			});			
		} else {
			var errormsg = "";
			errormsg += req.app.i18n.__("Campo id obbligatorio.");
			res.end(JSON.stringify({errormsg: errormsg }));
		}
	});
	router.post('/saveProjectOrder', function(req, res) {
		if ( req.body.project && req.body.order && req.cookies.userName ) {
			//prima trovo i dati dell'utente come salvati nel db di wordpress
			//mi connetto al db mysql (ho gli accessi nel config)
			var mysql      = require('mysql');
			var connection = mysql.createConnection({
				host     : req.app.sbam.config.mysql.host,
				database : req.app.sbam.config.mysql.database,
				user     : req.app.sbam.config.mysql.user,
				password : req.app.sbam.config.mysql.password,
				multipleStatements: true
			});
			connection.connect();
			
			//MYSQL QUERY TO REMOTE WORDPRESS DB
			//cerco un wp_user con il mio username
			connection.query('SELECT * FROM wp_usermeta LEFT JOIN  wp_users ON  wp_users.ID = wp_usermeta.user_id WHERE wp_users.user_login = "'+req.cookies.userName+'";', function(err, rows, fields) {
				if (err) throw err;
				if (rows.length > 0) {
					//se lo trovo
					//i dati che mi arrivano dal db fan pietà
					//devo parsarli e salvare tutto in un oggetto più comodo
					var wpUserID = rows[0].ID;
					var userData = {};
					for ( var x=0; x<rows.length; x++ ) {
						var userKey = String(rows[x].meta_key);
						if (userKey) {
							var userValue = String(rows[x].meta_value);
							if (userValue) {
								userData[userKey] = userValue;
							}
						}
					}
					//console.log("userData:");
					//console.log(userData);
					//############# la prima query è l'insert in wp_posts, e ne devo tenere l'id risultante
					var qryPosts = "\
					INSERT INTO  wp_posts (\
						post_author,\
						post_date,\
						post_date_gmt,\
						post_content,\
						post_title,\
						post_excerpt,\
						post_status,\
						comment_status,\
						ping_status,\
						post_password,\
						post_name,\
						to_ping,\
						pinged,\
						post_modified,\
						post_modified_gmt,\
						post_content_filtered,\
						post_parent,\
						guid,\
						menu_order,\
						post_type,\
						post_mime_type,\
						comment_count\
					)\
					VALUES (\
						'1',\
						NOW(),\
						NOW(),\
						'',\
						DATE_FORMAT(NOW(),'Order &ndash; %M %e, %Y @ %h:%i %p'),\
						'',\
						'wc-pending',\
						'closed',\
						'closed',\
						'order_"+req.body.project._id+"', \
						DATE_FORMAT(NOW(),'ordine-%M-%d-%Y-%h%i-%p'),\
						'',\
						'',\
						DATE_FORMAT(NOW(),'%Y-%m-%d %H:%i:%S'),\
						DATE_FORMAT(NOW(),'%Y-%m-%d %H:%i:%S'),\
						'',\
						'0',\
						'',\
						'0',\
						'shop_order',\
						'',\
						'0'\
					);\
					";
					//console.log(qryPosts);
					connection.query(qryPosts, function(err, qryPostsInfo) {
						if (err) throw err;
						//console.log("SSIIIIII, e con id="+qryPostsInfo.insertId);
						var postId = qryPostsInfo.insertId;
						//############# la seconda query è per aggiornare guid sempre nel post
						var qryPostsUpdate = "UPDATE wp_posts SET guid = 'http://my-e.eu/?post_type=shop_order&p="+postId+"' WHERE wp_posts.ID = "+postId+";";
						connection.query(qryPostsUpdate, function(err, result) {
							if (err) throw err;
							//console.log("salvato anche guid per id="+postId+", modificata "+result.changedRows+" riga");
							//############# la terza query serve per salvare tutti i dati dell'ordine in wp_postmeta
							//vanno popolati con userData
							var qryPostmeta = "";
							if (userData.billing_country) qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_billing_country',  '"+userData.billing_country+"');";
							if (userData.billing_first_name) qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_billing_first_name',  '"+userData.billing_first_name+"');";
							if (userData.billing_last_name) qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_billing_last_name',  '"+userData.billing_last_name+"');";
							if (userData.billing_company) qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_billing_company',  '"+userData.billing_company+"');";
							if (userData.billing_address_1) qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_billing_address_1',  '"+userData.billing_address_1+"');";
							if (userData.billing_address_2) qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_billing_address_2',  '"+userData.billing_address_2+"');";
							if (userData.billing_postcode) qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_billing_postcode',  '"+userData.billing_postcode+"');";
							if (userData.billing_city) qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_billing_city',  '"+userData.billing_city+"');";
							if (userData.billing_state) qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_billing_state',  '"+userData.billing_state+"');";
							if (userData.billing_email) qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_billing_email',  '"+userData.billing_email+"');";
							if (userData.billing_phone) qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_billing_phone',  '"+userData.billing_phone+"');";
							if (userData.billing_cf) qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_billing_billing_cf',  '"+userData.billing_cf+"');";//il campo cf è definito in functions.php del theme child, non è un campo di default di woocommerce
							if (userData.shipping_country) qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_shipping_country',  '"+userData.shipping_country+"');";
							if (userData.shipping_first_name) qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_shipping_first_name',  '"+userData.shipping_first_name+"');";
							if (userData.shipping_last_name) qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_shipping_last_name',  '"+userData.shipping_last_name+"');";
							if (userData.shipping_company) qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_shipping_company',  '"+userData.shipping_company+"');";
							if (userData.shipping_address_1) qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_shipping_address_1',  '"+userData.shipping_address_1+"');";
							if (userData.shipping_address_2) qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_shipping_address_2',  '"+userData.shipping_address_2+"');";
							if (userData.shipping_postcode) qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_shipping_postcode',  '"+userData.shipping_postcode+"');";
							if (userData.shipping_city) qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_shipping_city',  '"+userData.shipping_city+"');";
							if (userData.shipping_state) qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_shipping_state',  '"+userData.shipping_state+"');";
							if (userData.shipping_cf) qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_shipping_shipping_cf',  '"+userData.shipping_cf+"');";//il campo cf è definito in functions.php del theme child, non è un campo di default di woocommerce
							qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_payment_method',  '');";
							qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_payment_method_title',  '');";
							qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_order_shipping',  '"+req.body.order.shippingPrice+"');";
							qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_order_discount',  '0');";
							qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_cart_discount',  '"+req.body.order.discount+"');";
							qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_order_tax',  '"+req.body.order.taxIncDisc+"');";
							qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_order_shipping_tax',  '"+req.body.order.shippingTax+"');";
							//qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_order_total',  '"+String(Number(req.body.order.priceIncTax)+Number(req.body.order.shippingPriceIncTax))+"');";
							qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_order_total',  '"+String(Number(req.body.order.priceIncTaxIncDisc)+Number(req.body.order.shippingPriceIncTax))+"');";
							qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_order_key',  'wc_order_"+req.body.project._id+"');";
							qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_customer_user',  '"+wpUserID+"');";
							qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_order_currency',  'EUR');";
							qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_prices_include_tax',  'yes');";
							qryPostmeta += "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('"+postId+"',  '_customer_ip_address',  '"+req.connection.remoteAddress+"');";
							//console.log("proverei");
							//console.log(qryPostmeta);
							connection.query(qryPostmeta, function(err, qryPostmetaInfo) {
								if (err) throw err;
								//console.log("DAJE OH GGRANDE!, e con qryPostmetaInfo:");
								//console.log(qryPostmetaInfo);
								//############# con la quarta query salvo le singole righe dell'ordine in wp_woocommerce_order_items
								var qryOrderItems = "";
								for ( var x=0; x<req.body.order.items.length; x++ ) {
									var item = req.body.order.items[x];
									var itemLabel = item.label+" - "+item.preset+" - "+item.details;
									qryOrderItems += "INSERT INTO  wp_woocommerce_order_items (order_item_name,order_item_type,order_id) VALUES ('"+itemLabel+"', 'line_item', '"+postId+"');";
								}
								//console.log("QUERY INCRIMINATA:"+qryOrderItems);
								connection.query(qryOrderItems, function(err, qryOrderItemsInfo) {
									if (err) throw err;
									if ( !req.app.sbam.utils.is_array(qryOrderItemsInfo) ) qryOrderItemsInfo = [qryOrderItemsInfo];
									//console.log("QUERY INCRIMINATA ritorna qryOrderItemsInfo:");
									//console.log(qryOrderItemsInfo);
									//############# con la quinta query, per ogni riga dell'ordine, salvo tutti i relativi valori (qty,prezzo,tasse,ecc) in wp_woocommerce_order_itemmeta
									var qryOrderItemsmeta = "";
									for ( var x=0; x<req.body.order.items.length; x++ ) {
										var item = req.body.order.items[x];
										var itemInfo = qryOrderItemsInfo[x];
										qryOrderItemsmeta += "\
											INSERT INTO wp_woocommerce_order_itemmeta(order_item_id,meta_key,meta_value) VALUES ('"+itemInfo.insertId+"',  '_qty',  '"+item.qty+"');\
											INSERT INTO wp_woocommerce_order_itemmeta(order_item_id,meta_key,meta_value) VALUES ('"+itemInfo.insertId+"',  '_tax_class',  'reduced-rate');\
											INSERT INTO wp_woocommerce_order_itemmeta(order_item_id,meta_key,meta_value) VALUES ('"+itemInfo.insertId+"',  '_variation_id',  '');\
											INSERT INTO wp_woocommerce_order_itemmeta(order_item_id,meta_key,meta_value) VALUES ('"+itemInfo.insertId+"',  '_line_subtotal',  '"+item.totPrice+"');\
											INSERT INTO wp_woocommerce_order_itemmeta(order_item_id,meta_key,meta_value) VALUES ('"+itemInfo.insertId+"',  '_line_total',  '"+item.totPrice+"');\
											INSERT INTO wp_woocommerce_order_itemmeta(order_item_id,meta_key,meta_value) VALUES ('"+itemInfo.insertId+"',  '_line_tax',  '"+item.totTax+"');\
											INSERT INTO wp_woocommerce_order_itemmeta(order_item_id,meta_key,meta_value) VALUES ('"+itemInfo.insertId+"',  '_line_subtotal_tax',  '"+item.totTax+"');\
										";
									}
									//console.log(qryOrderItemsmeta);
									connection.query(qryOrderItemsmeta, function(err, qryOrderItemsmetaInfo) {
										if (err) throw err;
										//console.log("SCRITTO PURE ACCULO A wp_woocommerce_order_itemmeta, con qryOrderItemsmetaInfo:");
										//console.log(qryOrderItemsmetaInfo);
										//############# con la sesta query, aggiungo all'ordine le righe con i totali in wp_woocommerce_order_items
										var qryOrderItemsTotals = "\
											INSERT INTO  wp_woocommerce_order_items (order_item_name , order_item_type , order_id ) VALUES ('"+req.body.order.shippingFirm+"',  'shipping',  '"+postId+"' );\
											INSERT INTO  wp_woocommerce_order_items (order_item_name , order_item_type , order_id ) VALUES ('"+req.body.order.taxCode+"',  'tax',  '"+postId+"' );\
										";
										//console.log(qryOrderItemsTotals);
										connection.query(qryOrderItemsTotals, function(err, qryOrderItemsTotalsInfo) {
											if (err) throw err;
											//console.log("SCRITTO PURE ACCULO A wp_woocommerce_order_items, con qryOrderItemsTotalsInfo:");
											//console.log(qryOrderItemsTotalsInfo);
											//############# con la settima e ultima query, per ogni riga dei totali dell'ordine, salvo tutti i relativi valori (prezzo,tasse,ecc) in wp_woocommerce_order_itemmeta
											var qryOrderItemsmetaTotals = "\
												INSERT INTO wp_woocommerce_order_itemmeta(order_item_id,meta_key,meta_value) VALUES ('"+qryOrderItemsTotalsInfo[0].insertId+"',  'method_id',  'flat_rate');\
												INSERT INTO wp_woocommerce_order_itemmeta(order_item_id,meta_key,meta_value) VALUES ('"+qryOrderItemsTotalsInfo[0].insertId+"',  'cost',  '"+req.body.order.shippingPrice+"');\
												INSERT INTO wp_woocommerce_order_itemmeta(order_item_id,meta_key,meta_value) VALUES ('"+qryOrderItemsTotalsInfo[1].insertId+"',  'rate_id',  '2');\
												INSERT INTO wp_woocommerce_order_itemmeta(order_item_id,meta_key,meta_value) VALUES ('"+qryOrderItemsTotalsInfo[1].insertId+"',  'label',  'IVA 4%');\
												INSERT INTO wp_woocommerce_order_itemmeta(order_item_id,meta_key,meta_value) VALUES ('"+qryOrderItemsTotalsInfo[1].insertId+"',  'compound',  '0');\
												INSERT INTO wp_woocommerce_order_itemmeta(order_item_id,meta_key,meta_value) VALUES ('"+qryOrderItemsTotalsInfo[1].insertId+"',  'tax_amount',  '"+req.body.order.tax+"');\
												INSERT INTO wp_woocommerce_order_itemmeta(order_item_id,meta_key,meta_value) VALUES ('"+qryOrderItemsTotalsInfo[1].insertId+"',  'shipping_tax_amount',  '"+req.body.order.shippingTax+"');\
											";
											//console.log(qryOrderItemsTotals);
											connection.query(qryOrderItemsmetaTotals, function(err, qryOrderItemsmetaTotalsInfo) {
												if (err) throw err;
												//console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaSCRITTO PURE ACCULO A wp_woocommerce_order_itemmeta, con qryOrderItemsmetaTotalsInfo:");
												//console.log(qryOrderItemsmetaTotalsInfo);
												
												//dopo che ho finito di salvare nel db sql di wordpress,
												//devo anche scrivere in mongo che il project è diventato ordered
												req.app.sbam.project.findById( req.body.project._id, function(err, project) {
													if (err) {
														//se non lo trovo
														var errormsg = "";
														errormsg += req.app.i18n.__("Utente inesistente con id="+req.body.project._id);
														res.end(JSON.stringify({errormsg: errormsg }));
													} else if (project) {
														//console.log("PRIMA ecco il mio project da salvare come è nel db:");
														//console.log(project);
														project.status = "ordered";
														//console.log("ma");
														project.save(function (err) {
															//console.log("dove");
															if ( err ) {
																//save error
																var errormsg = "";
																errormsg += req.app.i18n.__("/saveProjectOrder: mongo save error sul project!");
																res.end(JSON.stringify({errormsg: errormsg }));
															} else {
																//console.log("INFINE salvato!");
																res.end(JSON.stringify({}));
															}
														});
													} else {
														console.log("find: empty result");
														res.end(JSON.stringify({errormsg: req.app.i18n.__("Empty result") }));
													}
												});													
											});
										});
									});
								});
							});
						});
					});
				} else {
					//se non lo trovo
					var errormsg = "";
					errormsg += req.app.i18n.__("Utente inesistente con username="+req.cookies.userName);
					res.end(JSON.stringify({errormsg: errormsg }));
				}
			});			
		} else {
			var errormsg = "";
			errormsg += req.app.i18n.__("Campo project e order obbligatori. E bisogna essere loggati.");
			res.end(JSON.stringify({errormsg: errormsg }));
		}
	});
	router.post('/delProject', function(req, res) {
		//console.log("provo la query delProject su id:"+req.body.id);
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
						//infine cancello i file in cache legati a questo project
						//per farlo devo ciclare su tutti i file nella cache, e verificare uno ad uno se è da cancellare o meno
						var cachePath = req.app.sbam.utils.getCachePath(req);
						//console.log("cachePath:"+cachePath);
						var fs   = require('fs');
						fs.readdir(cachePath, function(err, files) {
							if (err) {
								console.log("delProject:error leggendo la lista dei file nella cache con readdir "+err);
								res.send(err);
							} else if (files) {
								//console.log("delProject readdir: arrivati i files:");
								//console.log(files);
								//ciclo su ciascuno
								for (var x=0; x<files.length; x++) {
									var fileName = files[x];
									//se nel nome del file ci trovo il mio id, allora lo cancello.
									//console.log("delProject: loop sul file:"+fileName);
									if ( fileName.indexOf(req.body.id) > -1 ) {
										//console.log("delProject: cancellerei dalla cache il file:"+fileName+" perchè contiene il mio id: "+req.body.id);
										fs.unlinkSync(cachePath+fileName);
									}
								}
								//ritorno
								res.end(JSON.stringify({}));
							} else {
								console.log("delProject readdir: empty result");
								res.end(JSON.stringify({errormsg: req.app.i18n.__("Empty result") }));
							}
						});
					}
				});
			}
		});
	});
	router.post('/printProject', function(req, res){ 
		//console.log("provo la query printProject su id:"+req.body.id);
		req.app.sbam.project.findById( req.body.id, function(err, project) {
			if (err) {
				console.log("/printProject: findOne error:"+err);
				res.send(err);
			} else if (project) {
				//console.log("project:");
				//console.log(project);
				//trovato dal db il mio project da stampare, chiamo il renderer 
				req.app.sbam.renderer.renderAllPdf(req,res,project,function(prjPdfUrls){
					res.end(JSON.stringify(prjPdfUrls));
				});
			} else {
				console.log("/printProject: find: empty result");
				res.end(JSON.stringify({errormsg: req.app.i18n.__("Empty result") }));
			}
		});
	});

	

	
	
	//ADMIN ROUTES
	router.get('/admin', function(req, res){ 
		res.render('adminLogin', {
		});
	});
	router.post('/admin', function(req, res){ 
		//controllo il login del superadmin
		res.render('admin', {
			username:req.body.username,
			password:req.body.password
		});
	});
	//routes to be called from client via ajax (return json)
	router.post('/adminLoginAsNormalUser', function(req, res){
		var loginasuser = req.body.loginasuser;
		if ( loginasuser && loginasuser._id && loginasuser.name ) {
			//salvo i cookies relativi all'utente chiesto
			req.app.sbam.sess.resetCookies(req,res);
			req.app.sbam.sess.setCookieUserId(req,res,loginasuser._id);
			req.app.sbam.sess.setCookieUserName(req,res,loginasuser.name);
			req.app.sbam.sess.setCookiePlatform(req,res,loginasuser.platform);
			req.app.sbam.sess.setCookieFromAdmin(req,res);
			//e ritorno
			res.end();
		}
	});
	router.post('/adminGetUers', function(req, res){ 
		console.log("cerco gli users!");
		req.app.sbam.user.find(
			{'name':{'$ne': "" }},
			{},
			{
				//skip:0, // Starting Row
				//limit:10, // Ending Row
				sort:{
					'created_at': 'asc'
				}
			}, 
			function(err, users) {
				if (err) {
					console.log("/adminGetUers find:error "+err);
					res.send(err);
				} else if (users) {
					console.log("arrivati gli users:");
					console.log(users);
					//finito
					res.end(JSON.stringify(users));
				} else {
					console.log("find: empty result");
					res.end(JSON.stringify({errormsg: req.app.i18n.__("Empty result") }));
				}
			}
		);
	});
	

}


exports.defineRoutes = defineRoutes; 
//exports.routeInit = routeInit; serve? viene usata solo qui



}