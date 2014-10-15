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



// VARS

/*
questa var viene impostata da sobuame.js appena dopo il require di utils.js
 
in generale app viene passato come parametro alle functions di utils e di tutti
i moduli di sobuame.
nel caso però si vogliano usare queste function come helper nelle view dei siti
degli utenti, la variabile app non è definita e non può essere passata alle view
per motivi di sicurezza. quindi per questi casi serve app definita come variabile
interna di utils.
*/
var app;





	

if ( true ) {






// IMAGE RELATED


/* 
questa è un wrapper di getImg, asyncrono, che ritorna anche altre informazioni per creare il widget zoomabile di un'immagine nel frontend
il parametro url mi arriva direttamente dai layout xml: element.image.url, quindi può essere relativo al repo dell'utente, o alle immagini di default
*/
function getWidgetImg(req,res,url,userId,projectId,next) {
	//console.log("ILTRICHECOISPANO: getWidgetImg()");
	//scindo l'url in un path e un name
	var name = separateUrl(req,res,url).name;
	var path = separateUrl(req,res,url).path;
	
	//leggo le dimensioni dell'immagine
	//console.log("INDENTIFY su "+sourceFullPath+"  START!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	getImgFeatures(req, res, userId, projectId, path, name, function(features){
		if ( features ) {
			//console.log("INDENTIFY su "+sourceFullPath+"  END!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			//in base alle dimensioni dell'immagine, decido se va bene per il widget, o se va rimpicciolita perchè troppo pesante
			var originalImageSquarePixels = features.size.width * features.size.height;
			if ( originalImageSquarePixels > req.app.sbam.config.imgWidgetMaxSize ) {
				//devo ridurre l'immagine
				var cachedAR = features.size.width / features.size.height;
				var cachedWidth = Math.round( Math.sqrt( req.app.sbam.config.imgWidgetMaxSize * cachedAR  ) );
				var cachedHeight = Math.round( Math.sqrt( req.app.sbam.config.imgWidgetMaxSize / cachedAR ) );
				
			} else {
				//ritorno l'immainge alle sue dimensioni originali
				var cachedWidth = features.size.width;
				var cachedHeight = features.size.height;
			}
			//chiamo getImg per ottenere l'url dell'immaine in cache
			getImg(req,res,userId,projectId,name,path,cachedWidth,cachedHeight,false, function(cachedUrl){ 
				//alla fine ritorno via ajax al frontend
				if ( cachedUrl ) {
					next({
						"cachedUrl": cachedUrl,
						"originalW": features.size.width,
						"originalH": features.size.height
					});
				} else {
					console.log("getWidgetImg(): ricevuto errore (false) da getImg() chiamato con path/name = "+path+name);
					next( false );
				}
			})
		} else {
			console.log("getWidgetImg(): ricevuto errore (false) da getImgFeatures() chiamato con path/name = "+path+name);
			next( false );
		}
	});
}
exports.getWidgetImg = getWidgetImg;
exports.getWidgetImg = getWidgetImg;

/* 
mi ritorna tutte le informazioni dell'immagine (dimensioni e molto altro)
OKKIO CHE E' PESANTISSIMA SUL SERVER
es. completo dell'output:
features: { 
  Format: 'JPEG (Joint Photographic Experts Group JFIF format)',
  format: 'JPEG',
  Class: 'DirectClass',
  Geometry: '3456x2304+0+0',
  size: { width: 3456, height: 2304 },
  Resolution: '72x72',
  'Print size': '48x32',
  Units: 'PixelsPerInch',
  Type: 'TrueColor',
  Endianess: 'Undefined',
  Colorspace: 'sRGB',
  Depth: '8-bit',
  depth: 8,
  'Channel depth': { red: '8-bit', green: '8-bit', blue: '8-bit' },
  'Channel statistics':
   { Red:
      { min: '0 (0)',
        max: '255 (1)',
        mean: '153.463 (0.601815)',
        'standard deviation': '73.2643 (0.287311)',
        kurtosis: '-0.560678',
        skewness: '-0.556331' },
     Green:
      { min: '0 (0)',
        max: '255 (1)',
        mean: '130.949 (0.513524)',
        'standard deviation': '72.765 (0.285353)',
        kurtosis: '-0.798209',
        skewness: '0.0997804' },
     Blue:
      { min: '0 (0)',
        max: '255 (1)',
        mean: '99.2892 (0.38937)',
        'standard deviation': '76.1307 (0.298552)',
        kurtosis: '-0.393638',
        skewness: '0.850941' } },
  'Image statistics':
   { Overall:
      { min: '0 (0)',
        max: '255 (1)',
        mean: '127.9 (0.50157)',
        'standard deviation': '74.0682 (0.290463)',
        kurtosis: '-0.723025',
        skewness: '0.123887' } },
  'Rendering intent': 'Perceptual',
  Gamma: '0.454545',
  Chromaticity:
   { 'red primary': '(0.64,0.33)',
     'green primary': '(0.3,0.6)',
     'blue primary': '(0.15,0.06)',
     'white point': '(0.3127,0.329)' },  
  Interlace: 'None',
  'Background color': 'white',
  'Border color': 'srgb(223,223,223)',   
  'Matte color': 'grey74',
  'Transparent color': 'black',
  Compose: 'Over',
  'Page geometry': '3456x2304+0+0',
  Dispose: 'Undefined',
  Iterations: '0',
  Compression: 'JPEG',
  Quality: '98',
  Orientation: 'TopLeft',
  Properties:
   { 'date:create': '2014-09-21T03:55:22+02:00',
     'date:modify': '2014-09-21T03:55:18+02:00',
     'exif:ApertureValue': '284416/65536',
     'exif:ColorSpace': '1',
     'exif:ComponentsConfiguration': '1, 2, 3, 0',
     'exif:Compression': '6',
     'exif:CustomRendered': '0',
     'exif:DateTime': '2007:02:15 13:30:48',
     'exif:DateTimeDigitized': '2007:02:15 13:30:48',
     'exif:DateTimeOriginal': '2007:02:15 13:30:48',
     'exif:ExifImageLength': '2304',
     'exif:ExifImageWidth': '3456',
     'exif:ExifOffset': '196',
     'exif:ExifVersion': '48, 50, 50, 49',
     'exif:ExposureBiasValue': '0/2',
     'exif:ExposureMode': '1',
     'exif:ExposureProgram': '1',
     'exif:ExposureTime': '1/4',
     'exif:Flash': '16',
     'exif:FlashPixVersion': '48, 49, 48, 48',
     'exif:FNumber': '45/10',
     'exif:FocalLength': '34/1',
     'exif:FocalPlaneResolutionUnit': '2',
     'exif:FocalPlaneXResolution': '3456000/874',
     'exif:FocalPlaneYResolution': '2304000/582',
     'exif:InteroperabilityIndex': 'R98',
     'exif:InteroperabilityOffset': '9230',
     'exif:InteroperabilityVersion': '48, 49, 48, 48',
     'exif:ISOSpeedRatings': '200',
     'exif:JPEGInterchangeFormat': '9716',
     'exif:JPEGInterchangeFormatLength': '8156',
     'exif:Make': 'Canon',
     'exif:MakerNote': '...',
     'exif:MeteringMode': '5',
     'exif:Model': 'Canon EOS 350D DIGITAL',
     'exif:Orientation': '1',
     'exif:ResolutionUnit': '2',
     'exif:SceneCaptureType': '0',
     'exif:ShutterSpeedValue': '131072/65536',
     'exif:UserComment': '...',
     'exif:WhiteBalance': '0',
     'exif:XResolution': '72/1',
     'exif:YCbCrPositioning': '2',
     'exif:YResolution': '72/1',
     'jpeg:colorspace': '2',
     'jpeg:sampling-factor': '2x1,1x1,1x1',
     signature: '67d725957da1548dfb416a94176cea12e2da7fe0cc5f2ec641b64d3971100b71' },
  Profiles: { 'Profile-exif': '17880 bytes' },
  Artifacts:
   { filename: '/var/node/sobuame/repo/541bd3ab00d30ddd0938a1f0/files/project_541e2f2e4f12faf105322582/ticonosco/farabutto.jpg',
     verbose: 'true' },
  Tainted: 'False',
  Filesize: '2.327MB',
  'Number pixels': '7.963M',
  'Pixels per second': '16.59MB',
  'User time': '0.070u',
  'Elapsed time': '0:01.480',
  Version: 'ImageMagick 6.7.7-10 2014-03-06 Q16 http://www.imagemagick.org',
  path: '/var/node/sobuame/repo/541bd3ab00d30ddd0938a1f0/files/project_541e2f2e4f12faf105322582/ticonosco/farabutto.jpg' 
}


*/
function getImgFeatures(req, res, userId, projectId, path, name, next) {
	//console.log("ILTRICHECOISPANO: getImgFeatures()");
	//questa operazione (comano identify di imagemagick) viene chiamata per ogni immagine della pagina visualizzata, ed è lentissima non so perchè, va cachata assolutamente
	//quindi prima controllo se esiste un file .info in cache
	var infoFile = getCacheImgFullpath(req,res,userId,projectId,"ALL","ALL",name,path)+".info"; //il nome del file cache per le info dei file è uguale nome in cache del file, ma con misure non specificate, e suffisso .info
	
	//console.log("ILTRICHECOISPANO: getImgFeatures() 2");
	//QUI prima dovrei controllare se l'infoFile è troppo vecchio. nel caso lo butto. perhè se l'utente sovrascrive l'immagine originale con una diversa ma omonima (per esempio con dimensioni diverse) il file info resterebbe lo stesso
	var fs = require('fs');
	//console.log("ILTRICHECOISPANO: getImgFeatures() 3");
	if (fs.existsSync(infoFile)) {
		//console.log("ILTRICHECOISPANO: getImgFeatures() 4");
		//esiste file in cache con le info. leggo e ritorno quello
		fs.readFile(infoFile, 'utf8', function (err,data) {
			if (err) {
				console.log("read from file identify:error "+err);
				next( false );
			} else {
				//console.log("getImgFeatures() CACHE ESISTE "+infoFile+": ritorno contenuto del file di cache:");
				//console.log(JSON.parse(data));
				if ( data ) {
					next( JSON.parse(data) );
				} else {
					console.log("trovato file di info nullo!");
					next( false );
				}
			}
		});
	} else {
		//non esiste info file nella cache, devo eseguire il comando identify e poi creare il file in cache
		var gm = require('gm').subClass({ imageMagick: true });
		//var resizedFullPath = getCacheImgFullpath(userId,projectId,width,height,name,path);
		var sourceFullPath = getSourceImgFullpath(req,res,userId,projectId,name,path);
		//trovo le dimensioni (e molte altre info) dell'immagine originale
		gm(sourceFullPath).identify(function(err, features){
			if ( err ) {
				console.log("imagemagick:error during IDENTIFY "+err);
				next( false );
			} else {
				//console.log("utils.getImgFeatures(): return features:");
				//console.log(features);
				//e poi scriverlo su file
				//console.log("getImgFeatures() CACHE MANCANTE "+infoFile+": scrivo nel file di cache:");
				//console.log(features);
				fs.writeFile(infoFile, JSON.stringify(features), function(err) {
					if(err) {
						console.log("write to file identify output:error "+err);
						next( false );
					} else {
						//console.log("The file was saved!");
						next(features);
					}
				}); 		
			}
		});
	}
}
exports.getImgFeatures = getImgFeatures;

/*
data un'immagine da visualizzare (name,path) e una risoluzione
crea l'immagine ridimensionata se già non esiste, e ne ritorna l'url.
essendo usata server-side, viene eseguita prima che il tpl arrivi all'utente,
che nel browser riceve sempre un url esplicito, e non l'url di uno script.

logica di gestione dei parametri:
se userId e projectId != "", allora considero il path come relativo al repo dell'utente per il progetto dato
se non sono specificati, allora considero il path come relativo all'app

path: me lo aspetto sempre e solo con slash finale (no iniziale), es: "" | "subdir/" | "subdir/subsubdir/"
next: se la closure non viene passata, questo metodo si comporta in modo syncrono ritornando subito un url di immaine (o il waiter se l'immagine in cache sta venendo creata)
	  se invece viene passata la closure, il metodo si comporta in modo asyncrono
		MA ORA CREDO DI USARLA SOLO ASYNC

*/
/*
NOTA: nel codice c'è la possibilità di NON passare la closure next(), ma ormai il metodo è inteso per usarla sempre
*/
function getImg(req,res,userId,projectId,name,path,width,height,crop,next) { 
	//console.log("ILTRICHECOISPANO: getImg()");
	//console.log("getImg: userId = "+userId);
	//console.log("getImg: projectId = "+projectId);
	//console.log("getImg: name = "+name);
	//console.log("getImg: path = "+path);
	//console.log("getImg: width = "+width);
	//console.log("getImg: height = "+height);
	//console.log("getImg: crop = "+crop);
	//normalizzo i parametri
	if ( !width ) width = 0;
	if ( !height ) height = 0;
	//essendo intese come misure in pix arrotondo al pix superiore
	width = Math.ceil(width);
	height = Math.ceil(height);
	if ( path == "/" ) path = "";
	//if ( path == req.app.sbam.config.templatesImagesLink ) path = req.app.sbam.config.templatesImagesDir;
	if ( stringStartWith(path,req.app.sbam.config.templatesImagesLink) ) {
		path = path.replace(req.app.sbam.config.templatesImagesLink, req.app.sbam.config.templatesImagesDir);
	}
	
	//altre var interne
	var fs = require('fs');
	
	
	/*
	//in base al fatto che siano specificati o meno userId e projectId capisco
	//se si tratta di un'immagine di un repo utente, o di un'immagine generica di cui ho path assoluto
	if ( userId && userId != "" && projectId && projectId != "" ) {
		//caso in cui sto leggendo un'immagine da un repo di un utente e per un certo progetto
		var sourcePath = getRepoPath(userId,projectId)+path;
		//var resizedName = "user-"+userId+"_project-"+projectId+"_size-"+width+"x"+height+"_"+path.split("/").join("-")+name;
		
		var resizedName = getCacheImgFilename(userId,projectId,width,height,name,path);
		
	} else {
		//caso in cui sto leggendo un file generico, e mi aspetto che il path sia relativo all'app, e non al repo dell'utente
		var sourcePath = getAppPath()+path;
		//var resizedName = "common_size-"+width+"x"+height+"_"+path.split("/").join("-")+name;
		var resizedName = getCacheImgFilename("common","common",width,height,name,path);
	}
	var resizedFullUrl = req.app.sbam.config.cacheUrl+resizedName;
	var resizedPath = getCachePath(req);
	var resizedFullPath = resizedPath+resizedName;
	var sourceFullPath = sourcePath+name;
	*/
	
	
	
	
	var resizedFullPath = getCacheImgFullpath(req,res,userId,projectId,width,height,name,path);
	var sourceFullPath = getSourceImgFullpath(req,res,userId,projectId,name,path);
	var resizedFullUrl = getCacheImgFullurl(req,res,userId,projectId,width,height,name,path);

	
	//controllo se esiste già l'immagine ridimensionata in cache
	if (fs.existsSync(resizedFullPath)) {
		//console.log('resized esiste già');
		//ritorno l'immagine in cache
		//ritorno l'url
		if ( next && typeof(next) == "function" ) {
			next(resizedFullUrl);
		} else {
			return resizedFullUrl;
		}
	} else {
		//console.log('resized NON esiste, va creata');
		//trovo le dimensioni dell'immagine originale
		getImgFeatures(req, res, userId, projectId, path, name, function(features){
			if ( features ) {
				//console.log(features);
				var gm = require('gm').subClass({ imageMagick: true });
				//distinguo i casi di width o height = 0
				if ( width == 0 ) {
					//console.log('fisso height');
					//trovo width in funzione di height
					width = height*features.size.width/features.size.height;
					gm(sourceFullPath).resize(width,height).write(resizedFullPath, function (err) {
						if ( err ) { 
							console.log("imagemagick:error during RESIZE "+err); 
							next( false );
						} else {
							if ( next && typeof(next) == "function" ) {
								next(resizedFullUrl);
							}
						}
					});
				} else if ( height == 0 ) {
					//console.log('fisso width');
					//trovo height in funzione di width
					height = width*features.size.height/features.size.width;
					gm(sourceFullPath).resize(width,height).write(resizedFullPath, function (err) { 
						if ( err ) { 
							console.log("imagemagick:error during RESIZE "+err); 
							next( false );
						} else {
							if ( next && typeof(next) == "function" ) {
								next(resizedFullUrl);
							}
						} 
					});
				} else if ( width == 0 && height == 0 ) {
					//console.log('ritorno immagine originale');
					//trovo height in funzione di width
					width = features.size.width;
					height = features.size.height;
					gm(sourceFullPath).resize(width,height).write(resizedFullPath, function (err) { 
						if ( err ) { 
							console.log("imagemagick:error during RESIZE "+err); 
							next( false );
						} else {
							if ( next && typeof(next) == "function" ) {
								next(resizedFullUrl);
							}
						} 
					});
				} else {
					if ( crop ) {
						//console.log('croppo '+sourceFullPath);
						var sourceAR = features.size.width / features.size.height;
						var destAR = width / height;
						if ( sourceAR > destAR ) {
							var resizedHeight = height;
							var resizedWidth = resizedHeight * sourceAR;
						} else {
							var resizedWidth = width;
							var resizedHeight = resizedWidth / sourceAR;
						}
						gm(sourceFullPath).resize(resizedWidth,resizedHeight).crop(width, height, (resizedWidth-width)/2, (resizedHeight-height)/2).write(resizedFullPath, function (err) {
							if ( err ) {
								console.log("imagemagick:error during RESIZE "+err);
								next( false );
							} else {
								if ( next && typeof(next) == "function" ) {
									next(resizedFullUrl);
								}
							}
						});
					} else {
						//console.log('non croppo '+sourceFullPath);
						gm(sourceFullPath).resize(width,height).write(resizedFullPath, function (err) { 
							if ( err ) { 
								console.log("imagemagick:error during RESIZE "+err); 
								next( false );
							} else {
								if ( next && typeof(next) == "function" ) {
									next(resizedFullUrl);
								}
							}
						});
					}
				}
			} else {
				console.log("getImg(): errore ciamando getImgFeatures() che ha ritornato false "); 
				next( false );
			}
		});
		//ritorno url di wait perchè la cache sta venendo generata e non è ancora disponibile
		if ( next && typeof(next) == "function" ) {
			//se è stata specificata una closure, qui non ritorno nulla perchè è già stata chiamata la closure sopra
		}
	}
	
}
exports.getImg = getImg;

/* 
questa parte da usa serie di parametri soliti (userId, projectId, path (relativo), name, width e height) e ricava il nome del file immagine in cache
*/
function getSourceImgFullpath(req,res,userId,projectId,name,path) {
	//console.log("ILTRICHECOISPANO: getSourceImgFullpath()");
	//in base al fatto che siano specificati o meno userId e projectId capisco
	//se si tratta di un'immagine di un repo utente, o di un'immagine generica di cui ho path assoluto
	if ( !isTemplateImage(req,res,path) ) {
		//caso in cui sto leggendo un'immagine da un repo di un utente e per un certo progetto
		var sourcePath = getRepoPath(userId,projectId)+path;
	} else {
		//caso in cui sto leggendo un file generico, e mi aspetto che il path sia relativo all'app, e non al repo dell'utente
		var sourcePath = getAppPath()+path;
	}
	var sourceFullPath = sourcePath+name;
	return sourceFullPath;
}
exports.getSourceImgFullpath = getSourceImgFullpath;
function getCacheImgFullpath(req,res,userId,projectId,width,height,name,path) {
	//console.log("ILTRICHECOISPANO: getCacheImgFullpath()");
	//in base al fatto che siano specificati o meno userId e projectId capisco
	//se si tratta di un'immagine di un repo utente, o di un'immagine generica di cui ho path assoluto
	if ( !isTemplateImage(req,res,path) ) {
		//console.log("ILTRICHECOISPANO: getCacheImgFullpath() 2");
		//caso in cui sto leggendo un'immagine da un repo di un utente e per un certo progetto
		var resizedName = getCacheImgFilename(userId,projectId,width,height,name,path);
		//console.log("ILTRICHECOISPANO: getCacheImgFullpath() 3");
	} else {
		//caso in cui sto leggendo un file generico, e mi aspetto che il path sia relativo all'app, e non al repo dell'utente
		//console.log("ILTRICHECOISPANO: getCacheImgFullpath() 4");
		var resizedName = getCacheImgFilename("common","common",width,height,name,path);
		//console.log("ILTRICHECOISPANO: getCacheImgFullpath() 5");
	}
	//console.log("ILTRICHECOISPANO: getCacheImgFullpath() 6");
	var resizedPath = getCachePath(req);
	//console.log("ILTRICHECOISPANO: getCacheImgFullpath() 7");
	var resizedFullPath = resizedPath+resizedName;
	//console.log("ILTRICHECOISPANO: getCacheImgFullpath() 8");
	return resizedFullPath;
}
exports.getCacheImgFullpath = getCacheImgFullpath;
function getCacheImgFullurl(req,res,userId,projectId,width,height,name,path) {
	//console.log("ILTRICHECOISPANO: getCacheImgFullurl()");
	//in base al fatto che siano specificati o meno userId e projectId capisco
	//se si tratta di un'immagine di un repo utente, o di un'immagine generica di cui ho path assoluto
	if ( !isTemplateImage(req,res,path) ) {
		//caso in cui sto leggendo un'immagine da un repo di un utente e per un certo progetto
		var resizedName = getCacheImgFilename(userId,projectId,width,height,name,path);
	} else {
		//caso in cui sto leggendo un file generico, e mi aspetto che il path sia relativo all'app, e non al repo dell'utente
		var resizedName = getCacheImgFilename("common","common",width,height,name,path);
	}
	var resizedFullUrl = req.app.sbam.config.cacheUrl+resizedName;
	return resizedFullUrl;
}
exports.getCacheImgFullurl = getCacheImgFullurl;
function getCacheImgFilename(userId,projectId,width,height,name,path) {
	//console.log("ILTRICHECOISPANO: getCacheImgFilename()");
	if ( path == "/" ) path = "";
	return "usr-"+userId+"_prj-"+projectId+"_"+width+"x"+height+"_"+path.split("/").join("-")+name;
}
exports.getCacheImgFilename = getCacheImgFilename;
function getAppPath() {
	//console.log("ILTRICHECOISPANO: getAppPath()");
	var appRoot = require('app-root-path');
	return appRoot + "/";
}
exports.getAppPath = getAppPath;
function getRepoPath(userId,projectId) {
	//console.log("ILTRICHECOISPANO: getRepoPath()");
	var repoPath = getAppPath() + "repo/" + userId + "/files/project_" + projectId + "/";
	return repoPath;
}
exports.getRepoPath = getRepoPath;
function getCachePath(req) {
	//console.log("ILTRICHECOISPANO: getCachePath()");
	var cachePath = getAppPath() + req.app.sbam.config.cacheDir;
	return cachePath;
}
exports.getCachePath = getCachePath;

/* 
questa definisce se si tratta di un'immagine di un utente (che sta nel repo) o una di default dei template (che sta in req.app.sbam.config.templatesImagesDir)
*/
function isTemplateImage(req,res,path) {
	//qui faccio il controllo sul path.
	//il difetto di questo metodo è che se l'utente crea nel ruo repo le 2 cartelle "teplates/images/" allora non gli ritorneranno le immagini caricate lì ma quelle di default (accettabile)
	if ( stringStartWith(path,req.app.sbam.config.templatesImagesDir) ) {
		return true;
	} else {
		return false;
	}
}
exports.isTemplateImage = isTemplateImage;

function bboxValToPixel(val,referencePx,referenceMm) {
	//console.log("utils.bboxValToPixel: val:"+val+" referencePx:"+referencePx+" referenceMm:"+referenceMm);
	if ( !val ) val = "0";
	val = String(val);
	//pulisco
	val = val.trim();
	//se ci sono misure in % le converto in px
	if ( val.slice(-1) == "%" ) {
		//tolgo il %
		val = val.substring(0, val.length - 1).trim();
		//converto in px
		val = String(Number(val) / 100 * referencePx);
	} else {
		//se non è specificato % o altra unità, le misure si intendono in mm
		//quindi vanno convertite in px
		val = String(Number(val) / referenceMm * referencePx );
	}
	//console.log("pageEditor.drawPage.sizeAndPosElement.bboxValToPixel: alla gine val:"+val);
	//console.log("utils.bboxValToPixel: ritorno:"+Math.round(Number(val)*10)/10);
	return Math.round(Number(val)*10)/10;
}
exports.bboxValToPixel = bboxValToPixel;
function bboxValToMm(val,referenceMm) {
	if ( !val ) val = "0";
	val = String(val);
	//pulisco
	val = val.trim();
	//se ci sono misure in % le converto in mm
	if ( val.slice(-1) == "%" ) {
		//tolgo il %
		val = val.substring(0, val.length - 1).trim();
		//converto in mm
		val = String(Number(val) / 100 * referenceMm);
	} else {
		//se non è specificato % o altra unità, le misure si intendono già in mm
	}
	//console.log("pageEditor.drawPage.sizeAndPosElement.bboxValToMm: alla gine val:"+val);
	return Math.round(Number(val)*10)/10;
}
exports.bboxValToMm = bboxValToMm;

function mmToPDFPoints(valMm) {
	return valMm * 2.834645669;
}
exports.mmToPDFPoints = mmToPDFPoints;

function dpmm2dpi(dpmm) {
	//1 Dots per mm = 25.38071066 Dots per inch
	return dpmm * 25.38071066;
}
exports.dpmm2dpi = dpmm2dpi;
function dpi2dpmm(dpi) {
	//1 Dots per inch = 0.0394 Dots per mm
	return dpi * 0.0394;
}
exports.dpi2dpmm = dpi2dpmm;

function thepositioner(fw,fh,cw,ch,crop,align,mt,mb,ml,mr) {
	if ( !align ) align = "center";
	if ( !mt ) mt = 0;
	if ( !mb ) mb = 0;
	if ( !ml ) ml = 0;
	if ( !mr ) mr = 0;
	//qui ci va il risultato
	var res = {};
		
	/*
	console.log("thepositioner: START");
	console.log("fw:"+fw);
	console.log("fh:"+fh);
	console.log("cw:"+cw);
	console.log("ch:"+ch);
	console.log("crop:"+crop);
	console.log("align:"+align);
	*/
	var fr = fw/fh;
	var cr = cw/ch;
	if ( crop ) {
		if ( fr > cr ) {
			res.w = fw - ( ml + mr );
			res.h = res.w / cr;
			res.x = ml;
			if ( align == "top" ) {
				res.y = mt;
			} else if ( align == "bottom" ) {
				res.y = fh - res.h - mb;
			} else { //in tutti gli altri casi uso la logica del "center"
				res.y = (fh - res.h ) / 2 - mt;
			}
		} else {
			res.h = fh - ( mt + mb );
			res.w = res.h * cr;
			res.y = mt;
			if ( align == "left" ) {
				res.x = ml;
			} else if ( align == "right" ) {
				res.x = fw - res.w - mr;
			} else { //in tutti gli altri casi uso la logica del "center"
				res.x = (fw - res.w ) / 2;
			}
		}
	} else {
		if ( fr > cr ) {
			res.h = fh - ( mt + mb );
			res.w = res.h * cr;
			res.y = mt;
			if ( align == "left" ) {
				res.x = ml;
			} else if ( align == "right" ) {
				res.x = fw - res.w - mr;
			} else { //in tutti gli altri casi uso la logica del "center"
				res.x = (fw - res.w ) / 2 - ml;
			}
		} else {
			res.w = fw - ( ml + mr );
			res.h = res.w / cr;
			res.x = ml;
			if ( align == "top" ) {
				res.y = mt;
			} else if ( align == "bottom" ) {
				res.y = fh - res.h - mb;
			} else { //in tutti gli altri casi uso la logica del "center"
				res.y = (fh - res.h - mt - mb) / 2 + mt;
			}
		}
	}
	//console.log("thepositioner: END with result:");
	//console.log(res);
	return res;
}
exports.thepositioner = thepositioner;





// TEMPLATE RELATED

function getTempate(req, res, tplFile, next){
		var fs = require('fs');
		var xml2js = require('xml2js');
		var parser = new xml2js.Parser({'explicitArray':false});
		fs.readFile(tplFile, 'utf8', function(err, data) {
			if ( data ) {
				//console.log("fs.readFile ALE': arrivato contenuto del file xml!");
				//console.log(data);
				parser.parseString(data, function (err, result) {
					if ( err ) {
						console.log("route /getPageTemplate: xml layout parsing: error "+err);
						next(false);
					} else {
						//console.log(result.elements);
						var elements = result.elements.element;
						//console.log("route /getPageTemplate: elements:"); //questo è esattamente un array con i miei elements
						//console.log(elements); //questo è esattamente un array con i miei elements

						//ritorno gli elements del template richiesto
						
						//problema: il parse mi ritorna un array SOLO se ci sono almeno 2 elements nel tpl. 
						//se invece c'è un solo element, quel cazzone mi ritorna non un array di 1 elemento, ma direttamente l'elemento, 
						//facendo fallire il codice nel client che si aspetta un array sempre e comunque (come sarebbe logico).
						//quindi qui controllo: se è un aggetto e non un array, lo metto dentro un array
						if ( req.app.sbam.utils.is_array(elements) ) {
							var elements_array = elements;
						} else {
							var elements_array = [elements];
							
						}
						
						//quando ci sono dei testi (element.text.content) nei template, devo presupporli come testi di esempio
						//quindi li flaggo come contenti che devono venire cambiati, altrimenti non usciranno nel pdf finale
						//nota che questo flag non è dichiarato nel model, vale solo runtime
						for ( var x=0; x<elements_array.length; x++ ) {
							var element = elements_array[x];
							if ( element.type == "text" && element.text && element.text.content ) {
								//aggiungo il flag 
								element.text.demoContent = true;
							}
						}
						
						
						next(elements_array);
					}								
				});
			} else if ( err ) {
				console.log("route /getPageTemplate: xml layout fs.readFile: error "+err);
				next(false);
			}
		});						
	
}
exports.getTempate = getTempate; 

function parseTemplateFilename(fileName){
	//in base alla naming convention qui definita, estraggo le parti che compongono il nome di un file di un template xml
	//nota che fileName è al netto del suffisso
	var templateName = "";
	var projectTypes = [];
	var projectSize = [];
	var templateVariant = "";
	var chunks = fileName.split("_");
	templateName = chunks[0]; //primo chunk indica il nome di una serie di template (standard, deluxe, ecc.)
	projectTypes = chunks[1].split("-"); //il secondo è un singolo project type o una serie di types (annuario, album, ecc) seprati da -
	projectSize = chunks[2].split("x"); //il terzo sono le dimensioni in mm nella forma WWWxHHH
	templateVariant = chunks[3]; //l'ultimo chunk è libero e contiene quello che si vuole (nessun matching)
	//console.log("getPageTemplates: templateName: "+templateName);
	//console.log("getPageTemplates: templateVariant: "+templateVariant);
	//console.log("getPageTemplates: chunks[1]: "+chunks[1]);
	//console.log("getPageTemplates: projectTypes: ");
	//console.log(projectTypes);
	return {
		"templateName": templateName,
		"projectTypes": projectTypes,
		"projectSize": projectSize,
		"templateVariant": templateVariant
	};
}
exports.parseTemplateFilename = parseTemplateFilename;


// VARIE


/* visualizza una pagina di errore e logga sulla console */
function errorPage(res, errMsg, publicMsg, useLayout) {
	if ( useLayout === undefined ) useLayout = true;
	console.log(errMsg);
	res.render('error', {
		layout: useLayout,
		errMsg: errMsg,
		publicMsg: publicMsg
	});			
}
exports.errorPage = errorPage; 
function trunc(string,length) {
	if ( string && string.length > length ) {
		return string.substr(0,length)+'...';
	} else {
		return string;
	}
}
exports.trunc = trunc; 
var is_array = function (value) {
	//versione easy: return value && typeof value === 'object' && value.constructor === Array;
	return Object.prototype.toString.apply(value) === '[object Array]'; //questo va anche per array definiti in altre windows o frame
};
exports.is_array = is_array; 
var in_array = function (arr,obj) {
    return (arr.indexOf(obj) != -1);
}
exports.in_array = in_array; 
var splice_by_element = function (my_array,array_element) {
	for(var i=0; i<my_array.length;i++ ) { 
		if ( my_array[i] == array_element ) {
			my_array.splice(i,1); 
		}
	}
	return my_array;
}
exports.splice_by_element = splice_by_element; 
/* removes an element from an array by content */
Array.prototype.remove= function(){
    var what, a= arguments, L= a.length, ax;
    while(L && this.length){
        what= a[--L];
        while((ax= this.indexOf(what))!= -1){
            this.splice(ax, 1);
        }
    }
    return this;
}

/* says if an object is empty, i.e.: obj = {} */
function is_empty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}
exports.is_empty = is_empty;
/*
quando si ha un valore booleano che non si sa se è di tipo booleano
o di tipo stringa (cioè un booleano convertito in stringa 'true' o 'false')
questa function la ritrasforma in booleano
*/
var bool_parse = function (my_bool_string) {
	if ( !my_bool_string || my_bool_string == 'false' ) {
		return false;
	} else {
		return true;
	}
}
exports.bool_parse = bool_parse; 
/*
converte le date che arrivano da mongodb in date compatibili con il datepicker usato nel frontend
*/
var mongo_to_datepicker = function(mongoDate) {
	//console.log(mongoDate);
	var jsDate = new Date(mongoDate);
	var d = zeroPad(jsDate.getDate(),2);
	var m = zeroPad(jsDate.getMonth()+1,2);
	var y = jsDate.getFullYear();
	var h = zeroPad(jsDate.getHours(),2);
	var mn = zeroPad(jsDate.getMinutes(),2);
	var s = zeroPad(jsDate.getSeconds(),2);
	var pickerDate = y+'-'+m+'-'+d+'T'+h+':'+mn+':'+s;
	//console.log(pickerDate);
	return pickerDate;
}
exports.mongo_to_datepicker = mongo_to_datepicker; 
function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}
exports.zeroPad = zeroPad; 
/*
camuffa un poco un'email contro gli spammer
*/
function emailObfuscate(email) {
	return email.replace("@", " - at - ");
}
exports.emailObfuscate = emailObfuscate;
/*
renderizza una stringa json come literal leggibile
ovvero mette tab e mandate a capo
#### OKKIO: E' DUPLICATA IN public/javascripts/sobuame.js ####
*/
function renderJson(jsonString,tabString) {
	if (!jsonString) return '';
	if ( !tabString ) tabString = '&nbsp;&nbsp;';
	var recursionCount = 0;
	return recurse(JSON.parse(jsonString));
	function recurse(jsonObj) {
		var rowPrefix = '';
		for ( var i=0; i<recursionCount; i++ ) {
			rowPrefix += tabString;
		}
		var output = '{';
		var isFirst = true;
		for (var property in jsonObj) {
			if ( jsonObj.hasOwnProperty(property) && typeof jsonObj[property] !== 'function') {
				if (!isFirst) {
					output += ',';
				}
				isFirst = false;
				output += '\n'+rowPrefix+tabString;
				//butto fuori il nome della property
				output += '"'+property+'": ';
				//se la mia property è un object, devo ricorrere
				if ( typeof jsonObj[property] === 'object' && !is_array(jsonObj[property]) ) {
					recursionCount++;
					output += recurse(jsonObj[property]);
					recursionCount--;
				} else if ( is_array(jsonObj[property]) ) {
					output += '[';
					for ( i=0; i<jsonObj[property].length; i++ ) {
						if (i>0) output += ',';
						output += '"'+jsonObj[property][i]+'"';
					}
					output += ']';
				} else {
					output += '"'+jsonObj[property]+'"';
				}
			}
		}
		return output+'\n'+rowPrefix+'}';
	}
}
exports.renderJson = renderJson;
function separateUrl(req,res,url){
	var urlChunks = url.split("/");
	var name = urlChunks.pop();
	var path = urlChunks.join("/")+"/"; //devo aggiungere il trailing slash per uniformità nel modi di trattare le directory
	//if ( path == req.app.sbam.config.templatesImagesLink ) path = req.app.sbam.config.templatesImagesDir;
	if ( stringStartWith(path,req.app.sbam.config.templatesImagesLink) ) {
		path = path.replace(req.app.sbam.config.templatesImagesLink, req.app.sbam.config.templatesImagesDir);
	}
	return {
		"name": name,
		"path": path
	};
}
exports.separateUrl = separateUrl;
function stringStartWith(myString,start) {
	return(myString.indexOf(start) == 0);
}
exports.stringStartWith = stringStartWith;




}




