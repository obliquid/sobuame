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




	
//SESSIONS



/* controllo nei cookies e nel db se lo user è valido e può vedere la route richieste, o se devo fare un redirect sulla route di login */
function checkValidUser(req, res, next)
{
	console.log('checkValidUser');
	var userID = "";
	var userName = "";
	console.log("req.cookies.userID:"+req.cookies.userID);
	console.log("req.cookies.userName:"+req.cookies.userName);
	if ( req.cookies.userID != "" && req.cookies.userID != undefined ) {
		//l'utente ha già un ID assegnato, tengo quello
		userID = req.cookies.userID;
		//console.log("userID:"+userID);
		//controllo nel db perchè deve esistere
		req.app.sbam.user.findById(userID, function(err, user) {
			if (err) {
				console.log("findById:error "+err);
				res.send(err);
			} else if (user && !user.name) {
				//console.log("findOne:trovato senza name");
				//se lo trovo e ha userName="" vuol dire che non ha mai effettuato il login, quindi procedo tenendo buono l'_id che è l'unica cosa che ho
				next();
			} else if (user && user.name != "") {
				//console.log("findOne:trovato con name");
				//se lo trovo e ha userName uguale al mio vuol dire che è un utente registrato, verifico se è loggato (se ha il cookie userName)
				if (req.cookies.userName != "" && req.cookies.userName != undefined && req.cookies.userName == user.name ) {
					//il nome salvato nel db corrisponde al nome nei miei cookies, procedo
					next();
				} else if (req.cookies.userName != "" && req.cookies.userName != undefined && req.cookies.userName != user.name ) {
					//il nome salvato nel db NON corrisponde al nome nei miei cookies, cookies corrotti
					resetCookies(req,res);
					//rifaccio il check perchè i cookie sono cambiati
					checkValidUser(req, res, next);
				} else {
					//nei cookies non è salvato il nome, obbligo a fare il login
					//è il caso in cui l'utente si trova su un nuovo pc, e aveva già effettuato il login una prima volta su un altro pc 
					console.log("CASCO IN QUESTO CASO MALVAGIO");
					res.redirect('/login/'+user.name);
					//res.redirect('/');
					//res.redirect('/login');

				}
			} else {
			//se non lo trovo
				//cookie non valido perchè non esiste nel db: cancello il cookie dall'utente
				resetCookies(req,res);
				//rifaccio il check perchè i cookie sono cambiati
				checkValidUser(req, res, next);
			}
		});
	} else {
		//caso di nuovo utente che entra per la prima volta sull'app (oppure gli è scaduto il cookie userID, che dura ab aeternum)
		//se l'ID non è definito, resetto tutti i cookies per sicurezza
		//console.log("caso di nuovo utente entra per la prima volta sull'app, oppure gli è scaduto il cookie userID, che dura ab aeternum)");
		resetCookies(req,res);
		//creo lo user nel db
		req.app.sbam.users.createUser(req,res,"",next);
	}
}
exports.checkValidUser = checkValidUser; 



function checkWordpressValidUser(req,res,userName,password,success,fail) {
	console.log("checkWordpressValidUser");
	//in pratica eseguo un login remoto su wp per autenticare il mio utente
	//viene richiamato in POST dalla pagina di login
	
	//####### AUTENTICAZIONE ########
	
	//non configuro mysql a livello di app per non appesantirla inutilmente
	//mi connetto al db mysql (ho gli accessi nel config)
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
		host     : req.app.sbam.config.mysqlHost,
		database : req.app.sbam.config.mysqlDatabase,
		user     : req.app.sbam.config.mysqlUser,
		password : req.app.sbam.config.mysqlPassword
	});
	connection.connect();
	
	//MYSQL QUERY TO REMOTE WORDPRESS DB
	//cerco un wp_user con il mio username
	connection.query('SELECT user_pass FROM  wp_users WHERE user_login="'+userName+'";', function(err, rows, fields) {
		if (err) throw err;
		//se lo trovo
		if (rows.length > 0 && rows[0].user_pass) {
			//ne tengo l'hashed password
			var hash = rows[0].user_pass;
			//console.log('The solution is: '+hash);
			//chiudo la connessione a mysql perchè da qui in poi non mi serve più
			connection.end();
			//HTTP REQUEST TO REMOTE WORDPRESS SITE PHP
			//chiamo un php script per verificare che la pw inserita dall'utente corrisponda all'hashed del db
			var http = require('http');
			var querystring = require('querystring');
			var data = querystring.stringify({
				'hash': hash,
				'password': password
			});
			var options = {
				host: req.app.sbam.config.wpSiteUrl,
				port: 80,
				path: '/wp-auth-sobuame.php',
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Length': Buffer.byteLength(data)
				}
			};
			var httpReq = http.request(options, function(httpRes) {
				//console.log('STATUS: ' + httpRes.statusCode);
				//console.log('HEADERS: ' + JSON.stringify(httpRes.headers));
				httpRes.setEncoding('utf8');
				httpRes.on('data', function (authResult) {
					//console.log('BODY: ' + authResult);
					//se corrisponde
					if (authResult=="OK") {
						
						//####### POST AUTENTICAZIONE ########
						
						//l'autenticazione è avvenuta, procedo con il processo di post autenticazione
						//cerco nel mongodb se esiste già uno user con questo userName
						req.app.sbam.user.findOne({'name':userName}, function(err, user) {
							if (err) {
								console.log("findOne:error "+err);
								res.send(err);
							//se esiste:
							} else if (user && user.name) {
								//console.log("findOne:trovato con name");
								//prendo il suo _id e lo confronto con quello nei cookies (che esiste sempre perchè viene creato prima del login)
								//se sono uguali
								if ( user._id.toString() == req.cookies.userID ) {
									//è un login ricorrente (perchè scaduto) su una stessa macchina, lascio come valido l'_id nei cookies
									//salvo nei cookies lo username
									setCookieUserName(req,res,userName);
									success('brao! login ricorrente!');
								//se sono diversi
								} else {
									//ci sono 2 casi in cui l'id nei cookies è diverso dall'id nel db (trovato per il mio username)
									//caso 1: provengo da user anonimo
									//caso 2: user switch (si passa da un vecchio utente loggato ad uno nuovo)
									//sicuramente dovrò aggiornare i cookies con i dati dal db
									//il problema è cosa fare del vecchio user indicato dai cookies prima di essere sovrascritti
									//devo cercare nel db se ha uno username
									//se ha username, lo lascio stare
									//se non ce l'ha, vuol dire che provengo da un utente anonimo, e devo spostare i suoi progetti (e file) sul primo utente su cui viene fatto il login
									req.app.sbam.user.findById(req.cookies.userID, function(err, prevUser) {
										if (err) {
											console.log("findById:error "+err);
											res.send(err);
										} else if (prevUser && prevUser.name && prevUser.name != "") {
											//il vecchio id esiste nel db e ha anche name
											//in questo caso non tocco il veccio utente, ma salvo nei cookies l'ID del nuovo, oltre al nuovo username
											setCookieUserId(req,res,user._id.toString());
											setCookieUserName(req,res,userName);
											success('login succeded and user switched');
										} else if (prevUser && ( !prevUser.name || prevUser.name == "" || prevUser.name == undefined ) ) {
											//il vecchio id esiste, ma non ha un name
											//vuol dire che provengo da utente anonimo
											//cioè devo prendere tutti i progetti dell'utente anonimo e devo spostarli sull'_id trovato nel db per il nuovo username
											var conditions = { user: req.cookies.userID };
											var update = { user: user._id };
											var options = { multi: true };
											req.app.sbam.project.update(conditions, update, options, function (err, numAffected) {
												if (err) {
													console.log("update:error "+err);
													res.send(err);
												} else {
													//e cancellare dal db il vecchio user anonimo
													//req.app.sbam.user.findById(req.cookies.userID).remove( function() {
													prevUser.remove( function() {
														//poi sovrascrivo i cookies con il nuovo id
														setCookieUserId(req,res,user._id.toString());
														//e salvo nei cookies lo username
														setCookieUserName(req,res,userName);
														//devo anche spostare i file uploadati dall'utente anonimo nel folder dell'utente loggato
														//e poi cancellare la cartella dell'utente anonimo
														var ncp = require('ncp').ncp;
														ncp.limit = 16;
														//sposto i file:
														var source = "repo/"+prevUser._id.toString();
														var destination = "repo/"+user._id.toString();
														ncp(source, destination, { clobber: false }, function (err) {
															if (err) {
																console.log("checkWordpressValidUser: error moving files from "+source+" to "+destination);
																console.log(err);
																fail(err);
																//return false;
															} else {
																//cancello la vecchia cartella:
																var rimraf = require("rimraf");
																rimraf(source, function (err) {
																	if (err) {
																		console.log("checkWordpressValidUser: error deleting user folder "+source);
																		console.log(err);
																		fail(err);
																		//return false;
																	} else {
																		//ritorno success
																		success('login succeded and personal ID updated with original one, and moved user files');
																	}
																});
															}
														});
													});
												}
											});
										}
									});
								}
							//se non esiste:
							} else {
								//possono esserci 2 casi: un first login o uno user switch
								
								//intanto salvo nei cookies il nuovo userName
								setCookieUserName(req,res,userName);
								
								//devo verificare il caso di switch dell'utente:
								//prima utente si logga (e ha idA e nameA)
								//poi si slogga (gli resta idA)
								//si logga come user nameB:
								//in questo caso non posso semplicemente sostituire nameB con nameA lasciando invariato idA, se no nel db sovrascrivo nameA
								//insomma devo creare nel db un nuovo user: nameB
								//da cui ottengo un nuovo idB
								//e posso mettere nei cookies nameB e idB, lasciando intatto nameA e idA
								
								//come capisco che è uno scambio di user invece che un first login?
								//se è un first login il mio id esiste nel db (viene creato prima nel db per avere l'id) ma non ha ancora name
								
								//se è uno user switch il mio id esiste già nel db e ha name salvato (quello dello user da cui provengo)
								
								//cerco se il mio id esiste già nel db
								req.app.sbam.user.findById(req.cookies.userID, function(err, user) {
									if (err) {
										console.log("findById:error "+err);
										res.send(err);
									} else if (user && user.name && user.name != "") {
										//il mio id esiste già nel db e ha anche name, devo creare un nuovo user
										//creo lo user nel db (questo metodo salva anche il nuovo id nei cookies, e crea la cartella dello user)
										req.app.sbam.users.createUser(req,res,userName,function(){
											success('login succeded and user switched');
										});
									} else {
										//il mio id anche se esiste nel db non ha name salvato, è un first login
										//salvo il name nel db per l'utente che ha per _id quello salvato nei cookies
										//////req.app.sbam.user.findById(req.cookies.userID, function (err, user2){
											//////if (err) {
												//////console.log("findById:error "+err);
												//////res.send(err);
											//////} else {
										user.name = userName;
										user.save(function (err) { 
											if (err) {
												console.log("save:error "+err);
												res.send(err);
											} else {
												success('great! your first authentication!');
											}
										});
											//////}
										//////});
									}
								});
							}
						});						
						
					//se NON corrisponde
					} else {
						fail('wrong password');
					}
				});
			});
			
			//boh, questa mi da un errore di parsing, anche se tutto funziona e ricevo un 200
			httpReq.on('error', function(e) {
				console.log('problem with request: ' + e.message);
			});

			//write data to request body
			//ovvero esego effettivamente la chiamata http
			//da qui in poi l'esecuzione prosegue in httpRes.on('data'...
			httpReq.write(data);
			httpReq.end();			
		} else {
		//se non lo trovo
			fail('user not found');
		}
	});
}
exports.checkWordpressValidUser = checkWordpressValidUser; 


//per fare il logout di un utente bisogna resettargli tutti i cookies, e poi va ricreato un utente anonimo nel db per avere un nuovo id
function logout(req,res,next) {
	resetCookies(req,res);
	req.app.sbam.users.createUser(req,res,"",next);
}
exports.logout = logout; 






















function setCookieUserId(req,res,id) {
	req.cookies.userID = id;
	res.cookie('userID', id, { maxAge: 1000*60*60*24*365 }); //1 anno
}
exports.setCookieUserId = setCookieUserId; 

function setCookieUserName(req,res,name) {
	console.log("EPORCODIO IO LO SALVO STO COOKIE!!!");
	req.cookies.userName = name;
	res.cookie('userName', name, { maxAge: 1000*60*60*8 }); //8 ore
	console.log("ENNFATTI MO VALE: "+req.cookies.userName);
}
exports.setCookieUserName = setCookieUserName; 

function resetCookieUserId(req,res) {
	req.cookies.userID = "";
	res.clearCookie('userID');
}
exports.resetCookieUserId = resetCookieUserId; 

function resetCookieUserName(req,res) {
	console.log("AAAAMAPPEROLOSCANCELLO!!!");
	req.cookies.userName = "";
	res.clearCookie('userName');
}
exports.resetCookieUserName = resetCookieUserName; 

function resetCookies(req,res) {
	//console.log("resetCookies");
	resetCookieUserId(req,res);
	resetCookieUserName(req,res);
}
exports.resetCookies = resetCookies; 

