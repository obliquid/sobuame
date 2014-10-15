

/* #### GLOBAL SOBUAME (sbam) CLIENT APPLICATION #### */

var sbam = {
	config: {
		fontDir: 'fonts/', //sottocartella di public/ - se la si cambia, va cambiata anche nell'app.js
		usableFontSizes: [6,7,8,9,10,11,12,13,14,15,16,18,20,21,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,64,68,72,76,80,84,88,92],
		usableFontAligns: ["left","right","center","justify"],
		usableFonts: [
			"Abel-Regular.ttf",
			"AmaticSC-Bold.ttf",
			"AmaticSC-Regular.ttf",
			"Antonio-Bold.ttf",
			"Antonio-Light.ttf",
			"Antonio-Regular.ttf",
			"Anton.ttf",
			"Arvo-BoldItalic.ttf",
			"Arvo-Bold.ttf",
			"Arvo-Italic.ttf",
			"Arvo-Regular.ttf",
			"Bitter-Bold.ttf",
			"Bitter-Italic.ttf",
			"Bitter-Regular.ttf",
			"Cabin-BoldItalic.ttf",
			"Cabin-Bold.ttf",
			"CabinCondensed-Bold.ttf",
			"CabinCondensed-Medium.ttf",
			"CabinCondensed-Regular.ttf",
			"CabinCondensed-SemiBold.ttf",
			"Cabin-Italic.ttf",
			"Cabin-MediumItalic.ttf",
			"Cabin-Medium.ttf",
			"Cabin-Regular.ttf",
			"Cabin-SemiBoldItalic.ttf",
			"Cabin-SemiBold.ttf",
			"CabinSketch-Bold.ttf",
			"CabinSketch-Regular.ttf",
			"Chewy.ttf",
			"ComingSoon.ttf",
			"DancingScript-Bold.ttf",
			"DancingScript-Bold-VTT.ttf",
			"DancingScript-Regular.ttf",
			"DancingScript-Regular-VTT.ttf",
			"Dosis-Bold.ttf",
			"Dosis-ExtraBold.ttf",
			"Dosis-ExtraLight.ttf",
			"Dosis-Light.ttf",
			"Dosis-Medium.ttf",
			"Dosis-Regular.ttf",
			"Dosis-SemiBold.ttf",
			"DroidSans-Bold.ttf",
			"DroidSans.ttf",
			"DroidSerif-BoldItalic.ttf",
			"DroidSerif-Bold.ttf",
			"DroidSerif-Italic.ttf",
			"DroidSerif.ttf",
			"Exo2-BlackItalic.ttf",
			"Exo2-Black.ttf",
			"Exo2-BoldItalic.ttf",
			"Exo2-Bold.ttf",
			"Exo2-ExtraBoldItalic.ttf",
			"Exo2-ExtraBold.ttf",
			"Exo2-ExtraLightItalic.ttf",
			"Exo2-ExtraLight.ttf",
			"Exo2-Italic.ttf",
			"Exo2-LightItalic.ttf",
			"Exo2-Light.ttf",
			"Exo2-MediumItalic.ttf",
			"Exo2-Medium.ttf",
			"Exo2-Regular.ttf",
			"Exo2-SemiBoldItalic.ttf",
			"Exo2-SemiBold.ttf",
			"Exo2-ThinItalic.ttf",
			"Exo2-Thin.ttf",
			"FjallaOne-Regular.ttf",
			"FrancoisOne.ttf",
			"GloriaHallelujah.ttf",
			"HelveticaNeue-BlackCondObl.ttf",
			"HelveticaNeue-BlackCond.ttf",
			"HelveticaNeue-BlackExtObl.ttf",
			"HelveticaNeue-BlackExt.ttf",
			"HelveticaNeue-BlackItalic.ttf",
			"HelveticaNeue-Black.ttf",
			"HelveticaNeue-BoldCondObl.ttf",
			"HelveticaNeue-BoldCond.ttf",
			"HelveticaNeue-BoldExtObl.ttf",
			"HelveticaNeue-BoldExt.ttf",
			"HelveticaNeue-BoldItalic.ttf",
			"HelveticaNeue-BoldOutline.ttf",
			"HelveticaNeue-Bold.ttf",
			"HelveticaNeue-CondensedObl.ttf",
			"HelveticaNeue-Condensed.ttf",
			"HelveticaNeue-ExtBlackCond.ttf",
			"HelveticaNeue-ExtBlkCondObl.ttf",
			"HelveticaNeue-ExtendedObl.ttf",
			"HelveticaNeue-Extended.ttf",
			"HelveticaNeue-HeavyCondObl.ttf",
			"HelveticaNeue-HeavyCond.ttf",
			"HelveticaNeue-HeavyExtObl.ttf",
			"HelveticaNeue-HeavyExt.ttf",
			"HelveticaNeue-HeavyItalic.ttf",
			"HelveticaNeue-Heavy.ttf",
			"HelveticaNeue-Italic.ttf",
			"HelveticaNeue-LightCondObl.ttf",
			"HelveticaNeue-LightCond.ttf",
			"HelveticaNeue-LightExtObl.ttf",
			"HelveticaNeue-LightExt.ttf",
			"HelveticaNeue-LightItalic.ttf",
			"HelveticaNeue-Light.ttf",
			"HelveticaNeue-MediumCondObl.ttf",
			"HelveticaNeue-MediumCond.ttf",
			"HelveticaNeue-MediumExtObl.ttf",
			"HelveticaNeue-MediumExt.ttf",
			"HelveticaNeue-MediumItalic.ttf",
			"HelveticaNeue-Medium.ttf",
			"HelveticaNeue-Roman.ttf",
			"HelveticaNeue-ThinCondObl.ttf",
			"HelveticaNeue-ThinCond.ttf",
			"HelveticaNeue-ThinExtObl.ttf",
			"HelveticaNeue-ThinExt.ttf",
			"HelveticaNeue-ThinItalic.ttf",
			"HelveticaNeue-Thin.ttf",
			"HelveticaNeue-UltLigCondObl.ttf",
			"HelveticaNeue-UltLigExtObl.ttf",
			"HelveticaNeue-UltraLigCond.ttf",
			"HelveticaNeue-UltraLigExt.ttf",
			"HelveticaNeue-UltraLight.ttf",
			"HelveticaNeue-UltraLtItal.ttf",
			"IndieFlower.ttf",
			"JosefinSans-BoldItalic.ttf",
			"JosefinSans-Bold.ttf",
			"JosefinSans-Italic.ttf",
			"JosefinSans-LightItalic.ttf",
			"JosefinSans-Light.ttf",
			"JosefinSans-Regular.ttf",
			"JosefinSans-SemiBoldItalic.ttf",
			"JosefinSans-SemiBold.ttf",
			"JosefinSansStd-Light.ttf",
			"JosefinSans-ThinItalic.ttf",
			"JosefinSans-Thin.ttf",
			"JosefinSlab-BoldItalic.ttf",
			"JosefinSlab-Bold.ttf",
			"JosefinSlab-Italic.ttf",
			"JosefinSlab-LightItalic.ttf",
			"JosefinSlab-Light.ttf",
			"JosefinSlab-Regular.ttf",
			"JosefinSlab-SemiBoldItalic.ttf",
			"JosefinSlab-SemiBold.ttf",
			"JosefinSlab-ThinItalic.ttf",
			"JosefinSlab-Thin.ttf",
			"Lato-BlackItalic.ttf",
			"Lato-Black.ttf",
			"Lato-BoldItalic.ttf",
			"Lato-Bold.ttf",
			"Lato-HairlineItalic.ttf",
			"Lato-Hairline.ttf",
			"Lato-Italic.ttf",
			"Lato-LightItalic.ttf",
			"Lato-Light.ttf",
			"Lato-Regular.ttf",
			"LibreBaskerville-Bold.ttf",
			"LibreBaskerville-Italic.ttf",
			"LibreBaskerville-Regular.ttf",
			"LobsterTwo-BoldItalic.ttf",
			"LobsterTwo-Bold.ttf",
			"LobsterTwo-Italic.ttf",
			"LobsterTwo-Regular.ttf",
			"Lora-BoldItalic.ttf",
			"Lora-Bold.ttf",
			"Lora-Italic.ttf",
			"Lora-Regular.ttf",
			"LoveYaLikeASister.ttf",
			"LuckiestGuy.ttf",
			"Merriweather-Black.ttf",
			"Merriweather-BoldItalic.ttf",
			"Merriweather-Bold.ttf",
			"Merriweather-HeavyItalic.ttf",
			"Merriweather-Italic.ttf",
			"Merriweather-LightItalic.ttf",
			"Merriweather-Light.ttf",
			"Merriweather-Regular.ttf",
			"MerriweatherSans-BoldItalic.ttf",
			"MerriweatherSans-Bold.ttf",
			"MerriweatherSans-ExtraBoldItalic.ttf",
			"MerriweatherSans-ExtraBold.ttf",
			"MerriweatherSans-Italic.ttf",
			"MerriweatherSans-LightItalic.ttf",
			"MerriweatherSans-Light.ttf",
			"MerriweatherSans-Regular.ttf",
			"Montserrat-Black.ttf",
			"Montserrat-Bold.ttf",
			"Montserrat-Light.ttf",
			"Montserrat-Regular.ttf",
			"Montserrat-Thin.ttf",
			"NotoSans-BoldItalic.ttf",
			"NotoSans-Bold-orig.ttf",
			"NotoSans-Bold.ttf",
			"NotoSans-Italic.ttf",
			"NotoSans-Regular-orig.ttf",
			"NotoSans-Regular.ttf",
			"NotoSerif-BoldItalic.ttf",
			"NotoSerif-Bold.ttf",
			"NotoSerif-Italic.ttf",
			"NotoSerif-Regular.ttf",
			"Nunito-Bold.ttf",
			"Nunito-Light.ttf",
			"Nunito-Regular.ttf",
			"OpenSans-BoldItalic.ttf",
			"OpenSans-Bold.ttf",
			"OpenSans-CondBold.ttf",
			"OpenSans-CondLightItalic.ttf",
			"OpenSans-CondLighttalic.ttf",
			"OpenSans-CondLight.ttf",
			"OpenSans-ExtraBoldItalic.ttf",
			"OpenSans-ExtraBold.ttf",
			"OpenSans-Italic.ttf",
			"OpenSans-LightItalic.ttf",
			"OpenSans-Light.ttf",
			"OpenSans-Regular.ttf",
			"OpenSans-SemiboldItalic.ttf",
			"OpenSans-Semibold.ttf",
			"Oswald-Bold.ttf",
			"Oswald-Light.ttf",
			"Oswald-Regular.ttf",
			"Pacifico.ttf",
			"PermanentMarker.ttf",
			"Playball-Regular.ttf",
			"Play-Bold.ttf",
			"PlayfairDisplay-BlackItalic.ttf",
			"PlayfairDisplay-Black.ttf",
			"PlayfairDisplay-BoldItalic.ttf",
			"PlayfairDisplay-Bold.ttf",
			"PlayfairDisplay-Italic.ttf",
			"PlayfairDisplay-Regular.ttf",
			"PlayfairDisplaySC-BlackItalic.ttf",
			"PlayfairDisplaySC-Black.ttf",
			"PlayfairDisplaySC-BoldItalic.ttf",
			"PlayfairDisplaySC-Bold.ttf",
			"PlayfairDisplaySC-Italic.ttf",
			"PlayfairDisplaySC-Regular.ttf",
			"Play-Regular.ttf",
			"PoiretOne-Regular.ttf",
			"Raleway-BlackItalic.ttf",
			"Raleway-Black.ttf",
			"Raleway-BoldItalic.ttf",
			"Raleway-Bold.ttf",
			"RalewayDots-Regular.ttf",
			"Raleway-ExtraBoldItalic.ttf",
			"Raleway-ExtraBold.ttf",
			"Raleway-ExtraLightItalic.ttf",
			"Raleway-ExtraLight.ttf",
			"Raleway-Italic.ttf",
			"Raleway-LightItalic.ttf",
			"Raleway-Light.ttf",
			"Raleway-MediumItalic.ttf",
			"Raleway-Medium.ttf",
			"Raleway-Regular.ttf",
			"Raleway-SemiBoldItalic.ttf",
			"Raleway-SemiBold.ttf",
			"Raleway-ThinItalic.ttf",
			"Raleway-Thin.ttf",
			"Roboto-BlackItalic.ttf",
			"Roboto-Black.ttf",
			"Roboto-BoldItalic.ttf",
			"Roboto-Bold.ttf",
			"RobotoCondensed-BoldItalic.ttf",
			"RobotoCondensed-Bold.ttf",
			"RobotoCondensed-Italic.ttf",
			"RobotoCondensed-LightItalic.ttf",
			"RobotoCondensed-Light.ttf",
			"RobotoCondensed-Regular.ttf",
			"Roboto-Italic.ttf",
			"Roboto-LightItalic.ttf",
			"Roboto-Light.ttf",
			"Roboto-MediumItalic.ttf",
			"Roboto-Medium.ttf",
			"Roboto-Regular.ttf",
			"RobotoSlab-Bold.ttf",
			"RobotoSlab-Light.ttf",
			"RobotoSlab-Regular.ttf",
			"RobotoSlab-Thin.ttf",
			"Roboto-ThinItalic.ttf",
			"Roboto-Thin.ttf",
			"RockSalt.ttf",
			"ShadowsIntoLightTwo-Regular.ttf",
			"Signika-Bold.ttf",
			"Signika-Light.ttf",
			"Signika-Regular.ttf",
			"Signika-Semibold.ttf",
			"SpecialElite.ttf",
			"Ubuntu-BI.ttf",
			"Ubuntu-B.ttf",
			"Ubuntu-I.ttf",
			"Ubuntu-R.ttf",
			"Vollkorn-BoldItalic.ttf",
			"Vollkorn-Bold.ttf",
			"Vollkorn-Italic.ttf",
			"Vollkorn-Regular.ttf",
			"YanoneKaffeesatz-Bold.ttf",
			"YanoneKaffeesatz-ExtraLight.ttf",
			"YanoneKaffeesatz-Light.ttf",
			"YanoneKaffeesatz-Regular.ttf",
			"Yellowtail-Regular.ttf"
		], //array con i nomi dei font (al netto del suffisso .ttf) presenti in fontDir e usabili dall'utente (compaiono come dropdown menu nella toolbox degli elementi di tipo text)
		mainMarginLeft: 30, //sono i margini (px) considerati per posizionare la coppia di pagine aperte. si riferiscono alla window, quindi il margin top deve considerare anche la navigation bar per non andargli sopra
		mainMarginRight: 30, 
		mainMarginTop: 45, 
		mainMarginBottom: 25,
		defaultPdfDpi: 300, //risoluzione di stampa (dpi) per il project corrente
		imagesDpiMin: 75, //risoluzione minima sotto la quale non lascio andare l'utente. da questa risoluzione ricavo anche il valore massimo del cursore di zoom (dpi)
		imagesDpiMinWarn: 150, //risoluzione sotto la quale viene visualizzata un'icona di warning per bassa risoluzinoe (dpi)
		imagesDpiMax: 4800, //risoluzione massima sopra la quale non lascio andare l'utente. da questa risoluzione ricavo anche il valore minimo del cursore di zoom (dpi)
		maxPostSize: 104857600 // 100 MB - nota che va cambiato anche sul server in app.js
	},
	project: {}, //projetto aperto corrente come ritornato dalla query al db
	pageLeftIdx: -1, //questa contiene l'index dell'array sbam.project.pages[] riferito alla pagina correntemente caricata in page editor come pagina sinistra
	pageRightIdx: -1, //questa contiene l'index dell'array sbam.project.pages[] riferito alla pagina correntemente caricata in page editor come pagina sinistra
	currentView: "", //può valere "projectEditor" o "pageEditorCouple" o "pageEditorSingle"
	applyTemplateTo: "", //può valere "left" o "right" e indica quale bottone di cambio layout è stato cliccato, per sapere si quale pagina applicare il nuovo template
	currentMediaPath: "", //è il path corrente relativo al repository dell'utente e del project correntemente aperto (se vuoto è inteso come la root del repository dell'utente e del project correntemente aperto: repo/USERID/files/project_PROJECTID/)
	widgetImgCache: {}, //una cache per la chiamata ajax a /getWidgetImg
	currentMousePos: { x: -1, y: -1 }, //qui viene costantemente memorizzata la posizione attuale del mouse, mi serve per gestire alcuni eventi del drag and drop
	outerCont: "div#page-home > div.ui-content", //è il selector jquery che identifica il container in cui disegnare tutto sobuame
	projectTypes: { //NOTA: ogni modifica ai types va riportata coerentemente in models.js
		'album': {
			'label': 'Album e figurine',
			'minPageQuantity': 4,
			'sizes': {
				'standard': {
					'width': 210,
					'height': 297
				}
			},
			'defaultPages': [
				{
					'type': 'cover-1-front',
					'tpl': 'testing_album-annuario_210x297_02txt-02img'
				},
				{
					'type': 'cover-2-front',
					'tpl': 'testing_album-annuario_210x297_02txt-02img'
				},
				{
					'type': 'right',
					'tpl': 'testing_album-annuario_210x297_02txt-02img',
					'num': 1
				},
				{
					'type': 'left',
					'tpl': 'testing_album-annuario_210x297_02txt-02img',
					'num': 2
				},
				{
					'type': 'right',
					'tpl': 'testing_album-annuario_210x297_02txt-02img',
					'num': 3
				},
				{
					'type': 'left',
					'tpl': 'testing_album-annuario_210x297_02txt-02img',
					'num': 4
				},
				{
					'type': 'cover-3-back',
					'tpl': 'testing_album-annuario_210x297_02txt-02img'
				},
				{
					'type': 'cover-4-back',
					'tpl': 'testing_album-annuario_210x297_02txt-02img'
				}
			]
		},
		'poster': {
			'label': 'Poster e figurine',
			'sizes': {
				'orizzontale': {
					'width': 400,
					'height': 303
				},
				'verticale': {
					'width': 300,
					'height': 400
				}
			},
			'defaultPages': [
				{
					'type': 'single',
					'tpl': 'standard_libro_200x300_02txt-02img-A',
					'num': 1
				}
			]
		},
		'annuario': {
			'label': 'Annuario',
			'minPageQuantity': 4,
			'sizes': {
				'standard': {
					'width': 210,
					'height': 297
				}
			},
			'defaultPages': [
				{
					'type': 'cover-1-front',
					'tpl': 'testing_album-annuario_210x297_02txt-02img'
				},
				{
					'type': 'cover-2-front',
					'tpl': 'testing_album-annuario_210x297_02txt-02img'
				},
				{
					'type': 'right',
					'tpl': 'testing_album-annuario_210x297_02txt-02img',
					'num': 1
				},
				{
					'type': 'left',
					'tpl': 'testing_album-annuario_210x297_02txt-02img',
					'num': 2
				},
				{
					'type': 'right',
					'tpl': 'testing_album-annuario_210x297_02txt-02img',
					'num': 3
				},
				{
					'type': 'left',
					'tpl': 'testing_album-annuario_210x297_02txt-02img',
					'num': 4
				},
				{
					'type': 'cover-3-back',
					'tpl': 'testing_album-annuario_210x297_02txt-02img'
				},
				{
					'type': 'cover-4-back',
					'tpl': 'testing_album-annuario_210x297_02txt-02img'
				}
			]
		},
		'libro': {
			'label': 'Fotolibro',
			'minPageQuantity': 2,
			'sizes': {
				'verticale': {
					'width': 200,
					'height': 300
				},
				'quadrato': {
					'width': 300,
					'height': 300
				},
				'orizzontale': {
					'width': 300,
					'height': 200
				}
			},
			'variants': {
				'cover-soft': {
					'label': 'Copertina morbida'
				},
				'cover-hard': {
					'label': 'Copertina rigida'
				},
				'cover-sopra': {
					'label': 'Sovracoperta'
				}
			},
			'defaultPages': [
				{
					'type': 'cover-1-front',
					'tpl': 'standard_libro_200x300_00txt-01img-A'
				},
				{
					'type': 'cover-2-front',
					'tpl': 'standard_libro_200x300_00txt-02img-A'
				},
				{
					'type': 'right',
					'tpl': 'standard_libro_200x300_00txt-03img-A',
					'num': 1
				},
				{
					'type': 'left',
					'tpl': 'standard_libro_200x300_00txt-04img-A',
					'num': 2
				},
				{
					'type': 'right',
					'tpl': 'standard_libro_200x300_00txt-04img-G',
					'num': 3
				},
				{
					'type': 'left',
					'tpl': 'standard_libro_200x300_00txt-08img-A',
					'num': 4
				},
				{
					'type': 'cover-3-back',
					'tpl': 'standard_libro_200x300_00txt-12img-A'
				},
				{
					'type': 'cover-4-back',
					'tpl': 'standard_libro_200x300_01txt-02img-C'
				}
			]
		}
	},
	history: {
		/*
		PROCESSO:
		
		restore() viene chiamato ogni volta che si modifica l'history in qualche modo
		restore() e reset() per ora sono gli unici metodi che richiamano utils.updateButtons()
		
		*/
		snapshots: [{'label':'Start app!','content':{}}], //questo è un array con dei cloni di sbam.project che rappresentano l'undo/redo history
		position: 0, //è inteso come l'index della snapshot correntemente selezionata nell'history
		mustSave: false,
		getHistory: function () {
			//console.log("history: getHistory");
			//prendo le pagine del mio project e ci popolo il panel
			$(".historyItem").remove();
			if ( sbam.history.snapshots.length == 0 ) {
				$("#empty-history").show();
			} else if ( sbam.history.snapshots.length > 0 ) {
				$("#empty-history").hide();
				for( var i=0; i < sbam.history.snapshots.length; i++ ) {
					var icon = "circle-o";
					if ( i <= sbam.history.position ) {
						icon="circle";
					}
					$("#panelHistoryListview").prepend("<li data-icon='"+icon+"' class='historyItem'><a class='ui-icon-"+icon+" ui-btn ui-btn-icon-right' id='historyItem"+i+"'>"+sbam.history.snapshots[i].label+"</a></li>");
					//con relativa action di click che ricarica la snapshot indicata
					$("#historyItem"+i).data("new_position", i);
					$("#historyItem"+i).click(function() { 
						var new_position = $(this).data("new_position");
						//se sto caricando la position 0, è sempre (o almeno deve essere) "Start app!", che è un caso speciale
						//in cui resetto tutta l'app
						if ( new_position == 0 ) {
							location.reload();
						} else {
							sbam.history.restore(new_position,true); 
						}
					});
				}
				//dopo aver popolato la lista, ne imposto l'altezza per attivare le scrollbar
				$("#panelHistoryListview").addClass("vertScrollable");
				var availHeight = $( window ).height() - $("#panelHistoryListview").position().top + 8;
				$("#panelHistoryListview").css("height",availHeight+"px");
				
			}
		},
		add: function(label) {
			//console.log("sbam.history.add("+label+") START position:"+sbam.history.position+" su un array lungo: "+sbam.history.snapshots.length);
			//se position non corrisponde all'ulteimo elemento dell'array snapshots, allora devo buttare tutte le snapshots dopo position
			if ( sbam.history.position < sbam.history.snapshots.length - 1 ) {
				//la position non è alla fine dell'history
				//butto tutto dalla mia position in poi
				sbam.history.snapshots.splice(sbam.history.position + 1, sbam.history.snapshots.length - sbam.history.position - 1);
			}
			//e poi aggiungere in coda all'history la mia nuova snapshot
			var clonedProject = $.extend(true, {}, sbam.project);
			sbam.history.snapshots.push({
				'label':label,
				'content':clonedProject
			});
			sbam.history.restore(sbam.history.position+1,false);
			//console.log("add nella history che diventa:");
			//console.log(sbam.history.snapshots);
			//console.log("sbam.history.add() END position:"+sbam.history.position+" su un array lungo: "+sbam.history.snapshots.length);
			//poi salvo anche nel db
			
		},
		undo: function() {
			//console.log("sbam.history.undo() START position:"+sbam.history.position+" su un array lungo: "+sbam.history.snapshots.length);
			var nextPosition = sbam.history.position - 1;
			if ( nextPosition < 0 ) {
				//se è < 0 dopo -- vuol dire che eravamo già a 0
				//quindi resto a 0 e non faccio restore
				sbam.history.position = 0;
				//$("#buttonUndo").attr("disabled","disabled");
			} else {
				sbam.history.restore(nextPosition,true);
			}
			//console.log("sbam.history.undo() END position:"+sbam.history.position+" su un array lungo: "+sbam.history.snapshots.length);
		},
		redo: function() {
			//console.log("sbam.history.redo() START position:"+sbam.history.position+" su un array lungo: "+sbam.history.snapshots.length);
			var nextPosition = sbam.history.position + 1;
			//console.log("sbam.history.redo() STARTBIS position:"+sbam.history.position+" su un array lungo: "+sbam.history.snapshots.length);
			if ( nextPosition >= sbam.history.snapshots.length ) {
				sbam.history.position = sbam.history.snapshots.length - 1;
			} else {
				sbam.history.restore(nextPosition,true);
			}
			//console.log("sbam.history.redo() END position:"+sbam.history.position+" su un array lungo: "+sbam.history.snapshots.length);
		},
		restore: function(nextPosition, alsoDrawPage) {
			//dontDrawPage per default deve essere false
			//console.log("restore su "+sbam.history.position+"/"+sbam.history.snapshots.length);
			sbam.history.position = nextPosition;
			sbam.project = $.extend(true, {}, sbam.history.snapshots[sbam.history.position].content);
			sbam.history.getHistory();//aggiorna la lista
			//sbam.projectEditor.drawProject();//?? non dovrebbe ridisegnare il project ogni volta che compio un'operazione che comporta l'aggiornamento dell'history
			//almeno ridisegno le pagine correnti
			//infine se richiesto aggiorno l'interfaccia
			if ( alsoDrawPage ) sbam.pageEditor.drawPage();
			sbam.utils.updateButtons();
		},
		reset: function() {
			//console.log("reset current history. will delete "+sbam.history.snapshots.length+" elements");
			sbam.history.position = 0;
			sbam.history.snapshots.splice(1, sbam.history.snapshots.length - 1);
			sbam.history.getHistory();
			//se un project è caricato, lo disegno
				//per esepmio nel caso di eliminazione di un project che è anche il project correntemente caricato
				//(e lo è per forza, visto che deve essere selezionato per poter essere cancellato)
				//in questo caso viene chiamato il reset dopo un unloadProject, quindi non va disegnato niente
			if ( sbam.project && sbam.project.pages ) sbam.projectEditor.drawProject();
			sbam.utils.updateButtons();
		}
	},
	projectEditor: {
		/*
		PROCESSO:
		solo init viene chiamata direttamente (passandogli sempre un projectId), poi a catena:
		init -> getProject
		getProject -> loadProject
		loadProject -> history.add -> history.restore -> drawProject
		loadProject -> getProjects
		*/
		init: function(projectId) {
			//console.log("projectEditor: init");
			sbam.projectEditor.getProject(projectId);
		},
		getProject: function(projectId) {
			//console.log("projectEditor: getProject");
			//prima di caricare faccio una verifica: 
			//se il project attuale risulta modificato, allora prima chiedo una conferma
			if ( sbam.history.mustSave ) {
				$("#popupAddProjectSure").popup( "open" );
			} else {
				getProjectOnConfirm();
			}
			$("#popupAddProjectSureButton").click(getProjectOnConfirm);
			//tutto il resto del getProject() prosegue on confirm del popup
			function getProjectOnConfirm(){
				$("#popupAddProjectSure").popup( "close" );
				$.mobile.loading("show");
				$.ajax({
					type: "POST",
					url: "/getProject",
					data: { "id": projectId }
				}).done(function( project ) {
					project = JSON.parse(project);
					//arrivato il project, ne disegno tutte le pagine a coppie
					if ( project ) {
						//console.log( "Arrivato il project: " );
						//console.log( project );
						sbam.projectEditor.loadProject(project);
					}
					$.mobile.loading("hide");
				}).fail(function( jqXHR, textStatus ) {
					alert( "Request failed: " + textStatus );
					console.log( "Request failed: " + textStatus );
				});						
			}
		},
		getProjects: function () {
			//console.log("projectEditor: getProjects");
			//leggo tutti i projects del mio utente via ajax
			$.mobile.loading("show");
			$.ajax({
				type: "POST",
				url: "/getProjects"
			}).done(function( projects ) {
				projects = JSON.parse(projects);
				//arrivati i projects, li disegno nel panel
				//console.log( "Arrivati i projects: " );
				//console.log( projects );
				//console.log( projects.length );
				//butto projects eventualmente preesistenti
				$(".projectItem").remove();
				//il bottone di delete e di modify sarà visibile solo se un project è selezionato
				$("#buttonDelProject").hide();
				$("#buttonModifyProject").hide();
				//assegno il titolo del project corrente (se c'è) al popup di cancellazione projects
				$("#currentProjectTitle").html("");
				//#### popolo il popup di creazione new project
				//helper function
				function resetAddForm(){
					//azzero i campi hidden
					$('#addProjectForm input#width').val("");
					$('#addProjectForm input#height').val("");
					$('#addProjectForm input#minPageQuantity').val("");
					$('#addProjectForm input#dpi').val("");
				}
				//rimuovo eventuale type già presente
				$("#typeFieldset").remove();
				//rimuovo eventuale size già presente
				$("#sizeFieldset").remove();
				//azzero i campi hidden
				resetAddForm();
				//ricreo e popolo il type
				//lo appendo appena dopo il field "nome"
				$("#addProjectForm div.ui-input-text").after("<fieldset id='typeFieldset' data-role='controlgroup' data-type='horizontal' data-mini='true' ><legend>Tipo</legend></fieldset>");
				//ciclo sui types disponibili e per ciascuno aggiungo un radio button
				for (var typeField in sbam.projectTypes) { if ( sbam.projectTypes.hasOwnProperty(typeField) && typeof sbam.projectTypes[typeField] !== 'function') {
					$("#typeFieldset").append("<input type='radio' name='type' id='type-"+typeField+"' value='"+typeField+"' ><label for='type-"+typeField+"'>"+sbam.projectTypes[typeField].label+"</label>");
				}}				
				$("#typeFieldset").controlgroup();
				$("#typeFieldset").trigger('create');
				//onchange del type, devo creare il size e il variants
				$('#typeFieldset input:radio').change(
					function(){
						//azzero i campi hidden
						resetAddForm();
						
						//#### genero il size
						//rimuovo eventuale size già presente
						$("#sizeFieldset").remove();
						//setto il minPageQuantity nel campo hidden
						$('#addProjectForm input#minPageQuantity').val(sbam.projectTypes[$(this).val()].minPageQuantity);
						//setto il dpi nel campo hidden
						//in pratica ogni nuovo project lo creo assegnandogli defaultPdfDpi
						$('#addProjectForm input#dpi').val(sbam.config.defaultPdfDpi);
						//ricreo e popolo il size
						$("#typeFieldset").after("<fieldset id='sizeFieldset' data-role='controlgroup' data-type='horizontal' data-mini='true' ><legend>Formato</legend></fieldset>");
						for (var sizeField in sbam.projectTypes[$(this).val()].sizes ) { if ( sbam.projectTypes[$(this).val()].sizes.hasOwnProperty(sizeField) && typeof sbam.projectTypes[$(this).val()].sizes[sizeField] !== 'function') {
							$("#sizeFieldset").append("<input type='radio' name='size' id='size-"+sizeField+"' value='"+sizeField+"' ><label for='size-"+sizeField+"'>"+sizeField+"</label>");
							$("#sizeFieldset input#size-"+sizeField).data("width", sbam.projectTypes[$(this).val()].sizes[sizeField].width);
							$("#sizeFieldset input#size-"+sizeField).data("height", sbam.projectTypes[$(this).val()].sizes[sizeField].height);
						}}	
						$("#sizeFieldset").controlgroup();
						$("#sizeFieldset").trigger('create');
						//onchange del size, devo valorizzare i campi hidden width e height
						$('#sizeFieldset input:radio').change(
							function(){
								$('#addProjectForm input#width').val($(this).data("width"));
								$('#addProjectForm input#height').val($(this).data("height"));
							}
						);
							
						//#### genero il variant
						//rimuovo eventuale variant già presente
						$("#variantFieldset").remove();
						if ( sbam.projectTypes[$(this).val()].variants ) {
							var variantsAvail = sbam.projectTypes[$(this).val()].variants;
							console.log(variantsAvail);
							//ricreo e popolo il variant
							$("#sizeFieldset").after("<fieldset id='variantFieldset' data-role='controlgroup' data-type='horizontal' data-mini='true' ><legend>Variante</legend></fieldset>");
							for (var variantField in variantsAvail ) { if ( variantsAvail.hasOwnProperty(variantField) && typeof variantsAvail[variantField] !== 'function') {
								$("#variantFieldset").append("<input type='radio' name='variant' id='variant-"+variantField+"' value='"+variantField+"' ><label for='variant-"+variantField+"'>"+variantsAvail[variantField].label+"</label>");
								//$("#variantFieldset input#variant-"+variantField).data("width", variantsAvail[variantField].width);
							}}	
							$("#variantFieldset").controlgroup();
							$("#variantFieldset").trigger('create');
						}
					}
				);  
				
				//#### popolo la lista dei projects
				if ( projects.length == 0 ) {
					$("#empty-projects").show();
				} else if ( projects.length > 0 ) {
					$("#empty-projects").hide();
					var oneIsSelected = false;
					for( var i=0; i < projects.length; i++ ) {
						//per ogni project c'è un item nella lista
						var icon = "circle-o";
						var thisIsSelected = false;
						if ( projects[i]._id == sbam.project._id ) {
							icon = "circle";
							oneIsSelected = true;
							thisIsSelected = true;
						}
						$("#panelProjectsListview").prepend("\
							<li data-icon='"+icon+"' class='projectItem ui-li-has-thumb' >\
								<a id='projectItem"+i+"' class='ui-icon-"+icon+" ui-btn ui-btn-icon-right'>\
									<img src='"+projects[i].thumbUrl+"'/>\
									<h2>"+projects[i].name+"</h2>\
									<p>"+projects[i].type+": "+projects[i].width+"x"+projects[i].height+"mm</p>\
								</a>\
							</li>");
						//con relativa action di click che inizializza il projectEditor sul progetto cliccato
						$("#projectItem"+i).data("project_id", projects[i]._id);
						$("#projectItem"+i).click(function() { sbam.utils.closeAllPanles(); sbam.projectEditor.init($(this).data("project_id")); });
						//se poi l'item corrente è il selezionato, gli evidenzio lo sfondo
						if ( thisIsSelected ) {
							$("#projectItem"+i).addClass("bgGreen");
						}
					}
					if ( oneIsSelected ) {
						$("#buttonDelProject").show();
						$("#buttonModifyProject").show();
						//assegno il titolo del project corrente (se c'è) al popup di cancellazione projects
						$("#currentProjectTitle").html(sbam.project.name);
					}
					//dopo aver popolato la lista, ne imposto l'altezza per attivare le scrollbar
					$("#panelProjectsListview").addClass("vertScrollable");
					var availHeight = $( window ).height() - $("#panelProjectsListview").position().top - 16;
					$("#panelProjectsListview").css("height",availHeight+"px");
				}
				$.mobile.loading("hide");
			}).fail(function( jqXHR, textStatus ) {
				alert( "Request failed: " + textStatus );
			});		
		},
		addProject: function () {
			//console.log("projectEditor: addProject");
			//blocco il caso in cui sto cercando di fare un add di un project di type="libro" e non ho scelto una variante
			if ( $('input[name=type]:checked', '#addProjectForm').val() == "libro" && !$('input[name=variant]:checked', '#addProjectForm').val() ) {
				alert("Per i libri è obbligatorio specificare anche la variante.");
			} else {
				$.mobile.loading("show");
				if ( $('input[name=type]:checked', '#addProjectForm').val() && sbam.projectTypes[$('input[name=type]:checked', '#addProjectForm').val()].defaultPages ) {
					var pages = sbam.projectTypes[$('input[name=type]:checked', '#addProjectForm').val()].defaultPages;
				} else {
					var pages = [];
				}
				$.ajax({
					type: "POST",
					url: "/addProject",
					data: {
						'form': sbam.utils.form2json('#addProjectForm'),
						'pages': pages
					}
				}).done(function( result ) {
					result = JSON.parse(result);
					$.mobile.loading("hide");
					if ( result.errormsg && result.errormsg != "" ) {
						console.log( "NON Salvato il project con errormsg: "+result.errormsg );
						$("#addProjectErrormsg").html(result.errormsg);
						$("#addProjectErrormsg").show();
					} else {
						//console.log( "Salvato il project con result: " );
						//console.log( result );
						$("#addProjectErrormsg").hide();
						$("#popupAddProject").popup( "close" );
						//carico il nuovo progetto
						sbam.projectEditor.init(result._id);
						//aggiorno la lista dei progetti
						sbam.projectEditor.getProjects();
					}
					//$("#popupAddProject").hide();
				}).fail(function( jqXHR, textStatus ) {
					alert( "Request failed: " + textStatus );
				});		
			}
		},
		/*
		modifyProject: function () {
			//console.log("projectEditor: modifyProject");
			$.mobile.loading("show");
			$.ajax({
				type: "POST",
				url: "/modifyProject",
				data: {
					'form': sbam.utils.form2json('#modifyProjectForm')
				}
			}).done(function( result ) {
				result = JSON.parse(result);
				$.mobile.loading("hide");
				if ( result.errormsg && result.errormsg != "" ) {
					console.log( "NON Modificato il project con errormsg: "+result.errormsg );
					$("#modifyProjectErrormsg").html(result.errormsg);
					$("#modifyProjectErrormsg").show();
				} else {
					//console.log( "Modificato il project con result: " );
					//console.log( result );
					$("#modifyProjectErrormsg").hide();
					$("#popupModifyProject").popup( "close" );
					sbam.projectEditor.getProjects();
					//sbam.projectEditor.init(result._id);
				}
				//$("#popupAddProject").hide();
			}).fail(function( jqXHR, textStatus ) {
				alert( "Request failed: " + textStatus );
			});		
		},
		*/
		delProject: function() {
			$.mobile.loading("show");
			$.ajax({
				type: "POST",
				url: "/delProject",
				data: { "id": sbam.project._id }
			}).done(function( result ) {
				if ( result ) {
					//siccome posso solo cancellare il progetto correntemente caricato,
					//devo anche azzerare il project caricato
					sbam.projectEditor.unloadProject();
					$.mobile.loading("hide");
					sbam.projectEditor.getProjects();
				}
			}).fail(function( jqXHR, textStatus ) {
				alert( "Request failed: " + textStatus );
				console.log( "Request failed: " + textStatus );
			});						
		},
		loadProject: function(project) {
			//e poi salvo in locale
			//NOTA: questo è l'unico punto in cui manipolo direttamente sbam.project (a parte in sbam.history.restore())
			sbam.project = project;
			//ora assegno come valore di default quello del project
			//ovviamente dopo che ho caricato un nuovo project devo invalidare le pagine precedentemente caricate
			sbam.pageEditor.unloadPages();
			//resetto e aggiorno l'history
			sbam.history.reset();
			sbam.history.add("Load project");
			//sbam.projectEditor.drawProject(); //questa non serve dopo un history.add perchè history.add richiama history.restore che richiama drawProject
			//infine chiamo un refresh della lista nel panel e un get del singolo project per caricarlo
			sbam.projectEditor.getProjects();
		},
		unloadProject: function() {
			//azzero il project correntemente caricato
			sbam.project = {};
			sbam.pageEditor.unloadPages();
			//aggiorno history
			sbam.history.reset();
			//sbam.history.add("Delete project");
		},
		isProjectLoaded: function() {
			if ( !sbam.project || $.isEmptyObject(sbam.project) ) {
				return false;
			} else {
				return true;
			}
		},
		drawProject: function() {
			sbam.currentView = "projectEditor";
			
			//prima disegno la gui
			//console.log("projectEditor: draw");
			//SIAMO SICURI SERVA? sbam.utils.closeAllPanles();
			//$("#buttonPages").fadeOut();
			//$("#buttonUndo").fadeOut();
			//$("#buttonRedo").fadeOut();
			
			//poi raffiguro sbam.project come lista di coppie di pagine
			
			//QUI
			//DEVIAZIONE: ora apro la prima pagina del project appena aperto
			//o la pagina correntemente selezionata
			if ( sbam.pageLeftIdx > -1 ) {
				sbam.pageEditor.init(sbam.pageLeftIdx);
			} else {
				sbam.pageEditor.init(0);
			}
			
			
			
			
		},
		printProject: function() {
			$.mobile.loading("show");
			$.ajax({
				type: "POST",
				url: "/printProject",
				data: { "id": sbam.project._id }
			}).done(function( prjPdfUrl ) {
				prjPdfUrl = JSON.parse(prjPdfUrl);
				//arrivato il prjPdfUrl
				//alert("pdf completato: "+prjPdfUrl);
				$.mobile.loading("hide");
				
				$("#pdfDownloadLink").html("Scarica PDF");
				$("#pdfDownloadLink").attr("href",prjPdfUrl);
				$("#pdfDownloadLink").show();
				$("#popupPrintProjectButton").hide();
				
				
			}).fail(function( jqXHR, textStatus ) {
				alert( "Request failed: " + textStatus );
				console.log( "Request failed: " + textStatus );
			});						
		},
		saveProject: function(next) {
			//prima controllo se il numero di pagine è congruo con minPageQuantity
			if ( sbam.project.type && sbam.projectTypes[sbam.project.type] && sbam.pageEditor.getPagesNum() % sbam.projectTypes[sbam.project.type].minPageQuantity ) {
				alert("Il numero di pagine deve essere un multiplo di "+sbam.projectTypes[sbam.project.type].minPageQuantity+", mentre ora hai "+sbam.pageEditor.getPagesNum()+" pagine. Devi aggiungere "+(sbam.projectTypes[sbam.project.type].minPageQuantity-sbam.pageEditor.getPagesNum() % sbam.projectTypes[sbam.project.type].minPageQuantity)+" pagine per poter salvare.");
			} else {
				//siccome quando cambio layout ad una page, gli _id dei suoi elements li creo a cazzo random:
				//prima di salvare tutto devo eliminarli, così il db non rompe i coglioni e salva creando i suoi nuovi _id
				if ( sbam.project.pages ) {
					for ( var i=0; i<sbam.project.pages.length; i++ ) {
						var page = sbam.project.pages[i];
						if ( page.elements ) {
							for ( var j=0; j<page.elements.length; j++ ) {
								var element = page.elements[j];
								//console.log("PRESAVE controllo pag"+i+",elem"+j+" che ha _id="+element._id);
								if ( element._id.length == 19 ) {
									//beccato id fasullo. lo azzero
									delete element._id;
								}
							}
						}
					}
				}
				//salvo
				//console.log("projectEditor: save");
				$.mobile.loading("show");
				$.ajax({
					type: "POST",
					url: "/saveProject",
					data: { "project": sbam.project }
				}).done(function( project ) {
					if ( project ) {
						project = JSON.parse(project);
						/*
						console.log("sbam.projectEditor.saveProject: dopo chiamata ajax ottengo project:");
						console.log(project);
						console.log(typeof(project));
						console.log(project.errormsg);
						*/
						if ( project.errormsg && project.errormsg != "" ) {
							console.log( "sbam.projectEditor.saveProject: dopo chiamata ajax NON salvato il project con errormsg: "+project.errormsg );
						} else {
							//finito di salvare il project
							//sostituisco quello che ho in sbam.project con quello che mi arriva dopo il save, che dovrebbe vere tutti gli _id di eventali nuovi elementi
							sbam.project = project;
							$.mobile.loading("hide");
							$("#buttonSave").css( "background-color","rgb(246, 246, 246)" );
							$("#buttonSave").addClass( "ui-state-disabled" );
							$("#buttonPrint").removeClass( "ui-state-disabled" );
							sbam.history.reset();
							sbam.history.add("Save page");
						}
					}
					if ( next && typeof(next) == "function" ) next();
				}).fail(function( jqXHR, textStatus ) {
					alert( "Request failed: " + textStatus );
					console.log( "Request failed: " + textStatus );
				});						
			}
		}
	},
	pageEditor: {
		/*
		PROCESSO:
		solo init viene chiamata direttamente (passandogli sempre un projectId), poi a catena:
		init -> getPage
		getPage -> loadPage
		init -> drawPage
		init -> getPages
		*/
		
		//chiedo il pageNumLeft invece del pageId perchè il pageId esiste solo dopo il save nel db, ma io ho bisogno di leggere le pagine anche prima
		//init: function(pageNumLeft,typeLeft,pageNumRight,typeRight) {
		init: function(pageIdx) {
			//console.log("pageEditor: init su pageIdx="+pageIdx);
			var myCouple = sbam.pageEditor.getCouple(pageIdx);
			//console.log("pageEditor: poi trovo myCouple=");
			//console.log(myCouple);
			//console.log("pageEditor: e pages=");
			//console.log(sbam.project.pages);
			
			sbam.pageEditor.getPage(myCouple.num_left,myCouple.type_left,"left", function(){
				sbam.pageEditor.getPage(myCouple.num_right,myCouple.type_right,"right", function(){
					sbam.pageEditor.drawPage();
					sbam.pageEditor.getPages(); //parallelamente ai getPage chiamo anche un getPages() per aggiornare il panel
				});
			});
		},
		getPage: function(pageNum,type,what,next) {
			//console.log("pageEditor: getPage su pageNum="+pageNum);
			if ( type ) {
				var havePage = false;
				for( var i=0; i < sbam.project.pages.length; i++ ) {
					if ( sbam.project.pages[i].num == pageNum && sbam.project.pages[i].type == type ) {
						sbam.pageEditor.loadPage(i,what);
						havePage = true;
						break;
					}
				}
				if ( havePage ) {
					//console.log( "Caricata la page: " );
					//console.log( sbam.page );
					next();
				} else {
					alert("Page "+pageNum+" not found in current project");
					console.log("Page "+pageNum+" not found in current project:");
					console.log(sbam.project);
				}
			} else {
				sbam.pageEditor.unloadPages(what);
				next();
			}
		},
		getPageElementById: function(pageIdx,elementId) {
			if ( sbam.project.pages[pageIdx].elements && sbam.project.pages[pageIdx].elements.length > 0 ) {
				for ( var i=0; i<sbam.project.pages[pageIdx].elements.length; i++) {
					var element = sbam.project.pages[pageIdx].elements[i];
					//console.log("pageEditor.getPageElementById(): ciclo su element:");
					//console.log(element);
					if ( element._id == elementId ) {
						return element;
					}
				}
			}
		},
		getPages: function () {
			//console.log("pageEditor: getPages");
			//prendo le pagine del mio project e ci popolo il panel
			$(".pageItem").remove();
			//il bottone di delete sarà visibile solo se u project è selezionato
			$("#buttonDelPage").hide();
			//assegno il titolo del project corrente (se c'è) al popup di cancellazione projects
			$("#currentPagesLabel").html("");
			
			if ( !sbam.project.pages ) sbam.project.pages = [];
			if ( sbam.project.pages.length == 0 ) {
				$("#empty-pages").show();
			} else if ( sbam.project.pages.length > 0 ) {
				$("#empty-pages").hide();
				//ordino per num
				sbam.project.pages.sort(sbam.utils.sortByPageTypeAndNum);
				var oneIsSelected = false;
				var selectedLabel = "";
				for( var i=0; i < sbam.project.pages.length; i++ ) {
					//console.log("vado a ciclare su questa page:");
					//console.log(sbam.project.pages[i]);
					var thisIsSelected = false;
					var myCouple = sbam.pageEditor.getCouple(i);
					//console.log("che ritorna questa couple:");
					//console.log(myCouple);
					if ( sbam.project.pages[i].type == "single" ) {
						//una pagina singola viene salvata come pagina left
						var icon = "files-o";
						if ( sbam.pageLeftIdx >=0 && sbam.pageLeftIdx == i ) {
							icon = "circle";
							oneIsSelected = true;
							thisIsSelected = true;
							selectedLabel = "pag "+sbam.project.pages[i].num;
						}
						$("#panelPagesListview").append("\
							<li data-icon='"+icon+"' class='pageItem'>\
								<a class='ui-icon-"+icon+" ui-btn ui-btn-icon-right' id='pageItem"+i+"'>\
									<img src='/images/page-single.png' style='margin-right:10px;'>\
									pag "+sbam.project.pages[i].num+"\
								</a>\
							</li>");
						//con relativa action di click che inizializza il pageEditor sul progetto cliccato
						$("#pageItem"+i).data("page_idx", i);
						$("#pageItem"+i).click(function() { sbam.utils.closeAllPanles(); sbam.pageEditor.init($(this).data("page_idx")); });						
					} else if (	myCouple.triggerCouple ) {
						var icon = "circle-o";
						if ( 
							sbam.pageLeftIdx >=0 && sbam.project.pages[sbam.pageLeftIdx].num == myCouple.num_left && sbam.project.pages[sbam.pageLeftIdx].type == myCouple.type_left 
							|| 
							sbam.pageRightIdx >=0 && sbam.project.pages[sbam.pageRightIdx].num == myCouple.num_right && sbam.project.pages[sbam.pageRightIdx].type == myCouple.type_right 
						) {
							icon = "circle";
							oneIsSelected = true;
							thisIsSelected = true;
							selectedLabel = myCouple.label;
						}
						$("#panelPagesListview").append("\
							<li data-icon='"+icon+"' class='pageItem'>\
								<a class='ui-icon-"+icon+" ui-btn ui-btn-icon-right' id='pageItem"+i+"'>\
									<img src='/images/"+myCouple.icon+"' style='margin-right:10px;'>\
									"+myCouple.label+"\
								</a>\
							</li>");
						//con relativa action di click che inizializza il pageEditor sul progetto cliccato
						$("#pageItem"+i).data("page_idx", i);
						$("#pageItem"+i).click(function() { sbam.utils.closeAllPanles(); sbam.pageEditor.init($(this).data("page_idx")); });
					}
					
					//se poi l'item corrente è il selezionato, gli evidenzio lo sfondo
					if ( thisIsSelected ) {
						$("#pageItem"+i).addClass("bgGreen");
					}
				}
				if ( oneIsSelected ) {
					$("#buttonDelPage").show();
					//assegno il titolo del project corrente (se c'è) al popup di acncellazione projects
					$("#currentPagesLabel").html(selectedLabel);
				} else {
					$("#buttonDelPage").hide();
					//assegno il titolo del project corrente (se c'è) al popup di acncellazione projects
					$("#currentPagesLabel").html("");
				}
				//dopo aver popolato la lista, ne imposto l'altezza per attivare le scrollbar
				$("#panelPagesListview").addClass("vertScrollable");
				var availHeight = $( window ).height() - $("#panelPagesListview").position().top + 8;
				$("#panelPagesListview").css("height",availHeight+"px");
			}
		},
		getPagesNum: function () {
			//conta solo le pagine interne (left e right), esclude tutte le altre
			var num = 0;
			if ( sbam.project && sbam.project.pages ) {
				for ( var i=0; i<sbam.project.pages.length; i++) {
					if ( sbam.project.pages[i].type == "left" || sbam.project.pages[i].type == "right" ) {
						num++;
					}
				}
			}
			return num;
		},
		getPageTemplates: function () {
			//leggo tutti i layout per il mio project type e size disponibili sul server
			$.mobile.loading("show");
			$.ajax({
				type: "POST",
				url: "/getPageTemplates",
				data: { 
					"projectType": sbam.project.type,
					"projectW": sbam.project.width,
					"projectH": sbam.project.height
				}
			}).done(function( templates ) {
				templates = JSON.parse(templates);
				//arrivati i templates, li disegno nel panel
				//console.log( "Arrivati i templates: " );
				//console.log( templates );
				//console.log( templates.length );
				//butto templates eventualmente preesistenti
				$(".templateItem").remove();
				//#### popolo la lista dei templates
				if ( templates.length > 0 ) {
					var isSelected = false;
					for( var i=0; i < templates.length; i++ ) {
						//per ogni project c'è un item nella lista
						var icon = "th-large";
						//////if ( templates[i]._id == sbam.project._id ) {
						//////	icon = "circle";
						//////	isSelected = true;
						//////}
						$("#panelPageTemplatesListview").append("\
							<li data-icon='"+icon+"' class='templateItem ui-li-has-thumb' >\
								<a class='ui-icon-"+icon+" ui-btn ui-btn-icon-right' id='templateItem"+i+"'>\
									<img src='"+templates[i].thumbUrl+"'/>\
									<h3>"+templates[i].variant+"</h3>\
									<p><strong>"+templates[i].size+"</strong><br/>serie: <em>"+templates[i].label+"</em></p>\
								</a>\
							</li>");
						//con relativa action di click per applicare il template
						$("#templateItem"+i).data("filename", templates[i].filename);
						$("#templateItem"+i).click(function() { sbam.pageEditor.applyTemplateToPage($(this).data("filename")); });
					}
					//dopo aver popolato la lista, ne imposto l'altezza per attivare le scrollbar
					$("#panelPageTemplatesListview").addClass("vertScrollable");
					var availHeight = $( window ).height() - $("#panelPageTemplatesListview").position().top + 8;
					$("#panelPageTemplatesListview").css("height",availHeight+"px");
					
				}
				$.mobile.loading("hide");
			}).fail(function( jqXHR, textStatus ) {
				alert( "Request failed: " + textStatus );
			});		
		},
		applyTemplateToPage: function (tplFilename) {
			//helpers
			function makeid(dim)
			{
				var text = "";
				var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

				for( var i=0; i < dim; i++ )
					text += possible.charAt(Math.floor(Math.random() * possible.length));

				return text;
			}			
			//chiamata ajax al server per ottenere il contenuto del tpl
			$.mobile.loading("show");
			$.ajax({
				type: "POST",
				url: "/getPageTemplate",
				data: { 
					"tplFilename": tplFilename
				}
			}).done(function( tplElements ) {
				//mi ritorna un array di elements, perchè per definizione un template di pagina è un xml con dentro solo un array di elements
				tplElements = JSON.parse(tplElements);
				console.log( "Arrivati i tplElements: " );
				console.log( tplElements );
				for ( var x=0; x<tplElements.length; x++ ) {
					var tplElement = tplElements[x];
					//questi elementi che arrivano da un file xml non hanno ovviamente l'_id che gli assegnerebbe poi il database al primo save.
					//se però non gli assegno un id fallisce tutto il codice che si basa sull'id per identificare gli elementi e tanto altro.
					//workaraund: genero degli id a cazzo ora
					//gli id generati dal db sono di 24 chars, io qui uso volutamente una lunghezza diversa:
					//così prima di fare il save nel db controllo e riconosco gli id fasulli e li azzero 
					//per non far fallire il save e per far generare degli id veri al db
					tplElement._id = makeid(19);
				}
				//elimino gli elements attuali della mia pagina sovrascrivendoli con quelli arrivati dal template
				if ( sbam.applyTemplateTo == "left" ) {
					sbam.project.pages[sbam.pageLeftIdx].elements = tplElements;
				} else if ( sbam.applyTemplateTo == "right" ) {
					sbam.project.pages[sbam.pageRightIdx].elements = tplElements;
				}
				$.mobile.loading("hide");
				//aggiungo all'history
				sbam.history.add("Apply template");
				//e ridisegno!
				sbam.pageEditor.drawPage();
			}).fail(function( jqXHR, textStatus ) {
				alert( "Request failed: " + textStatus );
			});		
			
		},
		getCouple: function (idx) {
			//dato l'idx di una pagina mi ritorna la coppia di pagine left right cui appartiene
			//spiega:
			//siccome devo rappresentare le pagine a coppie, mi server un metodo che per ogni pagina singola mi dice se devo triggerare una nuova coppia
			//se no vuol dire che la pagina è rappresentata nella coppia rpecedente, e la scarto
			//cioè si segue la logica che serve nel pages panel: io ciclo su tutte le pagine nell'array sbam.project.pages, ma nel panel devo mettere solo un item per ogni coppia di pagine.
			//per farlo bisogna rispettare alcune regole: alcune pagine come le copertine e la prima pagina vanno da sole nella coppia. l'ultima pagina (non copertina) può andare da sola nella coppia.
			//quindi con il temine "triggerare una coppia" significa se la singola pagina genera un nuovo item (coppia) nel panel, o se è già appartenente ad un'altra coppia.
			var myPage = sbam.project.pages[idx];
			if ( typeof sbam.project.pages[idx+1] != 'undefined' ) {
				var nextPage = sbam.project.pages[idx+1];
			} else {
				var nextPage = false;
			}
			if ( typeof sbam.project.pages[idx-1] != 'undefined' ) {
				var prevPage = sbam.project.pages[idx-1];
			} else {
				var prevPage = false;
			}
			var triggerNewCouple = true;
			var idx_left = -1;
			var idx_right = -1;
			var num_left = -1;
			var num_right = -1;
			var type_left = "";
			var type_right = "";
			var icon = "page-inner-left-right.png";
			var label = "";
			if ( myPage.type == "cover-1-front" ) {
				icon = "page-cover-1-front.png";
				idx_right = idx;
				num_right = myPage.num;
				type_right = myPage.type;
				label = "cover 1";
			} else if ( myPage.type == "cover-2-front" && nextPage && nextPage.type == "right" ) {
				icon = "page-cover-2-front.png";
				idx_left = idx;
				num_left = myPage.num;
				type_left = myPage.type;
				idx_right = idx+1;
				num_right = nextPage.num;
				type_right = nextPage.type;
				label = "cover 2 - pag 1";
			} else if ( myPage.type == "cover-3-back" && prevPage && prevPage.type == "left" ) {
				icon = "page-cover-3-back.png";
				idx_right = idx;
				num_right = myPage.num;
				type_right = myPage.type;
				idx_left = idx-1;
				num_left = prevPage.num;
				type_left = prevPage.type;
				label = "pag "+num_left+" - cover 3";
			} else if ( myPage.type == "cover-3-back" && prevPage && prevPage.type == "right" ) {
				icon = "page-cover-3-back-only.png";
				idx_right = idx;
				num_right = myPage.num;
				type_right = myPage.type;
				label = "cover 3";
			} else if ( myPage.type == "cover-4-back" ) {
				icon = "page-cover-4-back.png";
				idx_left = idx;
				num_left = myPage.num;
				type_left = myPage.type;
				label = "cover 4";
			} else if ( myPage.type == "left" && nextPage && nextPage.type == "right" ) {
				icon = "page-inner-left-right.png";
				idx_left = idx;
				num_left = myPage.num;
				type_left = myPage.type;
				idx_right = idx+1;
				num_right = nextPage.num;
				type_right = nextPage.type;
				label = "pag "+num_left+" - "+num_right;
			} else if ( myPage.type == "right" && prevPage && prevPage.type == "left" ) {
				triggerNewCouple = false;
				icon = "page-inner-left-right.png";
				idx_left = idx-1;
				num_left = prevPage.num;
				type_left = prevPage.type;
				idx_right = idx;
				num_right = myPage.num;
				type_right = myPage.type;
				label = "pag "+num_left+" - "+num_right;
			} else if ( myPage.type == "right" && prevPage && prevPage.type == "cover-2-front" ) {
				triggerNewCouple = false;
				icon = "page-inner-left-right.png";
				idx_left = idx-1;
				num_left = prevPage.num;
				type_left = prevPage.type;
				idx_right = idx;
				num_right = myPage.num;
				type_right = myPage.type;
				label = "cover 2 - "+num_right;
			} else if ( myPage.type == "left" && nextPage && nextPage.type == "cover-3-back" ) {
				triggerNewCouple = false;
				icon = "page-inner-left-right.png";
				idx_left = idx;
				num_left = myPage.num;
				type_left = myPage.type;
				idx_right = idx+1;
				num_right = nextPage.num;
				type_right = nextPage.type;
				label = "pag "+num_left+" - cover 3";
			/*} else if ( myPage.type == "left" && nextPage && nextPage.type == "cover-back" ) {
			//	icon = "page-inner-only-left.png";
			//	idx_left = idx;
			//	num_left = myPage.num;
			//	type_left = myPage.type;
			//	label = num_left;
			//} else if ( myPage.type == "right" && prevPage && prevPage.type == "cover-front" ) {
			//	icon = "page-inner-only-right.png";
			//	idx_right = idx;
			//	num_right = myPage.num;
			//	type_right = myPage.type;
			//	label = num_right;
			*/
			} else if ( myPage.type == "single" ) {
				triggerNewCouple = false;
				icon = "page-single.png";
				idx_left = idx;
				num_left = myPage.num;
				type_left = myPage.type;
				label = "pag "+num_left;
				
			} else {
				triggerNewCouple = false;
			}
			return {
				'triggerCouple': triggerNewCouple,
				'icon': icon,
				'label': label,
				'idx_left': idx_left,
				'num_left': num_left,
				'type_left': type_left,
				'idx_right': idx_right,
				'num_right': num_right,
				'type_right': type_right
			};
		},
		addPage: function () {
			//prendo una snapshot nell'history
			if ( !sbam.project.pages ) sbam.project.pages = [];
			//prima trovo il primo numero di pagina disponibile
			var firstNumAvail = 1;
			for( var i=0; i < sbam.project.pages.length; i++ ) {
				if ( 
					sbam.project.pages[i].type != "cover-1-front" && 
					sbam.project.pages[i].type != "cover-2-front" && 
					sbam.project.pages[i].type != "cover-3-back" && 
					sbam.project.pages[i].type != "cover-4-back" && 
					firstNumAvail <= sbam.project.pages[i].num 
				) firstNumAvail = sbam.project.pages[i].num + 1;
			}
			//selgo il type a seconda del project.type
			//per ora ci sono solo i poster che vanno a pagina singola, tutti gli altri usano pagine affiancate
			if ( sbam.project.type == "poster" ) {
				var type = "single";
			} else {
				var type = "left";
				if ( sbam.utils.isOdd(firstNumAvail) ) type = "right";
			}
			//creo la mia pagina
			sbam.project.pages.push({
				'type':type,
				'num':firstNumAvail
			});
			
			//caricamento delle pagine nell'editor
			//devo passare 2 pag non una
			//e refresh della lista
			sbam.pageEditor.getPages();
			//aggiorno l'history alla fine
			sbam.history.add("Add page");
		},
		delPagesCouple: function () {
			//cancello le pagine correntemente selezionate
			//qui blocco solo se si sta cercando di cancellare delle cover, o il numero di pagine è già == al minPageQuantity
			//poi tutti gli altri controlli vengono fatti in delPage()
			if ( sbam.project.pages[sbam.pageLeftIdx] && sbam.project.pages[sbam.pageLeftIdx].type != "left" && sbam.project.pages[sbam.pageLeftIdx].type != "" ) {
				alert("Le pagine di tipo "+sbam.project.pages[sbam.pageLeftIdx].type+" non possono essere cancellate.");
			} else if ( sbam.project.pages[sbam.pageRightIdx] && sbam.project.pages[sbam.pageRightIdx].type != "right" && sbam.project.pages[sbam.pageRightIdx].type != "" ) {
				alert("Le pagine di tipo "+sbam.project.pages[sbam.pageRightIdx].type+" non possono essere cancellate.");
			} else if ( sbam.pageEditor.getPagesNum() <= sbam.projectTypes[sbam.project.type].minPageQuantity ) {
				alert("Il numero minimo di pagine ("+sbam.pageEditor.getPagesNum()+") è stato raggiunto.");
			} else {
				console.log("delPagesCouple: come couple devo cancellare questi 2 idx: sbam.pageLeftIdx="+sbam.pageLeftIdx+" sbam.pageRightIdx="+sbam.pageRightIdx);
				sbam.pageEditor.delPage(sbam.pageLeftIdx);
				sbam.pageEditor.delPage(sbam.pageRightIdx);
			}
		},
		delPage: function (idx) {
			//cancello le pagine correntemente selezionate
			if ( idx && idx >= 0 && sbam.project.pages && sbam.project.pages[idx] ) {
				//prima di eliminare mi segno il suo numero di pagina (che anche se sò che è = all'id, in futuro potrebbe non essere più così, quindi devo tenerne conto
				var deletedPageNum = sbam.project.pages[idx].num;
				//console.log("delPage: PRIMA sbam.pageLeftIdx="+sbam.pageLeftIdx+" sbam.pageRightIdx="+sbam.pageRightIdx);
				//console.log("PRIMA del taglio");
				//console.log(sbam.project.pages);
				sbam.project.pages.splice(idx, 1);
				//console.log("DOPO il taglio");
				//console.log(sbam.project.pages);
				//il problema è che dopo che ho cancellato una pagina, gli id delle pagine che la seguono vanno diminuiti di 1
				//e se la pagina eliminata era una di quelle caricate, devo unloadare le pagine selezionate correnti
				if ( sbam.pageLeftIdx > idx ) {
					sbam.pageLeftIdx--;
				} else if ( sbam.pageLeftIdx == idx ) {
					sbam.pageEditor.unloadPages("left");
				}
				if ( sbam.pageRightIdx > idx ) {
					sbam.pageRightIdx--;
				} else if ( sbam.pageRightIdx == idx ) {
					sbam.pageEditor.unloadPages("right");
				}
				console.log("delPage: DOPO sbam.pageLeftIdx="+sbam.pageLeftIdx+" sbam.pageRightIdx="+sbam.pageRightIdx);
				
				//devo rinumerare le pagine rimanenti per coprire il buco creato
				//il problema è che l'array delle pagine non è detto sia ordinato in modo crescente di pg, può essere disordinato
				for( var i=0; i < sbam.project.pages.length; i++ ) {
					if ( sbam.project.pages[i].num > deletedPageNum ) {
						sbam.project.pages[i].num = sbam.project.pages[i].num - 1;
						if ( sbam.utils.isOdd(sbam.project.pages[i].num) ) {
							sbam.project.pages[i].type = "right";
						} else {
							sbam.project.pages[i].type = "left";
						}
					}
				}
				
				//aggiorno history
				sbam.history.add("Delete page");
				
				//aggiorno la lista pagine nel pannello
				sbam.pageEditor.getPages();
			}
		},
		loadPage: function (idx,what) {
			if ( what == "left" ) {
				sbam.pageLeftIdx = idx;
			} else if ( what == "right" ) {
				sbam.pageRightIdx = idx;
			}
		},
		unloadPages: function(what) {
			if ( !what ) what = "both";
			if ( what == "left" ) {
				sbam.pageLeftIdx = -1;
				$("#leftPageCont").remove();
				$("#leftPageToolbar").remove();
			} else if ( what == "right" ) {
				sbam.pageRightIdx = -1;
				$("#rightPageCont").remove();
				$("#rightPageToolbar").remove();
			} else  if ( what == "both" ) {
				sbam.pageLeftIdx = -1;
				sbam.pageRightIdx = -1;
				$("#leftPageCont").remove();
				$("#leftPageToolbar").remove();
				$("#rightPageCont").remove();
				$("#rightPageToolbar").remove();
			}
		},
		/*
		drawPage viene richiamata da:
			- history.restore
			- pageEditor.init
			- on window resize
		*/
		drawPage: function() {
			//console.log("drawPage()");
			//helper functions
			// questa viene solo richiamata da pageEditor.drawPage
			function sizeAndPosInterface() {
				
				//prima di tutto imposto la misura della page (che è il parent dell'outerCont), e la metto a schermo intero
				//console.log("sizeAndPosInterface: PRIMA: screen width:"+$( window ).width());
				//console.log("sizeAndPosInterface: PRIMA: screen height:"+$( window ).height());
				//console.log("sizeAndPosInterface: PRIMA: page width:"+$(sbam.outerCont).parent().width());
				//console.log("sizeAndPosInterface: PRIMA: page height:"+$(sbam.outerCont).parent().height());
				
				$(sbam.outerCont).parent().css("margin","0px");
				$(sbam.outerCont).parent().css("padding","0px");
				$(sbam.outerCont).parent().css("padding-top","0px");
				$(sbam.outerCont).parent().css("border","0px");
				//$(sbam.outerCont).parent().css("background-color","#ffeeee");
				$(sbam.outerCont).parent().width($( window ).width());
				$(sbam.outerCont).parent().height($( window ).height());
				
				
				//outCont in base al suo parent
				//imposto solo l'altezza perchè la larghezza è già al 100%
				$(sbam.outerCont).css("margin","0px");
				$(sbam.outerCont).css("padding","0px");
				$(sbam.outerCont).css("border","0px");
				$(sbam.outerCont).width($( window ).width());
				$(sbam.outerCont).height($( window ).height());
				
				//console.log("sizeAndPosInterface: POI: screen width:"+$( window ).width());
				//console.log("sizeAndPosInterface: POI: screen height:"+$( window ).height());
				//console.log("sizeAndPosInterface: POI: page width:"+$(sbam.outerCont).parent().width());
				//console.log("sizeAndPosInterface: POI: page height:"+$(sbam.outerCont).parent().height());
				
				//se sono visibili, piazzo anche le pagine left / right
				if ( sbam.project && sbam.project.width && sbam.project.height && ( $("#leftPageCont").length > 0 || $("#rightPageCont").length > 0 ) ) {
					//nel caso di pagine single rimuovo quelo che non serve
					if ( sbam.currentView == "pageEditorSingle" ) {
						//nel caso di pagina singola non uso mai la page right
						$("#rightPageCont").remove();
						//se la mia è una page con type single uso una logica particolare nel visualizzare le page toolbars:
						if ( sbam.project.pages && sbam.project.pages.length == 1 ) {
							//se il project ha solo una pagina, visualizzo solo la toolbar right, e solo con dentro il bottone dei layout
							//anche se poi la pagina singola viene visualizzata nel leftPageCont
							$("#leftPageToolbar").remove();
							$("#nextPageButton").remove();
						} else {
							//se ho più di una pagina, visualizzo tutte e 2 le toolbar, ma quella di left ha solo il bottone di prev page
							$("#leftPageTemplatesButton").remove();
						}
					}
					//left
					if ( sbam.currentView == "pageEditorSingle" ) {
						var leftSizPos = sbam.utils.thepositioner( $(sbam.outerCont).width(), $(sbam.outerCont).height(), sbam.project.width, sbam.project.height, false,"center",1.5*sbam.config.mainMarginTop,2*sbam.config.mainMarginBottom,2*sbam.config.mainMarginLeft,2*sbam.config.mainMarginRight);
						//leftSizPos.w -= sbam.config.mainMarginLeft;
						//leftSizPos.x += sbam.config.mainMarginLeft;
					} else {
						var leftSizPos = sbam.utils.thepositionerPageLeft( $(sbam.outerCont).width(), $(sbam.outerCont).height(), sbam.project.width, sbam.project.height,sbam.config.mainMarginTop,sbam.config.mainMarginBottom,sbam.config.mainMarginLeft,sbam.config.mainMarginRight);
					}
					$("#leftPageCont").height(leftSizPos.h);
					$("#leftPageCont").width(leftSizPos.w);
					$("#leftPageCont").css("position","absolute");
					$("#leftPageCont").css("left",leftSizPos.x);
					$("#leftPageCont").css("top",leftSizPos.y);
					$("#leftPageToolbar").css("position","absolute");
					$("#leftPageToolbar").css("left",leftSizPos.x-$("#leftPageToolbar").width()-3);
					$("#leftPageToolbar").css("top",leftSizPos.y+(leftSizPos.h-$("#leftPageToolbar").height())/2);
					//sizepos anche della canvas della pagina
					if ( sbam.pageLeftIdx > -1 ) {
						$("#leftPageCanvas").height(leftSizPos.h);
						$("#leftPageCanvas").width(leftSizPos.w);
					} else if ( sbam.pageLeftIdx == -1 ) {
						$("#leftPageCont").remove();
						if ( sbam.currentView != "pageEditorSingle" ) $("#leftPageToolbar").remove();
					}
					//right
					var rightSizPos = sbam.utils.thepositionerPageRight( $(sbam.outerCont).width(), $(sbam.outerCont).height(), sbam.project.width, sbam.project.height,sbam.config.mainMarginTop,sbam.config.mainMarginBottom,sbam.config.mainMarginLeft,sbam.config.mainMarginRight);
					$("#rightPageCont").height(rightSizPos.h);
					$("#rightPageCont").width(rightSizPos.w);
					$("#rightPageCont").css("position","absolute");
					$("#rightPageCont").css("left",rightSizPos.x);
					$("#rightPageCont").css("top",rightSizPos.y);
					$("#rightPageToolbar").css("position","absolute");
					if ( sbam.currentView == "pageEditorSingle" ) {
						$("#rightPageToolbar").css("left",leftSizPos.x+leftSizPos.w+3);
					} else {
						$("#rightPageToolbar").css("left",rightSizPos.x+rightSizPos.w+3);
					}
					$("#rightPageToolbar").css("top",rightSizPos.y+(rightSizPos.h-$("#rightPageToolbar").height())/2);
					//sizepos anche della canvas della pagina
					if ( sbam.pageRightIdx > -1 ) {
						$("#rightPageCanvas").height(rightSizPos.h);
						$("#rightPageCanvas").width(rightSizPos.w); 
					} else if ( sbam.pageRightIdx == -1 ) {
						$("#rightPageCont").remove();
						if ( sbam.currentView != "pageEditorSingle" ) $("#rightPageToolbar").remove();
					}
				}
				
			}
			
			// questa viene solo richiamata da pageEditor.drawPage
			function renderer(container,idx,mode) {
				/*
				mode in teoria potrà valere "editor" e "viewer" che serve per le thumbnails e non aggiunge funzionalità di editing
				*/
				if ( !mode ) mode = "editor";
				//helper functions
				// questa viene solo richiamata da pageEditor.drawPage.renderer
				function drawPageShadow() {
					//scelgo in quale canvas disegnare in base al type di pagina
					var canvasId = "";
					switch ( sbam.project.pages[idx].type ) {
						case "single":
						case "left":
						case "cover-2-front":
						case "cover-4-back":
							canvasId = "leftPageCanvas";
							break;
						case "right":
						case "cover-1-front":
						case "cover-3-back":
							canvasId = "rightPageCanvas";
							break;
					}
					var c=document.getElementById(canvasId); 
					var ctx=c.getContext('2d'); 
					ctx.rect(0, 0, c.width,c.height);
					var grd=ctx.createLinearGradient(0,0,c.width,0); 
					//differenzio la grafica in base al type di pagina
					switch ( sbam.project.pages[idx].type ) {
						case "left":
						case "cover-2-front":
						case "cover-4-back":
							grd.addColorStop(0.94,'#fff'); 
							grd.addColorStop(0.97,'#eee'); 
							grd.addColorStop(1,'#aaa'); 
							break;
						case "right":
						case "cover-1-front":
						case "cover-3-back":
							grd.addColorStop(0,'#aaa'); 
							grd.addColorStop(0.03,'#eee'); 
							grd.addColorStop(0.06,'#fff'); 
							break;
						case "single":
							grd.addColorStop(0,'#aaa'); 
							grd.addColorStop(0.03,'#eee'); 
							grd.addColorStop(0.06,'#fff'); 
							grd.addColorStop(0.94,'#fff'); 
							grd.addColorStop(0.97,'#eee'); 
							grd.addColorStop(1,'#aaa'); 
							break;
					}
					//chiudo il disegno nella canvas
					ctx.fillStyle=grd; 
					ctx.fill();
				}
				// questa viene solo richiamata da pageEditor.drawPage.renderer
				function createElements() {
					//helper functions
					// questa viene solo richiamata da pageEditor.drawPage.renderer.createElements più o meno
					function bboxValToPixel(val,referencePx,referenceMm) {
						//console.log("pageEditor.drawPage.sizeAndPosElement.bboxValToPixel: val:"+val+" referencePx:"+referencePx+" referenceMm:"+referenceMm);
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
						return String(Math.round(Number(val)*10)/10);
					}
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
					// questa viene solo richiamata da pageEditor.drawPage.renderer.createElements
					function sizeAndPosElement(element,container) {
						//continuo solo se c'è il bbox, perchè mi baso solo su quello essendo in comune a tutti i type di elements
						if ( element.bbox ) {
							var margin = 3; //dovrebbe essere lo spessore del bordo tratteggiato attorno all'element selezionato
							//console.log("pageEditor.drawPage.sizeAndPosElement: element.bbox:");
							//console.log(element.bbox);
							//console.log("pageEditor.drawPage.sizeAndPosElement: $(container).width():"+$(container).width());
							//console.log("pageEditor.drawPage.sizeAndPosElement: $(container).height():"+$(container).height());
							//per ogni misura specificata la normalizzo
							var ctW = $(container).width();
							var ctH = $(container).height();
							var norm_x = bboxValToPixel(element.bbox.x,ctW,sbam.project.width);
							var norm_y = bboxValToPixel(element.bbox.y,ctH,sbam.project.height);
							var norm_w = bboxValToPixel(element.bbox.w,ctW,sbam.project.width);
							var norm_h = bboxValToPixel(element.bbox.h,ctH,sbam.project.height);
							//poi assegno le misure come stili css
							var elm = $("#"+element._id);
							elm.css("position","absolute");
							elm.css("width",norm_w+"px");
							elm.css("height",norm_h+"px");
							elm.css("left",norm_x+"px");
							elm.css("top",norm_y+"px");
							//nel caso dei text devo anche piazzare il toolbox
							//perche nel caso dei testi non è un popup jquery mobile ma è un normale div
							if ( element.type == "text" ) {
								var toolbox_norm_x = Number(norm_x) + (Number(norm_w)-Number($( "#toolbox"+element._id ).outerWidth(true)))/2;
								var toolbox_norm_y = Number(norm_y) + Number(norm_h) + margin;
								if ( 
									Number(toolbox_norm_y) 
									+ 
									Number($( "#toolbox"+element._id ).outerHeight(true)) 
									> 
									Number(ctH) 
								) {
									//console.log("SONO CASCATO NEL CASO DI SUPERAMENTO IN BASSO CON");
									//console.log("ctW = "+ctW);
									//console.log("ctH = "+ctH);
									//console.log("norm_x = "+norm_x);
									//console.log("norm_y = "+norm_y);
									//console.log("norm_w = "+norm_w);
									//console.log("norm_h = "+norm_h);
									//console.log("$(#toolbox+element._id ).outerWidth(true) = "+$( "#toolbox"+element._id ).outerWidth(true));
									//console.log("$(#toolbox+element._id ).outerHeight(true) = "+$( "#toolbox"+element._id ).outerHeight(true));
									//console.log("toolbox_norm_x = "+toolbox_norm_x);
									//console.log("toolbox_norm_y = "+toolbox_norm_y);
									toolbox_norm_y = Number(norm_y) - Number($( "#toolbox"+element._id ).outerHeight(true)) - margin;
									//console.log("DOPO toolbox_norm_y = "+toolbox_norm_y);
									if ( toolbox_norm_y < -Number(norm_y) ) {
										toolbox_norm_y = Number(ctH) - Number($( "#toolbox"+element._id ).outerHeight(true)) + margin;
									}
								}
								//var toolbox_norm_y = norm_y;
								$( "#toolbox"+element._id ).css("left",toolbox_norm_x+"px");
								$( "#toolbox"+element._id ).css("top",toolbox_norm_y+"px");
							}
						}
					}
					// questa viene solo richiamata da pageEditor.drawPage.renderer.createElements
					function styleElement(element,container) {
						//prima degli style fissi per tutti
						//perloppiù correzioni agli style di jqm
						$("#"+element._id).css("text-shadow","none");  
						
						//poi leggo e applico gli style definiti nel layout xml
						if ( element.style ) {
							//console.log("considero lo style:");
							//console.log(element.style);
							/*
							if ( element.style.foregroundColor && element.style.foregroundColor.c != undefined && element.style.foregroundColor.m != undefined && element.style.foregroundColor.y != undefined && element.style.foregroundColor.k != undefined ) {
								//console.log("considero il foregroundColor:");
								//console.log(element.style.foregroundColor);
								var rgbObj = ColorConverter.toRGB(new CMYK(element.style.foregroundColor.c,element.style.foregroundColor.m,element.style.foregroundColor.y,element.style.foregroundColor.k));
								$("#"+element._id).css("color","rgb("+rgbObj.r+","+rgbObj.g+","+rgbObj.b+")"); 
							}
							if ( element.style.backgroundColor && element.style.backgroundColor.c != undefined && element.style.backgroundColor.m != undefined && element.style.backgroundColor.y != undefined && element.style.backgroundColor.k != undefined ) {
								//console.log("considero il backgroundColor:");
								//console.log(element.style.backgroundColor);
								var rgbObj = ColorConverter.toRGB(new CMYK(element.style.backgroundColor.c,element.style.backgroundColor.m,element.style.backgroundColor.y,element.style.backgroundColor.k));
								$("#"+element._id).css("background-color","rgb("+rgbObj.r+","+rgbObj.g+","+rgbObj.b+")"); 
							}
							*/
							//per impostare i colori chiamo un metodo apposta, che gestisce anche i colori di default nel caso l'element non li abbia definiti
							elementColorToRGBACss(element,"foregroundColor"); 
							elementColorToRGBACss(element,"backgroundColor"); 
							
							//aggiorno il dom
							updateDomElementFont(element);
							updateDomElementFontSize(element,container);
							updateDomElementFontAlign(element);
						}
					}
					// questa viene solo richiamata da pageEditor.drawPage.renderer.createElements
					function imageWidget(element,container,idx) {
						/*
						########## flusso tra i vari helpers: ##########
						ajax("/getWidgetImg").done() -> setDefaultZoomAndOffset() -> ( fitOrFillImage() -> setZoomByDpi() -> setZoom() ) | setZoom()
						setZoom() -> zoomSlider.change() -> setDpiByZoom() -> setImgSize() ; setImgOffset() ; storeImg()
						*/
						//helper functions
						function logEmAll(me,solo) {
							var loVuoiDavvero = false;
							if ( loVuoiDavvero || solo ) {
								/*
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.originalImgPixW="+element.IW.originalImgPixW);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.originalImgPixH="+element.IW.originalImgPixH);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.bboxPixW="+element.IW.bboxPixW);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.bboxPixH="+element.IW.bboxPixH);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.bboxMmW="+element.IW.bboxMmW);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.bboxMmH="+element.IW.bboxMmH);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.originalImgMmW="+element.IW.originalImgMmW);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.originalImgMmH="+element.IW.originalImgMmH);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.placedImgMmX="+element.IW.placedImgMmX);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.placedImgMmY="+element.IW.placedImgMmY);	
*/								
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.placedImgPixX="+element.IW.placedImgPixX);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.placedImgPixY="+element.IW.placedImgPixY);				
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.placedImgPixW="+element.IW.placedImgPixW);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.placedImgPixH="+element.IW.placedImgPixH);				
								
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.prevCurDpi="+element.IW.prevCurDpi);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.prevPlacedImgPixX="+element.IW.prevPlacedImgPixX);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.prevPlacedImgPixY="+element.IW.prevPlacedImgPixY);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.prevPlacedImgPixW="+element.IW.prevPlacedImgPixW);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.prevPlacedImgPixH="+element.IW.prevPlacedImgPixH);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.prevPrevCurDpi="+element.IW.prevPrevCurDpi);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.prevPrevPlacedImgPixX="+element.IW.prevPrevPlacedImgPixX);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.prevPrevPlacedImgPixY="+element.IW.prevPrevPlacedImgPixY);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.prevPrevPlacedImgPixW="+element.IW.prevPrevPlacedImgPixW);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.prevPrevPlacedImgPixH="+element.IW.prevPrevPlacedImgPixH);
								
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.image.offsetx="+element.image.offsetx);				
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.image.offsety="+element.image.offsety);				
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.image.dpi="+element.image.dpi);				
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.image.url="+element.image.url);				
								
								
								
							}
						}		
						function storeImg() {
							logEmAll("PRIMA storeImg");
							//recupero il mio elemento dalla mia pagina
							var storedElement = sbam.pageEditor.getPageElementById(idx,element._id);
							//if (  !isNaN(parseFloat(storedElement.image.offsetx)) ) console.log("IPERMALEFICOEVENTOCHANGE CHE SOVRASCRIVO L'OFFSET "+storedElement.image.offsetx+" con "+element.IW.placedImgMmX);
							
							//poi gli scrivo i valori
							storedElement.image.offsetx = element.IW.placedImgMmX;
							storedElement.image.offsety = element.IW.placedImgMmY;
							storedElement.image.dpi = element.IW.curDpi;//nel db come valore di zoom salvo i dpi
							
							logEmAll("DOPO storeImg");
						}
						function remImage() {
							logEmAll("PRIMA remImage");
							//recupero il mio elemento dalla mia pagina
							var storedElement = sbam.pageEditor.getPageElementById(idx,element._id);
							//if (  !isNaN(parseFloat(storedElement.image.offsetx)) ) console.log("IPERMALEFICOEVENTOCHANGE CHE SOVRASCRIVO L'OFFSET "+storedElement.image.offsetx+" con "+element.IW.placedImgMmX);
							//poi gli scrivo i valori
							storedElement.image.offsetx = 0;
							storedElement.image.offsety = 0;
							storedElement.image.dpi = 0;
							storedElement.image.url = "";
							storedElement.IW = {};
							//tolgo l'immagine dal dom
							$("#image"+element._id).remove();
							//MA SIAMO SICURI? $( "#toolbox"+element._id ).popup( "disable" );
							logEmAll("DOPO remImage");
						}
						function setImgSize() {
							logEmAll("PRIMA setImgSize");
							//ricavo le dimensioni dell'immagine originale in mm:
							element.IW.originalImgMmW = element.IW.originalImgPixW / sbam.utils.dpi2dpmm(element.IW.curDpi);
							element.IW.originalImgMmH = element.IW.originalImgPixH / sbam.utils.dpi2dpmm(element.IW.curDpi);
							//ricavo le dimensioni dell'immagine zoomata in px:
							element.IW.placedImgPixW = element.IW.originalImgMmW * element.IW.bboxPixW / element.IW.bboxMmW;
							element.IW.placedImgPixH = element.IW.originalImgMmH * element.IW.bboxPixH / element.IW.bboxMmH;
							//e applico i css
							$("#image"+element._id).css("width",String(element.IW.placedImgPixW)+"px");
							$("#image"+element._id).css("height",String(element.IW.placedImgPixH)+"px");
							logEmAll("DOPO setImgSize");
						}
						function centerImgOnZoom() {
							logEmAll("çççççççççPRIMA centerImgOnZoom");
							/*
							console.log("COZ: element.IW.prevPrevPlacedImgPixX = "+element.IW.prevPrevPlacedImgPixX);
							console.log("COZ: element.IW.prevPrevPlacedImgPixY = "+element.IW.prevPrevPlacedImgPixY);
							console.log("COZ: element.IW.prevPrevPlacedImgPixW = "+element.IW.prevPrevPlacedImgPixW);
							console.log("COZ: element.IW.prevPrevPlacedImgPixH = "+element.IW.prevPrevPlacedImgPixH);
							console.log("COZ: element.IW.prevPlacedImgPixX = "+element.IW.prevPlacedImgPixX);
							console.log("COZ: element.IW.prevPlacedImgPixY = "+element.IW.prevPlacedImgPixY);
							console.log("COZ: element.IW.prevPlacedImgPixW = "+element.IW.prevPlacedImgPixW);
							console.log("COZ: element.IW.prevPlacedImgPixH = "+element.IW.prevPlacedImgPixH);
							*/
							//prima li calcolo in px
							element.IW.placedImgPixX = element.IW.prevPrevPlacedImgPixX - ( element.IW.placedImgPixW - element.IW.prevPrevPlacedImgPixW ) / 2;
							element.IW.placedImgPixY = element.IW.prevPrevPlacedImgPixY - ( element.IW.placedImgPixH - element.IW.prevPrevPlacedImgPixH ) / 2;
							//poi derivo i mm
							element.IW.placedImgMmX = element.IW.bboxMmW * element.IW.placedImgPixX / element.IW.bboxPixW;
							element.IW.placedImgMmY = element.IW.bboxMmH * element.IW.placedImgPixY / element.IW.bboxPixH;
							/*
							console.log("COZ: RES placedImgPixX = "+element.IW.placedImgPixX);
							console.log("COZ: RES placedImgPixY = "+element.IW.placedImgPixY);
							console.log("COZ: RES placedImgMmX = "+element.IW.placedImgMmX);
							console.log("COZ: RES placedImgMmY = "+element.IW.placedImgMmY);
							*/
							//e applico i css
							$("#image"+element._id).css("left",String(element.IW.placedImgPixX)+"px");
							$("#image"+element._id).css("top",String(element.IW.placedImgPixY)+"px");
							logEmAll("DOPO centerImgOnZoom");
						}
						function setImgOffset() {
							logEmAll("PRIMA setImgOffset");
							//se l'utente sta usando lo zoom, devo ricecntrare l'immagine in base a come cambia lo zoom
							if ( element.IW.userIsZooming ) {
								centerImgOnZoom();
							} else {
								//converto l'offset noto dai mm ai px
								element.IW.placedImgPixX = element.IW.placedImgMmX / element.IW.bboxMmW * element.IW.bboxPixW;
								element.IW.placedImgPixY = element.IW.placedImgMmY / element.IW.bboxMmH * element.IW.bboxPixH;
								//e applico i css
								$("#image"+element._id).css("left",String(element.IW.placedImgPixX)+"px");
								$("#image"+element._id).css("top",String(element.IW.placedImgPixY)+"px");
							}
							logEmAll("DOPO setImgOffset");
						}
						function getZoom() {
							//mi aspetto che val vada da 0 a element.IW.maxZoomSlider
							//return $( "#slider"+element._id ).val();
							return element.IW.curZoom;
						}
						function setZoom(myZoom) {
							logEmAll("PRIMA setZoom("+myZoom+")");
							//mi aspetto che val vada da 0 a element.IW.maxZoomSlider
							//ma se non lo fa, la prossima lettura di slider.val() darà un valori normalizzato tra 0 e 1
							//però se si stà cercando di usare uno zoom > 1 
							//(può derivare dai metodi di fill e fit delle immagini che vengono eseguiti senza conoscere ancora element.IW.curDpi)
							//allora devo annullare l'offset, altrimenti rischio che l'immagine esca dal suo container e non sia visibile (posizionamento errato)
							if ( myZoom > 1 ) {
								element.IW.placedImgPixX = 0;
								element.IW.placedImgPixY = 0;
								element.IW.placedImgMmX = 0;
								element.IW.placedImgMmY = 0;
							}
							element.IW.curZoom = myZoom;
							$( "#slider"+element._id ).val(element.IW.curZoom*element.IW.maxZoomSlider).slider("refresh");
							logEmAll("DOPO setZoom("+myZoom+")");
						}
						function setZoomByDpi() {
							logEmAll("PRIMA setZoomByDpi");
							//prima calcolo lo element.IW.curZoom tra 0 e 1
							var newZoom = 0; 
							if ( element.IW.curDpi <= sbam.project.dpi ) {
								newZoom = 1 / ( 1 - ( element.IW.curDpi - sbam.config.imagesDpiMin ) / ( sbam.config.imagesDpiMin - sbam.project.dpi ) );
							} else if ( element.IW.curDpi > sbam.project.dpi ) {
								newZoom = - Math.log ( ( element.IW.curDpi - sbam.project.dpi ) * ( 1 - Math.exp(-element.IW.smooth*0.5) ) / ( sbam.config.imagesDpiMax - sbam.project.dpi ) + Math.exp(-element.IW.smooth*0.5) ) / element.IW.smooth;
							}
							//poi lo assegno normalizzandolo sul max dello slider
							setZoom(newZoom);
							
							logEmAll("DOPO setZoomByDpi");
						}
						function setDpiByZoom() {
							logEmAll("PRIMA setDpiByZoom");
							//mi serve un valore di element.IW.curZoom che mi va da 0 a 1, quindi normalizzo il valore che mi arriva dallo slider
							element.IW.curZoom = $( "#slider"+element._id ).val() / element.IW.maxZoomSlider;
							//uso due formule diverse a seconda che lo element.IW.curZoom sia maggiore o minore di metà scala
							if ( element.IW.curZoom <= 0.5 ) {
								element.IW.curDpi = sbam.project.dpi + ( Math.exp(-element.IW.smooth*element.IW.curZoom) - Math.exp(-element.IW.smooth*0.5) ) / ( 1 - Math.exp(-element.IW.smooth*0.5) ) * ( sbam.config.imagesDpiMax - sbam.project.dpi );
							} else if ( element.IW.curZoom > 0.5 ) {
								element.IW.curDpi = sbam.config.imagesDpiMin + ( sbam.config.imagesDpiMin - sbam.project.dpi ) * ( 1 - 1 / element.IW.curZoom );
							}
							
							//appena calcolati i dpi dell'immagine, posso anche decidere se deve essere visible o meno l'icona di warning sulla risoluzione
							if ( element.IW.curDpi < sbam.config.imagesDpiMinWarn ) {
								$( "#lowresIcon"+element._id ).fadeIn();
							} else {
								$( "#lowresIcon"+element._id ).fadeOut();
							}
							
							setImgSize();
							setImgOffset();
							
							
							//tengo 2 copie di offset e dimensioni px dell'immagine (mi servono per tenere l'immagine centrata durante lo zoom)
							updatePrevsChain();
							
							//ora tutte le variabili sono definite, posso salvare nella page
							storeImg();

							logEmAll("DOPO setDpiByZoom");
						}
						function setDefaultZoomAndOffset() {
							logEmAll("PRIMA setDefaultZoomAndOffset");
							//se mancano sia zoom che offset, applico per default un fill all'immagine da cui ricavo entramni
							if ( ( isNaN(element.image.dpi) || element.image.dpi == 0 || element.image.dpi === null ) && ( isNaN(element.image.offsetx) || element.image.offsetx == 0 || element.image.offsetx === null ) && ( isNaN(element.image.offsety) || element.image.offsety == 0 || element.image.offsety === null ) ) {
								//console.log("setDefaultZoomAndOffset: manca tutto!!! chiamo fill dell'immagine");
								fillImage();
							} else {
								//se non sono passati tutti assieme, considero i singoli parametri uno ad uno, e se non è definito assegno un default
								//devo controllare per ultimo zoom, perchè lì chiamo setZoom che si aspetta element.IW.placedImgMmX e element.IW.placedImgMmY
								if ( !isNaN(element.image.offsetx) ) {
									element.IW.placedImgMmX = element.image.offsetx;
								}
								if ( !isNaN(element.image.offsety) ) {
									element.IW.placedImgMmY = element.image.offsety;
								}
								if ( !isNaN(element.image.dpi) ) {
									element.IW.curDpi = element.image.dpi;
									setZoomByDpi();
								} else {
									setZoom(0.5); //mezzo lo zoom a metà slider, cioè sul valore defaultPdfDpi
								}
							}
							logEmAll("DOPO setDefaultZoomAndOffset");
						}
						function fillImage() {
							//fill/riempi/crop
							//calcolo l'offset e le nuove dimensioni in mm
							fitOrFillImage(true);
						}
						function fitImage() { 
							//fit/adatta/no crop
							//calcolo l'offset e le nuove dimensioni in mm
							fitOrFillImage(false);
						}
						function fitOrFillImage(crop) {
							logEmAll("PRIMA fitOrFillImage");
							//siccome sto definendo i default, non ho ancora element.IW.curDpi, e quindi non è stato ancora calcolato element.IW.originalImgMmW e element.IW.originalImgMmH pur avendo già definito element.IW.originalImgPixW e element.IW.originalImgPixH
							//quindi passo a thepositioner i valori in px al posto di quelli in mm, tanto quello che conta è solo l'aspect ratio
							var pos = sbam.utils.thepositioner(element.IW.bboxMmW,element.IW.bboxMmH,element.IW.originalImgPixW,element.IW.originalImgPixH,crop);
							//console.log("fitOrFillImage() pos=");
							//console.log(pos);
							//ottengo size e offset dell'immagine in mm
							//salvo size e offset dell'immagine in mm
							element.IW.placedImgMmX = pos.x;
							element.IW.placedImgMmY = pos.y;
							//salvo element.IW.curDpi
							element.IW.curDpi = sbam.utils.dpmm2dpi( element.IW.originalImgPixW / pos.w );
							//elimino eventuali css transformations dovute al moving dell'immgine
							$( "#image"+element._id ).css("-webkit-transform","none");
							$( "#image"+element._id ).css("transform","none");
							setZoomByDpi();
							logEmAll("DOPO fitOrFillImage");
						}
						function updatePrevsChain() {
							logEmAll("updatePrevsChain salvo i prevs...");
							if ( !element.IW.userIsZooming ) {
								element.IW.prevPrevCurDpi = element.IW.prevCurDpi;
								element.IW.prevPrevPlacedImgPixX = element.IW.prevPlacedImgPixX;
								element.IW.prevPrevPlacedImgPixY = element.IW.prevPlacedImgPixY;
								element.IW.prevPrevPlacedImgPixW = element.IW.prevPlacedImgPixW;
								element.IW.prevPrevPlacedImgPixH = element.IW.prevPlacedImgPixH;
								element.IW.prevCurDpi = element.IW.curDpi;
								element.IW.prevPlacedImgPixX = element.IW.placedImgPixX;
								element.IW.prevPlacedImgPixY = element.IW.placedImgPixY;
								element.IW.prevPlacedImgPixW = element.IW.placedImgPixW;
								element.IW.prevPlacedImgPixH = element.IW.placedImgPixH;
							}
						}

						
						
						
						function widgetImgCacheGetHash(projectId, imageUrl) {
							var hash = encodeURIComponent( projectId+imageUrl );
							/*
							var key = projectId+imageUrl;
							var hash = 0, i, chr, len; 
							if (key.length == 0) return hash;
							for (i = 0, len = key.length; i < len; i++) {
								chr   = key.charCodeAt(i);
								hash  = ((hash << 5) - hash) + chr;
								hash |= 0; // Convert to 32bit integer
							}
							*/
							return hash;
						}
						function drawWidgetImg(widgetImg) {
							logEmAll("drawWidgetImg");
							//ho tutto per visualizzare la mia immagine
							//console.log("widgetImg:");
							//console.log(widgetImg);
							//elimino eventuale wait icon specifica del caricamento immagine
							$("#waitIcon"+element._id).remove();
							//elimino eventuale immagine già presente
							$("#"+element._id+" img").remove();
							//finalmente visualizzo la mia immagine
							//(compresa immagine di warning per low res)
							$("#"+element._id).prepend("<img id='image"+element._id+"' src='"+widgetImg.cachedUrl+"' class='dragdropForImageMove' /><div id='lowresIcon"+element._id+"' class='elementImageLowresIcon' title='Questa immagine non ha risoluzione sufficiente per queste dimensioni. Se possibile ridurne le dimensioni.'></div>");
							//do all'immagine la possiblità di essere spostata dentro al proprio bbox (quindi cambiare l'offset con il drag and drop)
							$(".dragdropForImageMove").pep({
								useCSSTranslation: false,
								shouldEase: false,
								initiate: function() {
									logEmAll("IMG MOVE INIT");
									$("#"+element._id).data("mosso","nonancora");
								},								
								start: function(ev, obj) {
									logEmAll("IMG MOVE START");
									//this.$el.text('start')
									$("#"+element._id).addClass("elementSelected");
								},
								drag: function(ev, obj) {
									logEmAll("IMG MOVE DRAG");
									//console.log("sto DRAGGANDO l'immagine e ho impostato element.IW:");
									//console.log(element.IW);
									//console.log(this.$el.position().left+","+this.$el.position().top);
									$("#"+element._id).data("mosso","dibrutto");
								},
								stop: function(ev, obj) {
									logEmAll("IMG MOVE END");
									//se c'è stato movimento, non apro il popup
									if ( $("#"+element._id).data("mosso") == "dibrutto" ) {
										$( "#toolbox"+element._id ).popup( "disable" );
									} else {
										$( "#toolbox"+element._id ).popup( "enable" );
									}
									//this.$el.text('stop')
									//imposto l'offset in pix uguale alla posizione dell' <img> dopo il drag and drop
									element.IW.placedImgPixX = this.$el.position().left;
									element.IW.placedImgPixY = this.$el.position().top;
									//e derivo l'offset in mm
									element.IW.placedImgMmX = element.IW.bboxMmW * element.IW.placedImgPixX / element.IW.bboxPixW;
									element.IW.placedImgMmY = element.IW.bboxMmH * element.IW.placedImgPixY / element.IW.bboxPixH;
									//console.log("ho appena finito MOVE dell'immagine e ho impostato element.IW:");
									//console.log(element.IW);
									//salvo nel mio elemento il nuovo offset
									storeImg();
									//tengo aggiornata la catena dei valori precedenti che mi server per centrare l'immagine durante lo zoom
									updatePrevsChain();										
									//aggiorno l'history
									sbam.history.add("Move image");
									//deseleziono l'immagine
									$("#"+element._id).removeClass("elementSelected");
								}
							});
							
							//widgetImg.originalW
							//popolo un po' di variabili che mi serviranno
							element.IW.originalImgPixW = widgetImg.originalW;
							element.IW.originalImgPixH = widgetImg.originalH;
							element.IW.bboxPixW = $("#"+element._id).width();
							element.IW.bboxPixH = $("#"+element._id).height();
							logEmAll("START ajax(getWidgetImg).done");
							//per poter calcolare dimensioni e posizione dell'immagine, devo prima definire zoom e offset nel caso non lo fossero
							setDefaultZoomAndOffset();

						}



						//variabili comuni usate dal widget immagini e dai suoi helper
						//nota che non le definisco con "var" perchè sarebbero con scope locale e
						//gli eventi a volte ci fanno casino, quindi definisco tutto dentro
						//a element, che a sua vosta è in sbam
						element.IW = {
							bboxPixW: 0,
							bboxPixH: 0,
							bboxMmW: bboxValToMm(element.bbox.w,sbam.project.width),
							bboxMmH: bboxValToMm(element.bbox.h,sbam.project.height),
							originalImgPixW: 0,
							originalImgPixH: 0,
							originalImgMmW: 0,
							originalImgMmH: 0,
							placedImgPixX: 0,
							placedImgPixY: 0,
							placedImgPixW: 0, //quelle in mm non le uso perchè poi nella struttura dati salvo solo l'offset in mm, le misure in mm stanno nel bbox
							placedImgPixH: 0,
							placedImgMmX: 0,
							placedImgMmY: 0,
							curDpi: 0, //questa viene cambiata dallo zoom slider, e sono i dpi in cui visualizzare l'immagine (quindi cambiando i dpi, cambia lo zoom)
							curZoom: 0, //questa va da 0 a 1 ed è direttamente agganciata allo slider, moltiplicandola per element.IW.maxZoomSlider
							maxZoomSlider: 100000, //tenerlo alto, è la precisione dello slider, ilnumero di tick possibli, e serve per mantenere precisione nella conversione in dpi
							smooth: 10,  //fisso anche una variabile che è il moltiplicatore dell'esponenziale, e rappresenta la velocità con cui lo element.IW.curZoom va da 0.5 a 0 (ovvero con cui si rimpiccioliscono le immagini). andando verso 1 la velocità aumenta, andando verso 10 la velocità diminuisce
							userIsZooming: false, //solo mentre l'utente usa lo slider applico un centramento automatico alle immagini, altrimenti no
							prevPlacedImgPixX: 0, //prima di ogni modifica allo zoom memorizzo una copia di offset e dimensioni dell'immagine che mi servono per tenere l'immagine centrata durante lo zoom
							prevPlacedImgPixY: 0,
							prevPlacedImgPixW: 0,
							prevPlacedImgPixH: 0,
							prevCurDpi: 0,
							prevPrevPlacedImgPixX: 0,
							prevPrevPlacedImgPixY: 0,
							prevPrevPlacedImgPixW: 0,
							prevPrevPlacedImgPixH: 0,
							prevPrevCurDpi: 0
							
						};
						logEmAll("PRESTART imageWidget");
						//elimino un eventuale container già presente
						//$("#slider"+element._id ).slider( "destroy" ); //alcuni widget di jq mobile vanno distrutti o resta merda nel dom
						//$("#toolbox"+element._id ).popup( "destroy" ); //alcuni widget di jq mobile vanno distrutti o resta merda nel dom
						//$("#toolbox"+element._id ).popup( "destroy" ); //alcuni widget di jq mobile vanno distrutti o resta merda nel dom
						$("#"+element._id).remove();
						
						
						//appendo subito il container della mia immagine, ovvero il suo bbox
						//e la toolbox con relativo anchor di piazzamento
						$(container).append("\
							<a id='"+element._id+"' pageIdx='"+idx+"' containerSelector='"+container+"'  href='#toolbox"+element._id+"' data-rel='popup' data-transition='fade' data-position-to='#toolboxAnchor"+element._id+"' class='elementImage sbamDroppable'>\
								<div id='waitIcon"+element._id+"' class='ui-loader ui-corner-all ui-body-a ui-loader-default' style='display:block;position:relative;'>\
									<span class='ui-icon-loading'></span>\
									<h1>loading</h1>\
								</div>\
								<div id='toolboxAnchor"+element._id+"' class='elementToolboxAnchor'></div>\
							</a>\
							<div id='toolbox"+element._id+"' data-role='popup' data-corners='false' class='elementToolbox'>\
								<table class='elementImageToolboxZoomContainer'>\
									<tr>\
										<td>\
											<div class='ui-btn ui-corner-all ui-icon-search-minus ui-btn-icon-notext ui-btn-inline' data-mini='true'>Zoom out</div>\
										</td>\
										<td style='width:70%;'>\
											<input type='number' data-type='range' id='slider"+element._id+"' name='slider"+element._id+"' class='elementImageToolboxSlider ui-btn-inline' min='0' max='"+element.IW.maxZoomSlider+"' data-mini='true' data-highlight='true'/>\
										</td>\
										<td>\
											<div class='ui-btn ui-corner-all ui-icon-search-plus ui-btn-icon-notext ui-btn-inline' data-mini='true'>Zoom in</div>\
										</td>\
									</tr>\
								</table>\
								<div id='navbar"+element._id+"' data-role='navbar'>\
									<ul>\
										<li>\
											<a id='toolboxBtnFill"+element._id+"' data-icon='arrows-alt'></a>\
										</li>\
										<li>\
											<a id='toolboxBtnFit"+element._id+"' data-icon='arrows'></a>\
										</li>\
										<li>\
											<a id='toolboxBtnRem"+element._id+"' data-icon='bitbucket'></a>\
										</li>\
										<li class='toolboxNavItem'>\
											<input type='text' id='toolboxBtnColorBackground"+element._id+"' elementId='"+element._id+"' />\
										</li>\
									</ul>\
								</div>\
							</div>");
						//attivo i widget di jq mobile
						//nota che l'evento di change avviene prima dell'evento slider start
						$( "#slider"+element._id ).change(function () {
							logEmAll("PRIMA SLIDER CHANGE");
							setDpiByZoom(); 
							logEmAll("DOPO SLIDER CHANGE");
						});
						$( "#slider"+element._id ).slider({ 
							start: function( event, ui ) {
								logEmAll("çççççççç SLIDER MOVE START");
								element.IW.userIsZooming = true;
								centerImgOnZoom();
							},
							stop: function( event, ui ) { 
								logEmAll("çççççççç SLIDER MOVE STOP");
								element.IW.userIsZooming = false;
								//aggiorno l'history
								sbam.history.add("Zoom image");
							}
						});
						logEmAll("PRESTART imageWidget() appena assegnato change(setDpiByZoom) allo zoom. ");
						$( "#toolbox"+element._id+" .ui-slider-track" ).prepend('<div class="sliderBackColor sbcGreen"></div><div class="sliderBackColor sbcOrange"></div><div class="sliderBackColor sbcRed"></div>');
						
						
						$( "#navbar"+element._id ).navbar();
						$( "#toolbox"+element._id ).popup({
							tolerance: "0,0,0,0",
							beforeposition: function( event, ui ) {
								//console.log("partito!");
								//prima chiudo tutti gli altri eventuali toolbox dei text
								$( ".elementTextToolbox").fadeOut("fast");

								//on open del toolbox lo posiziono
								var margin = 3; //dovrebbe essere lo spessore del bordo tratteggiato attorno all'element selezionato
								$( "#toolboxAnchor"+element._id ).css("left",Math.round($("#"+element._id).width()/2));
								if ( Number( $("#"+element._id).position().top ) + Number( $("#"+element._id).height() ) > Number( $("#"+element._id).parent().height() ) / 3 * 2 ) {
									$( "#toolboxAnchor"+element._id ).css("top",-Math.round($("#toolbox"+element._id).height()/2)-margin);
								} else {
									$( "#toolboxAnchor"+element._id ).css("bottom",-Math.round($("#toolbox"+element._id).height()/2)-margin);
								}
								//e metto a selezionata l'immagine
								$("#"+element._id).addClass("elementSelected");
							},
							afterclose: function( event, ui ) {
								//deseleziono l'immagine
								$("#"+element._id).removeClass("elementSelected");
							}
							
						});
						//azioni ai bottoni del tollbox
						$( "#toolboxBtnFill"+element._id ).click(function () { fillImage(); sbam.history.add("Fill image"); });
						$( "#toolboxBtnFit"+element._id ).click(function () { fitImage(); sbam.history.add("Fit image"); });
						$( "#toolboxBtnRem"+element._id ).click(function () { remImage(); sbam.history.add("Unset image"); });
						$( '#toolboxBtnColorBackground'+element._id).spectrum({
							color: elementColorToRGBACss(element,"backgroundColor"), 
							foreOrBackGroundColor: "backgroundColor",
							change: function(color) {
								updateElementColor($(this).attr("elementId"),color.toRgb(),"backgroundColor");
							}
						});
						
						//appena dopo aver appeso al dom il mio widget, devo richiamare questi 2 metodi che ne definisco size, pos, e stili (mi servono size e pos per tutti i calcoli che seguiranno)
						//poi ne applico gli style
						styleElement(element,container);
						//poi ne applico il bbox
						sizeAndPosElement(element,container);
						
						
						
						if ( element.image && element.image.url && element.image.url != "" ) {
							//chiamo il server in ajax per avere url dell'immagine in cache, e dimenioni dell'immagine originale in px
							//ma per performance cacho anche questa chiamata (che a sua volta mi avrebbe ritornato l'url di un'immagine in cache!)
							var key = widgetImgCacheGetHash(sbam.project._id, element.image.url);
							if ( sbam.widgetImgCache[key] ) {
								//console.log("YESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS ho cache per hash="+key+" prjId="+sbam.project._id+" url="+element.image.url);
								//console.log(sbam.widgetImgCache[key]);
								//se ho in cache il result, uso quello e disegno il widget
								drawWidgetImg( sbam.widgetImgCache[key] );
							} else {
								//se non ho in cache il result, eseguo la chiamata ajax
								$.mobile.loading("show");
								$.ajax({
									type: "POST",
									url: "/getWidgetImg",
									data: { 
										"url": element.image.url,
										"projectId": sbam.project._id
									}
								}).done(function( widgetImgData ) {
									if ( widgetImgData ) {
										widgetImgData = JSON.parse(widgetImgData);
										//console.log("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO creo cache per hash="+key+" prjId="+sbam.project._id+" url="+element.image.url);
										//console.log(widgetImgData);
										//salvo in cache il risultato
										sbam.widgetImgCache[key] = widgetImgData;
										//tolgo wait generale
										$.mobile.loading("hide");
										//disegno il widget
										drawWidgetImg( widgetImgData );
									} else {
										//se il metodo ajax ritorna false (errore) mi fermo
										alert( "Fallito metodo su server /getWidgetImg chiamato con parametri : url="+element.image.url+" projectId="+sbam.project._id);
										console.log( "Fallito metodo su server /getWidgetImg chiamato con parametri : url="+element.image.url+" projectId="+sbam.project._id);
									}
								}).fail(function( jqXHR, textStatus ) {
									alert( "Request failed: " + textStatus );
									console.log( "Request failed: " + textStatus );
								});						
							}
						} else {
							//se mi arriva un url vuoto, vuol dire che è stata rimossa l'immagine, e la rimuovo anche dal dom
							//elimino eventuale wait icon specifica del caricamento immagine
							$("#waitIcon"+element._id).remove();
							//elimino eventuale immagine già presente
							$("#"+element._id+" img").remove();
							//disabilito popup
							//MA SIAMO SICURI? $( "#toolbox"+element._id ).popup( "disable" );
						}
					}
					// questa viene solo richiamata da pageEditor.drawPage.renderer.createElements
					function textWidget(element) {
						$(container).append("\
							<!--<a id='"+element._id+"' href='#toolbox"+element._id+"' data-rel='popup' data-transition='fade' data-position-to='#toolboxAnchor"+element._id+"' class='elementText'>-->\
							<a id='"+element._id+"' class='elementText'>\
								<!--<div contenteditable='true' class='elementTextContent' onclick='document.execCommand(\"selectAll\",false,null)' >-->\
								<div contenteditable='true' class='elementTextContent' >\
									"+element.text.content+"\
								</div>\
								<!--<div id='toolboxAnchor"+element._id+"' class='elementToolboxAnchor'></div>-->\
							</a>\
							<div id='toolbox"+element._id+"' data-corners='false' class='elementToolbox elementTextToolbox'>\
								<select name='fontSelect"+element._id+"' id='fontSelect"+element._id+"' elementId='"+element._id+"' data-mini='true' data-icon='font'></select>\
								<div id='navbar"+element._id+"' data-role='navbar'>\
									<ul>\
										<li class='toolboxNavItem'>\
											<select name='fontSizeSelect"+element._id+"' id='fontSizeSelect"+element._id+"' elementId='"+element._id+"' data-mini='true'  data-icon='text-height'></select>\
											<!--<span>dimensioni</span>-->\
										</li>\
										<li class='toolboxNavItem'>\
											<input type='text' id='toolboxBtnColorForeground"+element._id+"' elementId='"+element._id+"' />\
										</li>\
										<li class='toolboxNavItem'>\
											<input type='text' id='toolboxBtnColorBackground"+element._id+"' elementId='"+element._id+"' />\
										</li>\
									</ul>\
								</div>\
								<fieldset id='fontAlign"+element._id+"' data-role='controlgroup' data-type='horizontal' data-mini='true' ></fieldset>\
							</div>");
						//appendo i font al select
						for ( var x=0; x<sbam.config.usableFonts.length; x++ ) {
							var font = sbam.config.usableFonts[x];
							if ( element.style && element.style.font && element.style.font == font ) {
								var selected=" selected='selected' ";
							} else {
								var selected = "";
							}
							$("#fontSelect"+element._id).append("<option value='"+font+"' "+selected+" >"+font+"</option>");
						}
						//appendo i fontSize al select
						for ( var x=0; x<sbam.config.usableFontSizes.length; x++ ) {
							var fontSize = sbam.config.usableFontSizes[x];
							if ( element.style && element.style.fontSize && element.style.fontSize == fontSize ) {
								var selected=" selected='selected' ";
							} else {
								var selected = "";
							}
							$("#fontSizeSelect"+element._id).append("<option value='"+fontSize+"' "+selected+" >"+fontSize+"pt</option>");
						}
						//appendo i fontAlign al controlgroup
						for ( var x=0; x<sbam.config.usableFontAligns.length; x++ ) {
							var fontAlign = sbam.config.usableFontAligns[x];
							if ( element.style && element.style.align && element.style.align == fontAlign ) {
								var selected=" checked='checked' ";
							} else {
								var selected = "";
							}
							$("#fontAlign"+element._id).append("<input type='radio' id='fontAlign"+element._id+x+"' name='fontAlign"+element._id+"' elementId='"+element._id+"' value='"+fontAlign+"' "+selected+" ><label for='fontAlign"+element._id+x+"' ><img src='/stylesheets/png/align-"+fontAlign+".png' class='fontAlignItem' /></label>");
						}
						
						//attivo eventi e componenti jqm
						$( "#navbar"+element._id ).navbar();
						$( "#fontAlign"+element._id ).controlgroup();
						$("#fontAlign"+element._id+" input[name=fontAlign"+element._id+"]:radio").change(function () {
							updateElementFontAlign($(this).attr("elementId"),this.value);
						});
						$( "#fontSelect"+element._id ).selectmenu();
						$( "#fontSelect"+element._id ).on('change', function() {
							updateElementFont($(this).attr("elementId"),this.value);
						});
						$( "#fontSizeSelect"+element._id ).selectmenu();
						$( "#fontSizeSelect"+element._id ).on('change', function() {
							updateElementFontSize($(this).attr("elementId"),this.value);
						});
						
						$("#"+element._id+" .elementTextContent").focus(function(){
							//prima chiudo tutti gli altri, poi apro il mio
							$( ".elementTextToolbox").fadeOut("fast",function(){
							});
							$( "#toolbox"+element._id ).fadeIn("fast", function(){
								//e seleziono tutto il testo
								$("#"+element._id+" .elementTextContent").selectText();
							});
						});
						
						/*
						$("#"+element._id+" .elementTextContent").blur(function(){
							$( "#toolbox"+element._id ).fadeOut("fast");
						});
						*/
						/*
						$( "#toolbox"+element._id ).popup({
							tolerance: "0,0,0,0",
							beforeposition: function( event, ui ) {
								//on open del toolbox lo posiziono
								$( "#toolboxAnchor"+element._id ).css("left",Math.round($("#"+element._id).width()/2));
								$( "#toolboxAnchor"+element._id ).css("bottom",-Math.round($("#toolbox"+element._id).height()/2));
								//e metto a selezionato l'elemento
								$("#"+element._id).addClass("elementSelected");
							},
							afteropen: function( event, ui ) {
								//seleziono il testo
								$("#"+element._id+" .elementTextContent").selectText();
								$("#"+element._id+" .elementTextContent").focus();
								//$("#"+element._id+" .elementTextContent").css("background-color","green");
								console.log("allora porcodiocane");
								//document.execCommand("selectAll",false,null);
							},
							afterclose: function( event, ui ) {
								//deseleziono l'elemento
								$("#"+element._id).removeClass("elementSelected");
							}
							
						});
						$( "#toolbox"+element._id ).popup("open");
						*/

						//azioni ai bottoni del tollbox
						$( '#toolboxBtnColorForeground'+element._id).spectrum({
							color: elementColorToRGBACss(element,"foregroundColor"),
							foreOrBackGroundColor: "foregroundColor",
							change: function(color) {
								updateElementColor($(this).attr("elementId"),color.toRgb(),"foregroundColor");
							}
						});
						$( '#toolboxBtnColorBackground'+element._id).spectrum({
							color: elementColorToRGBACss(element,"backgroundColor"),
							foreOrBackGroundColor: "backgroundColor",
							change: function(color) {
								updateElementColor($(this).attr("elementId"),color.toRgb(),"backgroundColor");
							}
						});
						//appena dopo aver appeso al dom il mio widget, devo richiamare questi 2 metodi che ne definisco size, pos, e stili (mi servono size e pos per tutti i calcoli che seguiranno)
						//poi ne applico gli style
						styleElement(element,container);
						//poi ne applico il bbox
						sizeAndPosElement(element,container);
					}
					function elementColorToRGBACss(element,type) {
						//console.log("elementColorToRGBACss con element:");
						//console.log(element);
						//console.log("e type:"+type);
						if ( element.type == "image" ) {
							var defaultCssWhite = "rgba(51,136,204,0.3)";
						} else {
							var defaultCssWhite = "rgba(0,0,0,0.2)";
						}
						//se l'elemento non ha colore definito, ne scelgo uno di default
						if ( 
							type == "foregroundColor" && 
							element && 
							element.style && 
							element.style.foregroundColor && 
							element.style.foregroundColor.c != undefined && 
							element.style.foregroundColor.m != undefined && 
							element.style.foregroundColor.y != undefined && 
							element.style.foregroundColor.k != undefined
						) {
							var rgbObj = ColorConverter.toRGB(new CMYK(element.style.foregroundColor.c,element.style.foregroundColor.m,element.style.foregroundColor.y,element.style.foregroundColor.k));
							rgbObj.a = 1;
							//console.log("l'elemento aveva un foregroundColor!!!!:");
							//console.log(rgbObj);							
						} else if (
							type == "backgroundColor" && 
							element && 
							element.style && 
							element.style.backgroundColor && 
							element.style.backgroundColor.c != undefined && 
							element.style.backgroundColor.m != undefined && 
							element.style.backgroundColor.y != undefined && 
							element.style.backgroundColor.k != undefined
						) {
							var rgbObj = ColorConverter.toRGB(new CMYK(element.style.backgroundColor.c,element.style.backgroundColor.m,element.style.backgroundColor.y,element.style.backgroundColor.k));
							rgbObj.a = 1;
							//console.log("l'elemento aveva un backgroundColor!!!!:");
							//console.log(rgbObj);							
						} else if ( type == "foregroundColor" ) {
							//foregroundColor di default se non è definito quello nell'elemento
							var rgbObj = {
								r: 0,
								g: 0,
								b: 0,
								a: 1
							};
							//console.log("devo scegliere un DEFAULT foregroundColor!!!!:");
							//console.log(rgbObj);							
						} else if ( type == "backgroundColor" ) {
							//backgroundColor di default se non è definito quello nell'elemento
							var rgbObj = {
								r: 255,
								g: 255,
								b: 255,
								a: 0
							};
							//console.log("devo scegliere un DEFAULT backgroundColor!!!!:");
							//console.log(rgbObj);							
						}
						var cssColorRgba = "";
						//il caso del bianco è un caso speciale in cui lo visualizzo come non definito (fondino semitrasparente)
						//ma solo per i backgroundColor, i foregroundColor bianchi mi servono per poter scrivere sopra alle foto
						if ( type == "backgroundColor" && rgbObj.r == 255 && rgbObj.g == 255 && rgbObj.b == 255 ) {
							cssColorRgba = defaultCssWhite;
						} else {
							//return sbam.utils.rgbToHex( rgbObj.r, rgbObj.g, rgbObj.b );
							cssColorRgba = "rgba("+rgbObj.r+","+rgbObj.g+","+rgbObj.b+","+rgbObj.a+")";
						}
						//imposto anche i colori nel DOM
						if ( type == "backgroundColor" ) {
							$("#"+element._id).css("background-color",cssColorRgba); 
						} else if ( type == "foregroundColor" ) {
							$("#"+element._id).css("color",cssColorRgba); 
						}
						//elimino eventuale classe di inibizione al colore di fondo
						$("#"+element._id).removeClass("noBackgroundColor");
						return cssColorRgba;
					}
					function updateElementColor(elementId,colorRgb,type) {
						//console.log("updateElementColor() con elementId = "+elementId); // #ff0000
						//helper functions
						function updateInPage(pageIdx, elementId, colorRgb) {
							//console.log("updateElementColor: lo cerco in pageIdx="+pageIdx);
							if ( pageIdx > -1 ) {
								//console.log(sbam.project.pages[pageIdx]);
								if ( sbam.project.pages[pageIdx] && sbam.project.pages[pageIdx].elements && sbam.project.pages[pageIdx].elements.length > 0 ) {
									for ( var i=0; i<sbam.project.pages[pageIdx].elements.length; i++) {
										var element = sbam.project.pages[pageIdx].elements[i];
										if ( element._id == elementId ) {
											//console.log("updateElementColor: TROVATO in pageIdx="+pageIdx+" ora ci metto il color");
											var cmykObj = ColorConverter.toCMYK( new RGB( colorRgb.r, colorRgb.g, colorRgb.b ) );
											//console.log(cmykObj);
											if ( !element.style ) element.style = {};
											if ( type == "foregroundColor" ) {
												if ( !element.style.foregroundColor ) element.style.foregroundColor = {};
												element.style.foregroundColor.c = cmykObj.c;
												element.style.foregroundColor.m = cmykObj.m;
												element.style.foregroundColor.y = cmykObj.y;
												element.style.foregroundColor.k = cmykObj.k;
												//devo aggiornare anche il DOM
												elementColorToRGBACss(element,"foregroundColor"); 
											} else if ( type == "backgroundColor" ) {
												if ( !element.style.backgroundColor ) element.style.backgroundColor = {};
												element.style.backgroundColor.c = cmykObj.c;
												element.style.backgroundColor.m = cmykObj.m;
												element.style.backgroundColor.y = cmykObj.y;
												element.style.backgroundColor.k = cmykObj.k;
												//devo aggiornare anche il DOM
												elementColorToRGBACss(element,"backgroundColor"); 
											}
											//console.log("salvo il colore per l'elemento. colorRgb:");
											//console.log(colorRgb);
											//console.log("element.style.backgroundColor:");
											//console.log(element.style.backgroundColor);
											//e aggiungo all'history
											sbam.history.add("Modify "+type);
											break;
										}
									}
								}
							}
						}
						//devo trovare il mio element e aggiornare il suo colore
						//non può che essere un element di una delle due pagine correntemente aperte
						//quindi cerco prima in una poi nell'altra
						updateInPage(sbam.pageLeftIdx,elementId,colorRgb);
						updateInPage(sbam.pageRightIdx,elementId,colorRgb);
						
					}
					
					function updateElementFont(elementId,font) {
						//console.log("updateElementFont() con elementId = "+elementId); // #ff0000
						//helper functions
						function updateInPage(pageIdx, elementId, font) {
							//console.log("updateElementFont: lo cerco in pageIdx="+pageIdx);
							if ( pageIdx > -1 ) {
								//console.log(sbam.project.pages[pageIdx]);
								if ( sbam.project.pages[pageIdx] && sbam.project.pages[pageIdx].elements && sbam.project.pages[pageIdx].elements.length > 0 ) {
									for ( var i=0; i<sbam.project.pages[pageIdx].elements.length; i++) {
										var element = sbam.project.pages[pageIdx].elements[i];
										if ( element._id == elementId ) {
											//console.log("updateElementFont: TROVATO in pageIdx="+pageIdx+" ora ci metto il font");
											//salvo il font
											if ( !element.style ) element.style = {};
											element.style.font = font;
											//devo anche aggiornare il DOM
											updateDomElementFont(element);
											//e aggiungo all'history
											sbam.history.add("Modify font");
											break;
										}
									}
								}
							}
						}
						//devo trovare il mio element e aggiornare il suo colore
						//non può che essere un element di una delle due pagine correntemente aperte
						//quindi cerco prima in una poi nell'altra
						updateInPage(sbam.pageLeftIdx,elementId,font);
						updateInPage(sbam.pageRightIdx,elementId,font);
						
					}
					function updateElementFontSize(elementId,fontSize) {
						//helper functions
						function updateInPage(pageIdx, elementId, fontSize) {
							if ( pageIdx > -1 ) {
								if ( sbam.project.pages[pageIdx] && sbam.project.pages[pageIdx].elements && sbam.project.pages[pageIdx].elements.length > 0 ) {
									for ( var i=0; i<sbam.project.pages[pageIdx].elements.length; i++) {
										var element = sbam.project.pages[pageIdx].elements[i];
										if ( element._id == elementId ) {
											//salvo il font
											if ( !element.style ) element.style = {};
											element.style.fontSize = fontSize;
											//devo anche aggiornare il DOM
											updateDomElementFontSize(element,container);
											//e aggiungo all'history
											sbam.history.add("Modify font size");
											break;
										}
									}
								}
							}
						}
						//devo trovare il mio element e aggiornare il suo colore
						//non può che essere un element di una delle due pagine correntemente aperte
						//quindi cerco prima in una poi nell'altra
						updateInPage(sbam.pageLeftIdx,elementId,fontSize);
						updateInPage(sbam.pageRightIdx,elementId,fontSize);
						
					}
					function updateElementFontAlign(elementId,fontAlign) {
						//helper functions
						function updateInPage(pageIdx, elementId, fontAlign) {
							if ( pageIdx > -1 ) {
								if ( sbam.project.pages[pageIdx] && sbam.project.pages[pageIdx].elements && sbam.project.pages[pageIdx].elements.length > 0 ) {
									for ( var i=0; i<sbam.project.pages[pageIdx].elements.length; i++) {
										var element = sbam.project.pages[pageIdx].elements[i];
										if ( element._id == elementId ) {
											//salvo il font
											if ( !element.style ) element.style = {};
											element.style.align = fontAlign;
											//devo anche aggiornare il DOM
											updateDomElementFontAlign(element,container);
											//e aggiungo all'history
											sbam.history.add("Modify font align");
											break;
										}
									}
								}
							}
						}
						//devo trovare il mio element e aggiornare il suo colore
						//non può che essere un element di una delle due pagine correntemente aperte
						//quindi cerco prima in una poi nell'altra
						updateInPage(sbam.pageLeftIdx,elementId,fontAlign);
						updateInPage(sbam.pageRightIdx,elementId,fontAlign);
						
					}
					
					
					function updateDomElementFontAlign(element){
						if ( element.style && element.style.align ) {
							$("#"+element._id).css("text-align",element.style.align);  
						}
					}
					function updateDomElementFontSize(element,container){
						if ( element.style && element.style.fontSize ) {
							var normFont = Math.round(Number(element.style.fontSize) * 0.3528 / sbam.project.width * $(container).width() * 10 ) / 10;
							$("#"+element._id).css("font-size",normFont+"px");  
						}
					}
					function updateDomElementFont(element){
						if ( element.style && element.style.font ) {
							var fontFamilyName = "font"+element._id;
							$("#"+element._id).before("<style> @font-face { font-family: "+fontFamilyName+"; src: url('/"+sbam.config.fontDir+element.style.font+"'); } </style>");
							$("#"+element._id).css("font-family",fontFamilyName);  
						}
					}
					if ( sbam.project.pages[idx].elements && sbam.project.pages[idx].elements.length > 0 ) {
						for ( var i=0; i<sbam.project.pages[idx].elements.length; i++) {
							var element = sbam.project.pages[idx].elements[i];
							//console.log("pageEditor.drawPage.renderer: ciclo su element:");
							//console.log(element);
							//prima creo l'elemento
							switch ( element.type ) {
								case "text":
									textWidget(element);
									break;
								case "image":
									imageWidget(element,container,idx);
									//poi se si tratta del primo elemento (quello sullo sfondo)
									//e se è un'immagine, e se ha dimensioni a pagina piena,
									//allora non visualizzo l'icona sullo sfondo, perchè si sofrappone alle icone delle imamgini in primo piano
									//prima capisco se è la prima immagine
									if ( i==0 ) {
										//poi controllo se è a schermo pieno (arrotondo al mm, tanto mi basta per dire che un'immagine è di sfondo)
										if ( 
											Math.round(bboxValToMm(element.bbox.w,sbam.project.width)) == Math.round(sbam.project.width)
											&&
											Math.round(bboxValToMm(element.bbox.h,sbam.project.height)) == Math.round(sbam.project.height)
										) {
											//elimino iconda di fondo
											$("#"+element._id).addClass("noBackgroundImage");
											//e se non è definito un backgroundColor elimino anche il colore di fondo
											if (
												element.style &&
												element.style.backgroundColor &&
												( element.style.backgroundColor.c || element.style.backgroundColor.c == 0 ) &&
												( element.style.backgroundColor.m || element.style.backgroundColor.m == 0 ) &&
												( element.style.backgroundColor.y || element.style.backgroundColor.y == 0 ) &&
												( element.style.backgroundColor.k || element.style.backgroundColor.k == 0 ) &&
												!( element.style.backgroundColor.c == 0 && element.style.backgroundColor.m == 0 && element.style.backgroundColor.y == 0 && element.style.backgroundColor.k == 0 )
											) {
												//è definito il colore di fondo, lo lascio
											} else {
												//non è definito, lo cancello
												$("#"+element._id).addClass("noBackgroundColor");
											}
										}
									}
									break;
								case "pagenum":
									//QUI
									break;
								case "sticker":
									//QUI
									break;
							}
						}
					}
				}
				//disegno l'ombretta del cazzo
				drawPageShadow();
				//ciclo su tutti gli elements della pagina, e li renderizzo
				createElements();
			}
			//processo di drawing
			sbam.currentView = "pageEditorCouple";
			//se non è impostata almeno una pagina non procedo
			if ( sbam.project.pages && sbam.pageLeftIdx >= 0 && sbam.project.pages[sbam.pageLeftIdx] || sbam.pageRightIdx >= 0 && sbam.project.pages[sbam.pageRightIdx] ) {
				var curLeftPage = sbam.project.pages[sbam.pageLeftIdx];
				var curRightPage = sbam.project.pages[sbam.pageRightIdx];
				if ( curLeftPage && curLeftPage.type == "single" ) sbam.currentView = "pageEditorSingle";
				//elimino eventuali pages già presenti
				$("#leftPageCont").remove();
				$("#leftPageToolbar").remove();
				$("#rightPageCont").remove();
				$("#rightPageToolbar").remove();
				//alcuni widget di jq mobile vanno distrutti o resta merda nel dom
				//seleziono tutti gli element con id che inizia per "toolbox" e li butto
				var popupGhosts = $("#page-home > .ui-screen-hidden, #page-home > .ui-popup-hidden");
				for ( var k=0; k<popupGhosts.length; k++ ) {
					var popupGhost = popupGhosts[k];
					var popupGhostId = $(popupGhost).attr("id");
					if ( popupGhostId.substring(0,7) == "toolbox" ) $(popupGhost).remove();
				}
				//poi butto tutti gli orfani del plugin spectrum color picker e altra merda che resta nel body
				var popupGhosts = $("body > .ui-panel-dismiss, body > .sp-hidden");
				for ( var k=0; k<popupGhosts.length; k++ ) {
					var popupGhost = popupGhosts[k];
					$(popupGhost).remove();
				}
			
			
			
				//dentro all'outerCont creo un leftPageCont e un rightPageCont con relative toolbar
				//li devo creare sempre tutti e due (left e right), poi sizeAndPosInterface decide quali tenere e quali togliere
				$(sbam.outerCont).append("\
					<div id='leftPageCont'>\
						<canvas id='leftPageCanvas'></canvas>\
					</div>\
					<div id='rightPageCont'>\
						<canvas id='rightPageCanvas'></canvas>\
					</div>\
					<div id='leftPageToolbar' data-role='controlgroup' data-type='vertical' >\
						<a id='prevPageButton' data-iconpos='notext' class='ui-btn ui-icon-arrow-left ui-btn-icon-notext ui-title'></a>\
						<a id='leftPageTemplatesButton' data-iconpos='notext' class='ui-btn ui-icon-th-large ui-btn-icon-notext ui-title'></a>\
					</div>\
					<div id='rightPageToolbar' data-role='controlgroup' data-type='vertical' >\
						<a id='nextPageButton' data-iconpos='notext' class='ui-btn ui-icon-arrow-right ui-btn-icon-notext ui-title'></a>\
						<a id='rightPageTemplatesButton' data-iconpos='notext' class='ui-btn ui-icon-th-large ui-btn-icon-notext ui-title'></a>\
					</div>");
				//assegno i click di pottoni di prev/next page
				$("#prevPageButton").click(function(){
					//trovo quale è la pagina precedente disponibile
					if ( sbam.pageLeftIdx >= 0 ) {
						var prevPageIdx = sbam.pageLeftIdx - 1;
					} else if ( sbam.pageRightIdx >= 0 ) {
						var prevPageIdx = sbam.pageRightIdx - 1;
					}
					//creo loop infinito tra le pagine
					if ( prevPageIdx < 0 ) prevPageIdx = sbam.project.pages.length - 1;
					//carico nuova pagina
					sbam.pageEditor.init(prevPageIdx);
				});
				$("#nextPageButton").click(function(){
					//trovo quale è la pagina precedente disponibile
					if ( sbam.pageRightIdx >= 0 ) {
						var nextPageIdx = sbam.pageRightIdx + 1;
					} else if ( sbam.pageLeftIdx >= 0 ) {
						var nextPageIdx = sbam.pageLeftIdx + 1;
					}
					//creo loop infinito tra le pagine
					if ( nextPageIdx > sbam.project.pages.length - 1 ) nextPageIdx = 0;
					//carico nuova pagina
					sbam.pageEditor.init(nextPageIdx);
				});
				$("#leftPageTemplatesButton").click(function(){
					sbam.applyTemplateTo = "left";
					$("#panelPageTemplates").panel( "open" );
				});
				$("#rightPageTemplatesButton").click(function(){
					//solo nel caso di project a pagine singole uso visualizzo il right page toolbox pur usando la left page. quindi se clicco il right template button, intendo in realtà la left page.
					if ( sbam.currentView == "pageEditorSingle" ) {
						sbam.applyTemplateTo = "left";
					} else {
						sbam.applyTemplateTo = "right";
					}
					$("#panelPageTemplates").panel( "open" );
				});
				
				
				
				//dopo che ho aggiunto tutti gli elementi all'interfaccia, chiamo questo metodo per piazzarli / dimensionarli
				sizeAndPosInterface();
				
				//infine genero gli elementi dinamici con i contenuti delle pagine
				//(lo devo fare dopo il sizeAndPosInterface perchè il rendering si basa sulle dimensioni della pagina)
				if ( sbam.pageLeftIdx >= 0 ) {
					//lancio renderer per popolare il contenuto della pagina
					renderer("#leftPageCont",sbam.pageLeftIdx);
				}
				if ( sbam.pageRightIdx >= 0 ) {
					//lancio renderer per popolare il contenuto della pagina
					renderer("#rightPageCont",sbam.pageRightIdx);
				}
				
				//se la levo? sbam.utils.closeAllPanles();
			}
		},
		/*
		questa viene richiamata quando l'utente modifica un elemento di tipo text
		*/
		updateElementText: function (elementId,content) {
			//prima sanitizzo da eventuale html
			
			//console.log("pageEditor.updateElementText: cerco elementId="+elementId);
			//helper functions
			function updateInPage(pageIdx, elementId, content) {
				//console.log("pageEditor.updateElementText.updateInPage: lo cerco in pageIdx="+pageIdx);
				if ( pageIdx > -1 ) {
					//console.log(sbam.project.pages[pageIdx]);
					if ( sbam.project.pages[pageIdx] && sbam.project.pages[pageIdx].elements && sbam.project.pages[pageIdx].elements.length > 0 ) {
						for ( var i=0; i<sbam.project.pages[pageIdx].elements.length; i++) {
							var element = sbam.project.pages[pageIdx].elements[i];
							if ( element._id == elementId ) {
								//console.log("pageEditor.updateElementText.updateInPage: TROVATO in pageIdx="+pageIdx+" ora ci metto il content: "+content);
								element.text.content = content.replace('\t', '').trim();
								element.text.demoContent = false;
								//e aggiungo all'history
								sbam.history.add("Modify text");
								break;
							}
						}
					}
				}
			}
			//devo trovare il mio element e aggiornare il suo contenuto
			//non può che essere un element di una delle due pagine correntemente aperte
			//quindi cerco prima in una poi nell'altra
			updateInPage(sbam.pageLeftIdx,elementId,content);
			updateInPage(sbam.pageRightIdx,elementId,content);
		}
	},
	utils: {
		uploader: {
			fileSelected: function () {
				//console.log("fileSelected");
				//ciclo su tutti i file solo per calcolare le dimensioni totali...
				var files = document.getElementById('fileToUpload').files;
				var totalFileSize = 0;
				for ( var x=0; x<files.length; x++ ) {
					var file = files[x];
					totalFileSize += file.size;
				}
				//se supero il massimo consentito, blocco
				if ( totalFileSize > sbam.config.maxPostSize ) {
					$("#addMediaButton").addClass("ui-disabled");
					alert("superato il limite massimo di "+Math.round(sbam.config.maxPostSize*100/(1024*1024))/100+" MB per singolo upload. ridurre il numero di file o la dimensione dei file.");
				} else {
					$("#addMediaButton").removeClass("ui-disabled");
				}
				
				var totalFileSizeLabel = 0;
				if (totalFileSize > 1024 * 1024)
					totalFileSizeLabel = (Math.round(totalFileSize * 100 / (1024 * 1024)) / 100).toString() + 'MB';
				else
					totalFileSizeLabel = (Math.round(totalFileSize * 100 / 1024) / 100).toString() + 'KB';
				$("#totalFileSizeLabel").html("Tot.: "+totalFileSizeLabel+" in "+files.length+" file(s)");
				
			},

			uploadFile: function() {
				$("#addMediaButton").addClass("ui-disabled");
				$("#fileToUpload").addClass("ui-disabled");
				//$("#popupAddMedia").addClass("ui-disabled");
				var fd = new FormData();
				var files = document.getElementById('fileToUpload').files;
				for ( var x=0; x<files.length; x++ ) {
					var file = files[x];
					fd.append("fileToUpload"+x, file);
				}
				fd.append("altro", "ciao");
				var xhr = new XMLHttpRequest();
				xhr.upload.addEventListener("progress", sbam.utils.uploader.uploadProgress, false);
				xhr.addEventListener("load", sbam.utils.uploader.uploadComplete, false);
				xhr.addEventListener("error", sbam.utils.uploader.uploadFailed, false);
				xhr.addEventListener("abort", sbam.utils.uploader.uploadCanceled, false);
				xhr.open("POST", "/upload/"+sbam.project._id+"/"+encodeURIComponent(sbam.currentMediaPath));
				
				xhr.send(fd);
			},

			uploadProgress: function(evt) {
				if (evt.lengthComputable) {
					var percentComplete = Math.round(evt.loaded * 100 / evt.total);
					//document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
					if (evt.total > 1024 * 1024)
						var totalLabel = (Math.round(evt.total * 100 / (1024 * 1024)) / 100).toString() + 'MB';
					else
						var totalLabel = (Math.round(evt.total * 100 / 1024) / 100).toString() + 'KB';
					if (evt.loaded > 1024 * 1024)
						var loadedLabel = (Math.round(evt.loaded * 100 / (1024 * 1024)) / 100).toString() + 'MB';
					else
						var loadedLabel = (Math.round(evt.loaded * 100 / 1024) / 100).toString() + 'KB';
					$( "#progressNumber" ).val(percentComplete).slider("refresh");
					$( "#progressLabel" ).html(loadedLabel+" / "+totalLabel);
				}
				else {
					//document.getElementById('progressNumber').innerHTML = 'unable to compute';
				}
			},

			uploadComplete: function(evt) {
				/* This event is raised when the server send back a response */
				$("#addMediaButton").removeClass("ui-disabled");
				$("#fileToUpload").removeClass("ui-disabled");
				//console.log(evt.target.responseText);
				$( "#progressNumber" ).val(0).slider("refresh");
				$( "#progressLabel" ).html("");
				$("#totalFileSizeLabel").html("");
				//$( "#popupAddMedia" ).popup( "close" );
				//ricarico la lista delle immagini nel panel
				console.log("chiamo getMedia");
				sbam.utils.getMedia();
				//infine azzero l'input dei file
				//ATTENZIONE: non so perchè ma: sta roba FUNZIONA ma throwa un errore nel browser, che blocca l'esecuzione ulteriore di questo metodo, quindi VA PER ULTIMA!
				//questa istruzione jquery 
				var uploadInputField = $("#fileToUpload");
				var uploadInputFieldClone = uploadInputField.val('').clone(true);
				uploadInputField.replaceWith(uploadInputFieldClone);
			},

			uploadFailed: function(evt) {
				alert("There was an error attempting to upload the file.");
			},

			uploadCanceled: function (evt) {
				alert("The upload has been canceled by the user or the browser dropped the connection.");
			}			
		},
		getMedia: function() {
			//console.log("utils: getMedia con sbam.currentMediaPath="+sbam.currentMediaPath);
			//leggo tutti i media del mio utente e del mio project via ajax
			//se non è caricato alcun project, skippo:
			if ( !sbam.projectEditor.isProjectLoaded() ) {
				alert( "getMedia() error! No project loaded!" );
			} else {
				$.mobile.loading("show");
				$.ajax({
					type: "POST",
					url: "/getMedia",
					data: { 
						"path": sbam.currentMediaPath, 
						"projectId": sbam.project._id 
					} 
				}).done(function( files ) {
					files = JSON.parse(files);
					//arrivati i files, li disegno nel panel
					//console.log( "Arrivati i files: " );
					//console.log( files );
					
					//butto files eventualmente preesistenti
					$(".mediaItem").remove();
					
					//#### popolo la lista dei media
					if ( files.length == 0 ) {
						$("#empty-media > p").html("Non hai ancora caricato alcuna immagine.");
					} else if ( files.length > 0 ) {
						//visualizzo la dir corrente se non nulla
						if ( sbam.currentMediaPath != "" && sbam.currentMediaPath != "/" ) {
							$("#empty-media > p").html(sbam.currentMediaPath);
						} else {
							$("#empty-media > p").html("Per usare le immagini trascinale nella pagina.");
						}
						//var isSelected = false;
						//se i file che mi ritornano hanno isRepo == true nascondo il bottone add e del
						//(basta che controllo un solo file, tanto hanno tutti lo stesso valore se mi trovo in una cartella che appartiene al mio repo)
						if ( !files[0].isRepo ) {
							$("#buttonAddMedia").hide();
							$("#buttonAddFolder").hide();
						} else {
							$("#buttonAddMedia").show();
							$("#buttonAddFolder").show();
						}
						//devo ribaltarli prima di ciclarci sopra
						files.reverse();
						for( var i=0; i < files.length; i++ ) {
							//per ogni project c'è un item nella lista
							//distinguo tra folders e files
							if ( files[i].type == "folder" ) {
								var dataIcon="carat-r";
								if ( files[i].name == ".." ) {
									dataIcon="carat-u";
								}
								$("#panelMediaListview").append("\
									<li class='mediaItem' data-icon='"+dataIcon+"'>\
										<a id='mediaItem"+i+"' title='"+files[i].name+"'>\
											<img src='"+files[i].thumbUrl+"'>\
											<h2>"+files[i].name+"</h2>\
											<p>"+files[i].name+"</p>\
										</a>\
									</li>");
								//action di click su un folder
								$("#mediaItem"+i).data("foldername", files[i].name);
								$("#mediaItem"+i).click(function() { 
									//quando clicco su una dir ovviamente aggiorno la dir corrente, e ricarico
									//considero il caso della dir "up" 
									var clickedFolder = $(this).data("foldername");
									if ( clickedFolder == ".." ) {
										//salgo di una cartella
										//console.log("OCIO GNARIIII: PRIMA sbam.currentMediaPath="+sbam.currentMediaPath);
										var upperPathChunks = sbam.currentMediaPath.substring(0, sbam.currentMediaPath.length - 1).split("/");
										upperPathChunks.pop();
										sbam.currentMediaPath = upperPathChunks.join("/");
										if ( sbam.currentMediaPath != "" ) sbam.currentMediaPath += "/";
										//console.log("OCIO GNARIIII: DOPO sbam.currentMediaPath="+sbam.currentMediaPath);
									} else {
										//entro nella directory
										sbam.currentMediaPath += clickedFolder+"/";
									}
									//chiamo getMedia nella dir corrente
									sbam.utils.getMedia();
									//scrollo al top (caricando una nuova dir non devo rimanere nella posizione di scroll in cui ero prima)
									window.scrollTo(0,0);
								})
							} else {
								//distinguo tra file del repo dell'utente (quindi modificabili) e file della libreria
								var popupToolboxMedia = "";
								//per ora ho disabilitato il popup dei media, perchè parto dal presupposto che i media non siano nè cancellabili ne modificabili per non perdere le reference nei project
								/*
								if ( files[i].isRepo ) {
									//solo i file dai repo hanno il secondo link che apre la popupToolboxMedia
									popupToolboxMedia = "<a href='#popupToolboxMedia' data-rel='popup' data-position-to='window' data-transition='pop' >Menu</a>";
								}
								*/
								//caso file dal repo dell'utente
								//tutti i file hanno anche il cursore per poter essere draggati
								//e un attributo sul <li> per portarsi dietro i dati dell'immagine per il D&D
								$("#panelMediaListview").append("\
									<li class='mediaItem' data-icon='camera' >\
										<a  id='mediaItem"+i+"' title='"+files[i].name+"' style='cursor:default;'>\
											<img src='"+files[i].thumbUrl+"' class='dragdropForImageAssign' draggedimgurl='"+escape(sbam.currentMediaPath+files[i].name)+"'  style='cursor:pointer;'>\
											<h2>"+files[i].name+"</h2>\
											<p>"+files[i].name+"</p>\
										</a>\
										"+popupToolboxMedia+"\
									</li>");

							}
							
							//e action di click
							//$("#mediaItem"+i).data("project_id", projects[i]._id);
							//$("#mediaItem"+i).click(function() { sbam.projectEditor.init($(this).data("project_id")); });								
						}
						//dopo aver popolato la lista, ne imposto l'altezza per attivare le scrollbar
						$("#panelMediaListview").addClass("vertScrollable");
						var availHeight = $( window ).height() - $("#panelMediaListview").position().top + 8;
						$("#panelMediaListview").css("height",availHeight+"px");
						
						
						//update della listview
						$( "#panelMediaListview" ).listview( "refresh" );
						//abilito il drag and drop di ogni immagine (da fare dopo update della listview)
						//helpers
						function logDD(draggedItem,me, ev, obj) {
							/*
							console.log( me+"() "+[ "There are ",	draggedItem.activeDropRegions.length, " active drop region(s)." ].join('') );
							for ( var x = 0; x < draggedItem.activeDropRegions.length; x++ ) {
								console.log(me+"() activeDropRegion n."+x);
								console.log(draggedItem.activeDropRegions[x]);
							}
							console.log(me+"() ev:");
							console.log(ev);
							console.log(me+"() obj:");
							console.log(obj);
							*/
						}
						function storeDraggedImg(pageIdx,elementIdx,imgUrl) {
							//recupero il mio elemento dalla mia pagina
							var storedElement = sbam.pageEditor.getPageElementById(pageIdx,elementIdx);
							//poi gli scrivo i valori
							if ( !storedElement.image ) storedElement.image = {};
							storedElement.image.url = imgUrl;
							//questi li azzero così al prossimo drawPage verranno impostati automaticamente con un fill() dell'immagine
							storedElement.image.offsetx = false; 
							storedElement.image.offsety = false;
							storedElement.image.dpi = false;
							//aggiorno l'history
							sbam.history.add("Set image");
							return storedElement;
						}						
						$(".dragdropForImageAssign").pep({
							initiate: function() {
								//this.$el.text('initiate')
								//console.log("D&D init");
								//sposto l'elemento draggato fuori dal panel, così posso chiudere il panel senza che l'elemento draggato scompaia
								this.$el.appendTo("body");
								//lo riposiziono
								var curX = sbam.currentMousePos.x - this.$el.outerWidth(true) / 2;
								var curY = sbam.currentMousePos.y - this.$el.outerHeight(true) / 2;
								this.$el.css("border","none");
								this.$el.css("outline","2px dashed rgba(51,136,204,1)");
								this.$el.css("position","absolute");
								this.$el.css("top",curY);
								this.$el.css("left",curX);
								//chiudo tutti i pannelli
								sbam.utils.closeAllPanles();
							},
							start: function(ev, obj) {
								//this.$el.text('start')
								logDD(this,"D&D start", ev, obj);
							},
							stop: function(ev, obj) {
								//this.$el.text('stop')
								//riapro il pannello delle immagini
								//console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
								$("#panelMedia").panel( "open" );
								//console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
								//al drop assegno la nuova immagine all'element che ha ricevuto il drop
								var draggedImageUrl = unescape( this.$el.attr("draggedimgurl") );
								//console.log("draggata imgurl:"+draggedImageUrl);
								//nel caso di drop target multipli, tengo l'ultimo
								if ( this.activeDropRegions.length > 0 ) {
									//trovo l'elementId e il pageId di chi ha ricevuto il drop
									var targetElement = this.activeDropRegions[this.activeDropRegions.length-1][0];
									var targetElementId = $(targetElement).attr("id");
									var targetPageIdx = $(targetElement).attr("pageIdx");
									var targetContainer = $(targetElement).attr("containerSelector");
									//console.log("droppato su:");
									//console.log(targetElementId);
									//alla fine chiamo metodo di store del nuovo url
									var storedElement = storeDraggedImg(targetPageIdx,targetElementId,draggedImageUrl);
									//e ridisegno la pagina
									sbam.pageEditor.drawPage();
								} else {
									//ho fatto il drop su nessuna drop region, quindi non faccio nulla
								}
								logDD(this,"D&D stop", ev, obj);
								this.$el.remove();
							},
							droppable:   '.sbamDroppable',
							drag: function(ev, obj) {
								//evidenzio eventuali target su cui sto passando
								//nel caso di drop target multipli, tengo l'ultimo
								$(".sbamDroppable").removeClass("elementSelected");
								if ( this.activeDropRegions.length > 0 ) {
									var targetElement = this.activeDropRegions[this.activeDropRegions.length-1][0];
									$(targetElement).addClass("elementSelected");
								}
								
								logDD(this,"D&D drag", ev, obj);
							}
						});
						
						/*
						if ( isSelected ) {
							$("#buttonModifyProject").show();
							//assegno il titolo del project corrente (se c'è) al popup di cancellazione projects
							$("#currentProjectTitle").html(sbam.project.name);
						}
						*/
					}
					
					$.mobile.loading("hide");
				}).fail(function( jqXHR, textStatus ) {
					alert( "Request failed: " + textStatus );
				});		
			}
		},
		addFolder: function() {
			$.mobile.loading("show");
			$.ajax({
				type: "POST",
				url: "/addFolder",
				data: { 
					"path": sbam.currentMediaPath, 
					"projectId": sbam.project._id, 
					"folder": sbam.utils.form2json('#addFolderForm')  
				} 
			}).done(function(result) {
				result = JSON.parse(result);
				$.mobile.loading("hide");
				if ( result.errormsg && result.errormsg != "" ) {
					console.log( "NON creata folder con errormsg: "+result.errormsg );
					$("#addFolderErrormsg").html(result.errormsg);
					$("#addFolderErrormsg").show();
				} else {
					//console.log( "Salvato il project con result: " );
					//console.log( result );
					$("#addFolderErrormsg").hide();
					$("#addFolderForm #name").val("");
					$("#popupAddFolder").popup( "close" );
					//ricarico la lista dei media
					sbam.utils.getMedia();
				}
			}).fail(function( jqXHR, textStatus ) {
				alert( "Request failed: " + textStatus );
			});		
		},
		closeAllPanles: function() {
			$("#panelPages").panel( "close" );
			$("#panelPageTemplates").panel( "close" );
			$("#panelHistory").panel( "close" );
			$("#panelProjects").panel( "close" );
			$("#panelMedia").panel( "close" );
			//azzero eventuale scroll dovuto a pannelli più lunghi dallo schermo
			window.scrollTo(0,0);
		},
		updateButtons: function() {
			if ( sbam.history.snapshots.length > 2 && sbam.history.position > 1 ) {
				sbam.history.mustSave = true;
			} else {
				sbam.history.mustSave = false;
			}
			//bottone history
			//se history length è 0 lo disabilito
			if ( !sbam.history.snapshots || sbam.history.snapshots.length == 0 ) {
				$("#buttonHistory").addClass("ui-state-disabled");
			} else {
				$("#buttonHistory").removeClass("ui-state-disabled");
			}
			
			//bottoni undo/redo
			//se la lista è vuota (o contiene solo la snapshot di init, che non si può eliminare) disabilito sia undo che redo
			if ( sbam.history.snapshots.length <= 1 ) {
				$("#buttonUndo").addClass( "ui-state-disabled" );
				$("#buttonRedo").addClass( "ui-state-disabled" );
			//se la position è 0 e la length > 0 disabilito solo l'undo
			} else if ( sbam.history.snapshots.length > 1 && sbam.history.position == 0 ) {
				$("#buttonUndo").addClass( "ui-state-disabled" );
				$("#buttonRedo").removeClass( "ui-state-disabled" );
			//se la position è l'ultima dell'history, disabilito solo il redo
			} else if ( sbam.history.snapshots.length > 1 && sbam.history.position > 0 && sbam.history.position == sbam.history.snapshots.length - 1 ) {
				$("#buttonUndo").removeClass( "ui-state-disabled" );
				$("#buttonRedo").addClass( "ui-state-disabled" );
			//altrimenti abilito entrambi
			} else if ( sbam.history.snapshots.length > 1 && sbam.history.position > 0 && sbam.history.position < sbam.history.snapshots.length - 1 ) {
				$("#buttonUndo").removeClass( "ui-state-disabled" );
				$("#buttonRedo").removeClass( "ui-state-disabled" );
			}
			
			//cambio colore al save (lo metto rosso, per indicare che il documento è stato modificato)
			//e conseguentemente al print, che va all'opposto del save (se devo salvare non posso stampare, e viceversa)
			if ( sbam.history.mustSave ) {
				$("#buttonSave").css( "background-color","#ffbbbb" );
				$("#buttonSave").removeClass( "ui-state-disabled" );
				$("#buttonPrint").addClass( "ui-state-disabled" );
			} else {
				$("#buttonSave").css( "background-color","rgb(246, 246, 246)" );
				$("#buttonSave").addClass( "ui-state-disabled" );
				$("#buttonPrint").removeClass( "ui-state-disabled" );
			}

			//bottone pages
			//if ( !sbam.project || $.isEmptyObject(sbam.project) || ( sbam.project && sbam.project.type=="poster" ) ) {
			if ( !sbam.projectEditor.isProjectLoaded() ) {
				//se un project non è caricato, oppure se è di tipo poster, non le visualizzo
				//console.log("NON caricato");
				$("#buttonPages").addClass( "ui-state-disabled" );
				$("#buttonMedia").addClass( "ui-state-disabled" );
			} else {
				//console.log("caricato");
				$("#buttonPages").removeClass( "ui-state-disabled" );
				$("#buttonMedia").removeClass( "ui-state-disabled" );
			}
		},
		sortByPageTypeAndNum: function (a,b) {
			var dict = {
				'single': 0,
				'cover-1-front': 1,
				'cover-2-front': 2,
				'left': 3,
				'right': 3,
				'cover-3-back': 4,
				'cover-4-back': 5,
			};
			if (dict[a.type] < dict[b.type]) return -1; //a < b
			if (dict[a.type] > dict[b.type]) return 1; //a > b
			if (dict[a.type] == dict[b.type]) {
				if (a.num < b.num) return -1; //a < b
				if (a.num > b.num) return 1;//a > b
			}
			return 0;
		},
		isOdd: function(num) { 
			return num % 2; 
		},
		form2json: function (formSelector) {
			var formArr = $(formSelector).serializeArray();
			var formJson = {};
			for ( var i=0; i<formArr.length; i++ ) {
				formJson[formArr[i].name] = formArr[i].value;
			}
			return formJson;
		},
		stripHtml: function (html) {
			//cerco di preservare le mandate a capo prima di strippare i tag
			html = html.replace(/<div>/g, '####ACCAPOOOO####').trim();
			html = html.replace(/<\/div>/g, '').trim();
			html = html.replace(/<br>/g, '####ACCAPOOOO####').trim();
			html = html.replace(/<br\>/g, '####ACCAPOOOO####').trim();
			//tolgo i tags con un noto stratagemma
			var tmp = document.createElement("DIV");
			tmp.innerHTML = html;
			//ritorno, rimettendo i br
			return tmp.textContent.replace(/####ACCAPOOOO####/g,'<br>') || tmp.innerText.replace(/####ACCAPOOOO####/g,'<br>') || "";
		},
		
		/*
		posizionatore universale mille usi ecobio
		
		fw: father (container) width
		fh: father (container) height
		cw: child (content) width
		ch: child (content) height
		mt,mb,ml,mr: margini (top, bottom, left, right) da considerare tra il child e il father (padding interni del father, o margin esterno del child)
		m: margin da tenere nell'output, def. 0
		crop: se true il figlio viene opportunamente zoomato e ritagliato per riempire completamente l'area disponibile del padre, altrimenti viene zoomato affinchè sia completamente visibile
		align: "left","right","top","bottom","center" (default "center")
		
		*/
		thepositioner: function(fw,fh,cw,ch,crop,align,mt,mb,ml,mr) {
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
		},
		thepositionerPageLeft: function(fw,fh,cw,ch,mt,mb,ml,mr) {
			var res = sbam.utils.thepositioner(fw/2,fh,cw,ch,false,"right",mt,mb,ml,mr);
			res.x += ml;
			return res;
		},
		thepositionerPageRight: function(fw,fh,cw,ch,mt,mb,ml,mr) {
			var res = sbam.utils.thepositioner(fw/2,fh,cw,ch,false,"left",mt,mb,ml,mr);
			res.x += fw/2 - ml;
			return res;
		},
		dpi2dpmm: function (dpi) {
			//1 Dots per inch = 0.0394 Dots per mm
			return dpi * 0.0394;
		},
		dpmm2dpi: function (dpmm) {
			//1 Dots per mm = 25.38071066 Dots per inch
			return dpmm * 25.38071066;
		},
		hexToRgb: function (hex) {
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result ? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			} : null;
		},
		rgbToHex: function(r, g, b) {
			//helpers
			function componentToHex(c) {
				var hex = c.toString(16);
				return hex.length == 1 ? "0" + hex : hex;
			}
			return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
		},
		screenResizeManager: {
			interval: false,
			lastW: 0,
			lastH: 0,
			resizeHandler: function () {
				//questa viene chiamata ad ogni resize dello schermo, quindi anche con chiamate molto frequenti e ravvicinate
				//non posso chiamare ogni volta un drawPage, quindi uso un interval che controlla ogni tot tempo se le dimensioni sono cambiate
				//finchè cambiano resta attivo
				//quando non cambiano più, l'interval muore e chiama drawPage
				
				//prima controllo se non esiste il timer
				if ( sbam.utils.screenResizeManager.interval ) {
					//se esiste già l'intervallo, skippo, perchè me ne basta uno che controlla il resize
					//console.log("ESISTE GIA INTERVAL DI RESIZE; SKIPPO");
				} else {
					//console.log("CREO INTERVAL DI RESIZE;");
					//non esiste il timer. lo creo
					sbam.utils.screenResizeManager.interval = setInterval(function(){
						//controllo se il vecchio size dello schermo è uguale al size attuale dello schermo
						if ( sbam.utils.screenResizeManager.lastW == $( window ).width() && sbam.utils.screenResizeManager.lastH == $( window ).height()  ) {
							//il resize sembra finito
							//elimino l'interval. se poi il resize riparte, verrà creato un nuovo interval.
							clearInterval(sbam.utils.screenResizeManager.interval);
							sbam.utils.screenResizeManager.interval = false;
							//ora posso ridisegnare la pagina
							sbam.pageEditor.drawPage();
						} else {
							//il resize sta continuando, aggiorno i valori e aspetto il prossimo iterate dell'interval
							sbam.utils.screenResizeManager.lastW = $( window ).width();
							sbam.utils.screenResizeManager.lastH = $( window ).height();
						}
					}, 200);
				}
			}
		}
	}
};
console.log("sobuame on init!");







/* #### OTHER GLOBAL FUNCTIONS #### */

jQuery.fn.selectText = function(){
   var doc = document;
   var element = this[0];
   //console.log(this, element);
   if (doc.body.createTextRange) {
       var range = document.body.createTextRange();
       range.moveToElementText(element);
       range.select();
   } else if (window.getSelection) {
       var selection = window.getSelection();        
       var range = document.createRange();
       range.selectNodeContents(element);
       selection.removeAllRanges();
       selection.addRange(range);
   }
};


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
























 
 
 
 
 
 
 
 

/* #### THEN THINGS TO DO ON READY #### */

$(document).ready(
	function() {
		console.log("sobuame on ready!");

		//attivo il resize event
		$( window ).resize( sbam.utils.screenResizeManager.resizeHandler );
		
		//on clic sullo sfondo chiudo tutti i toolbox (quantomeno)
		$(".sbamMainContainer").click(function(e){
			if( e.target === this ) {
				$( ".elementTextToolbox").fadeOut("fast");
				sbam.utils.closeAllPanles();
			}
		});
		
		//attivo i bottoni undo/redo per l'history
		$("#buttonUndo").click( sbam.history.undo );
		$("#buttonRedo").click( sbam.history.redo );
		$("#buttonResetHistory").click( sbam.history.reset );
		
		//attivo bottone di print
		$("#popupPrintProjectButton").click(sbam.projectEditor.printProject);
		
		//ogni volta che apro un pannello devo popolarlo in ajax
		
		//panel projects
		$("#panelProjects").panel({ beforeopen: function() { 
			sbam.projectEditor.getProjects(); 
		}});
		$("#panelProjects").panel({ open: function() { 
			$(window).scrollTop(this.lastScrollPosition); 
		}});
		$("#panelProjects").panel({ beforeclose: function(){ 
			this.lastScrollPosition = $(window).scrollTop(); 
		}});
		
		//panel pages
		$("#panelPages").panel({ beforeopen: function() {
			sbam.pageEditor.getPages();
		}});
		$("#panelPages").panel({ open: function() {
			$(window).scrollTop(this.lastScrollPosition); 
		}});
		$("#panelPages").panel({ beforeclose: function(){ 
			this.lastScrollPosition = $(window).scrollTop(); 
		}});
		
		//panel page templates
		$("#panelPageTemplates").panel({ beforeopen: function() {
			sbam.pageEditor.getPageTemplates();
		}});
		$("#panelPageTemplates").panel({ open: function() {
			$(window).scrollTop(this.lastScrollPosition); 
		}});
		$("#panelPageTemplates").panel({ beforeclose: function(){ 
			this.lastScrollPosition = $(window).scrollTop(); 
		}});
		
		//panel history
		$("#panelHistory").panel({ beforeopen: function() {
			sbam.history.getHistory();
		}});
		$("#panelHistory").panel({ open: function() {
			$(window).scrollTop(this.lastScrollPosition); 
		}});
		$("#panelHistory").panel({ beforeclose: function(){ 
			this.lastScrollPosition = $(window).scrollTop(); 
		}});
		
		//panel media
		$("#panelMedia").panel({ beforeopen: function(){ 
			sbam.utils.getMedia(); 
		}});
		$("#panelMedia").panel({ open: function(){ 
			$(window).scrollTop(this.lastScrollPosition); 
		}});
		$("#panelMedia").panel({ beforeclose: function(){ 
			this.lastScrollPosition = $(window).scrollTop(); 
		}});
		
		//account login
		$("#accountLoginButton").click( function() {
			sbam.projectEditor.saveProject(function(){
				window.location = "/login";
			});
		});
		
		//projects
		//save
		$("#buttonSave").click( sbam.projectEditor.saveProject );
		//del project
		$("#delProjectButton").click( sbam.projectEditor.delProject );
		//new project (sia on enter che on click)
		$("#addProjectButton").click( sbam.projectEditor.addProject );
		$("#addProjectForm").submit(function( event ) {
			event.preventDefault();
			sbam.projectEditor.addProject();
		});
		//modify project (che poi chiama ancora saveProject)
		$("#modifyProjectButton").click( function() { 
			$("#popupModifyProject").popup( "close" ); 
			sbam.projectEditor.saveProject( sbam.projectEditor.getProjects ); 
		} );
		$("#modifyProjectForm").submit(function( event ) {
			event.preventDefault();
			sbam.projectEditor.saveProject();
		});
		$("#popupModifyProject").popup({ afteropen: function() {
			//precopmilo il form di modifica del project
			$("#modifyProjectForm input#name").val(sbam.project.name);
			$("#modifyProjectForm input#spline").val(sbam.project.spline);
		}});
		$("#popupModifyProject").popup({ afterclose: function() {
			//azzero il form di modifica del project
			$("#modifyProjectForm input#name").val("");
			$("#modifyProjectForm input#spline").val("");
		}});
		$("#modifyProjectForm input#name").change(function( event ) {
			sbam.project.name = $("#modifyProjectForm input#name").val();
		});
		$("#modifyProjectForm input#spline").change(function( event ) {
			sbam.project.spline = $("#modifyProjectForm input#spline").val();
		});
		//print project
		$( "#popupPrintProject" ).popup({ afterclose: function( event, ui ) {
			$("#pdfDownloadLink").hide();
			$("#popupPrintProjectButton").show();
		}});	

		
		//pages
		//new page
		$("#buttonAddPage").click( sbam.pageEditor.addPage );
		//del page
		$("#delPageButton").click( sbam.pageEditor.delPagesCouple );
		
		
		//media
		//folders
		$("#addFolderForm").submit(function( event ) {
			event.preventDefault();
		});		
		$("#addFolderButton").click( sbam.utils.addFolder );
		$("#addFolderForm #name").on("keyup keypress blur change", function(){
			var dirty = $("#addFolderForm #name").val();
			var clean = dirty.replace(/[^a-z0-9]/gi,'');
			$("#addFolderForm #name").val(clean);
		});

		
		//eventi legati ai cambi di contenuti in fase di editing
		$('body').on('focus', '[contenteditable]', function() {
			///console.log("PRIMA EDITING: "+$(this).html());
			//all'inizio dell'editing (on focus) salvo una copia del testo prima che l'utente lo modifichi
			//prima strippo i tag html 
			var sanitizedContent = sbam.utils.stripHtml($(this).html());
			//console.log("PRIMA EDITING: sanitizedContent"+sanitizedContent);;
			$(this).data('before', sanitizedContent)
			return $(this);
		}).on('blur', '[contenteditable]', function() {
			//console.log("DOPO EDITING: "+$(this).html());
			//alla fine dell'editing controllo se il contenuto è cambiato durante l'editing
			//prima strippo i tag html 
			var sanitizedContent = sbam.utils.stripHtml($(this).html());
			//console.log("DOPO EDITING: sanitizedContent"+sanitizedContent);
			if ($(this).data('before') !== sanitizedContent) {
				//il contenuto è cambiato, quindi lo salvo nella pagina
				$(this).data('before', sanitizedContent); //azzero il before mettendolo uguale al testo appena modificato
				$(this).trigger('change');
				//alert("avremmo cambiato: "+$(this).data('before'));
				//chiamo updateElementText
				sbam.pageEditor.updateElementText($(this).parent().attr("id"),$(this).data('before'));
			}
			return $(this);
		});
		
		//tengo sempre memorizzata in una variabile comune la posizione del mouse 
		//che mi serve per alcuni casi del drag and drop
		$(document).mousemove(function(event) {
			sbam.currentMousePos.x = event.pageX;
			sbam.currentMousePos.y = event.pageY;
		});
		
	}
);







	
	
/* #### FINALLY THINGS TO DO ON LOAD (AFTER ALL IMAGES ARE LOADED) #### */
	
$(window).load(
	function() {
		console.log("sobuame on load!");
	}
);



