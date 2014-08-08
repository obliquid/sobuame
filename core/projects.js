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




	
//PROJECTS



/*
function createUser(req,res,next) {
	//creo lo user nel db
	var user = new req.app.sbam.user();
	user.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	//console.log("creato new user");
	user.save(function (err) {
		if ( err ) {
			console.log("save:error "+err);
			res.send(err);
		} else {
			//console.log("salvo new user nei cookies");
			//e lo salvo nei cookies dell'utente
			req.app.sbam.sess.setCookieUserId(res,user._id.toString());
			next();
		}
	});
}
exports.createUser = createUser; 
*/