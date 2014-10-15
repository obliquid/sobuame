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




	
//RENDERER

/*
questo metodo usa la libreria pdfkit per generare i pdf
*/
function renderPdf(req,res,project,next) {
	//devo fare un loop sulle pagine che mi sono arrivate, e per ciascuna
	//devo fare un loop sugli elementi e disegnarli nel pdf
	
	//inizializzo le librerie necessarie e il nome del file da generare
	var fs = require('fs');
	var PDFDocument = require('pdfkit');
	var outFilename = "usr-"+req.cookies.userID+"_prj-"+project._id+"_"+project.width+"x"+project.height+"_PROJECT-PDF.pdf";
	var outFullpath = req.app.sbam.config.pdfDir + outFilename;
	var outUrl = req.app.sbam.config.pdfUrl + outFilename;
	
	//inizializzo il documento vuoto
	var pdf_options = {
		size: [req.app.sbam.utils.mmToPDFPoints(project.width),req.app.sbam.utils.mmToPDFPoints(project.height)],
		info: {
			Title: project.name,
			Author: 'SOBUAME USER: '+req.cookies.userID
		}
	};
	var pdf = new PDFDocument(pdf_options);
	//ciclo su tutte le pagine, con un loop async
	var pagesCloned = project.pages.slice(0).reverse(); //tengo copia dell'originale, visto che il clone lo spolpo
	var totalPages = pagesCloned.length;
	var curPage = 1;
	var pagesModified = [];
	asyncLoop();
	function asyncLoop() {
		if ( pagesCloned.length > 0 ) {
			var page = pagesCloned.pop();
			//ciclo su tutti gli elements della pagina e li disegno
			console.log("ciclo su pagina:");
			console.log(page);
			//var elementsCloned = page.elements.slice(0).reverse(); //tengo copia dell'originale, visto che il clone lo spolpo
			var elementsCloned = page.elements.slice(0).reverse(); //tengo copia dell'originale, visto che il clone lo spolpo
			var elementsModified = [];
			nestedAsyncLoop();
			function nestedAsyncLoop() {
				if ( elementsCloned.length > 0 ) {
					var elm = elementsCloned.pop();
					console.log("ciclo su element:");
					console.log(elm);
					//per tutti gli elementi, se è definito un colore di fondo, lo disegno
					if ( 
						elm.style && 
						elm.style.backgroundColor && 
						elm.style.backgroundColor.c != undefined && 
						elm.style.backgroundColor.m != undefined && 
						elm.style.backgroundColor.y != undefined && 
						elm.style.backgroundColor.k != undefined &&
						!(
							elm.style.backgroundColor.c == 0 &&
							elm.style.backgroundColor.m == 0 &&
							elm.style.backgroundColor.y == 0 &&
							elm.style.backgroundColor.k == 0
						)
					) {
						var cmykColor = [elm.style.backgroundColor.c,elm.style.backgroundColor.m,elm.style.backgroundColor.y,elm.style.backgroundColor.k];
						/*
						ctx.fillStyle = rgbColor;
						var sizePos = req.app.sbam.utils.thepositioner(bitmapW,bitmapH,project.width,project.height);
						console.log(sizePos);
						var bboxPixX = req.app.sbam.utils.bboxValToPixel(elm.bbox.x,sizePos.w,project.width);
						var bboxPixY = req.app.sbam.utils.bboxValToPixel(elm.bbox.y,sizePos.h,project.height);
						var bboxPixW = req.app.sbam.utils.bboxValToPixel(elm.bbox.w,sizePos.w,project.width);
						var bboxPixH = req.app.sbam.utils.bboxValToPixel(elm.bbox.h,sizePos.h,project.height);
						ctx.fillRect(bboxPixX+sizePos.x,bboxPixY+sizePos.y,bboxPixW,bboxPixH);
						//console.log("ho appena disegnato un rettangolo di colore: "+rgbColor);
						*/
						var bboxMmX = req.app.sbam.utils.bboxValToMm(elm.bbox.x,project.width);
						var bboxMmY = req.app.sbam.utils.bboxValToMm(elm.bbox.y,project.height);
						var bboxMmW = req.app.sbam.utils.bboxValToMm(elm.bbox.w,project.width);
						var bboxMmH = req.app.sbam.utils.bboxValToMm(elm.bbox.h,project.height);
						console.log("avrei da buttar giù sta robba:");
						console.log(cmykColor);
						console.log(req.app.sbam.utils.mmToPDFPoints(bboxMmX));
						console.log(req.app.sbam.utils.mmToPDFPoints(bboxMmY));
						console.log(req.app.sbam.utils.mmToPDFPoints(bboxMmW));
						console.log(req.app.sbam.utils.mmToPDFPoints(bboxMmH));
						//pdf.save();
						//pdf.fill(cmykColor).rect(
						pdf.rect(
							req.app.sbam.utils.mmToPDFPoints(bboxMmX), 
							req.app.sbam.utils.mmToPDFPoints(bboxMmY), 
							req.app.sbam.utils.mmToPDFPoints(bboxMmW), 
							req.app.sbam.utils.mmToPDFPoints(bboxMmH)
						).fill(cmykColor);
						//pdf.restore();
					}
					
					switch (elm.type) {
						case "image":
							//se un utente ha rimosso (remove) un'immagine da una pagina, e poi ha salvato, nel db resta l'elemento image, ma senza url (vuoto).
							//quindi se si tratta di un'immagine senza url la scarto e procedo oltre
							if (elm.image.url && elm.image.url != "") {
								renderImageElement(req,res,"pdf",pdf,elm,project._id,project.width,project.height,null,null,function(){
									nestedAsyncLoop();
								}); //qui non passo bitmapW e bitmapH perchè per i pdf non servono
							} else {
								nestedAsyncLoop();
							}
							break;
						case "text":
							renderTextElement(req,res,"pdf",pdf,elm,project.width,project.height,null,null,function(){
								nestedAsyncLoop();
							}); //qui non passo bitmapW e bitmapH perchè per i pdf non servono
							break;
					}
				} else {
					//finito una pagina
					//creo nuova pagina
					//lo faccio alla fine del loop perchè la prima pagina viene creata automaticamente
					//QUI if ( i < project.pages.length - 1 ) pdf.addPage();
					if ( curPage < totalPages) pdf.addPage();
					curPage++;
					asyncLoop();
					
				}
			}
		} else {
			//finito tutte le pagine
			//salvo su file
			//fs.writeFile(outFullpath, canvas.toBuffer());
			var stream = pdf.pipe(fs.createWriteStream(outFullpath));
			pdf.end(); //questa serve se no crea solo il file inizializzato ma senza contenuti!
			stream.on('finish', function() {
				//iframe.src = stream.toBlobURL('application/pdf');
				//ritorno l'url al file con la pagina renderizzata
				next(outUrl);
			});
			
		}
	}

	
	/* vecchia versione sync
	//ciclo su tutte le pagine
	for ( var i=0; i<project.pages.length; i++ ) {
		var page = project.pages[i];
		//ciclo su tutti gli elements della pagina e li disegno
		for ( var j=0; j<page.elements.length; j++ ) {
			var elm = page.elements[j];
			switch (elm.type) {
				case "image":
					renderImageElement(req,res,"pdf",pdf,elm,project._id,project.width,project.height); //qui non passo bitmapW e bitmapH perchè per i pdf non servono
					break;
				case "text":
					renderTextElement(req,res,"pdf",pdf,elm,project.width,project.height); //qui non passo bitmapW e bitmapH perchè per i pdf non servono
					break;
			}
		}
		//creo nuova pagina
		//lo faccio alla fine del loop perchè la prima pagina viene creata automaticamente
		if ( i < project.pages.length - 1 ) pdf.addPage();
		
	}
	//salvo su file
	//fs.writeFile(outFullpath, canvas.toBuffer());
	pdf.pipe(fs.createWriteStream(outFullpath));
	pdf.end(); //questa serve se no crea solo il file inizializzato ma senza contenuti!
	
	//ritorno l'url al file con la pagina renderizzata
	return outUrl;
	*/
	
}
exports.renderPdf = renderPdf;

/*
questo metodo usa la libreria node-canvas per generare i bitmap
i parametri project e tplFilename sono mutuamente esclusivi
se si passa project (un project dal db) verrà generata una thumb della sua prima pagina
se si passa tplFilename (un file dall dir dei template) verrà generata una thumb del template
tplFilename è senza estensione
*/
function renderBitmap(req,res,project,tplFilename,bitmapW,bitmapH,next) {
	//helpers
	function renderElements(elements) {
		//inizializzo le librerie necessarie e il nome del file da generare
		var fs = require('fs');
		var Canvas = require('canvas');
		if ( sourceType == "prj" ) {
			var outFilename = "usr-"+req.cookies.userID+"_prj-"+project._id+"_"+bitmapW+"x"+bitmapH+"_PROJECT-THUMBNAIL.png";
		}
		else if ( sourceType == "tpl" ) {
			var outFilename = "usr-"+req.cookies.userID+"_tpl-"+tplFilename+"_"+bitmapW+"x"+bitmapH+"_TEMPLATE-THUMBNAIL.png";
		}
		var outFullpath = req.app.sbam.config.cacheDir + outFilename;
		var outUrl = req.app.sbam.config.cacheUrl + outFilename;
		
		//devo controllare se il file in cache esiste già ed ha una data POSTERIORE a quella di ultima modifica dell project
		var cacheIsValid = false;
		if (fs.existsSync(outFullpath)) {
			var cachedFile = fs.readFileSync(outFullpath);
			if (cachedFile) { 
				//se il file in cache esiste già, devo controllare la sua data
				var cachedFileModDate = fs.statSync(outFullpath).mtime;
				
				//devo differenziare il caso in cui leggo la data dal project o dal template file
				if ( sourceType == "prj" ) {
					var myFileModDate = project.updated_at;
				}
				else if ( sourceType == "tpl" ) {
					var tplFilepath = req.app.sbam.config.templatesDir + tplFilename + "." + req.app.sbam.config.templatesExt;
					var myFileModDate = fs.statSync(tplFilepath).mtime;
				}
				
				
				//console.log("LA CACHE ESISTE E HA DATA MOD:"+cachedFileModDate+" mentre il mio project/template ha DATA MOD:"+myFileModDate);
				if ( new Date(cachedFileModDate) >= new Date(myFileModDate) ) {
					//la cache è valida!
					cacheIsValid = true;
					//console.log("TENGO LA CACHE!!!");
					
				}
			}
		}
	
		if ( cacheIsValid ) {
			//ritorno la cache
			next( outUrl );
		} else {
			//la cache non c'è o non è più valida, procedo alla creazione del bitmap
			//inizializzo il documento vuoto
			var canvas = new Canvas(bitmapW,bitmapH);
			
			var ctx = canvas.getContext('2d');
			ctx.antialias = 'subpixel';
			//calcolo le dimensioni utili del bitmap per rispettare l'aspect ratio del project
			if ( sourceType == "prj" ) {
				var sizePos = req.app.sbam.utils.thepositioner(bitmapW,bitmapH,project.width,project.height);
			}
			else if ( sourceType == "tpl" ) {
				var templateParts = req.app.sbam.utils.parseTemplateFilename(tplFilename);
				var sizePos = req.app.sbam.utils.thepositioner(bitmapW,bitmapH,templateParts.projectSize[0],templateParts.projectSize[1]);
			}
			
			
			//disegno un fondo bianco alla pagina
			ctx.save();
			ctx.fillStyle = '#FFF';
			ctx.fillRect(Math.round(sizePos.x),Math.round(sizePos.y),Math.round(sizePos.w),Math.round(sizePos.h));
			ctx.strokeStyle = '#ccc';
			ctx.lineWidth = 1;
			ctx.strokeRect(Math.round(sizePos.x)+1,Math.round(sizePos.y)+1,Math.round(sizePos.w)-2,Math.round(sizePos.h)-2);
			console.log("STROKKEREI: ");
			console.log(Math.round(sizePos.x)+","+Math.round(sizePos.y)+","+Math.round(sizePos.w)+","+Math.round(sizePos.h));
			ctx.restore();




			var elementsCloned = elements.slice(0).reverse(); //tengo copia dell'originale, visto che il clone lo spolpo
			var elementCounter = 0;
			asyncLoop();
			function asyncLoop() {
				
				if ( elementsCloned.length > 0 ) {
					elementCounter++;
					var elm = elementsCloned.pop();
					//per tutti gli elementi se è definito un colore di fondo lo disegno (ma non per i tpl)
					if ( 
						sourceType == "prj" &&
						elm.style && 
						elm.style.backgroundColor && 
						elm.style.backgroundColor.c != undefined && 
						elm.style.backgroundColor.m != undefined && 
						elm.style.backgroundColor.y != undefined && 
						elm.style.backgroundColor.k != undefined &&
						!(
							elm.style.backgroundColor.c == 0 &&
							elm.style.backgroundColor.m == 0 &&
							elm.style.backgroundColor.y == 0 &&
							elm.style.backgroundColor.k == 0
						)
					) {
						var rgbObj = ColorConverter.toRGB(new CMYK(elm.style.backgroundColor.c,elm.style.backgroundColor.m,elm.style.backgroundColor.y,elm.style.backgroundColor.k));
						var rgbColor = 'rgb('+rgbObj.r+','+rgbObj.g+','+rgbObj.b+')';
						ctx.fillStyle = rgbColor;
						var sizePos = req.app.sbam.utils.thepositioner(bitmapW,bitmapH,project.width,project.height);
						//console.log("avrei da buttar giù sta robba:");
						//console.log(element);
						//console.log(sizePos);
						var bboxPixX = req.app.sbam.utils.bboxValToPixel(elm.bbox.x,sizePos.w,project.width);
						var bboxPixY = req.app.sbam.utils.bboxValToPixel(elm.bbox.y,sizePos.h,project.height);
						var bboxPixW = req.app.sbam.utils.bboxValToPixel(elm.bbox.w,sizePos.w,project.width);
						var bboxPixH = req.app.sbam.utils.bboxValToPixel(elm.bbox.h,sizePos.h,project.height);
						ctx.fillRect(bboxPixX+sizePos.x,bboxPixY+sizePos.y,bboxPixW,bboxPixH);
						//console.log("ho appena disegnato un rettangolo di colore: "+rgbColor);
						
					}
					
					switch (elm.type) {
						case "image":
							//se un utente ha rimosso (remove) un'immagine da una pagina, e poi ha salvato, nel db resta l'elemento image, ma senza url (vuoto).
							//quindi se si tratta di un'immagine senza url la scarto e procedo oltre
							if (elm.image && elm.image.url && elm.image.url != "" && sourceType == "prj") {
								renderImageElement(req,res,"bitmap",ctx,elm,project._id,project.width,project.height,bitmapW,bitmapH,function(){
									asyncLoop();
								});
							} else {
								//se l'immagine non è definita:
								if ( sourceType == "prj" ) {
									//se sto disegnando un project allora skippo l'immagine
									asyncLoop();
								}
								else if ( sourceType == "tpl" ) {
									//estraggo le dimensioni in mm della pagina (cioè del project) dal tplFilename
									var templateParts = req.app.sbam.utils.parseTemplateFilename(tplFilename);
									//var templateName = templateParts.templateName;
									//var projectTypes = templateParts.projectTypes;
									//var projectSize = templateParts.projectSize;
									//var templateVariant = templateParts.templateVariant;
									//se non è specificata un'immagine, nel caso di sourceType tpl devo comunque renderizzare un rettangolo trasparente
									//ma non lo faccio solo se il primo elemento è un'immagine a fondo pieno
									if ( 
										elementCounter == 1
										&&
										Math.round(req.app.sbam.utils.bboxValToMm(elm.bbox.w,templateParts.projectSize[0])) == Math.round(templateParts.projectSize[0])
										&&
										Math.round(req.app.sbam.utils.bboxValToMm(elm.bbox.h,templateParts.projectSize[1])) == Math.round(templateParts.projectSize[1])
									) {
										//caso di primo element immagine a sfondo pieno, skippo
										asyncLoop();
									} else {
										//in tutti gli altri casi disegno
										renderBitmapRectangle(req,res,ctx,'rgba(51,136,204,0.5)',elm,templateParts.projectSize[0],templateParts.projectSize[1],bitmapW,bitmapH,function(){
											asyncLoop();
										});
									}
								}
							}
							break;
						case "text":
							if ( sourceType == "prj" ) {
								renderTextElement(req,res,"bitmap",ctx,elm,project.width,project.height,bitmapW,bitmapH,function(){
									asyncLoop();
								});
							}
							else if ( sourceType == "tpl" ) {
								//per sourceType tpl invece del testo renderizzo un fondo
								//QUI
								//estraggo le dimensioni in mm della pagina (cioè del project) dal tplFilename
								var templateParts = req.app.sbam.utils.parseTemplateFilename(tplFilename);
								renderBitmapRectangle(req,res,ctx,'rgba(0,0,0,0.3)',elm,templateParts.projectSize[0],templateParts.projectSize[1],bitmapW,bitmapH,function(){
									asyncLoop();
								});
							}
							break;
					}
				} else {
					//finito
					//salvo su file
					var out = fs.createWriteStream(outFullpath);
					var stream = canvas.createPNGStream();
					stream.on('data', function(chunk){
						out.write(chunk);
					});	
					
					//ritorno l'url al file con la pagina renderizzata
					next( outUrl );
				}
			}
		}
		
	}
	
	//distinguo i 2 casi di sorgente project o tplFilename file
	if ( project ) {
		var sourceType = "prj";
	}
	else if ( tplFilename ) {
		var sourceType = "tpl";
	}
	
	//devo fare un loop sugli elementi che mi sono arrivati, e disegnarli nel bitmap
	
	if ( 
		( sourceType == "prj" && project.pages && project.pages.length > 0 )
		||
		( sourceType == "tpl" )
	) {
		//prima trovo gli elements da disegnare
		//poi li disegno con renderElements()
		if ( sourceType == "prj" ) {
			//per la miniatura scelgo ovviamente la prima pagina
			var firstPage = project.pages[0];
			//chiamo il metodo di rendering
			var elements = firstPage.elements;
			renderElements(elements);
		}
		else if ( sourceType == "tpl" ) {
			//leggo gli elements dal template file
			var tplFile = req.app.sbam.config.templatesDir + tplFilename + "." + req.app.sbam.config.templatesExt;
			req.app.sbam.utils.getTempate(req, res, tplFile, function(elements_array){
				if ( elements_array ) {
					var elements = elements_array;
					renderElements(elements);
				}
			});
		}
	}
}
exports.renderBitmap = renderBitmap;

/*
disegno un singolo elemento image
questo metodo differenzia ogni primitiva grafica in base a type usando il costrutto
	if ( output == "bitmap" ) {
		//use ctx.xxx...
	} else if ( output == "pdf" ) {
		//use pdf.xxx...
	}
*/
function renderImageElement(req,res,output,handler,element,projectId,projectW,projectH,bitmapW,bitmapH,next) {
	//vars
	if ( output == "bitmap" ) {
		var ctx = handler;
	} 
	else if ( output == "pdf" ) {
		var pdf = handler;
	}
	//splitto l'url in nome file e path
	var name = req.app.sbam.utils.separateUrl(req,res,element.image.url).name;
	var path = req.app.sbam.utils.separateUrl(req,res,element.image.url).path;
	var sourceImageFullpath = req.app.sbam.utils.getSourceImgFullpath(req,res,req.cookies.userID,projectId,name,path);
	//trovo le dimensioni in pix dell'immagine
	req.app.sbam.utils.getImgFeatures(req, res, req.cookies.userID, projectId, path, name, function(features){
		var sourceImagePixW = features.size.width;
		var sourceImagePixH = features.size.height;
		//se non sono definiti offset e/o dpi, li imposto per default usando un fill dell'immagine nel suo bbox
		if ( ( isNaN(element.image.dpi) || element.image.dpi == 0 || element.image.dpi === null ) && ( isNaN(element.image.offsetx) || element.image.offsetx == 0 || element.image.offsetx === null ) && ( isNaN(element.image.offsety) || element.image.offsety == 0 || element.image.offsety === null ) ) {
			//mancano tutti i valori, faccio un fill()
			//console.log("manca tutto!");
			var defaultMmSizePos = req.app.sbam.utils.thepositioner(req.app.sbam.utils.bboxValToMm(element.bbox.w,projectW),req.app.sbam.utils.bboxValToMm(element.bbox.h,projectH),sourceImagePixW,sourceImagePixH,true);
			//console.log("defaultMmSizePos");
			//console.log(defaultMmSizePos);
			//console.log("element.bbox.w");
			//console.log(element.bbox.w);
			//console.log("element.bbox.h");
			//console.log(element.bbox.h);
			//console.log("sourceImagePixW");
			//console.log(sourceImagePixW);
			//console.log("sourceImagePixH");
			//console.log(sourceImagePixH);
			element.image.offsetx = defaultMmSizePos.x;
			element.image.offsety = defaultMmSizePos.y;
			element.image.dpi = req.app.sbam.utils.dpmm2dpi( sourceImagePixW / defaultMmSizePos.w );
			
		} else {
			//se non sono nulli tutti contemporaneamente, considero i singoli parametri uno ad uno, e se non è definito assegno un default
			//devo controllare per ultimo zoom, perchè lì chiamo setZoom che si aspetta element.IW.placedImgMmX e element.IW.placedImgMmY
			if ( isNaN(element.image.offsetx) ) {
				element.image.offsetx = 0;
			}
			if ( isNaN(element.image.offsety) ) {
				element.image.offsety = 0;
			}
			if ( isNaN(element.image.dpi) ) {
				element.image.dpi = req.app.sbam.config.defaultPdfDpi;
			}
		}
		
		
		//trovo misure dell'immagine in mm
		var imageMmW = sourceImagePixW / req.app.sbam.utils.dpi2dpmm(element.image.dpi);
		var imageMmH = sourceImagePixH / req.app.sbam.utils.dpi2dpmm(element.image.dpi);
		//draw
		if ( output == "bitmap" ) {
			//console.log("renderImageElement daje dai!");
			var fs = require('fs');
			var Canvas = require('canvas');
			var Image = Canvas.Image;

			//calcolo le dimensioni utili del bitmap per rispettare l'aspect ratio del project
			var sizePos = req.app.sbam.utils.thepositioner(bitmapW,bitmapH,projectW,projectH);
			//console.log("avrei da buttar giù sta robba:");
			//console.log(element);
			//console.log(sizePos);
			var bboxPixX = req.app.sbam.utils.bboxValToPixel(element.bbox.x,sizePos.w,projectW);
			var bboxPixY = req.app.sbam.utils.bboxValToPixel(element.bbox.y,sizePos.h,projectH);
			var bboxPixW = req.app.sbam.utils.bboxValToPixel(element.bbox.w,sizePos.w,projectW);
			var bboxPixH = req.app.sbam.utils.bboxValToPixel(element.bbox.h,sizePos.h,projectH);
			var imageOffsetPixX = req.app.sbam.utils.bboxValToPixel(element.image.offsetx,sizePos.w,projectW);
			var imageOffsetPixY = req.app.sbam.utils.bboxValToPixel(element.image.offsety,sizePos.h,projectH);
			
			
			
			//prima creo una clipping mask data dal bbox
			ctx.save();
			ctx.beginPath();
			ctx.rect(bboxPixX+sizePos.x,bboxPixY+sizePos.y,bboxPixW,bboxPixH);
			ctx.clip();
			
			
			//poi disegno l'immagine intera, che verrà tagliata dalla clipping mask
			//ctx.image('images/test.jpeg', 0, 15, width: 300);
			var sourceImage = fs.readFileSync(sourceImageFullpath);
			//sourceImagePixW
			var imagePixW = req.app.sbam.utils.bboxValToPixel(imageMmW,sizePos.w,projectW);
			var imagePixH = req.app.sbam.utils.bboxValToPixel(imageMmH,sizePos.h,projectH);
			var img = new Image;
			img.src = sourceImage;
			ctx.drawImage(
				img, 
				bboxPixX + imageOffsetPixX + sizePos.x, 
				bboxPixY + imageOffsetPixY + sizePos.y, 
				imagePixW,
				imagePixH
			);
			ctx.restore();
			next();
		} 
		else if ( output == "pdf" ) {
			//helpers
			function drawImageInPdf(imageFullpath,next) {
				//vars
				var bboxMmX = req.app.sbam.utils.bboxValToMm(element.bbox.x,projectW);
				var bboxMmY = req.app.sbam.utils.bboxValToMm(element.bbox.y,projectH);
				var bboxMmW = req.app.sbam.utils.bboxValToMm(element.bbox.w,projectW);
				var bboxMmH = req.app.sbam.utils.bboxValToMm(element.bbox.h,projectH);
				var imageOffsetMmX = req.app.sbam.utils.bboxValToMm(element.image.offsetx,projectW);
				var imageOffsetMmY = req.app.sbam.utils.bboxValToMm(element.image.offsety,projectH);
				var imageMmX = bboxMmX + imageOffsetMmX;
				var imageMmY = bboxMmY + imageOffsetMmY;
				
				//creo la clipping mask per l'immagine
				pdf.save();//tengo una snapshot per tornare indietro e togliere la clipping mask, altrimenti anche le inmagini successive subiranno anche questa clipping mask
				pdf.rect(
					req.app.sbam.utils.mmToPDFPoints(bboxMmX), 
					req.app.sbam.utils.mmToPDFPoints(bboxMmY), 
					req.app.sbam.utils.mmToPDFPoints(bboxMmW), 
					req.app.sbam.utils.mmToPDFPoints(bboxMmH)
				).clip();
				
				//disegno l'immagine
				//console.log("element.image.dpi="+element.image.dpi);
				//console.log("element.image.offsetx="+element.image.offsetx);
				//console.log("element.image.offsety="+element.image.offsety);
				//console.log("sourceImagePixH="+sourceImagePixH);
				//console.log("sourceImagePixH="+sourceImagePixH);
				//console.log("imageMmX="+imageMmX);
				//console.log("imageMmY="+imageMmY);
				//console.log("imageMmW="+imageMmW);
				//console.log("imageMmH="+imageMmH);
				pdf.image(
					imageFullpath, 
					req.app.sbam.utils.mmToPDFPoints(imageMmX), 
					req.app.sbam.utils.mmToPDFPoints(imageMmY), 
					{
						width: req.app.sbam.utils.mmToPDFPoints(imageMmW)
						
					}
				);
				pdf.restore(); //tolgo la clipping mask
				next();
			}
			
			//////se i dpi sono maggiori di app.sbam.config.defaultPdfDpi devo effettuare un downsampling dell'immagine prima di inserirla nel pdf
			////if ( element.image.dpi > req.app.sbam.config.defaultPdfDpi ) {
				//calcolo le misure dell'immagine alla risoluzione prevista per i pdf
				var pdfImagePixW = sourceImagePixW / element.image.dpi * req.app.sbam.config.defaultPdfDpi;
				var pdfImagePixH = sourceImagePixH / element.image.dpi * req.app.sbam.config.defaultPdfDpi;
				//console.log("drawImageInPdf: downsamplo a pdfImagePixW="+pdfImagePixW+" e pdfImagePixH="+pdfImagePixH);
				//creo una nuova immagine in cache, con le misure a 300dpi dell'immagine
				req.app.sbam.utils.getImg(req,res,req.cookies.userID,projectId,name,path,pdfImagePixW,pdfImagePixH,false,function(resampledImageFullpath){
					//console.log("drawImageInPdf: e ottengo resampledImageFullpath="+resampledImageFullpath);
					//e poi nel pdf metto quella
					drawImageInPdf("public/"+resampledImageFullpath,next);
				});
			////} else {
			////	//metto nel pdf l'immagine orginiale
			////	drawImageInPdf(sourceImageFullpath,next);
			////}
		}
	});
	
}
exports.renderImageElement = renderImageElement;

/*
disegno un singolo elemento text
questo metodo differenzia ogni primitiva grafica in base a type usando il costrutto
	if ( output == "bitmap" ) {
		//use ctx.xxx...
	} else if ( output == "pdf" ) {
		//use pdf.xxx...
	}
*/
function renderTextElement(req,res,output,handler,element,projectW,projectH,bitmapW,bitmapH,next) {
	//helpers
	function printAtWordWrap( context , text, x, y, lineHeight, fitWidth) {
		fitWidth = fitWidth || 0;
		
		if (fitWidth <= 0)
		{
			context.fillText( text, x, y );
			return;
		}
		var words = text.split(' ');
		var currentLine = 0;
		var idx = 1;
		while (words.length > 0 && idx <= words.length)
		{
			var str = words.slice(0,idx).join(' ');
			var w = context.measureText(str).width;
			if ( w > fitWidth )
			{
				if (idx==1)
				{
					idx=2;
				}
				context.fillText( words.slice(0,idx-1).join(' '), x, y + (lineHeight*currentLine) );
				currentLine++;
				words = words.splice(idx-1);
				idx = 1;
			}
			else
			{idx++;}
		}
		if  (idx > 0)
			context.fillText( words.join(' '), x, y + (lineHeight*currentLine) );
	}
	
	
	//se il testo che mi arriva è flaggato come demoContent non lo visualizzo nè nei bitmap nè nei pdf, quindi skippo
	if ( element.text.demoContent ) {
		next();
	} else {
		//vars
		if ( output == "bitmap" ) {
			var ctx = handler;
		} 
		else if ( output == "pdf" ) {
			var pdf = handler;
		}
		//draw
		if ( output == "bitmap" ) {
			//console.log("renderTextElement(): dai che disegno!!");
			//calcolo le dimensioni utili del bitmap per rispettare l'aspect ratio del project
			var sizePos = req.app.sbam.utils.thepositioner(bitmapW,bitmapH,projectW,projectH);
			//applico gli stili
			var elementFont = "HelveticaNeue-Bold.ttf";
			var elementFontSize = "12";
			var elementAlign = "left";
			if ( element.style ) {
				if ( element.style.align ) {
					elementAlign = element.style.align;
				}
				if ( element.style.font ) {
					elementFont = element.style.font;
				}
				if ( element.style.fontSize ) {
					var normFont = Math.round(Number(element.style.fontSize) * 0.3528 / projectW * sizePos.w * 10 ) / 10;
					elementFontSize = normFont;
				}
			}
			ctx.font = elementFontSize+'px '+elementFont;
			//calcolo la posizione del testo
			var te = ctx.measureText(element.text.content);
			var textW = req.app.sbam.utils.bboxValToPixel(element.bbox.w,sizePos.w,projectW);
			//var textLineH = te.emHeightAscent + te.emHeightDescent;
			var textLineH = te.emHeightAscent/projectH*projectW*1.5; //il moltiplicatore è empirico
			var textX = req.app.sbam.utils.bboxValToPixel(element.bbox.x,sizePos.w,projectW)+sizePos.x;
			var textY = req.app.sbam.utils.bboxValToPixel(element.bbox.y,sizePos.h,projectH)+sizePos.y;
			if ( 
				element.style && 
				element.style.foregroundColor && 
				element.style.foregroundColor.c != undefined && 
				element.style.foregroundColor.m != undefined && 
				element.style.foregroundColor.y != undefined && 
				element.style.foregroundColor.k != undefined &&
				!(
					element.style.foregroundColor.c == 0 &&
					element.style.foregroundColor.m == 0 &&
					element.style.foregroundColor.y == 0 &&
					element.style.foregroundColor.k == 0
				)
			) {
				var rgbObj = ColorConverter.toRGB(new CMYK(element.style.foregroundColor.c,element.style.foregroundColor.m,element.style.foregroundColor.y,element.style.foregroundColor.k));
				var rgbColor = 'rgb('+rgbObj.r+','+rgbObj.g+','+rgbObj.b+')';
			} else {
				var rgbColor = 'rgb(0,0,0)';
			}
			ctx.fillStyle = rgbColor;
			
			//prima del testo creo una clipping mask in cui finirà il testo stesso
			//calcolo le dimensioni utili del bitmap per rispettare l'aspect ratio del project
			var bboxPixX = req.app.sbam.utils.bboxValToPixel(element.bbox.x,sizePos.w,projectW);
			var bboxPixY = req.app.sbam.utils.bboxValToPixel(element.bbox.y,sizePos.h,projectH);
			var bboxPixW = req.app.sbam.utils.bboxValToPixel(element.bbox.w,sizePos.w,projectW);
			var bboxPixH = req.app.sbam.utils.bboxValToPixel(element.bbox.h,sizePos.h,projectH);
			
			ctx.save();
			ctx.beginPath();
			ctx.rect(bboxPixX+sizePos.x,bboxPixY+sizePos.y,bboxPixW,bboxPixH);
			ctx.clip();
			
			//disegno il testo
			printAtWordWrap(ctx, element.text.content, textX, Number(textY)+Number(textLineH), textLineH, textW);
			
			//tolgo la maschera
			ctx.restore();
		} 
		
		else if ( output == "pdf" ) {
			//trasformo eventuali <br> in qualcosa di comrpensibile per il pdf
			var contentPdffed = element.text.content.replace(/<br>/g,'\n');
			pdf
			.font("public/"+req.app.sbam.config.fontDir+element.style.font)
			.fontSize(element.style.fontSize)
			.fillColor([element.style.foregroundColor.c,element.style.foregroundColor.m,element.style.foregroundColor.y,element.style.foregroundColor.k])
			.text(
				contentPdffed,
				req.app.sbam.utils.mmToPDFPoints(req.app.sbam.utils.bboxValToMm(element.bbox.x,projectW)),
				req.app.sbam.utils.mmToPDFPoints(req.app.sbam.utils.bboxValToMm(element.bbox.y,projectH)),
				{
					width: req.app.sbam.utils.mmToPDFPoints(req.app.sbam.utils.bboxValToMm(element.bbox.w,projectW)),
					height: req.app.sbam.utils.mmToPDFPoints(req.app.sbam.utils.bboxValToMm(element.bbox.h,projectH)),
					align: element.style.align
				}
			);
		}
		next(); //per ora è tutto sync, quindi chiamo next() alla fine
	}
}
exports.renderTextElement = renderTextElement;

/*
disegno un rettangolo in un bitmap (non usato dai pdf)
*/
function renderBitmapRectangle(req,res,ctx,fillStyle,element,projectW,projectH,bitmapW,bitmapH,next) {
	var margin = 1;
	//calcolo le dimensioni utili del bitmap per rispettare l'aspect ratio del project
	var sizePos = req.app.sbam.utils.thepositioner(bitmapW,bitmapH,projectW,projectH);
	//console.log("avrei da buttar giù sta robba:");
	//console.log(element);
	//console.log(sizePos);
	var bboxPixX = req.app.sbam.utils.bboxValToPixel(element.bbox.x,sizePos.w,projectW);
	var bboxPixY = req.app.sbam.utils.bboxValToPixel(element.bbox.y,sizePos.h,projectH);
	var bboxPixW = req.app.sbam.utils.bboxValToPixel(element.bbox.w,sizePos.w,projectW) - margin;
	var bboxPixH = req.app.sbam.utils.bboxValToPixel(element.bbox.h,sizePos.h,projectH) - margin;
	//ctx.save();
	ctx.fillStyle = fillStyle;
	ctx.fillRect(bboxPixX+sizePos.x,bboxPixY+sizePos.y,bboxPixW,bboxPixH);
	
	//ctx.beginPath();
	//ctx.rect(bboxPixX+sizePos.x,bboxPixY+sizePos.y,bboxPixW,bboxPixH);
	//ctx.clip();
	//ctx.restore();
	next();	
}
exports.renderBitmapRectangle = renderBitmapRectangle;


//questi sono global solo rispetto a renderer.js
/**
*
*  Javascript color conversion
*  http://www.webtoolkit.info/
*
**/
 
function HSV(h, s, v) {
    if (h <= 0) { h = 0; }
    if (s <= 0) { s = 0; }
    if (v <= 0) { v = 0; }
 
    if (h > 360) { h = 360; }
    if (s > 100) { s = 100; }
    if (v > 100) { v = 100; }
 
    this.h = h;
    this.s = s;
    this.v = v;
}
 
function RGB(r, g, b) {
    if (r <= 0) { r = 0; }
    if (g <= 0) { g = 0; }
    if (b <= 0) { b = 0; }
 
    if (r > 255) { r = 255; }
    if (g > 255) { g = 255; }
    if (b > 255) { b = 255; }
 
    this.r = r;
    this.g = g;
    this.b = b;
}
 
function CMYK(c, m, y, k) {
    if (c <= 0) { c = 0; }
    if (m <= 0) { m = 0; }
    if (y <= 0) { y = 0; }
    if (k <= 0) { k = 0; }
 
    if (c > 100) { c = 100; }
    if (m > 100) { m = 100; }
    if (y > 100) { y = 100; }
    if (k > 100) { k = 100; }
 
    this.c = c;
    this.m = m;
    this.y = y;
    this.k = k;
}
 
var ColorConverter = {
 
    _RGBtoHSV : function  (RGB) {
        var result = new HSV(0, 0, 0);
 
        r = RGB.r / 255;
        g = RGB.g / 255;
        b = RGB.b / 255;
 
        var minVal = Math.min(r, g, b);
        var maxVal = Math.max(r, g, b);
        var delta = maxVal - minVal;
 
        result.v = maxVal;
 
        if (delta == 0) {
            result.h = 0;
            result.s = 0;
        } else {
            result.s = delta / maxVal;
            var del_R = (((maxVal - r) / 6) + (delta / 2)) / delta;
            var del_G = (((maxVal - g) / 6) + (delta / 2)) / delta;
            var del_B = (((maxVal - b) / 6) + (delta / 2)) / delta;
 
            if (r == maxVal) { result.h = del_B - del_G; }
            else if (g == maxVal) { result.h = (1 / 3) + del_R - del_B; }
            else if (b == maxVal) { result.h = (2 / 3) + del_G - del_R; }
 
            if (result.h < 0) { result.h += 1; }
            if (result.h > 1) { result.h -= 1; }
        }
 
        result.h = Math.round(result.h * 360);
        result.s = Math.round(result.s * 100);
        result.v = Math.round(result.v * 100);
 
        return result;
    },
 
    _HSVtoRGB : function  (HSV) {
        var result = new RGB(0, 0, 0);
 
        var h = HSV.h / 360;
        var s = HSV.s / 100;
        var v = HSV.v / 100;
 
        if (s == 0) {
            result.r = v * 255;
            result.g = v * 255;
            result.v = v * 255;
        } else {
            var_h = h * 6;
            var_i = Math.floor(var_h);
            var_1 = v * (1 - s);
            var_2 = v * (1 - s * (var_h - var_i));
            var_3 = v * (1 - s * (1 - (var_h - var_i)));
 
            if (var_i == 0) {var_r = v; var_g = var_3; var_b = var_1}
            else if (var_i == 1) {var_r = var_2; var_g = v; var_b = var_1}
            else if (var_i == 2) {var_r = var_1; var_g = v; var_b = var_3}
            else if (var_i == 3) {var_r = var_1; var_g = var_2; var_b = v}
            else if (var_i == 4) {var_r = var_3; var_g = var_1; var_b = v}
            else {var_r = v; var_g = var_1; var_b = var_2};
 
            result.r = var_r * 255;
            result.g = var_g * 255;
            result.b = var_b * 255;
 
            result.r = Math.round(result.r);
            result.g = Math.round(result.g);
            result.b = Math.round(result.b);
        }
 
        return result;
    },
 
    _CMYKtoRGB : function (CMYK){
        var result = new RGB(0, 0, 0);
 
        c = CMYK.c / 100;
        m = CMYK.m / 100;
        y = CMYK.y / 100;
        k = CMYK.k / 100;
 
        result.r = 1 - Math.min( 1, c * ( 1 - k ) + k );
        result.g = 1 - Math.min( 1, m * ( 1 - k ) + k );
        result.b = 1 - Math.min( 1, y * ( 1 - k ) + k );
 
        result.r = Math.round( result.r * 255 );
        result.g = Math.round( result.g * 255 );
        result.b = Math.round( result.b * 255 );
 
        return result;
    },
 
    _RGBtoCMYK : function (RGB){
        var result = new CMYK(0, 0, 0, 0);
 
        r = RGB.r / 255;
        g = RGB.g / 255;
        b = RGB.b / 255;
 
        result.k = Math.min( 1 - r, 1 - g, 1 - b );
        result.c = ( 1 - r - result.k ) / ( 1 - result.k );
        result.m = ( 1 - g - result.k ) / ( 1 - result.k );
        result.y = ( 1 - b - result.k ) / ( 1 - result.k );
 
        result.c = Math.round( result.c * 100 );
        result.m = Math.round( result.m * 100 );
        result.y = Math.round( result.y * 100 );
        result.k = Math.round( result.k * 100 );
 
		//mod fede:
		//non so come cazzo calcola la conversione, ma mette SEMPRE del black, e ne mette troppo. 
		//lo riduco usando un'esponenziale.
		//console.log("RGTOCMYK: mi arrivano: RGB:");
		//console.log(RGB);
		//console.log("CMYK");
		//console.log(result);
		//passo su scalal da 0 a 1
		var valK = result.k / 100;
		//console.log("valK="+valK);
		//esponenzio
		valK = Math.pow(valK,2);
		//console.log("valK="+valK);
		//ritorno a scala da 0 a 100
		valK = Math.round(valK*100);
		//console.log("valK="+valK);
		result.k = valK;
		//correggo alcuni casi particolari
		if ( RGB.r == 0 && RGB.g == 0 && RGB.b == 0 ) {
			result.c = 0;
			result.m = 0;
			result.y = 0;
			result.k = 100;
		}
		//console.log("DOP CORREZIONE CMYK");
		//console.log(result);
        return result;
    },
 
    toRGB : function (o) {
        if (o instanceof RGB) { return o; }
        if (o instanceof HSV) {    return this._HSVtoRGB(o); }
        if (o instanceof CMYK) { return this._CMYKtoRGB(o); }
    },
 
    toHSV : function (o) {
        if (o instanceof HSV) { return o; }
        if (o instanceof RGB) { return this._RGBtoHSV(o); }
        if (o instanceof CMYK) { return this._RGBtoHSV(this._CMYKtoRGB(o)); }
    },
 
    toCMYK : function (o) {
        if (o instanceof CMYK) { return o; }
        if (o instanceof RGB) { return this._RGBtoCMYK(o); }
        if (o instanceof HSV) { return this._RGBtoCMYK(this._HSVtoRGB(o)); }
    }
 
}
























 
 
 
 
 
 
 
 


