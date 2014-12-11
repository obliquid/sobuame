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



					
function createProjectFolders(req,res,userId,projectId,next) {
	var fs   = require('fs');
	var projectDir = "repo/"+userId+"/files/project_"+projectId;
	fs.mkdir(projectDir, 0775, function(err) {
		if (err) {
			if (err.code == 'EEXIST') {
				// ignore the error if the folder already exists
			} else {
				// something else went wrong
				console.log("addProjectSave: error creating folder "+projectDir+" for user "+userId);
				console.log("addProjectSave: error: "+err);
				next(err);
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
			next();	
		}
	});
}
exports.createProjectFolders = createProjectFolders;

