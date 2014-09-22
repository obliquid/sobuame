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




	
//USERS


function createUser(req,res,name,next) {
	if ( !name || name == undefined ) name = "";
	//creo lo user nel db
	var user = new req.app.sbam.user();
	user.name = name;
	user.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	//console.log("creato new user");
	user.save(function (err) {
		if ( err ) {
			console.log("save:error "+err);
			res.send(err);
		} else {
			//console.log("salvo new user nei cookies");
			//e lo salvo nei cookies dell'utente
			req.app.sbam.sess.setCookieUserId(req,res,user._id.toString());
			//e gli creo le cartelle di default
			req.app.sbam.users.createUserFolders(req,res,user._id.toString(),next);
		}
	});
}
exports.createUser = createUser; 

/*
questo metodo crea le cartelle di default di utente ma solo se non esistono
infatti viene richiamato automaticamente dopo ogni login, oltre che dopo la creazione di un nuovo user
*/
function createUserFolders(req,res,user_id,next) {
	var fs   = require('fs');
	var homeDir = "repo/"+user_id;
	var filesDir = homeDir+"/files";
	//creo la cartella per lo user (se esiste già procedo)
	fs.mkdir(homeDir, 0775, function(err) {
		if (err) {
			if (err.code == 'EEXIST') {
				// ignore the error if the folder already exists
			} else {
				// something else went wrong
				console.log("createUser: error creating folder "+homeDir+" for new user "+user_id);
				console.log(err);
				return false;
			}
		} else {
			// successfully created folder
		}
		//dopo che ho creato la dir dell'utente, creo anche le soottocartelle (ora solo "files")
		fs.mkdir(filesDir, 0775, function(err) {
			if (err) {
				if (err.code == 'EEXIST') {
					// ignore the error if the folder already exists
				} else {
					// something else went wrong
					console.log("createUser: error creating folder "+filesDir+" for new user "+user_id);
					console.log(err);
					return false;
				}
			} else {
				// successfully created folder
			}
			//dopo che ho creato le dir, proseguo
			next();
		});
	});
}
exports.createUserFolders = createUserFolders; 



