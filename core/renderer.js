if ( true ) {

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
questo metodo chiama N volte renderPdf per generare tutti i pdf che compongono
*/
function renderAllPdf(req,res,project,next) {
	//helpers
	function parallelAsyncLoop() {
		remaining--;
		if ( remaining == 0 ) {
			//finito async loop
			next(pdfs);
		}
	}
	
	function placePage(sourcePage,destPage,options) {
		//loop su tutti gli elementes della sourcePage
		for ( var x=0; x<sourcePage.elements.length; x++ ) {
			var sourceElement = sourcePage.elements[x];
			//console.log(">>>>>>>>>>>>>>>>>>> placePage(): prendo questo element da sourcePage:");
			//console.log(sourceElement);
			//clono l'element
			var destElement = JSON.parse(JSON.stringify(sourceElement));
			//apllico all'element scaleAndOffsetElement(element, options)
			destElement = scaleAndOffsetElement( destElement, options );
			//console.log(">>>>>>>>>>>>>>>>>>> placePage(): e dopo averlo smandruppato lo salvo in destPage così:");
			//console.log(destElement);
			//e lo pusho in destPage
			destPage.elements.push(destElement);
		}
	}
	
	//options: { refValX, refValY, newRefValX, newRefValY, offsetX, offsetY }
	function scaleAndOffsetElement( element, options ) {
		if (element.bbox) {
			var bbox = element.bbox;
			if (bbox.x || bbox.x == 0) bbox.x = scaleAndOffset( bbox.x, options.refValX, options.newRefValX, options.offsetX );
			if (bbox.y || bbox.y == 0) bbox.y = scaleAndOffset( bbox.y, options.refValY, options.newRefValY, options.offsetY );
			if (bbox.w) bbox.w = scaleAndOffset( bbox.w, options.refValX, options.newRefValX );
			if (bbox.h) bbox.h = scaleAndOffset( bbox.h, options.refValY, options.newRefValY );
		}
		if (element.image) {
			var image = element.image;
			if (image.offsetx) image.offsetx = scaleAndOffset( image.offsetx, options.refValX, options.newRefValX );
			if (image.offsety) image.offsety = scaleAndOffset( image.offsety, options.refValY, options.newRefValY );
			if (image.dpi) {
				//per i dpi tra lo scaling delle x e quello delle y, scelgo quello maggiore
				var ipd = 100000/image.dpi; //i dpi li aggancio alle X, ma all'inverso, perchè i dpi diminuiscono quando aumentano le dimensioni
				var scaleFactorX = scaleAndOffset( 1, options.refValX, options.newRefValX );
				var scaleFactorY = scaleAndOffset( 1, options.refValY, options.newRefValY );
				if ( scaleFactorX > scaleFactorY ) {
					var scaledIpd = scaleAndOffset( ipd, options.refValX, options.newRefValX ); 
				} else {
					var scaledIpd = scaleAndOffset( ipd, options.refValY, options.newRefValY ); 
				}
				//console.log("======================= scale factor: "+(options.newRefValX/options.refValX));
				//console.log("======================= image.dpi: "+image.dpi);
				//console.log("======================= ipd: "+ipd);
				//console.log("======================= scaledIpd: "+scaledIpd);
				image.dpi = 100000/scaledIpd;
				//console.log("======================= inverted scaledIpd: "+image.dpi);
			}
		}
		if (element.style) {
			var style = element.style;
			if (style.fontSize) style.fontSize = scaleAndOffset( style.fontSize, options.refValX, options.newRefValX ); //il fontSize lo aggancio alle X
		}
		return element;
	}
	function scaleAndOffset( val, refVal, newRefVal, offset ) {
		//prima traduco in mm
		var newVal = req.app.sbam.utils.bboxValToMm(val,refVal);
		//console.log(">>>>>>>>>> sto scalando: val="+val+" refVal="+refVal+" newRefVal="+newRefVal+" offset="+offset+" da cui ottengo newVal="+newVal);
		//poi effettuo lo scaling
		if ( refVal != newRefVal ) newVal = Number(newVal * newRefVal / refVal);
		//console.log(">>>>>>>>>> sto scalando: val="+val+" refVal="+refVal+" newRefVal="+newRefVal+" offset="+offset+" da cui ottengo newVal="+newVal);
		//poi lo traslo
		if ( offset && offset != 0 ) newVal = Number(newVal) + Number(offset);
		//console.log(">>>>>>>>>> sto scalando: val="+val+" refVal="+refVal+" newRefVal="+newRefVal+" offset="+offset+" da cui ottengo newVal="+newVal);
		return newVal;
	}
	function populateOrderProject(project) {
		//clono il project principale
		var orderProject = JSON.parse(JSON.stringify(project));
		//imposto al project width ed height A4
		orderProject.preset.width = 210;
		orderProject.preset.height = 297;
		//creo la pagina dell'order
		//che ha inizialmente dentro solo un text con tutti i dati utili del progetto stampato
		var orderPage = {
			'type': 'single',
			'num': 1,
			'elements': [{
				'bbox': {
					'x': 20,
					'y': 20,
					'w': 120,
					'h': 100
				},
				'type': 'text',
				'text': {
					'content': "ORDER from platform: "+req.cookies.platform.toUpperCase()+"\n\n\npreset:   "+project.preset.label+"\ndim.:   "+project.preset.width+" x "+project.preset.height+" mm\npag.:   "+project.pages.length+"\n\n\ncustomer username:   "+req.cookies.userName+"\ncustomer userID:   "+req.cookies.userID
				}
			},
			{
				'bbox': {
					'x': 130,
					'y': 20,
					'w': 70,
					'h': 250
				},
				'type': 'text',
				'style': {
					'font':'UbuntuMono-Regular.ttf',
					'fontSize':'7'
				},
				'text': {
					'content': "preset data:   "+JSON.stringify(project.preset, null, 4)
				}
			}]
		};
		//e poi ci piazzo dentro la copertina in miniatura
		var firstPage = JSON.parse(JSON.stringify( orderProject.pages[0]));
		placePage( firstPage,orderPage,{ 'refValX': project.preset.width, 'refValY': project.preset.height, 'newRefValX': 100, 'newRefValY': 100/project.preset.width*project.preset.height, 'offsetX': 20, 'offsetY': 120 });
		//infine metto la mia order page nel mio order project, e lo ritorno
		orderProject.pages = []; //azzero pagine preesistenti
		orderProject.pages.push(orderPage);
		return orderProject;
	}
	function populateCoverProject(coverType,project) {
		/**
		schema generale per la cover
		
		^ y
		|
		|wing left |  cover left  |spl|  cover left  |wing right|
		|3a di cop.|  4a di cop.  |spl|  1a di cop.  |2a di cop.|
		|wingWidth |  pageWidth   |s.W|  pageWidth   |wingWidth |
		+----------+--------------+---+--------------+----------+
		|          |              |   |              |          | wingHeight
		+----------+--------------+---+--------------+----------+
		|          |              |   |              |          |
		|          |              |   |              |          |
		|          |              |   |              |          |
		|          |              |   |              |          |
		|          |              |   |              |          | pageHeight
		|          |              |   |              |          |
		|          |              |   |              |          |
		|          |              |   |              |          |
		+----------+--------------+---+--------------+----------+
		|          |              |   |              |          | wingHeight
		+----------+--------------+---+--------------+----------+--> x

		*/
		
		
		//clono il project principale
		var coverProject = JSON.parse(JSON.stringify(project));
		//console.log("AAAAAAAAAAAAAAAAAAAA populateCoverProject(): project.preset: ");
		//console.log(project.preset);
		//console.log("BBBBBBBBBBBBBBBBBBBB populateCoverProject(): coverProject.preset: ");
		//console.log(coverProject.preset);
		
		//normalizzo i dati
		if ( !coverType ) coverType = "cover";
		if ( coverType == "cover" ) {
			var cover = coverProject.preset.cover;
		} else if ( coverType == "coverlet" ) {
			var cover = coverProject.preset.coverlet;
		}
		
		if ( !cover.pageWidth ) cover.pageWidth = coverProject.preset.width; //nota: qui coverProject.preset.width è ancora quello originale, poi cambierà
		if ( !cover.pageHeight ) cover.pageHeight = coverProject.preset.height;
		if ( !cover.wingWidth ) cover.wingWidth = 0;
		if ( !cover.wingHeight ) cover.wingHeight = 0;
		if ( !cover.splineWidth ) cover.splineWidth = 0;

		
		//imposto al project width ed height finali della cover (vedi schema), calcolate in base ai dati dichiarati nel preset
		coverProject.preset.width = 2*cover.pageWidth + cover.splineWidth + 2*cover.wingWidth;
		coverProject.preset.height = cover.pageHeight + 2*cover.wingHeight;
		
		//tengo copia (clono) delle 4 pagine cover (prima, seconda, terza e quarta)
		var sourceCoverPage1 = JSON.parse(JSON.stringify(coverProject.pages[0]));
		var sourceCoverPage2 = JSON.parse(JSON.stringify(coverProject.pages[1]));
		var sourceCoverPage3 = JSON.parse(JSON.stringify(coverProject.pages[ coverProject.pages.length - 2 ]));
		var sourceCoverPage4 = JSON.parse(JSON.stringify(coverProject.pages[ coverProject.pages.length - 1 ]));
		
		//poi creo exnovo una pagina per lo spline
		//che ha un solo elemento, che è un'immagine del testo dello spline ruotato

		if ( cover.splineWidth ) {
			var splinePage = {
				'type': 'single',
				'num': 1,
				'elements': [{
					'bbox': {
						'x': 0,
						'y': cover.pageHeight,
						'w': cover.pageHeight,
						'h': cover.splineWidth
					},
					'style': {
						'foregroundColor': {
							'c':0,
							'm':0,
							'y':0,
							'k':0
						},
						'backgroundColor': {
							'c':Math.random()*50,
							'm':Math.random()*50,
							'y':Math.random()*50,
							'k':10
						},
						'font':'Roboto-Bold.ttf',
						'fontSize':'24', //sono intesi in pt (point)
						'align': 'left'
					},
					'type': 'text',
					'text': {
						'content': "     "+coverProject.spline,
						'rotate': -90
					}
				},
				{
					'bbox': {
						'x': 0,
						'y': cover.splineWidth/3*2,
						'w': cover.splineWidth,
						'h': cover.splineWidth/1.142595978
					},
					'style': {
						'backgroundColor': {
							'c':0,
							'm':0,
							'y':0,
							'k':0
						},
						'font':'Roboto-Bold.ttf',
						'fontSize':'24', //sono intesi in pt (point)
						'align': 'left'
					},
					'type': 'image',
					'image': {
						'url': "templates/images/altre/symbol_my-e.png"
					}
				}]
			};
		}
		
		//poi elimino tutte le pagine da coverProject
		coverProject.pages = [];
		
		//creo una nuova pagina singola vuota, type=single, num=1, elements=[]
		var coverPage = {
			'type': 'single',
			'num': 1,
			'elements': []
		};
		
		//procedo a popolare gli elements di coverPage (la mia pagina singola vuota) da sinistra a destra, secondo lo schema di cui sopra:
		
		//piazzo la 3a di copertina
		if (cover.wingWidth) {
			//console.log("ok ok, piazzerei questa sourceCoverPage3 dentro alla mia cover:");
			//console.log(sourceCoverPage3);
			placePage(sourceCoverPage3,coverPage,{ 'refValX': project.preset.width, 'refValY': project.preset.height, 'newRefValX': cover.pageWidth, 'newRefValY': cover.pageHeight, 'offsetX': cover.wingWidth - cover.pageWidth, 'offsetY': cover.wingHeight });
		};
		
		//piazzo la 4a di copertina
		//console.log("ok ok, piazzerei questa sourceCoverPage4 dentro alla mia cover:");
		//console.log(sourceCoverPage4);
		placePage(sourceCoverPage4,coverPage,{ 'refValX': project.preset.width, 'refValY': project.preset.height, 'newRefValX': cover.pageWidth, 'newRefValY': cover.pageHeight, 'offsetX': cover.wingWidth, 'offsetY': cover.wingHeight });
		
		//piazzo il dorso (spline)
		if (cover.splineWidth) {
			var splineOffsetX = cover.wingWidth + cover.pageWidth;
			//console.log("ok ok, splineOffsetX="+splineOffsetX);
			//console.log("ok ok, piazzerei questa splinePage dentro alla mia cover:");
			//console.log(splinePage);
			//solo nel caso del dorso, che è una pagina creata runtime, non applico scaling, perchè l'ho già creato delle dimensioni giuste
			placePage(splinePage,coverPage,{ 'refValX': cover.pageWidth, 'refValY': cover.pageHeight, 'newRefValX': cover.pageWidth, 'newRefValY': cover.pageHeight, 'offsetX': splineOffsetX, 'offsetY': cover.wingHeight });
			//placePage(splinePage,coverPage,{ 'refValX': project.preset.width, 'refValY': project.preset.height, 'newRefValX': cover.pageWidth, 'newRefValY': cover.pageHeight, 'offsetX': splineOffsetX, 'offsetY': cover.wingHeight });
		}
			
		//piazzo la 1a di copertina
		//console.log("ok ok, piazzerei questa sourceCoverPage1 dentro alla mia cover:");
		//console.log(sourceCoverPage1);
		placePage(sourceCoverPage1,coverPage,{ 'refValX': project.preset.width, 'refValY': project.preset.height, 'newRefValX': cover.pageWidth, 'newRefValY': cover.pageHeight, 'offsetX': cover.wingWidth + cover.pageWidth + cover.splineWidth, 'offsetY': cover.wingHeight });
		
		//piazzo la 2a di copertina
		if (cover.wingWidth) {
			//console.log("ok ok, piazzerei questa sourceCoverPage2 dentro alla mia cover:");
			//console.log(sourceCoverPage2);
			placePage(sourceCoverPage2,coverPage,{ 'refValX': project.preset.width, 'refValY': project.preset.height, 'newRefValX': cover.pageWidth, 'newRefValY': cover.pageHeight, 'offsetX': cover.wingWidth + 2*cover.pageWidth + cover.splineWidth, 'offsetY': cover.wingHeight });
		}
			
		//infine piazzo la mia cover page nel mio cover project, e lo ritorno
		coverProject.pages.push(coverPage);
			
		return coverProject;
	}
	function populateStickersProject(project) {
		//clono il project principale
		var stickersProject = JSON.parse(JSON.stringify(project));
		console.log("@@@@@@@@@@@@@@@@@@@@ populateStickersProject(): stickersProject.preset: ");
		console.log(stickersProject.preset);

		//prima di resettare le pagine, faccio un parsing per tirar fuori solo gli element figurina
		var stickersElements = [];
		for ( var i=0; i<stickersProject.pages.length; i++ ) {
			var page=stickersProject.pages[i];
			for ( var j=0; j<page.elements.length; j++ ) {
				var element = page.elements[j];
				//console.log("decido se tenere: ");
				//console.log(element);
				if ( element.type == "image" && element.image && element.image.type && element.image.type == "sticker"  && element.image.url ) {
					stickersElements.push(JSON.parse(JSON.stringify(element)));
				}
			}
		}
		
		//imposto al project width ed height finali della singola figurina + relativa sbordatura, come dichiarato nel preset
		stickersProject.preset.width = Number(stickersProject.preset.stickers.width) + 2*Number(stickersProject.preset.stickers.sbordatura);
		stickersProject.preset.height = Number(stickersProject.preset.stickers.height) + 2*Number(stickersProject.preset.stickers.sbordatura);
		
		//ciclo su ogni sticker e per ciascuna
		var figuPages = [];
		for ( var x=0; x<stickersElements.length; x++ ) {
			var sticker = stickersElements[x];
			//QUI
			console.log("ciclo su figu:");
			console.log(sticker);
			
			//devo gestire le figurine multiple
			
			//prima parso il nome
			var layout = req.app.sbam.utils.parseStickerLayout(sticker.image.stickerLayout);
			
			//poi faccio un ciclo su righe/colonne
			for ( var r=0; r<layout.stickerLayoutRows; r++ ) {
				for ( var c=0; c<layout.stickerLayoutCols; c++ ) {
					//per ciascuna figurina atomica
					//basta che la piazzo in una pagina vuota, con x e y traslati in base alla figurina considerata
					if ( layout.stickerLayoutType == "v" ) {
						sticker.bbox.x = stickersProject.preset.stickers.sbordatura - c*stickersProject.preset.stickers.width;
						sticker.bbox.y = stickersProject.preset.stickers.sbordatura - r*stickersProject.preset.stickers.height;
					} else {
						//QUI problema: le figu orizzontali vanno girate, perchè il pdf è in verticale
						sticker.bbox.x = stickersProject.preset.stickers.sbordatura - c*stickersProject.preset.stickers.height;
						sticker.bbox.y = stickersProject.preset.stickers.sbordatura - r*stickersProject.preset.stickers.width;
					}
					
					//creo una nuova pagina vuota, e ci piazzo solo la mia figu
					var figuPage = {
						'type': 'single',
						'elements': []
					};
					figuPage.elements.push(JSON.parse(JSON.stringify(sticker)));
					
					//e poi metto la pagina nel project
					figuPages.push(figuPage);
					
				}
			}
			
			
			
			
			
			
			
		}

		//poi elimino tutte le pagine da stickersProject
		stickersProject.pages = [];

		//e ci piazzo le nuove pagine con le figu
		stickersProject.pages = figuPages;
		
		return stickersProject;
	}
	var pdfs = {
		'main':"",
		'cover':"",
		'coverlet':"",
		'stickers':"",
		'order':""
	};
	var remaining = 2; //ci sono sempre almeno 2 pdf: il main e l'order
	
	//lancio subito il rendering del main pdf, che c'è sempre indipendentemente da covers e stickers
	//(prima però, nel caso sia specificata anche una cover o una coverlet per questo progetto, devo scartare dal main pdf le 4 pagine cover)
	if ( 
		!req.app.sbam.utils.is_empty(project.preset.coverlet)
		||
		!req.app.sbam.utils.is_empty(project.preset.cover)
	) {
		var projectCloned = JSON.parse(JSON.stringify(project)); //tengo copia dell'originale e modifico la copia, cioè tolgo le cover pages solo alla copia, perchè poi mi serviranno
		var pagesCloned = [];
		for ( var x=0; x<projectCloned.pages.length; x++ ) {
			var page = projectCloned.pages[x];
			if ( page.type.substring(0,5) != 'cover' ) {
				pagesCloned.push(page);
			}
		}
		projectCloned.pages = pagesCloned;
		renderPdf(req,res,projectCloned,"PROJECT-PDF-MAIN", function(outUrl){ pdfs.main = outUrl; parallelAsyncLoop(); }); 
	} else {
		renderPdf(req,res,project,"PROJECT-PDF-MAIN", function(outUrl){ pdfs.main = outUrl; parallelAsyncLoop(); }); 
	}

	//se devo, genero la cover
	if ( !req.app.sbam.utils.is_empty(project.preset.cover) ) {
		//console.log("HO DECISO DI FARE LA COVER PERCHE IL PRESET DICE: project.preset.cover:");
		//console.log(project.preset.cover);
		var coverProject = populateCoverProject("cover",project);
		//ora che ho un project, con singola pagina, che è la coverPage, posso creare il pdf
		//lancio renderPdf
		remaining++;
		renderPdf(req,res,coverProject,"PROJECT-PDF-COVER", function(outUrl){ pdfs.cover = outUrl; parallelAsyncLoop(); });
	}
	
	//poi se devo, genero la coverlet
	if ( !req.app.sbam.utils.is_empty(project.preset.coverlet) ) {
		//console.log("HO DECISO DI FARE LA COVERLET PERCHE IL PRESET DICE: project.preset.coverlet:");
		//console.log(project.preset.coverlet);
		var coverletProject = populateCoverProject("coverlet",project);
		//ora che ho un project, con singola pagina, che è la coverPage, posso creare il pdf
		//lancio renderPdf
		remaining++;
		renderPdf(req,res,coverletProject,"PROJECT-PDF-COVERLET", function(outUrl){ pdfs.coverlet = outUrl; parallelAsyncLoop(); });
	}
	
	//poi se devo, genero le figu
	if ( !req.app.sbam.utils.is_empty(project.preset.stickers) ) {
		//console.log("HO DECISO DI FARE LE FIGU PERCHE IL PRESET DICE: project.preset.stickers:");
		//console.log(project.preset.stickers);
		var stickersProject = populateStickersProject(project);
		//ora che ho un project, posso creare il pdf
		//lancio renderPdf
		remaining++;
		renderPdf(req,res,stickersProject,"PROJECT-PDF-STICKERS", function(outUrl){ pdfs.stickers = outUrl; parallelAsyncLoop(); });
	}
	
	//infine, sempre, genero un pdf A4 a pagina singola con i dettagli dell'ordine
	var orderProject = populateOrderProject(project);
	//ora che ho un project, con singola pagina, che è la coverPage, posso creare il pdf
	//lancio renderPdf
	renderPdf(req,res,orderProject,"PROJECT-PDF-ORDER", function(outUrl){ pdfs.order = outUrl; parallelAsyncLoop(); });
	
}
exports.renderAllPdf = renderAllPdf;
/*
questo metodo usa la libreria pdfkit per generare un pdf partendo da un project
*/
function renderPdf(req,res,project,suffix,next) {
	//devo fare un loop sulle pagine che mi sono arrivate, e per ciascuna
	//devo fare un loop sugli elementi e disegnarli nel pdf
	
	//inizializzo le librerie necessarie e il nome del file da generare
	var fs = require('fs');
	var PDFDocument = require('pdfkit');
	var outFilename = req.app.sbam.utils.getCacheFilename(req.cookies.userID,project._id,project.preset.width+"mm",project.preset.height+"mm",suffix+".pdf","",false);
	
	
	var outFullpath = req.app.sbam.config.pdfDir + outFilename;
	var outUrl = req.app.sbam.config.pdfUrl + outFilename;
	
	//inizializzo il documento vuoto
	var pdf_options = {
		size: [req.app.sbam.utils.mmToPDFPoints(project.preset.width),req.app.sbam.utils.mmToPDFPoints(project.preset.height)],
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
			//console.log("ciclo su pagina:");
			//console.log(page);
			//var elementsCloned = page.elements.slice(0).reverse(); //tengo copia dell'originale, visto che il clone lo spolpo
			var elementsCloned = page.elements.slice(0).reverse(); //tengo copia dell'originale, visto che il clone lo spolpo
			var elementsModified = [];
			nestedAsyncLoop();
			function nestedAsyncLoop() {
				if ( elementsCloned.length > 0 ) {
					var elm = elementsCloned.pop();
					//console.log("ciclo su element:");
					//console.log(elm);
					//per le figu devo impostare le dimensioni in base a stickerLayout
					req.app.sbam.utils.manageStickerLayout(elm,project.preset);
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
						var sizePos = req.app.sbam.utils.thepositioner(bitmapW,bitmapH,project.preset.width,project.preset.height);
						console.log(sizePos);
						var bboxPixX = req.app.sbam.utils.bboxValToPixel(elm.bbox.x,sizePos.w,project.preset.width);
						var bboxPixY = req.app.sbam.utils.bboxValToPixel(elm.bbox.y,sizePos.h,project.preset.height);
						var bboxPixW = req.app.sbam.utils.bboxValToPixel(elm.bbox.w,sizePos.w,project.preset.width);
						var bboxPixH = req.app.sbam.utils.bboxValToPixel(elm.bbox.h,sizePos.h,project.preset.height);
						ctx.fillRect(bboxPixX+sizePos.x,bboxPixY+sizePos.y,bboxPixW,bboxPixH);
						//console.log("ho appena disegnato un rettangolo di colore: "+rgbColor);
						*/
						var bboxMmX = req.app.sbam.utils.bboxValToMm(elm.bbox.x,project.preset.width);
						var bboxMmY = req.app.sbam.utils.bboxValToMm(elm.bbox.y,project.preset.height);
						var bboxMmW = req.app.sbam.utils.bboxValToMm(elm.bbox.w,project.preset.width);
						var bboxMmH = req.app.sbam.utils.bboxValToMm(elm.bbox.h,project.preset.height);
						//console.log("avrei da buttar giù sta robba:");
						//console.log(cmykColor);
						//console.log(req.app.sbam.utils.mmToPDFPoints(bboxMmX));
						//console.log(req.app.sbam.utils.mmToPDFPoints(bboxMmY));
						//console.log(req.app.sbam.utils.mmToPDFPoints(bboxMmW));
						//console.log(req.app.sbam.utils.mmToPDFPoints(bboxMmH));
						//pdf.save();
						//pdf.fill(cmykColor).rect(
						//se è specificata una rotazione per i text, devo anche ruotare lo sfondo
						if ( elm.text && elm.text.rotate ) {
							pdf.rotate(Number(elm.text.rotate),{origin:[req.app.sbam.utils.mmToPDFPoints(bboxMmX),req.app.sbam.utils.mmToPDFPoints(bboxMmY)]});
						}
						pdf.rect(
							req.app.sbam.utils.mmToPDFPoints(bboxMmX), 
							req.app.sbam.utils.mmToPDFPoints(bboxMmY), 
							req.app.sbam.utils.mmToPDFPoints(bboxMmW), 
							req.app.sbam.utils.mmToPDFPoints(bboxMmH)
						).fill(cmykColor);
						//se è specificata una rotazione per i text, la tolgo
						if ( elm.text && elm.text.rotate ) {
							pdf.rotate(-Number(elm.text.rotate),{origin:[req.app.sbam.utils.mmToPDFPoints(bboxMmX),req.app.sbam.utils.mmToPDFPoints(bboxMmY)]});
						}
						//pdf.restore();
					}
					
					switch (elm.type) {
						case "image":
							//se un utente ha rimosso (remove) un'immagine da una pagina, e poi ha salvato, nel db resta l'elemento image, ma senza url (vuoto).
							//quindi se si tratta di un'immagine senza url la scarto e procedo oltre
							if (elm.image.url && elm.image.url != "") {
								renderImageElement(req,res,"pdf",pdf,elm,project._id,project.preset.width,project.preset.height,null,null,function(){
									nestedAsyncLoop();
								}); //qui non passo bitmapW e bitmapH perchè per i pdf non servono
							} else {
								nestedAsyncLoop();
							}
							break;
						case "text":
							renderTextElement(req,res,"pdf",pdf,elm,project.preset.width,project.preset.height,null,null,function(){
								nestedAsyncLoop();
							}); //qui non passo bitmapW e bitmapH perchè per i pdf non servono
							break;
					}
				} else {
					//finito una pagina
					//creo nuova pagina
					//lo faccio alla fine del loop perchè la prima pagina viene creata automaticamente
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
					renderImageElement(req,res,"pdf",pdf,elm,project._id,project.preset.width,project.preset.height); //qui non passo bitmapW e bitmapH perchè per i pdf non servono
					break;
				case "text":
					renderTextElement(req,res,"pdf",pdf,elm,project.preset.width,project.preset.height); //qui non passo bitmapW e bitmapH perchè per i pdf non servono
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
questo metodo usa la libreria node-canvas per generare i bitmap partendo da un project o da un template
i parametri project e la coppia tplFilename,projectPreset sono mutuamente esclusivi
se si passa project (un project dal db) verrà generata una thumb della sua prima pagina
se si passano tplFilename,projectPreset (un file dall dir dei template) verrà generata una thumb del template
tplFilename è senza estensione
*/
function renderBitmap(req,res,project,tplFilename,projectPreset,bitmapW,bitmapH,next) {
	//helpers
	function renderElements(elements) {
		//inizializzo le librerie necessarie e il nome del file da generare
		var fs = require('fs');
		var Canvas = require('canvas');
		
		if ( sourceType == "prj" ) {
			var outFilename = req.app.sbam.utils.getCacheFilename(req.cookies.userID,project._id,bitmapW,bitmapH,"PROJECT-THUMB.png","",false);
		}
		else if ( sourceType == "tpl" ) {
			var outFilename = req.app.sbam.utils.getCacheFilename("common","common",bitmapW,bitmapH,tplFilename+"_TEMPLATE-THUMB.png","",false);
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
				var sizePos = req.app.sbam.utils.thepositioner(bitmapW,bitmapH,project.preset.width,project.preset.height);
			}
			else if ( sourceType == "tpl" ) {
				var sizePos = req.app.sbam.utils.thepositioner(bitmapW,bitmapH,projectPreset.width,projectPreset.height);
			}
			
			
			//disegno un fondo bianco alla pagina
			ctx.save();
			ctx.fillStyle = '#FFF';
			ctx.fillRect(Math.round(sizePos.x),Math.round(sizePos.y),Math.round(sizePos.w),Math.round(sizePos.h));
			ctx.strokeStyle = '#ccc';
			ctx.lineWidth = 1;
			ctx.strokeRect(Math.round(sizePos.x)+1,Math.round(sizePos.y)+1,Math.round(sizePos.w)-2,Math.round(sizePos.h)-2);
			//console.log("STROKKEREI: ");
			//console.log(Math.round(sizePos.x)+","+Math.round(sizePos.y)+","+Math.round(sizePos.w)+","+Math.round(sizePos.h));
			ctx.restore();




			var elementsCloned = elements.slice(0).reverse(); //tengo copia dell'originale, visto che il clone lo spolpo
			var elementCounter = 0;
			asyncLoop();
			function asyncLoop() {
				
				if ( elementsCloned.length > 0 ) {
					elementCounter++;
					var elm = elementsCloned.pop();
					//per le figu devo impostare le dimensioni in base a stickerLayout
					req.app.sbam.utils.manageStickerLayout(elm,sourcePreset);
					
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
						var sizePos = req.app.sbam.utils.thepositioner(bitmapW,bitmapH,project.preset.width,project.preset.height);
						//console.log("avrei da buttar giù sta robba:");
						//console.log(element);
						//console.log(sizePos);
						var bboxPixX = req.app.sbam.utils.bboxValToPixel(elm.bbox.x,sizePos.w,project.preset.width);
						var bboxPixY = req.app.sbam.utils.bboxValToPixel(elm.bbox.y,sizePos.h,project.preset.height);
						var bboxPixW = req.app.sbam.utils.bboxValToPixel(elm.bbox.w,sizePos.w,project.preset.width);
						var bboxPixH = req.app.sbam.utils.bboxValToPixel(elm.bbox.h,sizePos.h,project.preset.height);
						ctx.fillRect(bboxPixX+sizePos.x,bboxPixY+sizePos.y,bboxPixW,bboxPixH);
						//console.log("ho appena disegnato un rettangolo di colore: "+rgbColor);
						
					}
					
					switch (elm.type) {
						case "image":
							//se un utente ha rimosso (remove) un'immagine da una pagina, e poi ha salvato, nel db resta l'elemento image, ma senza url (vuoto).
							//quindi se si tratta di un'immagine senza url la scarto e procedo oltre
							if (elm.image && elm.image.url && elm.image.url != "" && sourceType == "prj") {
								renderImageElement(req,res,"bitmap",ctx,elm,project._id,project.preset.width,project.preset.height,bitmapW,bitmapH,function(){
									asyncLoop();
								});
							} else {
								//se l'immagine non è definita:
								if ( sourceType == "prj" ) {
									//se sto disegnando un project allora skippo l'immagine
									asyncLoop();
								}
								else if ( sourceType == "tpl" ) {
									//prendo le dimensioni in mm dal preset
									//se non è specificata un'immagine, nel caso di sourceType tpl devo comunque renderizzare un rettangolo trasparente
									//ma non lo faccio solo se il primo elemento è un'immagine a fondo pieno
									if ( 
										elementCounter == 1
										&&
										Math.round(req.app.sbam.utils.bboxValToMm(elm.bbox.w,projectPreset.width)) == Math.round(projectPreset.width)
										&&
										Math.round(req.app.sbam.utils.bboxValToMm(elm.bbox.h,projectPreset.height)) == Math.round(projectPreset.height)
									) {
										//caso di primo element immagine a sfondo pieno, skippo
										asyncLoop();
									} else {
										//in tutti gli altri casi disegno
										renderBitmapRectangle(req,res,ctx,'rgba(51,136,204,0.5)',elm,projectPreset.width,projectPreset.height,bitmapW,bitmapH,function(){
											asyncLoop();
										});
									}
								}
							}
							break;
						case "text":
							if ( sourceType == "prj" ) {
								renderTextElement(req,res,"bitmap",ctx,elm,project.preset.width,project.preset.height,bitmapW,bitmapH,function(){
									asyncLoop();
								});
							}
							else if ( sourceType == "tpl" ) {
								//per sourceType tpl invece del testo renderizzo un fondo
								//prendo le dimensioni in mm della pagina (cioè del project) dal preset
								renderBitmapRectangle(req,res,ctx,'rgba(0,0,0,0.3)',elm,projectPreset.width,projectPreset.height,bitmapW,bitmapH,function(){
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
		var sourcePreset = project.preset;
	}
	else if ( tplFilename && projectPreset ) {
		var sourceType = "tpl";
		var sourcePreset = projectPreset;
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
	req.app.sbam.utils.getImgFeatures(req, res, req.cookies.userID, projectId, path, name, element, function(features){
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
			
			//sourceImagePixW
			var imagePixW = req.app.sbam.utils.bboxValToPixel(imageMmW,sizePos.w,projectW);
			var imagePixH = req.app.sbam.utils.bboxValToPixel(imageMmH,sizePos.h,projectH);
			
			//prima devo chiamare un getImg per applicare eventuali effetti, non posso leggere direttamente l'immagine originale
			req.app.sbam.utils.getImg(req,res,req.cookies.userID,projectId,name,path,imagePixW,imagePixH,false,element,true,function(resampledImageFullpath){
				var sourceImage = fs.readFileSync("public/"+resampledImageFullpath);
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
			});			
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
			
			//calcolo le misure dell'immagine alla risoluzione prevista per i pdf
			var pdfImagePixW = sourceImagePixW / element.image.dpi * req.app.sbam.config.defaultPdfDpi;
			var pdfImagePixH = sourceImagePixH / element.image.dpi * req.app.sbam.config.defaultPdfDpi;
			//console.log("drawImageInPdf: downsamplo a pdfImagePixW="+pdfImagePixW+" e pdfImagePixH="+pdfImagePixH);
			//creo una nuova immagine in cache, con le misure a 300dpi dell'immagine
			req.app.sbam.utils.getImg(req,res,req.cookies.userID,projectId,name,path,pdfImagePixW,pdfImagePixH,false,element,true,function(resampledImageFullpath){
				//console.log("drawImageInPdf: e ottengo resampledImageFullpath="+resampledImageFullpath);
				//e poi nel pdf metto quella
				drawImageInPdf("public/"+resampledImageFullpath,next);
			});
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
				element.style.foregroundColor.k != undefined 
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
			//se è specificato rotate lo eseguo
			//console.log("RUOTO O NON RUOTO? ");
			//console.log(element.text);
			if ( element.text.rotate ) {
				pdf.rotate(Number(element.text.rotate),{origin:[req.app.sbam.utils.mmToPDFPoints(req.app.sbam.utils.bboxValToMm(element.bbox.x,projectW)),req.app.sbam.utils.mmToPDFPoints(req.app.sbam.utils.bboxValToMm(element.bbox.y,projectH))]});
			}
			//disegno il testo
			var elementFont = "HelveticaNeue-Bold.ttf";
			var elementFontSize = 12;
			var elementForegroundColor = { c:0, m:0, y:0, k:100 };
			var elementAlign = "left";
			if ( element.style ) {
				if ( element.style.font ) elementFont = element.style.font;
				if ( element.style.fontSize ) elementFontSize = element.style.fontSize;
				if ( element.style.foregroundColor ) elementForegroundColor = element.style.foregroundColor;
				if ( element.style.align ) elementAlign = element.style.align;
			}
			pdf
			.font("public/"+req.app.sbam.config.fontDir+elementFont)
			.fontSize(elementFontSize)
			.fillColor([elementForegroundColor.c,elementForegroundColor.m,elementForegroundColor.y,elementForegroundColor.k])
			.text(
				contentPdffed,
				req.app.sbam.utils.mmToPDFPoints(req.app.sbam.utils.bboxValToMm(element.bbox.x,projectW)),
				req.app.sbam.utils.mmToPDFPoints(req.app.sbam.utils.bboxValToMm(element.bbox.y,projectH)),
				{
					width: req.app.sbam.utils.mmToPDFPoints(req.app.sbam.utils.bboxValToMm(element.bbox.w,projectW)),
					height: req.app.sbam.utils.mmToPDFPoints(req.app.sbam.utils.bboxValToMm(element.bbox.h,projectH)),
					align: elementAlign
				}
			);
			//se avevi ruotato, raddrizzo
			if ( element.text.rotate ) {
				pdf.rotate(-Number(element.text.rotate),{origin:[req.app.sbam.utils.mmToPDFPoints(req.app.sbam.utils.bboxValToMm(element.bbox.x,projectW)),req.app.sbam.utils.mmToPDFPoints(req.app.sbam.utils.bboxValToMm(element.bbox.y,projectH))]});
			}
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
























 
 
 
 
 
 
}
 


