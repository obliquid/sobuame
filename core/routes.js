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
		console.log('body:');
		console.log(req.body);
		//check valid user (apart from login page)
		if ( req.url.substring(0, 6) != "/login" ) {
			req.app.sbam.sess.checkValidUser(req, res, next);
		} else {
			next();	
		}
	});
	
	
	
	//SESSIONS ROUTES
	
	//GET: mail page dell'applicazione. è l'unica pagina, qui dentro ci gira tutto in js senza mai ricaricare
	router.get('/', function(req, res){ 
		//console.log("DAJE EXPLO!!! SII ENTRATOO!!");
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
		req.app.sbam.sess.checkWordpressValidUser(req,res,req.body.username.trim(),req.body.password.trim(),function(msg){
			//on success
			//console.log("DAJE EXPLO!!! MO ENTRI!!");
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
	router.post('/getWidgetImg', function(req, res){ 
		var url = req.body.url;
		var projectId = req.body.projectId;
		//console.log("##### chiamata route /getWidgetImg con url="+url+" e projectId="+projectId);
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
							if ( fs.statSync(repoPath + file).isDirectory() ) {
								addToFilesDetail(file,"images/icon-folder-128.png","folder");
								recurse(next);
							} else {
								//qui devo fare chiamata async a getImg per ottenere la miniatura dell'immagine
								req.app.sbam.utils.getImg(req,res,req.cookies.userID,req.body.projectId,file,repoSubdir,80,80,true,function(thumbUrl){
									addToFilesDetail(file,thumbUrl,"file");
									recurse(next);
								}); 
							}
							function addToFilesDetail(file,thumbUrl,type){
								//aggiungo all'array dei file dettagliati
								filesDetail.push({
									'name': file, 
									'thumbUrl': thumbUrl,  
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
		var projectW = req.body.projectW;
		var projectH = req.body.projectH;
		var projectType = req.body.projectType;
		if ( !projectType ) projectType = "all";		
		//leggo tutti i template intesi come file nella cartella dei templates
		//console.log("getPageTemplates: con projectType = "+projectType);
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
					if ( fileName.toLowerCase().indexOf(ext, fileName.toLowerCase().length - ext.length) !== -1 ) {
						//console.log("getPageTemplates: questo lo tengo:"+fileName+" finisce con l'estensione giusta: "+ext);
						//ora devo controllare se la parola projectType è nella seconda componente del nome file del template
						//tolgo l'estensione
						fileName = fileName.substring(0, fileName.length - ext.length);
						//parso il template name
						var templateParts = req.app.sbam.utils.parseTemplateFilename(fileName);
						var templateName = templateParts.templateName;
						var projectTypes = templateParts.projectTypes;
						var projectSize = templateParts.projectSize;
						var templateVariant = templateParts.templateVariant;
						//se qualche parametro manca (malfromed filename secondo la naming convention) skippo
						if ( !templateName || templateName == "" || !projectTypes || projectTypes.length == 0 || !projectSize || projectSize.length == 0 || !templateVariant || templateVariant == "" ) {
							//skippo
						} else {
							//console.log("getPageTemplates: questo lo tengo:"+fileName+" naming convention rispettata");
							//ultimo controllo: se tra i project types c'è "all" o c'è il mio projectType
							for ( var i=0; i<projectTypes.length; i++ ) {
								if (
									( projectTypes[i] == "all" || projectType == "all" || projectTypes[i] == projectType )
									&&
									Number(projectSize[0]) == Number(projectW)
									&&
									Number(projectSize[1]) == Number(projectH)
								) {
									//olè!!! questo lo tengo!
									//console.log("getPageTemplates: questo lo tengo:"+fileName+" project type rispettato!");
									validatedFiles.push({
										"label":templateName,
										"size":projectSize[0]+"x"+projectSize[1]+"mm",
										"variant":templateVariant,
										"filename":fileName
									});
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
						req.app.sbam.renderer.renderBitmap(req,res,false,tpl.filename,60,60,function(tplThumbUrl){
							//salvo l'url della miniatura così ottenuta
							tpl.thumbUrl = tplThumbUrl+"?"+Math.random();
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
			'name dpi width height type pages updated_at', // Columns to Return
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
							req.app.sbam.renderer.renderBitmap(req,res,prj,false,80,80,function(prjThumbUrl){
								//salvo l'url della miniatura così ottenuta
								prj.thumbUrl = prjThumbUrl+"?"+Math.random();
								//poi butto le pages dal prj per non appesantire la response alla chiamata ajax
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
	router.post('/addProject', function(req, res) {
		//helper functions
		var pagesRemaining = 0;
		function syncTheAsyncLoop(req,res,project) {
			if ( pagesRemaining > 0 ) {
				var i = req.body.pages.length - pagesRemaining;
				//console.log("syncTheAsyncLoop: starei per gestire questa page:");
				//console.log(req.body.pages[i]);
				//console.log(req.body.pages[i].num);
				//if ( !req.body.pages[i].num ) console.log("EPPURE PER ME NON ESISTE DIOCANE!!!!");
				var pageType = req.body.pages[i].type;
				if ( req.body.pages[i].num ) {
					var pageNum = req.body.pages[i].num;
				} else {
					var pageNum = -1;
				}
				//console.log(pageNum);
				//console.log(pageType);
				if ( req.body.pages[i].tpl ) {
					//leggo il contenuto del template, e ci popolo la pagina
					var tplFile = req.app.sbam.config.templatesDir + req.body.pages[i].tpl + "." + req.app.sbam.config.templatesExt;
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
			var i = req.body.pages.length - pagesRemaining;
			//console.log("addPage con i="+i);
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
			//console.log("addProjectSave:");
			//console.log("ecco tutto il mio project:");
			//console.log(project);
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
							//e infine dentro a questa cartella devo crearci un link alle immagini di default
							var linkName = projectDir+"/libreria";
							var linkTarget = "../../../../"+req.app.sbam.config.templatesImagesDir;
							//console.log("proverei a creare il link da "+linkName+" a "+linkTarget);
							fs.symlinkSync(linkTarget,linkName);
							
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
		//console.log("ecco tutto il mio body:");
		//console.log(req.body);
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
			if ( req.body.form.dpi ) project.dpi = req.body.form.dpi;
			if ( req.body.form.variant ) project.variant = req.body.form.variant;
			if ( req.body.form.spline ) {
				project.spline = req.body.form.spline;
			} else {
				project.spline = project.name; //se non specificato il dorso, lo preimposto uguale al titolo
			}
			if ( req.body.pages && req.body.pages.length > 0 ) {
				pagesRemaining = req.body.pages.length;
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
				req.app.sbam.renderer.renderPdf(req,res,project,function(prjPdfUrl){
					res.end(JSON.stringify(prjPdfUrl));
				});
			} else {
				console.log("/printProject: find: empty result");
				res.end(JSON.stringify({errormsg: req.app.i18n.__("Empty result") }));
			}
		});
	});

	
}


exports.defineRoutes = defineRoutes; 
//exports.routeInit = routeInit; serve? viene usata solo qui



