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


function defineRoutes(app) {
	
	//GET: mail page dell'applicazione. qui dentro ci sono tutte le pagine jQueryMobile
	app.get('/', function(req, res){ 
		app.sbam.routes.routeInit(req,res);
		res.render('home', {
			//title:"Impagina"
		});
	});
	app.get('/login', function(req, res){ 
		//app.sbam.routes.routeInit(req,res);
		res.render('login', {
			//title:"Accedi"
		});
	});
	app.post('/login', function(req, res){ 
		//app.sbam.routes.routeInit(req,res);
		console.log("làlà");
		
		console.log("lèlè");
		
		
		  
		  
		  
		  
		  
		  
		
		
		console.log("uèuè");
		console.log(req.body.username);
		console.log(req.body.password);
		res.render('login', {
			username:req.body.username,
			password:req.body.password
		});
		
	});

	
	/*
	//POST: login signin
	app.post('/signin', function(req, res) {
		app.jsl.routes.routeInit(req);
		//controllo se esiste il mio utente nel db
		app.jsl.sess.checkValidUser(req, function(result, user_id) { 
			if ( result )
			{
				//ho trovato lo user nel db (oppure sono superadmin)
				//il login è valido
				app.jsl.sess.setSignedIn(req, user_id);
				console.log("POST: login signin: login succeded for user: "+req.body.login_email);
				//alla fine ricarico la pagina da cui arrivavo
				res.redirect('back');
			}
			else
			{
				//il mio utente non c'è nel db
				app.jsl.sess.setSignedOut(req);
				console.log("POST: login signin: login failed for user: "+req.body.login_email);
				//alla fine ricarico la pagina da cui arrivavo
				res.redirect('back');
			}
		});	
	});
	
	//GET: login signout
	app.get('/signout', function(req, res) {
		app.jsl.routes.routeInit(req);
		//resetto le session
		console.log("POST: login signout: for user: "+req.session.email);
		app.jsl.sess.setSignedOut(req);
		//alla fine ricarico la pagina da cui arrivavo
		res.redirect('back');
	});
	
	//GET: change language
	app.get('/lan/:locale?', function(req, res) {
		app.jsl.routes.routeInit(req);
		//cambio la lingua
		//req.session.currentLocale = req.params.locale;
		//console.log("prima nei cookie ho:");
		//console.log(req.cookies);
		res.cookie('currentlocale', req.params.locale, { expires: new Date(Date.now() + app.jsl.config.cookiesDurationMs), path: '/' });
		//console.log('dopo nei cookies ho: ');
		//console.log(req.cookies);
		//alla fine ricarico la pagina da cui arrivavo
		res.redirect('back');
	});
	
	//POST: qaptcha specific route
	app.post('/qaptcha', function(req, res) {
		app.jsl.routes.routeInit(req);
		console.log(req.body);
		var response = {};
		response['error'] = false;
			
		if(req.body.action && req.body.qaptcha_key)
		{
			req.session.qaptcha_key = false;	
			
			if(req.body.action == 'qaptcha')
			{
				req.session.qaptcha_key = req.body.qaptcha_key;
			}
			else
			{
				response['error'] = true;
			}
		}
		else
		{
			response['error'] = true;
		}
		res.json( response );
	});
	*/
	
	
	
	/*
	FILTERS
	nota: ora li tengo qui, ma se aumentano sarà meglio metterli, ove possibile, nei rispettivi controllers js
	*/
	/*
	//GET: list filter All or Mine
	app.get('/filterAllOrMine/:filterOn', function(req, res) {
		app.jsl.routes.routeInit(req);
		//posso filtrare sui miei elementi solo se sono loggato, e se non sono superadmin
		if ( req.session.loggedIn && req.session.user_id != 'superadmin' )
		{
			//sono loggato, non come superadmin, quindi posso filtrare
			req.session.filterAllOrMine = req.params.filterOn;
		}
		else if ( req.session.loggedIn && req.session.user_id == 'superadmin' )
		{
			//sono loggato come superadmin, non posso filtrare sui miei elementi ma solo su tutti
			req.session.filterAllOrMine = 'all';
		}
		else
		{
			//se invece sto cercando di attivare il filtering senza essere loggato, forzo un loagout che mi azzera tutte le sessions
			setSignedOut(req);
		}
		//alla fine ricarico la pagina da cui arrivavo
		res.redirect('back');
	});
	
	//GET: filter by site
	//nota: se si passa anche il parametro andGotoUrl, questo deve essere URIencodato: in jade usare #{encURI('url')}
	app.get('/filterBySite/:site?/:andGotoUrl?', function(req, res) {
		app.jsl.routes.routeInit(req);
		//prima definisco su che url fare il redirect
		var redirectTo = ( req.params.andGotoUrl != '' && req.params.andGotoUrl != undefined ) ? decodeURIComponent(req.params.andGotoUrl) : 'back';
		//inizialmente azzero la session per il filtraggio
		req.session.filterBySite = undefined;
		//verifico se mi è arrivato un site su cui filtrare
		if ( req.params.site != '' && req.params.site != undefined )
		{
			//leggo i siti su cui posso filtrare, per verificare che l'utente stia cercando di filtrare su un sito a lui consentito
			app.jsl.siteController.getSites(req,res,function(sites) {
				if (sites)
				{
					//posso filtrare su dei sites. verifico se quello richiesto è tra quelli papabili
					//nota: non posso usare array.forEach perchè devo poter usare break;
					for (var x=0;x<sites.length;x++)
					{
						if ( sites[x]._id == req.params.site )
						{
							//trovato il mio sito, posso usarlo per filtrare
							//imposto le session ed esco dal ciclo
							req.session.filterBySite = req.params.site;
							break;
						}
					}
					//ricarico la pagina da cui arrivavo
					res.redirect(redirectTo);				
				}
				else
				{
					//se non mi sono arrivati sites, vuol dire che non posso filtrare su niente
					//ricarico la pagina da cui arrivavo
					res.redirect(redirectTo);				
				}
			});
		}
		else
		{
			//non mi è arrivato il site, che vuol dire che non devo filtrare su nessun site
			//ricarico la pagina da cui arrivavo
			res.redirect(redirectTo);
		}
	});
	*/
	
	/*	
	//GET: filter by model
	//nota: se si passa anche il parametro andGotoUrl, questo deve essere URIencodato: in jade usare #{encURI('url')}
	app.get('/filterByModel/:jslModel?/:andGotoUrl?', function(req, res) {
		app.jsl.routes.routeInit(req);
		//prima definisco su che url fare il redirect
		var redirectTo = ( req.params.andGotoUrl != '' && req.params.andGotoUrl != undefined ) ? decodeURIComponent(req.params.andGotoUrl) : 'back';
		//inizialmente azzero la session per il filtraggio
		req.session.filterByModel = undefined;
		//verifico se mi è arrivato un jslModel su cui filtrare
		if ( req.params.jslModel != '' && req.params.jslModel != undefined )
		{
			//leggo i siti su cui posso filtrare, per verificare che l'utente stia cercando di filtrare su un sito a lui consentito
			app.jsl.jslModelController.getJslModels(req,res,function(jslModels) {
				if (jslModels)
				{
					//posso filtrare su dei jslModels. verifico se quello richiesto è tra quelli papabili
					//nota: non posso usare array.forEach perchè devo poter usare break;
					for (var x=0;x<jslModels.length;x++)
					{
						if ( jslModels[x]._id == req.params.jslModel )
						{
							//trovato il mio sito, posso usarlo per filtrare
							//imposto le session ed esco dal ciclo
							req.session.filterByModel = req.params.jslModel;
							break;
						}
					}
					//ricarico la pagina da cui arrivavo
					res.redirect(redirectTo);				
				}
				else
				{
					//se non mi sono arrivati jslModels, vuol dire che non posso filtrare su niente
					//ricarico la pagina da cui arrivavo
					res.redirect(redirectTo);				
				}
			});
		}
		else
		{
			//non mi è arrivato il jslModel, che vuol dire che non devo filtrare su nessun jslModel
			//ricarico la pagina da cui arrivavo
			res.redirect(redirectTo);
		}
	});
	*/

	
	
}


/* questa va richiamata da ogni route, e compie operazioni utili e comuni a tutte le route.
nota che i controlli sui permessi vengono fatti dal middleware, questa servirà ad altro */
function routeInit(req,res)
{
	console.log('route matched: '+req.route.path);	
	//check valid user
	req.app.sbam.sess.checkValidUser();


	
}





exports.defineRoutes = defineRoutes; 
exports.routeInit = routeInit; 



