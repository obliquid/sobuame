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
				password:req.body.password,
				errormsg:msg
			});
		});
		
		
	});

	router.get('/logout', function(req, res){ 
		req.app.sbam.sess.logout(req,res,function(){
			res.redirect("/");
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
		//console.log("provo la query addProject");
		console.log("ecco tutto il mio body:");
		console.log(req.body);
		console.log(req.body.form);
		console.log(req.body.form.name);
		console.log(req.body.form.type);
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
			
			if ( req.body.pages && req.body.pages.length > 0 ) {
				for( var i=0; i<req.body.pages.length; i++) {
					console.log("starei per gestire questa page:");
					console.log(req.body.pages[i]);
					if (req.body.pages[i].num) {
						project.pages.push({
							'type':req.body.pages[i].type,
							'num':Number(req.body.pages[i].num)
						});
					} else {
						project.pages.push({
							'type':req.body.pages[i].type
						});
					}
				}
			}
			
			//QUI if ( req.body.form.spline ) project.spline = req.body.form.spline; //non ancora implementato perchè non so se farlo nel modify e nel add
			
			//console.log("creato new project");
			project.save(function (err) {
				if ( err ) {
					console.log("save:error "+err);
					res.send(err);
				} else {
					//res.setHeader('Content-Type', 'application/json');//ma serve?
					//res.end(JSON.stringify(project));	
					//res.redirect("/");
					res.end(JSON.stringify(project));	
				}
			});
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
			if ( !req.body.project ) errormsg += req.app.i18n.__("Campo project obbligatorio.");
			res.end(JSON.stringify({'errormsg': errormsg }));
		}
	});
	router.post('/delProject', function(req, res) {
		console.log("provo la query delProject su id:"+req.body.id);
		req.app.sbam.project.findById( req.body.id ).remove( function(err) {
			if (err) {
				console.log("findById:error "+err);
				res.send(err);
			} else {
				//console.log("project:");
				//console.log(project);
				res.end(JSON.stringify({}));
			}
		});
	});

	
}


exports.defineRoutes = defineRoutes; 
//exports.routeInit = routeInit; serve? viene usata solo qui



