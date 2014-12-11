if ( true ) {

/* #### GLOBAL SOBUAME (sbam) CLIENT APPLICATION #### */

var sbam = {
	config: {
		mainMarginLeft: 30, //sono i margini (px) considerati per posizionare la coppia di pagine aperte. si riferiscono alla window, quindi il margin top deve considerare anche la navigation bar per non andargli sopra
		mainMarginRight: 30, 
		mainMarginTop: 45, 
		mainMarginBottom: 25,
		defaultPdfDpi: 300, //risoluzione di stampa (dpi) per il project corrente
		imagesDpiMin: 100, //risoluzione minima sotto la quale non lascio andare l'utente. da questa risoluzione ricavo anche il valore massimo del cursore di zoom (dpi)
		imagesDpiMinWarn: 150, //risoluzione sotto la quale viene visualizzata un'icona di warning per bassa risoluzinoe (dpi)
		imagesDpiMax: 4800, //risoluzione massima sopra la quale non lascio andare l'utente. da questa risoluzione ricavo anche il valore minimo del cursore di zoom (dpi)
		maxPostSize: 104857600, // 100 MB - nota che va cambiato anche sul server in app.js
		defaultTaxPerc: 0.04, //per default tasse (iva) al 4%
		stickersPerPack: 5, //numero di figurine per pacchetto
		stickersPackPrice: 0.7, //prezzo pacchetto di figurine
		stickersWcProductId: 3538, //id del product di woocommerce da usare nell'ordine per le figurine
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
		] //array con i nomi dei font (al netto del suffisso .ttf) presenti in fontDir e usabili dall'utente (compaiono come dropdown menu nella toolbox degli elementi di tipo text)
	},
	project: {}, //projetto aperto corrente come ritornato dalla query al db
	//NO user: {}, //se l'utente ha effettuato il login, qui ci sono i suoi dati come salvati nel database di wordpress
	order: {}, //se l'utente apre il popup di ordine, qui ci salvo tutti i dati dell'ordine. quest'oggetto poi lo passo al backend per salvare l'ordine nel db
	pageLeftIdx: -1, //questa contiene l'index dell'array sbam.project.pages[] riferito alla pagina correntemente caricata in page editor come pagina sinistra
	pageRightIdx: -1, //questa contiene l'index dell'array sbam.project.pages[] riferito alla pagina correntemente caricata in page editor come pagina sinistra
	currentView: "", //può valere "projectEditor" o "pageEditorCouple" o "pageEditorSingle"
	applyTemplateTo: "", //può valere "left" o "right" e indica quale bottone di cambio layout è stato cliccato, per sapere si quale pagina applicare il nuovo template
	currentMediaPath: "", //è il path corrente relativo al repository dell'utente e del project correntemente aperto (se vuoto è inteso come la root del repository dell'utente e del project correntemente aperto: repo/USERID/files/project_PROJECTID/)
	widgetImgCache: {}, //una cache per la chiamata ajax a /getWidgetInfo
	currentMousePos: { x: -1, y: -1 }, //qui viene costantemente memorizzata la posizione attuale del mouse, mi serve per gestire alcuni eventi del drag and drop
	outerCont: "div#page-home > div.ui-content", //è il selector jquery che identifica il container in cui disegnare tutto sobuame
	platform: {}, //può contenere le customizzazioni per la piattaforma specificata in sbamPlatform. (usata per differenziare tuolibro dalle figurine)
	projectTypesAndPresets: {}, //questi vengono caricati da file json on init dell'app
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
				sbam.utils.startWaiting();
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
					sbam.utils.stopWaiting();
				}).fail(function( jqXHR, textStatus ) {
					alert( "Request failed: " + textStatus );
					console.log( "Request failed: " + textStatus );
				});						
			}
		},
		getProjects: function () {
			//console.log("projectEditor: getProjects");
			//leggo tutti i projects del mio utente via ajax
			sbam.utils.startWaiting();
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
				$("#buttonCloneProject").hide();
				//assegno il titolo del project corrente (se c'è) al popup di cancellazione projects
				$("#currentProjectTitle").html("");
				//################ popolo il popup di creazione new project ################
				//helper function
				function resetAddForm(){
					//azzero i campi hidden
					$("#addProjectForm input#width").val("");
					$("#addProjectForm input#height").val("");
				}
				//rimuovo eventuale type già presente
				$("#typeFieldset").remove();
				//rimuovo eventuale orientation già presente
				$("#orientationFieldset").remove();
				//rimuovo eventuale preset già presente
				$("#presetFieldset").remove();
				//azzero i campi hidden
				resetAddForm();
				//ricreo e popolo il type
				//lo appendo appena dopo il field "nome"
				$("#addProjectForm div.ui-input-text").after("<fieldset id='typeFieldset' data-role='controlgroup' data-type='horizontal' data-mini='true' ><legend>Tipo</legend></fieldset>");
				//ciclo sui types disponibili e per ciascuno aggiungo un radio button
				//tenendo conto della platform
				for (var typeField in sbam.projectTypesAndPresets) {
					if ( sbam.projectTypesAndPresets.hasOwnProperty(typeField) && typeof sbam.projectTypesAndPresets[typeField] !== 'function') {
						//in pratica la platform tuolibro vede solo i libri, e viceversa
						if ( 
							( typeField == "libro" && sbamPlatform == "tuolibro" )
							||
							( typeField != "libro" && sbamPlatform != "tuolibro" )
						) {
							$("#typeFieldset").append("<input type='radio' name='type' id='type-"+typeField+"' value='"+typeField+"' ><label for='type-"+typeField+"'>"+sbam.projectTypesAndPresets[typeField].label+"</label>");
						}
					}
				}				
				$("#typeFieldset").controlgroup();
				$("#typeFieldset").trigger('create');
				//onchange del type, devo creare il selettore di preset
				$("#typeFieldset input:radio").change(function(){
					//azzero i campi hidden
					resetAddForm();
					
					var selectedType = $(this).val();
					
					//#### genero il selettore di orientation (che va in coppia con i preset su cui agisce da filtro)
					//rimuovo eventuale orientation già presente
					$("#orientationFieldset").remove();
					//ricreo e popolo le orientation
					$("#typeFieldset").after("<fieldset id='orientationFieldset' data-role='controlgroup' data-type='horizontal' data-mini='true' ><legend>Orientamento</legend></fieldset>");
					$("#orientationFieldset").append("<input type='radio' name='orientation' id='orientation-orizzontale' value='orizzontale' ><label for='orientation-orizzontale'>orizzontale</label>");
					$("#orientationFieldset").append("<input type='radio' name='orientation' id='orientation-verticale' value='verticale' ><label for='orientation-verticale'>verticale</label>");
					$("#orientationFieldset").append("<input type='radio' name='orientation' id='orientation-square' value='quadrato' ><label for='orientation-square'>quadrato</label>");
					//$("#orientationFieldset input#orientation-"+preset.code).data("width", preset.width);
					//$("#orientationFieldset input#orientation-"+preset.code).data("height", preset.height);
					//onchange dell'orientation filtro i preset visualizzati
					$("#orientationFieldset input:radio").change(function(){
						var selectedOrientation = $(this).val();
						//#### genero il selettore di preset
						//rimuovo eventuale preset già presente
						$("#presetFieldset").remove();
						//ricreo e popolo i preset
						$("#orientationFieldset").after("<fieldset id='presetFieldset' data-role='controlgroup' data-type='vertical' data-mini='true' class='vertScrollable' ><legend>Versione</legend></fieldset>");
						for (var i=0; i < sbam.projectTypesAndPresets[selectedType].presets.length; i++ ) {
							var preset = sbam.projectTypesAndPresets[selectedType].presets[i];
							//visualizzo solo i preset filtrati da orientation
							if ( preset.label.indexOf(selectedOrientation) > -1 ) {
								$("#presetFieldset").append("<input type='radio' name='preset' id='preset-"+preset.code+"' value='"+preset.code+"' ><label for='preset-"+preset.code+"'>"+preset.label+"</label>");
								$("#presetFieldset input#preset-"+preset.code).data("width", preset.width);
								$("#presetFieldset input#preset-"+preset.code).data("height", preset.height);
							}
						}	
						$("#presetFieldset").controlgroup();
						$("#presetFieldset").trigger('create');
						
						//infine riposiziono il popup che potrebbe aver cambiato le dimensioni ed essere finito offscreen
						sbam.utils.recenterPopup("#popupAddProject");
						
						
						
						
					});
					$("#orientationFieldset").controlgroup();
					$("#orientationFieldset").trigger('create');
					
					//infine riposiziono il popup che potrebbe aver cambiato le dimensioni ed essere finito offscreen
					sbam.utils.recenterPopup("#popupAddProject");
				});  
				//dopo averlo popolato, riposiziono il popup
				sbam.utils.recenterPopup("#popupAddProject");
				
					
				//################ popolo la lista dei projects ################
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
									<h2>"+((projects[i].status == "ordered")?"*":"")+projects[i].name+"</h2>\
									<p><strong>"+projects[i].type+((projects[i].status == "ordered")?" * CLOSED":"")+"</strong><br/>"+projects[i].preset.label+"<br/><i>pag. "+projects[i].pagesNum+", "+projects[i].preset.rilegatura+"</i></p>\
								</a>\
							</li>");
						//con relativa action di click che inizializza il projectEditor sul progetto cliccato
						$("#projectItem"+i).data("project_id", projects[i]._id);
						//$("#projectItem"+i).click(function() { sbam.utils.closeAllPanles(); sbam.projectEditor.init($(this).data("project_id")); });
						$("#projectItem"+i).click(function() { sbam.projectEditor.init($(this).data("project_id")); });
						//se poi l'item corrente è il selezionato, gli evidenzio lo sfondo
						if ( thisIsSelected && projects[i].status != "ordered" ) {
							$("#projectItem"+i).addClass("bgGreen");
						} else if ( thisIsSelected && projects[i].status == "ordered" ) {
							$("#projectItem"+i).addClass("bgMoreDark");
						//se invece l'item corrente è stato già ordinato, lo differenzio dagli altri
						} else if ( projects[i].status == "ordered" ) {
							$("#projectItem"+i).addClass("bgDark");
						}
					}
					if ( oneIsSelected ) {
						$("#buttonDelProject").show();
						$("#buttonModifyProject").show();
						$("#buttonCloneProject").show();
						//assegno il titolo del project corrente (se c'è) al popup di cancellazione projects
						$("#currentProjectTitle").html(sbam.project.name);
					}
					//dopo aver popolato la lista, ne imposto l'altezza per attivare le scrollbar
					$("#panelProjectsListview").addClass("vertScrollable");
					var availHeight = $( window ).height() - $("#panelProjectsListview").position().top - 16;
					$("#panelProjectsListview").css("height",availHeight+"px");
				}
				sbam.utils.stopWaiting();
			}).fail(function( jqXHR, textStatus ) {
				alert( "Request failed: " + textStatus );
			});		
		},
		addProject: function () {
			//console.log("projectEditor: addProject");
			//blocco il caso in cui sto cercando di fare un add di un project e non ho scelto un orientamento e/o un preset
			if ( !$("input[name=type]:checked", "#addProjectForm").val() ) {
				alert("E' obbligatorio scegliere un tipo.");
			} else if ( !$("input[name=orientation]:checked", "#addProjectForm").val() ) {
				alert("E' obbligatorio scegliere un orientamento.");
			} else if ( !$("input[name=preset]:checked", "#addProjectForm").val() ) {
				alert("E' obbligatorio scegliere una versione.");
			} else {
				sbam.utils.startWaiting();
				$.ajax({
					type: "POST",
					url: "/addProject",
					data: {
						'form': sbam.utils.form2json('#addProjectForm'), 
						'preset': sbam.projectEditor.getPresetByTypeAndName($("input[name=type]:checked", "#addProjectForm").val(),$("input[name=preset]:checked", "#addProjectForm").val())
					}
				}).done(function( result ) {
					result = JSON.parse(result);
					sbam.utils.stopWaiting();
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
		getPresetByTypeAndName: function(type,name) {
			var selectedPreset = false;
			if ( sbam.projectTypesAndPresets[type] && sbam.projectTypesAndPresets[type].presets && sbam.projectTypesAndPresets[type].presets.length > 0 ) {
				var presets = sbam.projectTypesAndPresets[type].presets;
				for (var i=0; i<presets.length; i++) {
					var preset = presets[i];
					if ( preset.code == name ) {
						selectedPreset = preset;
						break;
					}
				}
			}
			return selectedPreset;
		},
		cloneProject: function () {
			if ( sbam.project && sbam.project._id ) {
				sbam.utils.startWaiting();
				$.ajax({
					type: "POST",
					url: "/cloneProject",
					data: { "id": sbam.project._id }
				}).done(function( result ) {
					result = JSON.parse(result);
					sbam.utils.stopWaiting();
					if ( result.errormsg && result.errormsg != "" ) {
						console.log( "NON Clonato il project con errormsg: "+result.errormsg );
					} else {
						//carico il nuovo progetto
						//sbam.projectEditor.init(result._id);
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
			sbam.utils.startWaiting();
			$.ajax({
				type: "POST",
				url: "/modifyProject",
				data: {
					'form': sbam.utils.form2json('#modifyProjectForm')
				}
			}).done(function( result ) {
				result = JSON.parse(result);
				sbam.utils.stopWaiting();
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
			sbam.utils.startWaiting();
			$.ajax({
				type: "POST",
				url: "/delProject",
				data: { "id": sbam.project._id }
			}).done(function( result ) {
				if ( result ) {
					//siccome posso solo cancellare il progetto correntemente caricato,
					//devo anche azzerare il project caricato
					sbam.projectEditor.unloadProject();
					sbam.utils.stopWaiting();
					sbam.projectEditor.getProjects();
				}
			}).fail(function( jqXHR, textStatus ) {
				alert( "Request failed: " + textStatus );
				console.log( "Request failed: " + textStatus );
			});						
		},
		loadProject: function(project) {
			//salvo in locale il project che mi arriva come parametro
			//NOTA: questo è l'unico punto in cui manipolo direttamente sbam.project (a parte in sbam.history.restore())
			sbam.project = project;
			//ovviamente dopo che ho caricato un nuovo project devo invalidare le pagine precedentemente caricate
			sbam.pageEditor.unloadPages();
			//e azzerare il current media path
			sbam.currentMediaPath = "";
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
			sbam.utils.startWaiting();
			$.ajax({
				type: "POST",
				url: "/printProject",
				data: { "id": sbam.project._id }
			}).done(function( prjPdfUrls ) {
				prjPdfUrls = JSON.parse(prjPdfUrls);
				//arrivato il prjPdfUrls
				//alert("pdf completato: "+prjPdfUrls);
				sbam.utils.stopWaiting();
				$("#mainPdfDownloadLink").attr("href",prjPdfUrls.main);
				$("#mainPdfDownloadLink").show();
				if ( prjPdfUrls.cover ) {
					$("#coverPdfDownloadLink").attr("href",prjPdfUrls.cover);
					$("#coverPdfDownloadLink").show();
				}
				if ( prjPdfUrls.coverlet ) {
					$("#coverletPdfDownloadLink").attr("href",prjPdfUrls.coverlet);
					$("#coverletPdfDownloadLink").show();
				}
				if ( prjPdfUrls.order ) {
					$("#orderPdfDownloadLink").attr("href",prjPdfUrls.order);
					$("#orderPdfDownloadLink").show();
				}
				if ( prjPdfUrls.stickers ) {
					$("#stickersPdfDownloadLink").attr("href",prjPdfUrls.stickers);
					$("#stickersPdfDownloadLink").show();
				}
				$("#printProjectButton").hide();
			}).fail(function( jqXHR, textStatus ) {
				alert( "Request failed: " + textStatus );
				console.log( "Request failed: " + textStatus );
				sbam.utils.stopWaiting();
			});						
		},
		/* 
		questo metodo in base ai dati del project, dell'utente, e a qty, definisce il dettaglio dell'ordine
		*/
		updateProjectOrder: function() {
			//helpers
			function getStickersNum() {
				//calcolo il numero di figurine
				//per farlo devo ciclare su tutte le pagine del project, e per ogni pagina su tutti gli elements
				var stickersNum = 0;
				if ( sbam.project.pages ) {
					for ( var i=0; i<sbam.project.pages.length; i++ ) {
						var page = sbam.project.pages[i];
						if ( page.elements ) {
							for ( var j=0; j<page.elements.length; j++ ) {
								var element = page.elements[j];
								if ( element.type == 'image' && element.image && element.image.type && element.image.type == "sticker" && element.image.url && element.image.stickerLayout )  {
									var layout = sbam.pageEditor.parseStickerLayout(element.image.stickerLayout);
									stickersNum += layout.stickerLayoutCols * layout.stickerLayoutRows;
								}
							}
						}
					}
				}
				return stickersNum;
			}
			
			function discountByPageNum(price) {
				//fasce di sconto per numero di pagine
				//Nr. pagine: 	  	20-48		50-98		100-148		150+
				//Sconto:			0%			-6%			-10%		-14%
				var num = sbam.pageEditor.getPagesNum();
				var discount = 0; //perc da 0 a 1
				if ( num >= 50 && num <100 ) {
					discount = 0.06; //6%
				} else if ( num >= 100 && num <150 ) {
					discount = 0.1; //10%
				} else if ( num >= 150 ) {
					discount = 0.14; //14%
				}
				price = price * ( 1 - discount );
				return { 'price':price, 'discount':discount };
			}
			function discountByCouponPriceMultiply(coupon,price) {
				if ( coupon && !isNaN(coupon.priceMultiply) ) {
					price = price * coupon.priceMultiply;
				}
				return price;
			}
			function discountByCouponPriceAdd(coupon,price) {
				if ( coupon && !isNaN(coupon.priceAdd) ) {
					
					price += coupon.priceAdd;
				}
				return price;
			}
			function discountByQty(price,qty) {
				//fasce di sconto per numero di pagine
				//da 5 a 9 copie -5%, da 10 a 19 copie 10%, da 20 copie 15%
				var discount = 0; //perc da 0 a 1
				if ( qty >= 5 && qty <10 ) {
					discount = 0.05; //5%
				} else if ( qty >= 10 && qty <20 ) {
					discount = 0.1; //10%
				} else if ( qty >= 20 ) {
					discount = 0.15; //15%
				}
				price = price * ( 1 - discount );
				return { 'price':price, 'discount':discount };
			}
			//elimino un eventuale order già visualizzato
			$("#orderContainer").empty();
			
			//azzero ordine eventualmente già valorizzato
			sbam.order = {};
			
			//raccolgo/calcolo tutti i dati dell'ordine, 
			//e li salvo in una variabile globale perchè li calcolo solo qui, 
			//e poi li passo pari pari via ajax al backend per salvare l'ordine nel db.
			//leggo la quantità di copie scelta dall'utente
			sbam.order.qty = parseInt($("#orderQty").val());
			if ( isNaN( sbam.order.qty ) ) sbam.order.qty = 0;
			//leggo un eventuale codice di coupon inserito dall'utente
			sbam.order.couponCode = $("#orderCouponCode").val();
			//verifico che il coupon inserito esista per il mio preset, ovvero se il codice inserito è valido
			sbam.order.coupon = false;
			//tolgo un'eventuale evidenziazione olistica grafica già presente
			$("#orderCouponCode").removeClass("bgGreen");
			if ( sbam.order.couponCode && sbam.project.preset.coupons && sbam.project.preset.coupons.length > 0 ) {
				for ( var x=0; x<sbam.project.preset.coupons.length; x++ ) {
					var coupon = sbam.project.preset.coupons[x];
					if ( coupon.code == sbam.order.couponCode ) {
						//il coupon inserito esiste!
						//ora devo verificare se il coupon relativo è all'interno del suo range di validità temporale
						var d = new Date();
						var curr_date = d.getFullYear()+"-"+sbam.utils.pad(d.getMonth()+1,2)+"-"+sbam.utils.pad(d.getDate(),2)+"T00:00:00.000Z";//nella forma "2014-11-30T00:00:00.000Z"
						if ( coupon.start <= curr_date && coupon.end >= curr_date ) {
							//il coupon è valido
							//evidenzio graficamente la sua validità
							$("#orderCouponCode").addClass("bgGreen");
							//posso salvare il mio coupon
							sbam.order.coupon = coupon;
							break;
						}
					}
				}
			}
			//leggo la quantità di figurine effettivamente compilate dall'utente
			sbam.order.stickersUsedQty = getStickersNum();
			//calcolo la quantità di pacchetti di figurine per una copia del project
			sbam.order.stickersPacksQty = Math.ceil(sbam.order.stickersUsedQty / sbam.config.stickersPerPack);
			//poi le righe dell'ordine (esclusi i totali)
			sbam.order.items = [];
			//per tutti i projects c'è sempre la prima riga dell'ordine con il prodotto stesso
			//il prezzo del main product è dato dal prezzo base (o di avviamento) + il pricePerPage per il numero di pagine
			//al pricePerPage applico gli sconti in base al nmero di pagine con discountByPageNum
			//e applico gli sconti con discountByCouponPriceMultiply
			var mainProdPrice = 
				discountByCouponPriceMultiply( 
					sbam.order.coupon, sbam.project.preset.price + 
					discountByPageNum( sbam.project.preset.pricePerPage	).price * sbam.pageEditor.getPagesNum()
				);
			//console.log("sbam.project.preset.price="+sbam.project.preset.price);
			//console.log("sbam.project.preset.pricePerPage="+sbam.project.preset.pricePerPage);
			//console.log("sbam.pageEditor.getPagesNum()="+sbam.pageEditor.getPagesNum());
			//console.log("sbam.pageEditor.getInternalPagesNum()="+sbam.pageEditor.getInternalPagesNum());
			//console.log("mainProdPrice="+mainProdPrice);
			sbam.order.items.push(
				{
					'qty':sbam.order.qty,
					'label':sbam.project.type.toUpperCase(),
					'preset':sbam.project.preset.label,
					'details':sbam.project.pages.length+' pagine',
					'price':mainProdPrice,
					'totPrice':mainProdPrice*sbam.order.qty,
					'priceStartup':discountByCouponPriceMultiply( sbam.order.coupon, sbam.project.preset.price),
					'pricePerPage':discountByCouponPriceMultiply( sbam.order.coupon, sbam.project.preset.pricePerPage),
					'discountPerPage':discountByPageNum(discountByCouponPriceMultiply( sbam.order.coupon, sbam.project.preset.pricePerPage )).discount,
					'priceIncDiscountPerPage':discountByPageNum(discountByCouponPriceMultiply( sbam.order.coupon, sbam.project.preset.pricePerPage )).price,
					'tax':mainProdPrice*sbam.config.defaultTaxPerc,
					'totTax':mainProdPrice*sbam.order.qty*sbam.config.defaultTaxPerc
				}
			);
			//se poi sono previste anche le figurine, aggiungo una riga in più nell'ordine
			//anche la price delle figurine applico gli sconti con discountByCouponPriceMultiply
			if ( sbam.project.preset.stickers && sbam.project.preset.stickers.width && sbam.project.preset.stickers.height ) {
				sbam.order.items.push(
					{
						'qty':sbam.order.stickersPacksQty*sbam.order.qty,
						'label':'BUSTINA FIGURINE',
						'preset':'Bustina da '+sbam.config.stickersPerPack+' figurine (45x65mm)',
						'details':( sbam.config.stickersPerPack * sbam.order.stickersPacksQty * sbam.order.qty )+' figurine tot.',
						'price':discountByCouponPriceMultiply( sbam.order.coupon, sbam.config.stickersPackPrice ),
						'totPrice':discountByCouponPriceMultiply( sbam.order.coupon, sbam.config.stickersPackPrice ) * sbam.order.stickersPacksQty * sbam.order.qty,
						'tax':discountByCouponPriceMultiply( sbam.order.coupon, sbam.config.stickersPackPrice ) * sbam.config.defaultTaxPerc,
						'totTax':discountByCouponPriceMultiply( sbam.order.coupon, sbam.config.stickersPackPrice ) * sbam.order.stickersPacksQty * sbam.order.qty * sbam.config.defaultTaxPerc
					}
				);
			}
			//se è specificato un coupon, aggiungo un item con lo sconto definito dal coupon con discountByCouponPriceAdd
			var couponPriceAdd = discountByCouponPriceAdd( sbam.order.coupon, 0);
			if ( couponPriceAdd ) {
				sbam.order.items.push(
					{
						'qty':1,
						'isCoupon':true,
						'label':'COUPON',
						'preset':sbam.order.coupon.label,
						'details':'Codice: '+sbam.order.coupon.code+'<br/><div style="white-space:nowrap;">Valido da: '+sbam.order.coupon.start.substring(0,19)+'<br/>a: '+sbam.order.coupon.end.substring(0,19)+'</div>',
						'price':couponPriceAdd,
						'totPrice':couponPriceAdd,
						'tax':couponPriceAdd * sbam.config.defaultTaxPerc,
						'totTax':couponPriceAdd * sbam.config.defaultTaxPerc
					}
				);
			}
			
			//poi i totali
			sbam.order.price = 0;
			sbam.order.tax = 0;
			sbam.order.priceIncTax = 0;
			for ( var i=0; i<sbam.order.items.length; i++ ) {
				var orderItem = sbam.order.items[i];
				sbam.order.price += orderItem.totPrice;
			}
			//poi partendo dal price definisco tutti i valori dell'ordine da passare a woocommerce
			//definisco tasse
			sbam.order.tax = sbam.order.price * sbam.config.defaultTaxPerc;
			sbam.order.taxCode = "IT-IVA 4%-1";
			sbam.order.priceIncTax = sbam.order.price * (1 + sbam.config.defaultTaxPerc);
			//definisco sconti quantità
			sbam.order.discount = sbam.order.priceIncTax - discountByQty(sbam.order.priceIncTax,sbam.order.qty).price;
			sbam.order.discountPerc = discountByQty(sbam.order.priceIncTax,sbam.order.qty).discount;
			sbam.order.taxIncDisc = sbam.order.tax * ( 1 - sbam.order.discountPerc );
			sbam.order.priceIncTaxIncDisc = discountByQty(sbam.order.priceIncTax,sbam.order.qty).price;
			//definisco i costi di spedizione, che variano a seconda del type
			sbam.order.shippingPrice = sbam.projectTypesAndPresets[sbam.project.type].shippingPrice;
			sbam.order.shippingTax = sbam.order.shippingPrice * sbam.config.defaultTaxPerc;
			sbam.order.shippingPriceIncTax = sbam.order.shippingPrice * ( 1 + sbam.config.defaultTaxPerc );
			sbam.order.shippingFirm = "Corriere GLS";
			
			//preparo l'html dell'order da visualizzare
			//headers dell'ordine
			var orderContent = '\
				<table data-role="table" id="orderContent" class="ui-shadow table-stripe ui-responsive table-stroke" >\
					<thead>\
						<tr>\
							<th>Quantit&agrave;</th>\
							<th></th>\
							<th>Articolo</th>\
							<th>Versione</th>\
							<th>Dettagli</th>\
							<!--<th class="orderItemSmall">Prezzo avviamento</th>\
							<th class="orderItemSmall">Prezzo per pagina</th>-->\
							<th>Prezzo cad</th>\
							<th>Prezzo tot.</th>\
						</tr>\
					</thead>\
					<tbody>\
				';
			//righe dell'ordine
			for ( var i=0; i<sbam.order.items.length; i++ ) {
				var orderItem = sbam.order.items[i];
				var pricePerPageLabel = "";
				if ( orderItem.discountPerPage && orderItem.discountPerPage > 0 ) {
					pricePerPageLabel = '<i><strike>'+orderItem.pricePerPage.formatMoney(2, ',', '.')+'&nbsp;&euro;</strike>&nbsp;-&nbsp'+Math.round(100*orderItem.discountPerPage)+'%&nbsp=</i>&nbsp;'+orderItem.priceIncDiscountPerPage.formatMoney(2, ',', '.')+'&nbsp;&euro;';
				} else if( orderItem.pricePerPage ) {
					pricePerPageLabel = orderItem.pricePerPage.formatMoney(2, ',', '.')+'&nbsp;&euro;';
				}
				var priceStartupLabel = "";
				if ( orderItem.priceStartup ) {
					priceStartupLabel = orderItem.priceStartup.formatMoney(2, ',', '.')+'&nbsp;&euro;';
				}
				//se è la riga di un coupon, metto fondo verde
				var bgClass = '';
				if ( orderItem.isCoupon ) {
					var bgClass = 'bgGreen';
				}
				orderContent += '\
						<tr>\
							<th class="'+bgClass+' orderItemBig">'+orderItem.qty+'</th>\
							<th class="'+bgClass+'">x</th>\
							<td class="'+bgClass+' orderItemBig">'+orderItem.label+'</td>\
							<td class="'+bgClass+' orderItemSmall">'+orderItem.preset+'</td>\
							<td class="'+bgClass+' orderItemSmall">'+orderItem.details+'</td>\
							<!--<td class="'+bgClass+'">'+priceStartupLabel+'</td>\
							<td class="'+bgClass+'">'+pricePerPageLabel+'</td>-->\
							<td class="'+bgClass+'">'+orderItem.price.formatMoney(2, ',', '.')+'&nbsp;&euro;</td>\
							<td class="'+bgClass+' orderItemBig">'+orderItem.totPrice.formatMoney(2, ',', '.')+'&nbsp;&euro;</td>\
						</tr>\
				';
			}
			//totali dell'ordine
			orderContent += '\
					</tbody>\
					<tbody>';
			if ( sbam.order.coupon && sbam.order.coupon.priceMultiply && sbam.order.coupon.label ) {
				orderContent += '\
						<tr>\
							<th class="bgGreen orderItemBig">1</th>\
							<th class="bgGreen">x</th>\
							<td class="bgGreen orderItemBig">COUPON</td>\
							<td class="bgGreen orderItemSmall">'+sbam.order.coupon.label+'</td>\
							<td class="bgGreen orderItemSmall">Codice: '+sbam.order.coupon.code+'<br/><div style="white-space:nowrap;">Valido da: '+sbam.order.coupon.start.substring(0,19)+'<br/>a: '+sbam.order.coupon.end.substring(0,19)+'</div></td>\
							<!--<td class="bgGreen"></td>\
							<td class="bgGreen"></td>-->\
							<td class="bgGreen orderItemSmall" colspan="2"><span class="orderItemBig">'+((1-sbam.order.coupon.priceMultiply)*100).formatMoney(0, ',', '.')+'%</span> di sconto su tutti gli articoli</td>\
							<!--<td class="bgGreen orderItemBig">-'+((1-sbam.order.coupon.priceMultiply)*100).formatMoney(0, ',', '.')+'%</td>-->\
						</tr>\
					</tr>';
			}
			orderContent += '\
						<tr>\
							<th class="orderItemBig" colspan="6">Tot. netto</th>\
							<th class="orderItemBig">'+sbam.order.price.formatMoney(2, ',', '.')+'&nbsp;&euro;</th>\
						</tr>\
						<tr>\
							<th class="" colspan="6">IVA 4%</th>\
							<th class="">'+sbam.order.tax.formatMoney(2, ',', '.')+'&nbsp;&euro;</th>\
						</tr>\
						<tr>\
							<th class="orderItemBig" colspan="6">Tot. lordo</th>\
							<th class="orderItemBig">'+sbam.order.priceIncTax.formatMoney(2, ',', '.')+'&nbsp;&euro;</th>\
						</tr>';
			if ( sbam.order.discountPerc && sbam.order.discountPerc > 0 ) {
				orderContent += '\
						<tr>\
							<th class="bgGreen" colspan="5">Sconto per numero di copie</th>\
							<th class="bgGreen orderItemBig">'+Math.round(sbam.order.discountPerc*100)+'%</th>\
							<th class="bgGreen">-'+sbam.order.discount.formatMoney(2, ',', '.')+'&nbsp;&euro;</th>\
						</tr>\
						<tr>\
							<th class="orderItemBig bgGreen" colspan="6">Tot. scontato</th>\
							<th class="orderItemBig bgGreen">'+sbam.order.priceIncTaxIncDisc.formatMoney(2, ',', '.')+'&nbsp;&euro;</th>\
						</tr>';
			}
			orderContent += '\
					</tbody>\
				</table>';
			$("#orderContainer").append(orderContent);
			$("#orderContent").table();
			//infine riposiziono il popup perchè le sue dimensioni possono essere cambiate
			sbam.utils.recenterPopup("#popupOrderProject");
		},
		saveProject: function(next) {
			//prima controllo se il numero di pagine è congruo con minPageQuantity e minPageNum e maxPageNum
			if ( 
				sbam.project &&
				sbam.project.preset &&
				(
					sbam.pageEditor.getPagesNum() < sbam.project.preset.minPageNum ||
					sbam.pageEditor.getPagesNum() > sbam.project.preset.maxPageNum
				)
			) {
				alert("Il numero di pagine deve essere compreso tra "+sbam.project.preset.minPageQuantity+" e "+sbam.project.preset.maxPageQuantity+", mentre ora hai "+sbam.pageEditor.getPagesNum()+" pagine. Aggiungi o togli le pagine necessarie per poter salvare.");
			} else if ( 
				sbam.project.type && 
				sbam.projectTypesAndPresets[sbam.project.type] && 
				sbam.pageEditor.getInternalPagesNum() % sbam.project.preset.minPageQuantity
			) {
				alert("Il numero di pagine deve essere un multiplo di "+sbam.project.preset.minPageQuantity+", mentre ora hai "+sbam.pageEditor.getPagesNum()+" pagine. Devi aggiungere o togliere pagine per poter salvare.");
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
				sbam.utils.startWaiting();
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
							sbam.utils.stopWaiting();
							$("#buttonSave").css( "background-color","rgb(246, 246, 246)" );
							$("#buttonSave").addClass( "ui-state-disabled" );
							if ( sbamUserIsLogged ) $("#buttonOrder").removeClass( "ui-state-disabled" );
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
		},
		saveProjectOrder: function() {
			sbam.utils.startWaiting();
			$.ajax({
				type: "POST",
				url: "/saveProjectOrder",
				data: { 
					"project": sbam.project,
					"order": sbam.order
				}
			}).done(function( result ) {
				if ( result ) {
					result = JSON.parse(result);
					if ( result.errormsg && result.errormsg != "" ) {
						console.log( "sbam.projectEditor.saveProjectOrder: dopo chiamata ajax result con errormsg: "+result.errormsg );
					} else {
						//finito di salvare l'order
						sbam.utils.stopWaiting();
						//scrivo anche in sbam.project che è stato salvato
						//così ai prossimi redraw di pagina l'editing sarà bloccato
						sbam.project.status= "ordered";
						//blocco l'editing per le pagine correnti
						sbam.pageEditor.disableEditing();
						//visualizzo il success, col link al negozio
						$("#popupOrderProjectContent").hide();
						$("#popupOrderProjectResult").show();
					}
				}
			}).fail(function( jqXHR, textStatus ) {
				alert( "Request failed: " + textStatus );
				console.log( "Request failed: " + textStatus );
			});
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
					
					/*
					capisco se posso visualizzare la toolbox (con i bottoni per cambiare posizione alla pagina dentro al project) o meno
					- se è una pagina single:
						- visualizzo sempre la tollbox
							- ma nel caso di ultima pagina o prima pagina, non visualizzaro uno dei 2 bottoni di move nella toolbox
					- se è una pagina non single ed è una pagina che triggera una couple (ovvero se il mio item è una coppia di pagine)
						- se la coppia contiene almeno una pagina "cover" allora non si vedrà la toolbox
						- else se la coppia è la prima non avrà l'up, se è l'ultima non avrà il down
					*/
					var popupToolboxPage = "";
					var pageNum = -1;
					if ( sbam.project.pages[i].type == "single" ) {
						pageNum = sbam.project.pages[i].num;
						if ( pageNum > 1 ) {
							//visualizzo PAGE SINGLE: MOVE UP
							popupToolboxPage += "\
								<a class='pageItemButtonMoveUp' pageNum='"+pageNum+"' title='scambia pag "+pageNum+" con pag "+(pageNum-1)+"' ></a>\
							";
						}
						if ( pageNum < sbam.pageEditor.getInternalPagesNum() ) {
							//visualizzo PAGE SINGLE: MOVE DOWN
							popupToolboxPage += "\
								<a class='pageItemButtonMoveDown' pageNum='"+pageNum+"' title='scambia pag "+pageNum+" con pag "+(pageNum+1)+"' ></a>\
							";
						}
					} else if ( myCouple.triggerCouple ) {
						if ( !( myCouple.type_left.indexOf("cover") > -1 ) ) {
							pageNum = myCouple.num_left;
							if ( pageNum > 1 ) {
								//visualizzo PAGE LEFT: MOVE UP
								popupToolboxPage += "\
									<a class='pageItemButtonMoveUp' pageNum='"+pageNum+"' title='scambia pag "+pageNum+" con pag "+(pageNum-1)+"' ></a>\
								";
							}
							if ( pageNum > -1 && pageNum < sbam.pageEditor.getInternalPagesNum()  ) {
								//visualizzo PAGE LEFT: MOVE DOWN
								popupToolboxPage += "\
									<a class='pageItemButtonMoveDown' pageNum='"+pageNum+"' title='scambia pag "+pageNum+" con pag "+(pageNum+1)+"' ></a>\
								";
							}
						}
						if ( !( myCouple.type_right.indexOf("cover") > -1 ) ) {
							pageNum = myCouple.num_right;
							if ( pageNum > 1 ) {
								//visualizzo PAGE RIGHT: MOVE UP
								popupToolboxPage += "\
									<a class='pageItemButtonMoveUp' pageNum='"+pageNum+"' title='scambia pag "+pageNum+" con pag "+(pageNum-1)+"' style='margin-left:68px;' ></a>\
								";
							}
							if ( pageNum > -1 && pageNum < sbam.pageEditor.getInternalPagesNum()  ) {
								//visualizzo PAGE RIGHT: MOVE DOWN
								popupToolboxPage += "\
									<a class='pageItemButtonMoveDown' pageNum='"+pageNum+"' title='scambia pag "+pageNum+" con pag "+(pageNum+1)+"' style='margin-left:68px;' ></a>\
								";
							}
						}
					}

					//differenzio tra single e non single nella visualizzazione dell'item
					if ( sbam.project.pages[i].type == "single" ) {
						//una pagina singola viene salvata come pagina left
						var icon = "files-o";
						if ( sbam.pageLeftIdx >=0 && sbam.pageLeftIdx == i ) {
							icon = "circle";
							oneIsSelected = true;
							thisIsSelected = true;
							selectedLabel = "pag "+pageNum;
						}
						$("#panelPagesListview").append("\
							<li data-icon='"+icon+"' class='pageItem' title='vai a pag "+pageNum+"'>\
								<a class='ui-icon-"+icon+" ui-btn ui-btn-icon-right' id='pageItem"+i+"'>\
									<img src='/images/page-single.png' style='margin-left:8px;margin-right:20px;'>\
									pag "+pageNum+"\
								</a>\
								"+popupToolboxPage+"\
							</li>");
						//con relativa action di click che inizializza il pageEditor sul progetto cliccato
						$("#pageItem"+i).data("page_idx", i);
						$("#pageItem"+i).click(function() { sbam.pageEditor.init($(this).data("page_idx")); });						
					} else if (	myCouple.triggerCouple ) {
						//caso coppia di pagine
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
							<li data-icon='"+icon+"' class='pageItem' title='vai a "+myCouple.label+"'>\
								<a class='ui-icon-"+icon+" ui-btn ui-btn-icon-right' id='pageItem"+i+"'>\
									<img src='/images/"+myCouple.icon+"' style='margin-left:8px;margin-right:20px;'>\
									"+myCouple.label+"\
								</a>\
								"+popupToolboxPage+"\
							</li>");
						//con relativa action di click che inizializza il pageEditor sul progetto cliccato
						$("#pageItem"+i).data("page_idx", i);
						$("#pageItem"+i).click(function() { sbam.pageEditor.init($(this).data("page_idx")); });
					}
					
					//se poi l'item corrente è il selezionato, gli evidenzio lo sfondo
					if ( thisIsSelected ) {
						$("#pageItem"+i).addClass("bgGreen");
					}
					
					//actions on over per mostrare i bottoni di move
					$("#pageItem"+i).hover(
						function() {
							$(".pageItemButtonMoveUp").hide();
							$(".pageItemButtonMoveDown").hide();
							$(this).siblings(".pageItemButtonMoveUp").show();
							$(this).siblings(".pageItemButtonMoveDown").show();
						}, function() {
						}
					);					
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
				//actions di click sui bottoni per muovere le pagine
				$(".pageItemButtonMoveUp").click(function() { sbam.pageEditor.swapPagesPosition($(this).attr("pageNum"),Number($(this).attr("pageNum"))-1); });
				$(".pageItemButtonMoveDown").click(function() { sbam.pageEditor.swapPagesPosition($(this).attr("pageNum"),Number($(this).attr("pageNum"))+1); });
				//dopo aver popolato la lista, ne imposto l'altezza per attivare le scrollbar
				$("#panelPagesListview").addClass("vertScrollable");
				var availHeight = $( window ).height() - $("#panelPagesListview").position().top + 8;
				$("#panelPagesListview").css("height",availHeight+"px");
			}
		},
		getPagesNum: function () {
			//conta tutte le pagine
			var num = 0;
			if ( sbam.project && sbam.project.pages ) {
				num = sbam.project.pages.length;
			}
			return num;
		},
		getInternalPagesNum: function () {
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
			//leggo tutti i layout per il mio project type e preset disponibili sul server
			sbam.utils.startWaiting();
			$.ajax({
				type: "POST",
				url: "/getPageTemplates",
				data: { 
					"projectType": sbam.project.type,
					"projectPreset": sbam.project.preset
					//"projectW": sbam.project.preset.width,
					//"projectH": sbam.project.preset.height
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
						$("#panelPageTemplatesListview").append("\
							<div class='templateItem' title='"+templates[i].filename+"' >\
								<a class='ui-btn' id='templateItem"+i+"'>\
									<img src='"+templates[i].thumbUrl+"'/>\
								</a>\
							</div>");
						//con relativa action di click per applicare il template
						$("#templateItem"+i).data("filename", templates[i].filename);
						$("#templateItem"+i).click(function() { sbam.pageEditor.applyTemplateToPage($(this).data("filename")); });
					}
					//dopo aver popolato la lista, ne imposto l'altezza per attivare le scrollbar
					$("#panelPageTemplatesListview").addClass("vertScrollable");
					var availHeight = $( window ).height() - $("#panelPageTemplatesListview").position().top - 8;
					$("#panelPageTemplatesListview").css("height",availHeight+"px");
				}
				sbam.utils.stopWaiting();
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
			sbam.utils.startWaiting();
			$.ajax({
				type: "POST",
				url: "/getPageTemplate",
				data: { 
					"tplFilename": tplFilename
				}
			}).done(function( tplElements ) {
				//mi ritorna un array di elements, perchè per definizione un template di pagina è un xml con dentro solo un array di elements
				tplElements = JSON.parse(tplElements);
				//console.log( "Arrivati i tplElements: " );
				//console.log( tplElements );
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
				sbam.utils.stopWaiting();
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
			//qui blocco solo se si sta cercando di cancellare delle cover, o il numero di pagine è già == al minPageQuantity o minPageNum
			//poi tutti gli altri controlli vengono fatti in delPage()
			if ( sbam.project.pages[sbam.pageLeftIdx] && sbam.project.pages[sbam.pageLeftIdx].type != "left" && sbam.project.pages[sbam.pageLeftIdx].type != "" ) {
				alert("Le pagine di tipo "+sbam.project.pages[sbam.pageLeftIdx].type+" non possono essere cancellate.");
			} else if ( sbam.project.pages[sbam.pageRightIdx] && sbam.project.pages[sbam.pageRightIdx].type != "right" && sbam.project.pages[sbam.pageRightIdx].type != "" ) {
				alert("Le pagine di tipo "+sbam.project.pages[sbam.pageRightIdx].type+" non possono essere cancellate.");
			} else if ( sbam.pageEditor.getPagesNum() <= sbam.project.preset.minPageNum ) {
				alert("Il numero minimo di pagine ("+sbam.project.preset.minPageNum+") è stato raggiunto.");
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
		swapPagesPosition: function(numA,numB) {
			numA = Number(numA);
			numB = Number(numB);
			console.log("MOVEPAGE numA="+numA+" numB="+numB);
			var pageA = {};
			var pageB = {};
			/* debug */
			for( var i=0; i < sbam.project.pages.length; i++ ) {
				var page = sbam.project.pages[i];
				console.log("MOVEPAGE PRIMA: i = "+i+", page.num = "+page.num+", page.type = "+page.type);
			}
			//prima un ciclo per salvare un clone delle 2 pagine da swappare
			for( var i=0; i < sbam.project.pages.length; i++ ) {
				var page = sbam.project.pages[i];
				if ( page.num == numA ) {
					pageA = JSON.parse(JSON.stringify(page));
				}
				if ( page.num == numB ) {
					pageB = JSON.parse(JSON.stringify(page));
				}
			}
			//poi un ciclo per eseguire lo swap
			for( var i=0; i < sbam.project.pages.length; i++ ) {
				var page = sbam.project.pages[i];
				if ( page.num == numA ) {
					page.num = pageB.num;
					page.type = pageB.type;
				} else if ( page.num == numB ) {
					page.num = pageA.num;
					page.type = pageA.type;
				}
			}
			//dopo che ho eseguito lo swap, ricarico sempre tutto
			/* debug */
			for( var i=0; i < sbam.project.pages.length; i++ ) {
				var page = sbam.project.pages[i];
				console.log("MOVEPAGE DOPO: i = "+i+", page.num = "+page.num+", page.type = "+page.type);
			}
			//aggiungo all'history
			sbam.history.add("Swapped pag "+numA+" and "+numB);
			//ricarico tutto perchè sono cambiate delle pagine
			sbam.pageEditor.drawPage();
			sbam.pageEditor.getPages(); //parallelamente ai getPage chiamo anche un getPages() per aggiornare il panel
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
				
				$(sbam.outerCont).parent()
					.css("margin","0px")
					.css("padding","0px")
					.css("padding-top","0px")
					.css("border","0px")
					.width($( window ).width())
					.height($( window ).height());
				
				//outCont in base al suo parent
				//imposto solo l'altezza perchè la larghezza è già al 100%
				$(sbam.outerCont)
					.css("margin","0px")
					.css("padding","0px")
					.css("border","0px")
					.width($( window ).width())
					.height($( window ).height());
					
				/* vecchia versione low performance
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
				*/
				//console.log("sizeAndPosInterface: POI: screen width:"+$( window ).width());
				//console.log("sizeAndPosInterface: POI: screen height:"+$( window ).height());
				//console.log("sizeAndPosInterface: POI: page width:"+$(sbam.outerCont).parent().width());
				//console.log("sizeAndPosInterface: POI: page height:"+$(sbam.outerCont).parent().height());
				
				//se sono visibili, piazzo anche le pagine left / right
				if ( sbam.project && sbam.project.preset.width && sbam.project.preset.height && ( $("#leftPageCont").length > 0 || $("#rightPageCont").length > 0 ) ) {
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
						var leftSizPos = sbam.utils.thepositioner( $(sbam.outerCont).width(), $(sbam.outerCont).height(), sbam.project.preset.width, sbam.project.preset.height, false,"center",1.5*sbam.config.mainMarginTop,2*sbam.config.mainMarginBottom,2*sbam.config.mainMarginLeft,2*sbam.config.mainMarginRight);
						//leftSizPos.w -= sbam.config.mainMarginLeft;
						//leftSizPos.x += sbam.config.mainMarginLeft;
					} else {
						var leftSizPos = sbam.utils.thepositionerPageLeft( $(sbam.outerCont).width(), $(sbam.outerCont).height(), sbam.project.preset.width, sbam.project.preset.height,sbam.config.mainMarginTop,sbam.config.mainMarginBottom,sbam.config.mainMarginLeft,sbam.config.mainMarginRight);
					}
					$("#leftPageCont")
						.height(leftSizPos.h)
						.width(leftSizPos.w)
						.css("position","absolute")
						.css("left",leftSizPos.x)
						.css("top",leftSizPos.y);
					$("#leftPageToolbar")
						.css("position","absolute")
						.css("left",leftSizPos.x-$("#leftPageToolbar").width()-3)
						.css("top",leftSizPos.y+(leftSizPos.h-$("#leftPageToolbar").height())/2);
					//sizepos anche della canvas della pagina
					if ( sbam.pageLeftIdx > -1 ) {
						$("#leftPageCanvas")
							.height(leftSizPos.h)
							.width(leftSizPos.w);
					} else if ( sbam.pageLeftIdx == -1 ) {
						$("#leftPageCont").remove();
						if ( sbam.currentView != "pageEditorSingle" ) $("#leftPageToolbar").remove();
					}
					//right
					var rightSizPos = sbam.utils.thepositionerPageRight( $(sbam.outerCont).width(), $(sbam.outerCont).height(), sbam.project.preset.width, sbam.project.preset.height,sbam.config.mainMarginTop,sbam.config.mainMarginBottom,sbam.config.mainMarginLeft,sbam.config.mainMarginRight);
					$("#rightPageCont")
						.height(rightSizPos.h)
						.width(rightSizPos.w)
						.css("position","absolute")
						.css("left",rightSizPos.x)
						.css("top",rightSizPos.y);
					
					var elmRPT = $("#rightPageToolbar");
					elmRPT.css("position","absolute");
					if ( sbam.currentView == "pageEditorSingle" ) {
						elmRPT.css("left",leftSizPos.x+leftSizPos.w+3);
					} else {
						elmRPT.css("left",rightSizPos.x+rightSizPos.w+3);
					}
					elmRPT.css("top",rightSizPos.y+(rightSizPos.h-elmRPT.height())/2);
					//sizepos anche della canvas della pagina
					if ( sbam.pageRightIdx > -1 ) {
						$("#rightPageCanvas").height(rightSizPos.h);
						$("#rightPageCanvas").width(rightSizPos.w); 
					} else if ( sbam.pageRightIdx == -1 ) {
						$("#rightPageCont").remove();
						if ( sbam.currentView != "pageEditorSingle" ) elmRPT.remove();
					}
				}
				
			}
			
			// questa viene solo richiamata da pageEditor.drawPage
			function renderer(container,idx,mode) {
				//jq caching
				var containerWidth = $(container).width();
				var containerHeight = $(container).height();
				/*
				mode in teoria potrà valere "editor" e "viewer" che serve per le thumbnails e non aggiunge funzionalità di editing
				*/
				if ( !mode ) mode = "editor";
				//helper functions
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
				function createElements() {
					//console.log(">>>>>>>>>>>>>>> chiamato create elements!");
					//helper functions
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
					function sizeAndPosElement(element,container) {
						//continuo solo se c'è il bbox, perchè mi baso solo su quello essendo in comune a tutti i type di elements
						if ( element.bbox ) { //PERFORMANCE questa resta critica, forse il width?
							var margin = 3; //dovrebbe essere lo spessore del bordo tratteggiato attorno all'element selezionato
							//console.log("pageEditor.drawPage.sizeAndPosElement: element.bbox:");
							//console.log(element.bbox);
							//console.log("pageEditor.drawPage.sizeAndPosElement: containerWidth:"+containerWidth);
							//console.log("pageEditor.drawPage.sizeAndPosElement: containerHeight:"+containerHeight);
							//per ogni misura specificata la normalizzo
							var norm_x = bboxValToPixel(element.bbox.x,containerWidth,sbam.project.preset.width);
							var norm_y = bboxValToPixel(element.bbox.y,containerHeight,sbam.project.preset.height);
							var norm_w = bboxValToPixel(element.bbox.w,containerWidth,sbam.project.preset.width);
							var norm_h = bboxValToPixel(element.bbox.h,containerHeight,sbam.project.preset.height);
							//poi assegno le misure come stili css
							var elm = $("#"+element._id,container);
							elm
								.css("position","absolute")
								.css("width",norm_w+"px")
								.css("height",norm_h+"px")
								.css("left",norm_x+"px")
								.css("top",norm_y+"px");
						}
					}
					function styleElement(element,container) {
						//prima degli style fissi per tutti
						//perloppiù correzioni agli style di jqm
						$("#"+element._id).css("text-shadow","none");  
						
						//poi leggo e applico gli style definiti nel layout xml
						if ( element.style ) {
							//console.log("considero lo style:");
							//console.log(element.style);
							//per impostare i colori chiamo un metodo apposta, che gestisce anche i colori di default nel caso l'element non li abbia definiti
							elementColorToRGBACss(element,"foregroundColor"); 
							elementColorToRGBACss(element,"backgroundColor"); 
							
							//aggiorno il dom
							updateDomElementFont(element);
							updateDomElementFontSize(element,container);
							updateDomElementFontAlign(element);
						}
					}
					function imageWidget(element,container,idx) {
						/*
						########## flusso tra i vari helpers: ##########
						manageStickerLayout(); ajax("/getWidgetInfo").done() -> preDrawWidgetImg() -> setDefaultZoomAndOffset() -> ( fitOrFillImage() -> setZoomByDpi() -> setZoom() ) | setZoom()
						setZoom() -> zoomSlider.change() -> setDpiByZoom() -> setImgSize() ; setImgOffset() ; storeImg(); postDrawWidgetImg();
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
*/								
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.placedImgPixX="+element.IW.placedImgPixX);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.placedImgPixY="+element.IW.placedImgPixY);				
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.placedImgMmX="+element.IW.placedImgMmX);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.placedImgMmY="+element.IW.placedImgMmY);	
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.placedImgPixW="+element.IW.placedImgPixW);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.placedImgPixH="+element.IW.placedImgPixH);				
								
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.prevCurDpi="+element.IW.prevCurDpi);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.prevPlacedImgPixX="+element.IW.prevPlacedImgPixX);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.prevPlacedImgPixY="+element.IW.prevPlacedImgPixY);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.prevPlacedImgMmX="+element.IW.prevPlacedImgMmX);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.prevPlacedImgMmY="+element.IW.prevPlacedImgMmY);	
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.prevPlacedImgPixW="+element.IW.prevPlacedImgPixW);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.prevPlacedImgPixH="+element.IW.prevPlacedImgPixH);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.prevPrevCurDpi="+element.IW.prevPrevCurDpi);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.prevPrevPlacedImgPixX="+element.IW.prevPrevPlacedImgPixX);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.prevPrevPlacedImgPixY="+element.IW.prevPrevPlacedImgPixY);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.prevPrevPlacedImgMmX="+element.IW.prevPrevPlacedImgMmX);
								console.log("elementId="+element._id+" "+me+"() element.IW.curDpi="+element.IW.curDpi+" element.IW.curZoom="+getZoom()+" element.IW.prevPrevPlacedImgMmY="+element.IW.prevPrevPlacedImgMmY);	
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
							//oltre all'elemento preso con getPageElementById, devo aggiornare anche l'istanza corrente di element (pensavo fossero linkate, e invece non lo sono)
							element.image.offsetx = element.IW.placedImgMmX;
							element.image.offsety = element.IW.placedImgMmY;
							element.image.dpi = element.IW.curDpi;//nel db come valore di zoom salvo i dpi
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
							//MA SIAMO SICURI? $("#toolbox"+element._id).popup( "disable" );
							//ricarico i media
							//per aggiornare le icone di immagine già usata
							sbam.utils.getMedia();
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
							$("#image"+element._id)
								.css("width",String(element.IW.placedImgPixW)+"px")
								.css("height",String(element.IW.placedImgPixH)+"px");
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
							
							console.log("COZ: RES placedImgPixX = "+element.IW.placedImgPixX);
							console.log("COZ: RES placedImgPixY = "+element.IW.placedImgPixY);
							//console.log("COZ: RES placedImgMmX = "+element.IW.placedImgMmX);
							//console.log("COZ: RES placedImgMmY = "+element.IW.placedImgMmY);
							
							
							
							//nel caso degli sticker controllo che l'immagine non sia più piccola di quanto impostato con il fill
							if ( element.image.type && element.image.type == "sticker" ) {
								if ( Math.round(element.IW.curDpi) >= Math.round(element.IW.curDpiMaxForSticker) ) {
									element.IW.curDpi = element.IW.curDpiMaxForSticker;
									element.IW.placedImgPixX = 0;
									element.IW.placedImgPixY = 0;
									element.IW.placedImgMmX = 0;
									element.IW.placedImgMmY = 0;
									console.log("COZ: RES BLOCCATOOOOOOOOOOOOOOOOO placedImgPixX = "+element.IW.placedImgPixX);
								} else {
									limitStickersToBbox($("#image"+element._id));
									//this.$el.css("left",element.IW.placedImgPixX+"px");
									//this.$el.css("top",element.IW.placedImgPixY+"px");
								}
							}
							
							
							//e applico i css
							$("#image"+element._id)
								.css("left",String(element.IW.placedImgPixX)+"px")
								.css("top",String(element.IW.placedImgPixY)+"px");
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
								$("#image"+element._id)
									.css("left",String(element.IW.placedImgPixX)+"px")
									.css("top",String(element.IW.placedImgPixY)+"px");
							}
							logEmAll("DOPO setImgOffset");
						}
						function getZoom() {
							//mi aspetto che val vada da 0 a element.IW.maxZoomSlider
							//return $("#slider"+element._id).val();
							return element.IW.curZoom;
						}
						function setZoom(myZoom) {
							logEmAll("PRIMA setZoom("+myZoom+")");
							//mi aspetto che val vada da 0 a element.IW.maxZoomSlider
							//ma se non lo fa, la prossima lettura di slider.val() darà un valore normalizzato tra 0 e 1
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
							$("#slider"+element._id).val(element.IW.curZoom*element.IW.maxZoomSlider).slider("refresh");
							logEmAll("DOPO setZoom("+myZoom+")");
						}
						function setZoomByDpi() {
							logEmAll("PRIMA setZoomByDpi");
							//prima calcolo lo element.IW.curZoom tra 0 e 1
							var newZoom = 0; 
							if ( element.IW.curDpi <= sbam.project.preset.dpi ) {
								newZoom = 1 / ( 1 - ( element.IW.curDpi - sbam.config.imagesDpiMin ) / ( sbam.config.imagesDpiMin - sbam.project.preset.dpi ) );
							} else if ( element.IW.curDpi > sbam.project.preset.dpi ) {
								newZoom = - Math.log ( ( element.IW.curDpi - sbam.project.preset.dpi ) * ( 1 - Math.exp(-element.IW.smooth*0.5) ) / ( sbam.config.imagesDpiMax - sbam.project.preset.dpi ) + Math.exp(-element.IW.smooth*0.5) ) / element.IW.smooth;
							}
							//poi lo assegno normalizzandolo sul max dello slider
							setZoom(newZoom);
							
							logEmAll("DOPO setZoomByDpi");
						}
						function setDpiByZoom() {
							logEmAll("PRIMA setDpiByZoom");
							//mi serve un valore di element.IW.curZoom che mi va da 0 a 1, quindi normalizzo il valore che mi arriva dallo slider
							element.IW.curZoom = $("#slider"+element._id).val() / element.IW.maxZoomSlider;
							//uso due formule diverse a seconda che lo element.IW.curZoom sia maggiore o minore di metà scala
							if ( element.IW.curZoom <= 0.5 ) {
								element.IW.curDpi = sbam.project.preset.dpi + ( Math.exp(-element.IW.smooth*element.IW.curZoom) - Math.exp(-element.IW.smooth*0.5) ) / ( 1 - Math.exp(-element.IW.smooth*0.5) ) * ( sbam.config.imagesDpiMax - sbam.project.preset.dpi );
							} else if ( element.IW.curZoom > 0.5 ) {
								element.IW.curDpi = sbam.config.imagesDpiMin + ( sbam.config.imagesDpiMin - sbam.project.preset.dpi ) * ( 1 - 1 / element.IW.curZoom );
							}
							
							//nel caso degli sticker controllo che l'immagine non sia più piccola di quanto impostato con il fill
							if ( element.image.type && element.image.type == "sticker" ) {
								if ( Math.round(element.IW.curDpi) > Math.round(element.IW.curDpiMaxForSticker) ) {
									element.IW.curDpi = element.IW.curDpiMaxForSticker;
									element.IW.placedImgPixX = 0;
									element.IW.placedImgPixY = 0;
									element.IW.placedImgMmX = 0;
									element.IW.placedImgMmY = 0;
								}
							}

							
							//appena calcolati i dpi dell'immagine, posso anche decidere se deve essere visible o meno l'icona di warning sulla risoluzione
							if ( element.IW.curDpi >= sbam.config.imagesDpiMinWarn || (sbam.project.status && sbam.project.status == "ordered") ) {
								$("#lowresIcon"+element._id).fadeOut();
							} else {
								$("#lowresIcon"+element._id).fadeIn();
							}
							
							setImgSize();
							setImgOffset();
							
							
							//tengo 2 copie di offset e dimensioni px dell'immagine (mi servono per tenere l'immagine centrata durante lo zoom)
							updatePrevsChain();
							
							//ora tutte le variabili sono definite, posso salvare nella page
							storeImg();
							
							//e chiamare lato server un metodo che mi ritorna l'immagine da usare, con applicati eventuali effetti
							//questo metodo può essere chiamato solo ora perchè ha bisogno di conoscere tutti i dati dell'immagine (offset, dpi, ecc) per poter
							//applicare eventuali effetti
							if ( !element.IW.userIsZooming) postDrawWidgetImg(); //nota che questa è async, e ora non gestisce una closure quindi va chiamata per ultima
							
							logEmAll("DOPO setDpiByZoom");
						}
						function setDefaultZoomAndOffset() {
							logEmAll("PRIMA setDefaultZoomAndOffset");
							//se mancano sia zoom che offset, applico per default un fill all'immagine da cui ricavo entramni
							if ( ( isNaN(element.image.dpi) || element.image.dpi == 0 || element.image.dpi === null ) && ( isNaN(element.image.offsetx) || element.image.offsetx == 0 || element.image.offsetx === null ) && ( isNaN(element.image.offsety) || element.image.offsety == 0 || element.image.offsety === null ) ) {
								//console.log("setDefaultZoomAndOffset: manca tutto!!! chiamo fill dell'immagine");
								fillImage(true);
								//setZoomByDpi();
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
							//se è uno sticker fisso anche il valore di dpi massimo affinchè la figurina copra sempre tutto il bbox
							//per fare questo calcolo del chiamare thepositioner solo per avere le dimensioni in mm dell'immagine
							var pos = sbam.utils.thepositioner(element.IW.bboxMmW,element.IW.bboxMmH,element.IW.originalImgPixW,element.IW.originalImgPixH,true);
							//element.IW.curDpi = sbam.utils.dpmm2dpi( element.IW.originalImgPixW / pos.w );
							if ( element.image.type && element.image.type == "sticker" ) {
								element.IW.curDpiMaxForSticker = sbam.utils.dpmm2dpi( element.IW.originalImgPixW / pos.w );
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
							$("#image"+element._id)
								.css("-webkit-transform","none")
								.css("transform","none");
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

						
						
						
						function limitStickersToBbox(elm) {
							if ( element.IW.placedImgPixX > 0 ) {
								element.IW.placedImgPixX = 0;
							} else if ( element.IW.placedImgPixX <  elm.parent().width() - elm.width() ) {
								element.IW.placedImgPixX = elm.parent().width() - elm.width();
							}
							if ( element.IW.placedImgPixY > 0 ) {
								element.IW.placedImgPixY = 0;
							} else if ( element.IW.placedImgPixY <  elm.parent().height() - elm.height() ) {
								element.IW.placedImgPixY = elm.parent().height() - elm.height();
							}
						}
						
						function preDrawWidgetImg(widgetImg) {
							logEmAll("preDrawWidgetImg");
							//ho tutto per visualizzare la mia immagine
							//console.log("preDrawWidgetImg()  con widgetImg:");
							//console.log(widgetImg);
							//elimino eventuale wait icon specifica del caricamento immagine
							//$("#waitIcon"+element._id).remove();//NO non lo faccio qui, ma solo alla fine di tutto il processo
							//elimino eventuale immagine già presente
							$("#"+element._id+" img").remove();
							//finalmente visualizzo la mia immagine
							//(compresa immagine di warning per low res)
							//NOTA: qui appendo il tag <img> ma senza src. il src verrà assegnato alla fine da postDrawWidgetImg()
							///////////$("#"+element._id).prepend("<img id='image"+element._id+"' src='"+widgetImg.cachedUrl+"' class='dragdropForImageMove"+element._id+"' /><div id='lowresIcon"+element._id+"' class='elementImageLowresIcon' title='Questa immagine non ha risoluzione sufficiente per queste dimensioni. Se possibile ridurne le dimensioni.'></div>");
							$("#"+element._id).prepend("<img id='image"+element._id+"' class='dragdropForImageMove"+element._id+"' /><div id='lowresIcon"+element._id+"' class='elementImageLowresIcon' title='Questa immagine non ha risoluzione sufficiente per queste dimensioni. Se possibile ridurne le dimensioni.'></div>");
							//do all'immagine la possiblità di essere spostata dentro al proprio bbox (quindi cambiare l'offset con il drag and drop)
							//ma solo se l'elemento non è locked
							if ( !element.locked || element.locked != "yes" ) {
								$(".dragdropForImageMove"+element._id).pep({
									useCSSTranslation: false,
									shouldEase: false,
									initiate: function() {
										logEmAll("IMG MOVE INIT");
										$("#"+element._id).data("mosso","nonancora");
									},								
									start: function(ev, obj) {
										logEmAll("IMG MOVE START");
										//this.$el.text('start')
										$("#"+element._id).addClass("elementSelected dragCursor");
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
											$("#toolbox"+element._id).popup( "disable" );
										} else {
											$("#toolbox"+element._id).popup( "enable" );
										}
										//this.$el.text('stop')
										//imposto l'offset in pix uguale alla posizione dell' <img> dopo il drag and drop
										element.IW.placedImgPixX = this.$el.position().left;
										element.IW.placedImgPixY = this.$el.position().top;
										//se è uno sticker non permetto di spostare l'immagine fuori dal bbox
										if ( element.image.type && element.image.type == "sticker" ) {
											limitStickersToBbox(this.$el);
											this.$el.css("left",element.IW.placedImgPixX+"px");
											this.$el.css("top",element.IW.placedImgPixY+"px");
										}
										//e derivo l'offset in mm
										element.IW.placedImgMmX = element.IW.bboxMmW * element.IW.placedImgPixX / element.IW.bboxPixW;
										element.IW.placedImgMmY = element.IW.bboxMmH * element.IW.placedImgPixY / element.IW.bboxPixH;
										//console.log("ho appena finito MOVE dell'immagine e ho impostato element.IW:");
										//console.log(element.IW);
										//salvo nel mio elemento il nuovo offset
										storeImg();
										//aggiorno il src della mia immagine con quello nuovo, perchè se c'erano effetti vanno ricalcolati col nuovo offset
										postDrawWidgetImg();
										//tengo aggiornata la catena dei valori precedenti che mi server per centrare l'immagine durante lo zoom
										updatePrevsChain();										
										//aggiorno l'history
										sbam.history.add("Move image");
										//deseleziono l'immagine
										$("#"+element._id)
											.removeClass("elementSelected")
											.removeClass("dragCursor");
									}
								});
							}
							//widgetImg.originalW
							//popolo un po' di variabili che mi serviranno
							element.IW.originalImgPixW = widgetImg.originalW;
							element.IW.originalImgPixH = widgetImg.originalH;
							element.IW.bboxPixW = $("#"+element._id).width();
							element.IW.bboxPixH = $("#"+element._id).height();
							logEmAll("START ajax(getWidgetInfo).done");
							
							//aggiungo, se non c'è già, e solo per le figurine multiple, la griglia di divisione
							drawStickerGrid();
							
							//per poter calcolare dimensioni e posizione dell'immagine, devo prima definire zoom e offset nel caso non lo fossero
							setDefaultZoomAndOffset();
						}
						/*
						questa solitamente viene chiamanta senza passare argomento, nel qual caso si usa l'element passato a imageWidget()
						se invece si passa l'element, questo ha priorità, e viene anche sovrascritto su quello passato a imageWidget, che si presuppone non più aggiornato
						*/
						function postDrawWidgetImg(myElement) {
							if ( myElement ) element = myElement;
							//console.log("CHIAMATA postDrawWidgetImg() SU element.image.effects:"+element.image.effects);
							if ( element && element.image && element.image.url ) {
								sbam.utils.startWaiting();
								$.ajax({
									type: "POST",
									url: "/getWidgetImg",
									data: { 
										"element": element,
										//"url": element.image.url,
										//"effects": effects,
										"projectId": sbam.project._id
									}
								}).done(function( widgetImgDataAndUrl ) {
									if ( widgetImgDataAndUrl ) {
										widgetImgDataAndUrl = JSON.parse(widgetImgDataAndUrl);
										//assegno il src alla mia immagine
										$("#image"+element._id).attr("src",widgetImgDataAndUrl.cachedUrl);
										//tolgo wait generale
										sbam.utils.stopWaiting();
										//tolgo wait del mio elemento
										$("#waitIcon"+element._id).remove();
										//finito il lunghisssssimo processo di creazione di un widget!
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
						}



						/*
						solo per il caso di figurine multiple, disegna una griglia sull'immagine per mostrare dove verranno suddivise le figurine
						*/
						function drawStickerGrid() {
							//aggiungo, se non c'è già, e solo per le figurine multiple, la griglia di divisione
							//if ( element.image && element.image.type && element.image.type == "sticker" ) console.log("A METO O NOH A METO PE STO LEMENTO STICKERO?");
							if ( $("#elementStickerLayoutGrid"+element._id).length == 0 && element.image && element.image.type && element.image.type == "sticker" && element.image.stickerLayout ) { 
								var layout = sbam.pageEditor.parseStickerLayout(element.image.stickerLayout);
								if ( layout.stickerLayoutCols > 1 || layout.stickerLayoutRows > 1 ) {
									//console.log("DAJE CHE METO A GRIDJJIA");
									//prima calcolo la dimensione in px della singola figurina
									//var stickerPixW = bboxValToPixel(sbam.project.preset.stickers.width,element.IW.bboxPixW,element.IW.bboxMmW);
									//var stickerPixH = bboxValToPixel(sbam.project.preset.stickers.height,element.IW.bboxPixH,element.IW.bboxMmH);
									var stickerPixW = bboxValToPixel(sbam.project.preset.stickers.width,$("#"+element._id).width(),element.IW.bboxMmW);
									var stickerPixH = bboxValToPixel(sbam.project.preset.stickers.height,$("#"+element._id).height(),element.IW.bboxMmH);
									if ( layout.stickerLayoutType == "h" ) {
										var swap = stickerPixW;
										stickerPixW = stickerPixH;
										stickerPixH = swap;
									}
									for ( var i=0; i<layout.stickerLayoutRows; i++ ) {
										for ( var j=0; j<layout.stickerLayoutCols; j++ ) {
											//per ogni cella della griglia, la disegno
											var gridElmStyle = " style='left:"+String(j*stickerPixW)+"px;top:"+String(i*stickerPixH)+"px;width:"+String(stickerPixW)+"px;height:"+String(stickerPixH)+"px;' ";
											var gridElmClasses = "notInteractive elementStickerLayoutGrid";
											if ( i==0 && j==0 ) {
												gridElmClasses += " elementStickerLayoutGridFirsRow elementStickerLayoutGridFirsCol ";
											} else if ( i==0 ) {
												gridElmClasses += " elementStickerLayoutGridFirsRow ";
											} else if ( j==0 ) {
												gridElmClasses += " elementStickerLayoutGridFirsCol ";
											}
											var gridElm = "<div id='elementStickerLayoutGrid"+element._id+"' class='"+gridElmClasses+"' "+gridElmStyle+" onclick='return false;'></div>";
											$("#"+element._id).append(gridElm);
										}
									}
								}
							}							
						}
						function updateElementEffects(elementId) {
							//helper functions
							function updateInPage(pageIdx, elementId) {
								if ( pageIdx > -1 ) {
									if ( sbam.project.pages[pageIdx] && sbam.project.pages[pageIdx].elements && sbam.project.pages[pageIdx].elements.length > 0 ) {
										for ( var i=0; i<sbam.project.pages[pageIdx].elements.length; i++) {
											var element = sbam.project.pages[pageIdx].elements[i];
											if ( element._id == elementId ) {
												//salvo gli effects
												if ( !element.image.effects ) element.image.effects = "";
												console.log("PRIMA gli effects: "+element.image.effects);
												var effects = [];
												if ( $("#cornice"+element._id).is(':checked') ) effects.push("cornice");
												if ( $("#pannello"+element._id).is(':checked') ) effects.push("pannello");
												if ( $("#palla-calcio"+element._id).is(':checked') ) effects.push("palla-calcio");
												if ( $("#palla-baseball"+element._id).is(':checked') ) effects.push("palla-baseball");
												if ( $("#palla-golf"+element._id).is(':checked') ) effects.push("palla-golf");
												if ( $("#palla-rugby"+element._id).is(':checked') ) effects.push("palla-rugby");
												element.image.effects = effects.join(",");
												console.log("DOPO gli effects: "+element.image.effects);
												//devo ricaricare l'immagine nel widget con i nuovi effetti applicati
												postDrawWidgetImg(element);
												//e aggiungo all'history
												sbam.history.add("Modify image effects");
												break;
											}
										}
									}
								}
							}
							//devo trovare il mio element e aggiornare il suo colore
							//non può che essere un element di una delle due pagine correntemente aperte
							//quindi cerco prima in una poi nell'altra
							updateInPage(sbam.pageLeftIdx,elementId);
							updateInPage(sbam.pageRightIdx,elementId);
							
						}
						
						

						
						/*
						nel caso delle figurine, se è definito stickerLayout, le dimensioni dell'element sono prese dal preset del project, e bypassano eventuali w e h dichiarate nel layout xml
						stickerLayout me lo aspetto nella forma T-CxR
						NOTA: questo metodo c'è pari pari anche sul server in utils.js
						*/
						function manageStickerLayout(element,projectPreset) {
							//console.log("manageStickerLayout() PRIMA projectPreset:");
							//console.log(projectPreset);
							//console.log("manageStickerLayout() PRIMA element.bbox:");
							//console.log(element.bbox);
							if ( element.type && element.type == "image" && element.image && element.image.type && element.image.type == "sticker" && element.image.stickerLayout ) {
								if ( !element.bbox ) element.bbox = {};
									
								//faccio il parsing
								var layout = sbam.pageEditor.parseStickerLayout(element.image.stickerLayout);
								
								//calcolo le dimensioni del bbox per la figurina multipla complessiva
								if ( layout.stickerLayoutType == "v" ) {
									var stickerW = projectPreset.stickers.width * layout.stickerLayoutCols;
									var stickerH = projectPreset.stickers.height * layout.stickerLayoutRows;
								} else {
									var stickerW = projectPreset.stickers.height * layout.stickerLayoutCols;
									var stickerH = projectPreset.stickers.width * layout.stickerLayoutRows;
								}
								element.bbox.w = String(stickerW);
								element.bbox.h = String(stickerH);
							}
							//console.log("manageStickerLayout() DOPO element.bbox:");
							//console.log(element.bbox);
							//console.log("manageStickerLayout() DOPO element.image.stickerLayout: "+element.image.stickerLayout);
							//console.log("manageStickerLayout() DOPO layout.stickerLayoutType: "+layout.stickerLayoutType);
							//console.log("manageStickerLayout() DOPO layout.stickerLayoutCols: "+layout.stickerLayoutCols);
							//console.log("manageStickerLayout() DOPO layout.stickerLayoutRows: "+layout.stickerLayoutRows);
						}

						//per un'immagine, devo controllare se si stratta di una figurina
						//nel qual caso le sue dimensioni sono date dal preset, e bypassano eventuali altre dichiarate nel layout
						//questo va fatto prima di tutto, perchè altrimenti risulta un bbox senza dimensioni che sballa tutto il processo
						manageStickerLayout(element,sbam.project.preset);
						
						//variabili comuni usate dal widget immagini e dai suoi helper
						//nota che non le definisco con "var" perchè sarebbero con scope locale e
						//gli eventi a volte ci fanno casino, quindi definisco tutto dentro
						//a element, che a sua vosta è in sbam
						element.IW = {
							bboxPixW: 0,
							bboxPixH: 0,
							bboxMmW: bboxValToMm(element.bbox.w,sbam.project.preset.width),
							bboxMmH: bboxValToMm(element.bbox.h,sbam.project.preset.height),
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
						//$("#slider"+element._id).slider( "destroy" ); //alcuni widget di jq mobile vanno distrutti o resta merda nel dom
						//$("#toolbox"+element._id).popup( "destroy" ); //alcuni widget di jq mobile vanno distrutti o resta merda nel dom
						//$("#toolbox"+element._id).popup( "destroy" ); //alcuni widget di jq mobile vanno distrutti o resta merda nel dom
						$("#"+element._id).remove();
						
						
						//appendo subito il container della mia immagine, ovvero il suo bbox
						if ( element.locked ) {
							var isLocked = element.locked;
						} else {
							var isLocked = "no";
						}
						$(container).append("\
							<a id='"+element._id+"' pageIdx='"+idx+"' containerSelector='"+container+"' locked='"+isLocked+"' class='elementImage sbamDroppable'>\
								<div id='waitIcon"+element._id+"' class='ui-loader ui-corner-all ui-body-a ui-loader-default' style='display:block;position:relative;'>\
									<span class='ui-icon-loading'></span>\
									<h1>loading</h1>\
								</div>\
								<input type='number' data-type='range' id='slider"+element._id+"' name='slider"+element._id+"' class='elementImageToolboxSlider ui-btn-inline' min='0' max='"+element.IW.maxZoomSlider+"' data-mini='true' data-highlight='true'/>\
							</a>");
						//invece la toolbox la salvo, verrà appesa al dom solo on click, in modo ce il dom resti il più snello possibile
						//lo slider è usato per memorizzare lo zoom corrente, quindi deve essere già presente assieme all'immagine
						var imgToolboxString = "\
							<div id='toolbox"+element._id+"' data-corners='false' class='elementToolbox orcodio'>\
								<table class='elementImageToolboxZoomContainer'>\
									<tr>\
										<td>\
											<div class='ui-btn ui-corner-all ui-icon-search-minus ui-btn-icon-notext ui-btn-inline' data-mini='true'>Zoom out</div>\
										</td>\
										<td style='width:70%;' id='sliderContainer"+element._id+"'>\
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
										</li>";
						//a seconda della platform visualizzo o meno la bacchetta magica degli effetti
						//ora come ora solo tuolibro non la vede
						if ( sbamPlatform != "tuolibro" ) {
							imgToolboxString += "\
										<li>\
											<a id='toolboxBtnEffects"+element._id+"' data-icon='magic' ></a>\
											<form data-role='controlgroup' id='FXToolbox"+element._id+"' class='elementToolbox elementEffectsToolbox vertScrollable' >\
												<input type='checkbox' name='cornice"+element._id+"' id='cornice"+element._id+"' elementId='"+element._id+"' >\
												<label for='cornice"+element._id+"'>Cornice</label>\
												<input type='checkbox' name='pannello"+element._id+"' id='pannello"+element._id+"' elementId='"+element._id+"' >\
												<label for='pannello"+element._id+"'>Riquadro per nome</label>\
												<input type='radio' name='palla-tipo"+element._id+"' id='palla-nessuna"+element._id+"' elementId='"+element._id+"' checked='checked'>\
												<label for='palla-nessuna"+element._id+"'>Nessun logo</label>\
												<input type='radio' name='palla-tipo"+element._id+"' id='palla-calcio"+element._id+"' elementId='"+element._id+"' >\
												<label for='palla-calcio"+element._id+"'>Logo calcio</label>\
												<input type='radio' name='palla-tipo"+element._id+"' id='palla-baseball"+element._id+"' elementId='"+element._id+"' >\
												<label for='palla-baseball"+element._id+"'>Logo baseball</label>\
												<input type='radio' name='palla-tipo"+element._id+"' id='palla-golf"+element._id+"' elementId='"+element._id+"' >\
												<label for='palla-golf"+element._id+"'>Logo golf</label>\
												<input type='radio' name='palla-tipo"+element._id+"' id='palla-rugby"+element._id+"' elementId='"+element._id+"' >\
												<label for='palla-rugby"+element._id+"'>Logo rugby</label>\
											</form>\
										</li>";
						}
						imgToolboxString += "\
									</ul>\
								</div>\
							</div>\
							";
						//se l'elemento è locked cambio gli stili
						if ( element.locked && element.locked == "yes" ) {
							$("#"+element._id)
								.addClass("elementLocked"); //azzera gli effetti css di select/hover
								//.attr("href",""); //disabilito il click che aprirebbe la toolbox
							
						}
						
						//attivo lo slider (ma contemporaneamente lo nascondo)
						//nota che l'evento di change avviene prima dell'evento slider start
						$("#slider"+element._id).change(function () {
							logEmAll("PRIMA SLIDER CHANGE");
							setDpiByZoom(); 
							logEmAll("DOPO SLIDER CHANGE");
						}).slider({ 
							start: function( event, ui ) {
								logEmAll("çççççççç SLIDER MOVE START");
								element.IW.userIsZooming = true;
								centerImgOnZoom();
							},
							stop: function( event, ui ) { 
								logEmAll("çççççççç SLIDER MOVE STOP");
								element.IW.userIsZooming = false;
								//dopo che ho finito di zoomare devo ricaricare l'immagine perchè se ha effetti vanno ricalcolati col nuovo dpi/offset
								postDrawWidgetImg();
								//aggiorno l'history
								sbam.history.add("Zoom image");
							}
						});
						$("#"+element._id+" .ui-slider").hide();
						
						logEmAll("PRESTART imageWidget() appena assegnato change(setDpiByZoom) allo zoom. ");
						//appendo la scala cromatica al toolbox
						$("#"+element._id+" .ui-slider-track" ).prepend('<div class="sliderBackColor sbcGreen"></div><div class="sliderBackColor sbcOrange"></div><div class="sliderBackColor sbcRed"></div>');
						//on click visualizzo la toolbox
						$("#"+element._id).click(function(){
							//appendo la toolbox al dom solo se non c'è già
							if ($("#toolbox"+element._id).length == 0 && (!element.locked || element.locked != "yes" ) ) { 
								$(container).append(imgToolboxString);
								if ( element.image && element.image.type && element.image.type == "sticker" ) $("#toolboxBtnFit"+element._id).parent().remove();
								$("#navbar"+element._id).navbar();
								$("#toolbox"+element._id).popup({
									tolerance: "0,0,0,0",
									beforeposition: function( event, ui ) {
										//console.log("partito!");
										//prima chiudo tutti gli altri eventuali toolbox
										$(".elementTextToolbox").fadeOut("fast");
										$(".elementEffectsToolbox").fadeOut("fast");
										//e metto a selezionata l'immagine
										$("#"+element._id).addClass("elementSelected");
									},
									afterclose: function( event, ui ) {
										//rimetto lo slider nell'immagine
										$("#toolbox"+element._id+" .ui-slider").appendTo("#"+element._id).hide();
										//deseleziono l'immagine
										$("#"+element._id).removeClass("elementSelected");
										//chiudo eventuali popup rimasti aperti
										$(".elementEffectsToolbox").fadeOut("fast");
										//distruggo il mio popup
										//NO $("#toolbox"+element._id).popup("destroy");
									}
									
								});
								$("#FXToolbox"+element._id).controlgroup();
								//azioni ai bottoni del tollbox
								$("#toolboxBtnFill"+element._id).click(function () { fillImage(); sbam.history.add("Fill image"); });
								$("#toolboxBtnFit"+element._id).click(function () { fitImage(); sbam.history.add("Fit image"); });
								$("#toolboxBtnRem"+element._id).click(function () { remImage(); sbam.history.add("Unset image"); });
								$("#toolboxBtnEffects"+element._id).click(function () { $("#FXToolbox"+element._id).toggle(); });
								$("#toolboxBtnColorBackground"+element._id).spectrum({
									color: elementColorToRGBACss(element,"backgroundColor"), 
									foreOrBackGroundColor: "backgroundColor",
									change: function(color) {
										updateElementColor($(this).attr("elementId"),color.toRgb(),"backgroundColor");
									}
								});
								//popolo gli effetti
								if ( element.image && element.image.effects ) {
									var effects = element.image.effects.split(",");
									for ( var i=0; i<effects.length; i++ ) {
										var effect = effects[i];
										$("#"+effect+element._id).prop('checked', true);
									}
									$("#FXToolbox"+element._id).controlgroup("refresh");
								}
								//azioni sugli effetti
								$("#cornice"+element._id+',#pannello'+element._id+',#palla-calcio'+element._id+',#palla-baseball'+element._id+',#palla-golf'+element._id+',#palla-rugby'+element._id+',#palla-nessuna'+element._id).change(function() {
									updateElementEffects($(this).attr('elementId'));
								});
								
							}
							$("#toolbox"+element._id).show();
							//devo spostare lo slider che è assieme all'immagine, dentro la toolbox, e ricordarmi di rimetterlo aposto quando chiuderò la toolbox
							$("#"+element._id+" .ui-slider").appendTo("#sliderContainer"+element._id).show();
							//on open del toolbox lo posiziono
							var margin = 3; //dovrebbe essere lo spessore del bordo tratteggiato attorno all'element selezionato
							var toolboxLeft = $("#"+element._id).offset().left + Math.round($("#"+element._id).width()/2);
							if ( Number( $("#"+element._id).position().top ) + Number( $("#"+element._id).height() ) > Number( $("#"+element._id).parent().height() ) / 3 * 2 ) {
								var toolboxTop = $("#"+element._id).offset().top - Math.round($("#toolbox"+element._id).height()/2) - margin;
							} else {
								var toolboxTop = $("#"+element._id).offset().top + $("#"+element._id).height() + Math.round($("#toolbox"+element._id).height()/2) + margin;
							}
							$("#toolbox"+element._id).popup("open", { 
								'x': toolboxLeft,
								'y': toolboxTop
							});
						
						
							
						});
							
						//appena dopo aver appeso al dom il mio widget, devo richiamare questi 2 metodi che ne definisco size, pos, e stili (mi servono size e pos per tutti i calcoli che seguiranno)
						//poi ne applico gli style
						styleElement(element,container);
						//poi ne applico il bbox
						sizeAndPosElement(element,container);
						
						if ( element.image && element.image.url && element.image.url != "" ) {
							//chiamo il server in ajax per avere url dell'immagine in cache, e dimensioni dell'immagine originale in px
							//ma per performance cacho anche questa chiamata (che a sua volta mi avrebbe ritornato l'url di un'immagine in cache!)
							var key = sbam.utils.widgetImgCacheGetHash(sbam.project._id, element.image.url);
							if ( sbam.widgetImgCache[key] ) {
								//console.log("YESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS ho cache per hash="+key+" prjId="+sbam.project._id+" url="+element.image.url);
								//console.log(sbam.widgetImgCache[key]);
								//se ho in cache il result, uso quello e disegno il widget
								preDrawWidgetImg( sbam.widgetImgCache[key] );
							} else {
								//se non ho in cache il result, eseguo la chiamata ajax
								sbam.utils.startWaiting();
								$.ajax({
									type: "POST",
									url: "/getWidgetInfo",
									data: { 
										"element": element,
										//"url": element.image.url,
										//"effects": effects,
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
										//sbam.utils.stopWaiting();//NO, non lo faccio qui ma solo alla fine di tutto il processo, quando chiamo in ajax getWidgetImg
										//disegno il widget
										//nota: getWidgetInfo mi ritorna solo le dimensioni dell'immagine,
										//poi dovrò chiamare getWidgetImg per avere anche l'url
										preDrawWidgetImg( widgetImgData );
									} else {
										//se il metodo ajax ritorna false (errore) mi fermo
										alert( "Fallito metodo su server /getWidgetInfo chiamato con parametri : url="+element.image.url+" projectId="+sbam.project._id);
										console.log( "Fallito metodo su server /getWidgetInfo chiamato con parametri : url="+element.image.url+" projectId="+sbam.project._id);
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
							//disegno comunque la griglia per le figurine multiple
							drawStickerGrid();
							//disabilito popup
							//MA SIAMO SICURI? $("#toolbox"+element._id).popup( "disable" );
						}
					}
					function textWidget(element) {
						//appendo con jq (peso: 0ms - tot: 0ms)
						$(container).append("\
							<a id='"+element._id+"' class='elementText'>\
								<div contenteditable='true' class='elementTextContent' >\
									"+element.text.content+"\
								</div>\
							</a>");
						//invece la toolbox la salvo, verrà appesa al dom solo on click, in modo ce il dom resti il più snello possibile
						var textToolboxString = "\
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
							</div>";
							
						//on click visualizzo la toolbox
						$("#"+element._id).click(function(){
							//appendo la toolbox al dom solo se non c'è già, e se l'element non è locked
							if ($("#toolbox"+element._id).length == 0 && (!element.locked || element.locked != "yes" ) ) { 
								$(container).append(textToolboxString);
								//appendo i font al select (peso: 50ms - tot: 50ms)
								var domString = "";
								for ( var x=0; x<sbam.config.usableFonts.length; x++ ) {
									var font = sbam.config.usableFonts[x];
									if ( element.style && element.style.font && element.style.font == font ) {
										var selected=" selected='selected' ";
									} else {
										var selected = "";
									}
									domString += "<option value='"+font+"' "+selected+" >"+font+"</option>";
								}
								$("#fontSelect"+element._id).append(domString);
								//appendo i fontSize al select (peso: 5ms - tot: 55ms)
								domString = "";
								for ( var x=0; x<sbam.config.usableFontSizes.length; x++ ) {
									var fontSize = sbam.config.usableFontSizes[x];
									if ( element.style && element.style.fontSize && element.style.fontSize == fontSize ) {
										var selected=" selected='selected' ";
									} else {
										var selected = "";
									}
									domString += "<option value='"+fontSize+"' "+selected+" >"+fontSize+"pt</option>";
								}
								$("#fontSizeSelect"+element._id).append(domString);
								//appendo i fontAlign al controlgroup (peso: 5ms - tot: 60ms)
								domString = "";
								for ( var x=0; x<sbam.config.usableFontAligns.length; x++ ) {
									var fontAlign = sbam.config.usableFontAligns[x];
									if ( element.style && element.style.align && element.style.align == fontAlign ) {
										var selected=" checked='checked' ";
									} else {
										var selected = "";
									}
									domString += "<input type='radio' id='fontAlign"+element._id+x+"' name='fontAlign"+element._id+"' elementId='"+element._id+"' value='"+fontAlign+"' "+selected+" ><label for='fontAlign"+element._id+x+"' ><img src='/stylesheets/png/align-"+fontAlign+".png' class='fontAlignItem' /></label>";
								}
								$("#fontAlign"+element._id).append(domString);
								
								//attivo eventi e componenti jqm vari (peso: 360ms - tot: 420ms)
								$("#navbar"+element._id).navbar();
								$("#fontAlign"+element._id).controlgroup();
								//aggiorno gli allineamenti
								$("#fontAlign"+element._id+" input[name=fontAlign"+element._id+"]:radio").change(function () {
									updateElementFontAlign($(this).attr("elementId"),this.value);
								});
								$("#fontSelect"+element._id).selectmenu().on('change', function() {
									updateElementFont($(this).attr("elementId"),this.value);
								});
								$("#fontSizeSelect"+element._id).selectmenu().on('change', function() {
									updateElementFontSize($(this).attr("elementId"),this.value);
								});								
								
								//PERFORMANCE gli spectrum restano critici
								//attivo foregroundColor
								$("#toolboxBtnColorForeground"+element._id).spectrum({
									color: elementColorToRGBACss(element,"foregroundColor"),
									foreOrBackGroundColor: "foregroundColor",
									change: function(color) {
										updateElementColor($(this).attr("elementId"),color.toRgb(),"foregroundColor");
									}
								});
								//attivo backgroundColor
								$("#toolboxBtnColorBackground"+element._id).spectrum({
									color: elementColorToRGBACss(element,"backgroundColor"),
									foreOrBackGroundColor: "backgroundColor",
									change: function(color) {
										updateElementColor($(this).attr("elementId"),color.toRgb(),"backgroundColor");
									}
								});
								
							}
							
							$("#toolbox"+element._id).show();
							//on open del toolbox lo posiziono
							var margin = 3; //dovrebbe essere lo spessore del bordo tratteggiato attorno all'element selezionato
							var toolboxLeft = $("#"+element._id).position().left - Math.round(($("#toolbox"+element._id).width()-$("#"+element._id).width())/2);
							if ( Number( $("#"+element._id).position().top ) + Number( $("#"+element._id).height() ) > Number( $("#"+element._id).parent().height() ) / 3 * 2 ) {
								var toolboxTop = $("#"+element._id).position().top - $("#toolbox"+element._id).height() - margin;
							} else {
								var toolboxTop = $("#"+element._id).position().top + $("#"+element._id).height() + margin;
							}
							//console.log("GIOSTOPER: MA DOVE CAZZO SEI?!?");
							//console.log($("#toolbox"+element._id).position());
							//console.log("GIOSTOPER: E DOVE CAZZO TI METTEREI?!?");
							//console.log(toolboxLeft);
							//console.log(toolboxTop);
							$("#toolbox"+element._id).css("left", toolboxLeft);							
							$("#toolbox"+element._id).css("top", toolboxTop);							
							
						});
							
							
							

						//gestisco i contenteditable
						$("#"+element._id+" .elementTextContent").focus(function(){
							if ( element.locked && element.locked == "yes" ) {
								$("#"+element._id+" .elementTextContent").attr("contenteditable","false");
							} else {
								//prima chiudo tutti gli altri popup eventualmente aperti, poi apro il mio
								$(".elementTextToolbox").fadeOut("fast",function(){});
								$(".elementEffectsToolbox").fadeOut("fast",function(){});
								$("#toolbox"+element._id).fadeIn("fast", function(){
									//e seleziono tutto il testo
									$("#"+element._id+" .elementTextContent").selectText();
								});
							}
						});
						//se l'elemento è locked cambio gli stili
						if ( element.locked && element.locked == "yes" ) {
							$("#"+element._id)
								.addClass("elementLocked") //azzera gli effetti css di select/hover
								.attr("href",""); //disabilito il click che aprirebbe la toolbox
							
						}

						//PERFORMANCE queste 2 sono troppo pesanti
						//appena dopo aver appeso al dom il mio widget, devo richiamare questi 2 metodi che ne definisco size, pos, e stili (mi servono size e pos per tutti i calcoli che seguiranno)
						//poi ne applico gli style (peso: 780ms - tot: 1200ms)
						styleElement(element,container);
						
						//poi ne applico il bbox (peso: 300ms - tot: 2000ms)
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
						// PERFORMANCE questa resta critica, forse è il width?
						if ( element.style && element.style.fontSize ) {
							var normFont = Math.round(Number(element.style.fontSize) * 0.3528 / sbam.project.preset.width * containerWidth * 10 ) / 10;
							//var normFont = Math.round(Number(element.style.fontSize) * 0.3528 / sbam.project.preset.width * parseFloat( $(container).css("width") ) * 10 ) / 10;
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
											Math.round(bboxValToMm(element.bbox.w,sbam.project.preset.width)) == Math.round(sbam.project.preset.width)
											&&
											Math.round(bboxValToMm(element.bbox.h,sbam.project.preset.height)) == Math.round(sbam.project.preset.height)
										) {
											//elimino icona di fondo
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
							}
						}
						//se il mio project ha status = "ordered" devo renderlo non modificabile
						sbam.pageEditor.disableEditing();
					}
				}
				//disegno l'ombretta del cazzo
				drawPageShadow();
				//ciclo su tutti gli elements della pagina, e li renderizzo
				createElements();
			}
			//processo di drawing
			//uso il trucchetto di far partire tutto ritardato di 1 decimo di secondo con un timer, per permettere al waiter di essersi visualizzato prima che tutto si inchiodi per l'elaborazione del DOM
			sbam.utils.startWaiting();
			setTimeout(function(){
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
				setTimeout(function(){ sbam.utils.stopWaiting(); }, 100);
				
			}, 100);
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
		},
		parseStickerLayout: function (layout) {
			//faccio il parsing
			//stickerLayout me lo aspetto nella forma T-CxR
			var stickerLayoutParts = layout.toLowerCase().split("-");
			//console.log("manageStickerLayout() DURANTE stickerLayoutParts: ");
			//console.log(stickerLayoutParts);
			var stickerLayoutType = stickerLayoutParts[0];
			var stickerLayoutSize = stickerLayoutParts[1];
			var stickerLayoutCols = Math.round(Number(stickerLayoutSize.split("x")[0]));
			var stickerLayoutRows = Math.round(Number(stickerLayoutSize.split("x")[1]));
			//console.log("manageStickerLayout() DURANTE stickerLayoutCols: "+stickerLayoutCols);

			//valido i parametri
			//se il type non è h, allora è sempre v
			if ( stickerLayoutType && ( stickerLayoutType == "h" ) ) {
				stickerLayoutType = "h";
			} else {
				stickerLayoutType = "v";
			}
			if ( !stickerLayoutCols || isNaN(stickerLayoutCols) || stickerLayoutCols <= 0 ) {
				stickerLayoutCols = 1;
			}
			//console.log("manageStickerLayout() DURANTE stickerLayoutCols: "+stickerLayoutCols);
			if ( !stickerLayoutRows || isNaN(stickerLayoutRows) || stickerLayoutRows <= 0 ) {
				stickerLayoutRows = 1;
			}
			return {
				"stickerLayoutType": stickerLayoutType,
				"stickerLayoutCols": stickerLayoutCols,
				"stickerLayoutRows": stickerLayoutRows
			};
		},
		/*
		disabilito l'editing delle pagine
		viene usato per quando si visualizza un project "ordered" che non deve essere più modificabile
		*/
		disableEditing: function() {
			if ( sbam.project && sbam.project.status && sbam.project.status == "ordered") {
				$(".elementText, .elementSticker, .elementPagenum, .elementImage").addClass( "notInteractive" );
				$("#leftPageTemplatesButton").addClass("ui-state-disabled");
				$("#rightPageTemplatesButton").addClass("ui-state-disabled");
				$("#buttonMedia").addClass("ui-state-disabled");
				$("#buttonDelProject").addClass("ui-state-disabled");
				$("#buttonModifyProject").addClass("ui-state-disabled");
				//$("#buttonCloneProject").addClass("ui-state-disabled");
				$("#buttonAddPage").addClass("ui-state-disabled");
				$("#buttonDelPage").addClass("ui-state-disabled");
			} else {
				$(".elementText, .elementSticker, .elementPagenum, .elementImage").removeClass( "notInteractive" );
				
				//come regola generale, la seconda e la terza di copertina non permettono MAI di cambiare layout
				if ( sbam.project.pages[sbam.pageLeftIdx] && sbam.project.pages[sbam.pageLeftIdx].type != "cover-2-front" ) {
					$("#leftPageTemplatesButton").removeClass("ui-state-disabled");
				} else {
					$("#leftPageTemplatesButton").addClass("ui-state-disabled");
				}
				if ( sbam.project.pages[sbam.pageRightIdx] && sbam.project.pages[sbam.pageRightIdx].type != "cover-3-back" ) {
					$("#rightPageTemplatesButton").removeClass("ui-state-disabled");
				} else {
					$("#rightPageTemplatesButton").addClass("ui-state-disabled");
				}
				 
				
				
				$("#buttonMedia").removeClass("ui-state-disabled");
				$("#buttonDelProject").removeClass("ui-state-disabled");
				$("#buttonModifyProject").removeClass("ui-state-disabled");
				//$("#buttonCloneProject").removeClass("ui-state-disabled");
				$("#buttonAddPage").removeClass("ui-state-disabled");
				$("#buttonDelPage").removeClass("ui-state-disabled");
			}
		}

	},
	utils: {
		uploader: {
			totalFileSize: 0,
			biggestFileSize: 0,
			totalFileSizeLabel: "",
			totalFileSizeLoaded: 0,
			fileSelected: function () {
				//console.log("fileSelected");
				//ciclo su tutti i file solo per calcolare le dimensioni totali...
				var files = document.getElementById('fileToUpload').files;
				sbam.utils.uploader.biggestFileSize = 0;
				sbam.utils.uploader.totalFileSize = 0;
				sbam.utils.uploader.totalFileSizeLoaded = 0;
				for ( var x=0; x<files.length; x++ ) {
					var file = files[x];
					sbam.utils.uploader.totalFileSize += file.size;
					if ( file.size > sbam.utils.uploader.biggestFileSize ) {
						sbam.utils.uploader.biggestFileSize = file.size;
					}
				}
				//se supero il massimo consentito, blocco
				if ( sbam.utils.uploader.totalFileSize > sbam.config.maxPostSize ) {
					$("#addMediaButton").addClass("ui-disabled");
					alert("superato il limite massimo di "+Math.round(sbam.config.maxPostSize*100/(1024*1024))/100+" MB per singolo upload. ridurre il numero di file o la dimensione dei file.");
				} else {
					$("#addMediaButton").removeClass("ui-disabled");
				}
				
				sbam.utils.uploader.totalFileSizeLabel = "";
				if (sbam.utils.uploader.totalFileSize > 1024 * 1024)
					sbam.utils.uploader.totalFileSizeLabel = (Math.round(sbam.utils.uploader.totalFileSize * 100 / (1024 * 1024)) / 100).toString() + 'MB';
				else
					sbam.utils.uploader.totalFileSizeLabel = (Math.round(sbam.utils.uploader.totalFileSize * 100 / 1024) / 100).toString() + 'KB';
				$("#totalFileSizeLabel").html("Tot.: "+sbam.utils.uploader.totalFileSizeLabel+" in "+files.length+" file(s)");
				
			},

			uploadFile: function() {
				$("#addMediaButton").addClass("ui-disabled");
				$("#fileToUpload").addClass("ui-disabled");




				
				var files = document.getElementById("fileToUpload").files; 
				var counter = files.length;
				var progressBarsWidth = 500; //questo è il valore massimo, assegnato al file più grosso
				var currentMediaPathAtUploadStart = sbam.currentMediaPath;
				/* NON PIU
				//prima di iniziare il loop async devo calcolarmi il totale dei file da scaricare
				for ( var x=0; x<files.length; x++ ) {
					var file = files[x];
					//console.log("devo sommare ");
					//console.log(file);
				}
				*/

				serialAsyncLoop();
				function serialAsyncLoop() {
					if ( counter > 0 ) {
						counter--;
						//se il panel dei media è aperto lo aggiorno
						if( $("#panelMedia").hasClass("ui-panel-open") == true ){
							//console.log("chiamo getMedia");
							sbam.utils.getMedia();
						}
						var file = files[counter];
						var progressBarWidth = progressBarsWidth * ( file.size / sbam.utils.uploader.biggestFileSize );
						if (file.size > 1024 * 1024)
							var fileSizeLabel = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
						else
							var fileSizeLabel = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
						var fd = new FormData(); // Create new FormData
						//fd.append("action","upload"); // append extra parameters if you wish.
						fd.append("fileToUpload",file); // append the next file for upload
						var xhr = new XMLHttpRequest();
						xhr.progressId = "";
						xhr.addEventListener("loadstart", function(e){
							// generate unique id for progress bars. This is important because we'll use it on progress event for modifications
							xhr.progressId = "progress_" + Math.floor((Math.random() * 100000)); 
							// append progress elements to somewhere you want
							$("#progressBarsContainer").prepend('\
									<tr>\
										<td>\
											<div class="uploaderProgressBarLabel" style="text-align:right;">'+fileSizeLabel+'</div>\
										</td>\
										<td style="width:'+progressBarWidth+'px">\
											<div class="uploaderProgressBarBg" style="width:'+progressBarWidth+'px"></div>\
											<div id="' + xhr.progressId + '" class="uploaderProgressBar" dataValueTotal="0"></div>\
										</td>\
										<td>\
											<div class="uploaderProgressBarLabel" >'+file.name+'</div>\
										</td>\
									</tr>\
							');
							//aggiorno anche la label del waiter in header
							$("#buttonMediaWaiter").text("uploading "+String(files.length-counter)+" / "+String(files.length));
							//visualizzo il waiter nell'header menu
							$("#buttonMediaWaiter").fadeIn();
							//console.log("PARTITO LOADER "+xhr.progressId);
						});
						xhr.upload.addEventListener("progress", function(e){
							if (e.lengthComputable) {
								//prima aggiorno il loader del mio file
								var total = e.total;
								var loaded = e.loaded;
								$("#" + xhr.progressId).attr("dataValueTotal",total);
								var percent = (100 / total) * loaded; // Calculate percentage of loaded data
								// I animate progress object. Notice that i use "xhr.progressId" which i created on loadstart event.
								$("#" + xhr.progressId).animate({"width":progressBarWidth * (percent / 100)}, 100);
								//console.log("AGGIORNATO LOADER "+xhr.progressId+" con percent: "+percent);
								//poi aggiorno anche il loader totale di tutti gli uploads
								var loadedOnAllFiles = sbam.utils.uploader.totalFileSizeLoaded + loaded;
								var percentRounded = Math.round((100 / sbam.utils.uploader.totalFileSize) * loadedOnAllFiles);
								//document.getElementById('progressNumber').innerHTML = percentRounded.toString() + '%';
								//sbam.utils.uploader.totalFileSizeLabel
								if (sbam.utils.uploader.totalFileSize > 1024 * 1024)
									var totalLabel = (Math.round(sbam.utils.uploader.totalFileSize * 100 / (1024 * 1024)) / 100).toString() + 'MB';
								else
									var totalLabel = (Math.round(sbam.utils.uploader.totalFileSize * 100 / 1024) / 100).toString() + 'KB';
								if (loadedOnAllFiles > 1024 * 1024)
									var loadedLabel = (Math.round(loadedOnAllFiles * 100 / (1024 * 1024)) / 100).toString() + 'MB';
								else
									var loadedLabel = (Math.round(loadedOnAllFiles * 100 / 1024) / 100).toString() + 'KB';
								$("#progressNumber").val(percentRounded).slider("refresh");
								$("#progressLabel").html("file "+String(files.length-counter)+" / "+files.length+" ( "+loadedLabel+" / "+totalLabel+" )");
							} else {
								//document.getElementById('progressNumber').innerHTML = 'unable to compute';
							}
						});
						xhr.addEventListener("load", function(e){
							//console.log("FINITO LOADER "+xhr.progressId+" con e.total="+Number($("#" + xhr.progressId).attr("dataValueTotal")));
							sbam.utils.uploader.totalFileSizeLoaded += Number($("#" + xhr.progressId).attr("dataValueTotal"));
							serialAsyncLoop();
						});
						xhr.open("POST", "/upload/"+sbam.project._id+"/"+encodeURIComponent(currentMediaPathAtUploadStart));
						xhr.send(fd);
						//infine riposiziono il popup che potrebbe aver cambiato le dimensioni ed essere finito offscreen
						var maxWidth = Math.round($( window ).width()/100*70);
						var maxHeight = $( window ).height()-20;
						$("#popupAddMedia").css("overflow-y","scroll");
						$("#popupAddMedia").css("width",String(maxWidth)+"px !important");
						$("#popupAddMedia").css("max-height",String(maxHeight)+"px");
						$("#popupAddMedia").popup("reposition", {positionTo: 'window'});
						//sbam.utils.recenterPopup("#popupAddMedia");//non si capisce perchè ma su questo poopup sbaglia il posizionamento, mentre funziona su altri
						
					} else {
						//finito serialAsyncLoop
						//console.log("FINITO TUTTO, chiamo getMedia()");
						//ricarico la lista delle immagini nel panel
						//ma solo se il panel è aperto
						if( $("#panelMedia").hasClass("ui-panel-open") == true ){
							sbam.utils.getMedia();
						}
						//aggiorno l'interfaccia togliendo il button "caricamento" nell'header menu
						$("#buttonMediaWaiter").fadeOut();
						//e	mettendo il bottone di reset form, con relativo click
						$("#progressLabel").html("<span class='fgGreen'>COMPLETED!</span>");
						$("#addMediaButton").after("<a id='resetMediaButton' href='#' class='ui-btn ui-icon-trash-o ui-btn-icon-right ui-shadow ui-corner-all ui-btn-inline'>Reset</a>");
						$("#resetMediaButton").click(function(){
							//riabilito tutta l'interfaccia e la resetto 
							$("#resetMediaButton").remove();
							//$("#addMediaButton").removeClass("ui-disabled");
							$("#fileToUpload").removeClass("ui-disabled");
							//console.log(evt.target.responseText);
							$("#progressNumber" ).val(0).slider("refresh");
							$("#progressLabel" ).html("");
							$("#totalFileSizeLabel").html("");
							$(".uploaderProgressBarContainer").empty();
							//$("#popupAddMedia" ).popup( "close" );
							//infine azzero l'input dei file
							//ATTENZIONE: non so perchè ma: sta roba FUNZIONA ma throwa un errore nel browser, che blocca l'esecuzione ulteriore di questo metodo, quindi VA PER ULTIMA!
							//questa istruzione jquery 
							var uploadInputField = $("#fileToUpload");
							var uploadInputFieldClone = uploadInputField.val('').clone(true);
							uploadInputField.replaceWith(uploadInputFieldClone);
						});
					}
				}
			},
		},
		getMedia: function() {
			//console.log("utils: getMedia con sbam.currentMediaPath="+sbam.currentMediaPath);
			//leggo tutti i media del mio utente e del mio project via ajax
			//se non è caricato alcun project, skippo:
			if ( !sbam.projectEditor.isProjectLoaded() ) {
				alert( "getMedia() error! No project loaded!" );
			} else {
				sbam.utils.startWaiting();
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
							//per ogni immagine c'è un item nella lista
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
								});
							} else {
								var randomChunk = "";
								/* non serve qui, lo faccio sul server quando leggo i file
								if ( forceReload ) {
									console.log("LOFFA MERDA CI PASSO?!?!?!?!?!?!??!?!?!?!??!");
									var d = new Date();
									randomChunk = "?"+d.getTime();
								}
								*/
								
								//capisco se questa immagine è già stata usata nel progetto
								var popupToolboxMedia = "";
								var usedImageIcon = "";
								var mediaIcon = "camera";
								if ( sbam.utils.getMediaInProjectByUrl(sbam.currentMediaPath+files[i].name) ) {
									//è già stata usata, devo aggiungere l'icona
									usedImageIcon = "<div class='usedImageIcon'></div>";
									mediaIcon = "check";
								} else {
									//solo per le immagini del repo, e se non sono già state usate nel project, abilito la toolbox dei media con cui possono essere modficati i file originali nel repo
									if ( files[i].isRepo ) {
										//solo i file dai repo hanno il link che apre la popupToolboxMedia
										popupToolboxMedia = "<a id='mediaItemToolboxOpener"+i+"' href='#popupToolboxMedia' data-rel='popup' data-position-to='window' data-transition='pop' mediaUrl='"+sbam.currentMediaPath+files[i].name+"'>Edit</a>";
										mediaIcon = "gear";
									}
								}
								
								//tutti i file hanno anche il cursore per poter essere draggati
								//e un attributo sul <img> per portarsi dietro i dati dell'immagine per il D&D
								//e un'eventuale icona che indica se l'immagine è già stata usata nel documento
								$("#panelMediaListview").append("\
									<li class='mediaItem' data-icon='"+mediaIcon+"' >\
										<a  id='mediaItem"+i+"' title='"+files[i].name+"' style='cursor:default;padding-left:130px;'>\
											<img src='"+files[i].thumbUrl+randomChunk+"' class='dragdropForImageAssign' draggedimgurl='"+escape(sbam.currentMediaPath+files[i].name)+"'  style='cursor:pointer; max-width:120px;' title='trascina nella pagina'>\
											<h2>"+files[i].name+"</h2>\
											<p>"+files[i].name+"</p>\
											"+usedImageIcon+"\
										</a>\
										"+popupToolboxMedia+"\
									</li>");
								
								//infine, se è stato abilitato il toolbox per i media, devo attaccare un click listener custom ad ogni immagine che puo' aprirlo
								if ( popupToolboxMedia ) {
									$('#mediaItemToolboxOpener'+i).click(function(){
										//quando viene cliccato l'ingranaggio dell'immagine, salvo nel popup l'url dell'immagine che lo ha aperto
										//mi servirà per sapere su che immagine applicare le operazioni di editing scelte nel popup
										$("#popupToolboxMedia").attr("mediaUrl",$(this).attr("mediaUrl"));
										//alert("cliccato i="+i+" mediaUrl="+$("#popupToolboxMedia").attr("mediaUrl"));
									});
								}

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
						$("#panelMediaListview" ).listview( "refresh" );
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
									var isLocked = $(targetElement).attr("locked");
									
									if ( !isLocked || isLocked != "yes" ) {
										//console.log("droppato su:");
										//console.log(targetElementId);
										//alla fine chiamo metodo di store del nuovo url
										var storedElement = storeDraggedImg(targetPageIdx,targetElementId,draggedImageUrl);
										//e ridisegno la pagina
										sbam.pageEditor.drawPage();
									}
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
					
					sbam.utils.stopWaiting();
				}).fail(function( jqXHR, textStatus ) {
					alert( "Request failed: " + textStatus );
				});		
			}
		},
		/*
		trova le immagini nel project correntemente caricato cercandole per url
		*/
		getMediaInProjectByUrl: function(url) {
			//console.log("getMediaInProjectByUrl - VUALLA! url="+url);
			if ( sbam.project && sbam.project.pages ) {
				for ( var i=0; i<sbam.project.pages.length; i++ ) {
					var page = sbam.project.pages[i];
					if ( page.elements ) {
						for ( var j=0; j<page.elements.length; j++ ) {
							var element = page.elements[j];
							if ( element.type == 'image' && element.image && element.image.url && element.image.url )  {
								//console.log("OHO considero: element.image.url = "+element.image.url);
								if ( element.image.url == url ) {
									//console.log("ORCCCCCODDDDIOSIIIIIIIIIIIIIIIIIIIIIIIIIIIIII E GGGGIA USATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa");
									return element;
								}
							}
						}
					}
				}
			}
			return false;
		},
		editMedia: function(action) {
			var url = $("#popupToolboxMedia").attr("mediaUrl");
			console.log("chiamato editMedia con url="+url+" e action="+action);
			sbam.utils.startWaiting();
			$.ajax({
				type: "POST",
				url: "/editMedia",
				data: { 
					"url": url, 
					"projectId": sbam.project._id,
					"action": action
				} 
			}).done(function( result ) {
				//result = JSON.parse(result);
				sbam.utils.stopWaiting();
				//solo per il file modificato resetto la cache usata da getWidgetImg
				var key = sbam.utils.widgetImgCacheGetHash(sbam.project._id, url);
				if ( sbam.widgetImgCache[key] ) delete sbam.widgetImgCache[key];
				
				
				//ricarico la lista dei media
				sbam.utils.getMedia();
				/*
				sbam.utils.getMedia(function(){
					//questo ha forzato la ricreazione dei file in cache modificati dall'editing
					//ma devo anche bypassare la cache del browser (ufficialmente il file non ha cambiato nome)
					//quindi forso il reload aggiungendo un parametro random all'url delle immagini modificate
					$('img[src$="'+url.split("/").join("-")+'"]').each(function( index ) {
						//console.log( index + ": " + $( this ).text() );
						var d = new Date();
						$(this).attr("src", $(this).attr("src")+"?"+d.getTime());
						//$(this).attr("src", d.getTime());
					});
				});
				*/
			}).fail(function( jqXHR, textStatus ) {
				alert( "Request failed: " + textStatus );
			});	
		},
		widgetImgCacheGetHash: function(projectId, imageUrl) {
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
		},
		addFolder: function() {
			sbam.utils.startWaiting();
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
				sbam.utils.stopWaiting();
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
			$("#panelAccount").panel( "close" );
			//azzero eventuale scroll dovuto a pannelli più lunghi dallo schermo
			window.scrollTo(0,0);
		},
		recenterPopup: function(popupSelector) {
			//$("#popupOrderProject").popup("reposition", {positionTo: 'window'});//NO va in loop infinito
			var maxHeight = $( window ).height()-20;
			var maxWidth = $( window ).width()/100*70;
			$(popupSelector).css("overflow-y","scroll");
			$(popupSelector).css("width",String(maxWidth)+"px");
			$(popupSelector).css("max-height",String(maxHeight)+"px");
			$(popupSelector).css("position","fixed");
			setTimeout(function(){
				/*
				if ( center && center == "TL" ) {
					var newX = -$(popupSelector).width()/2;
					var newY = -$(popupSelector).height()/2;
				} else {
					var newX = -$(popupSelector).width()/2;
					var newY = -$(popupSelector).height()/2;
				}
				*/
				var newX = -$(popupSelector).width()/2;
				var newY = -$(popupSelector).height()/2;
				//console.log("recenterPopup() maxHeight="+maxHeight+" maxWidth="+maxWidth+" $(popupSelector).width()="+$(popupSelector).width()+" $(popupSelector).height()="+$(popupSelector).height()+" newX="+newX+" newY="+newY);
				$(popupSelector).css("left",String(newX)+"px");
				$(popupSelector).css("top",String(newY)+"px");
			},1);
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
			//e conseguentemente all'order, che va all'opposto del save (se devo salvare non posso stampare, e viceversa)
			if ( sbam.history.mustSave ) {
				$("#buttonSave").css( "background-color","#ffbbbb" );
				if ( sbam.project && sbam.project.status && sbam.project.status == "editing") $("#buttonSave").removeClass( "ui-state-disabled" );
				$("#buttonOrder").addClass( "ui-state-disabled" );
			} else {
				$("#buttonSave").css( "background-color","rgb(246, 246, 246)" );
				$("#buttonSave").addClass( "ui-state-disabled" );
				if ( sbamUserIsLogged ) $("#buttonOrder").removeClass( "ui-state-disabled" );
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
		pad: function (n, width, z) {
			z = z || '0';
			n = n + '';
			return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
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
		},
		startWaiting: function() {
			//se c'è già un waiter, non ne visualizzo altri, se no si sovrapporrebbero inutilmente
			if ( $(".loadingUiBlocker").length == 0 ) {
				//visualizzzo subito l'icone
				$.mobile.loading("show");
				//e solo dopo mezzo secondo il resto
				$("body").prepend("<div class='loadingUiBlocker'></div>");
				setTimeout(function(){
					$(".loadingUiBlocker").fadeIn(500);
				}, 2000);
			}
		},
		stopWaiting: function() {
			$.mobile.loading("hide");
			$(".loadingUiBlocker").fadeOut(250,function(){
				$(".loadingUiBlocker").remove();
			});
		},
		bootstrapActions: function() {
			if ( typeof sbamBootstrap != 'undefined' && sbamBootstrap ) {
				//se c'è qualcosa da fare al bootstrap lo faccio
				var action = "";
				var arg1 = "";
				var arg2 = "";
				var chunks = sbamBootstrap.split(":");
				if ( chunks.length == 3 ) {
					action = chunks[0];
					arg1 = chunks[1];
					arg2 = chunks[2];
					switch(action) {
						case "createDefaultProject":
							var defaultType = arg1;
							var defaultPreset = arg2;
							//var defaultName = "DEMO: "+defaultType+" "+defaultPreset;
							var defaultName = "demo";
							//console.log("sto per chiamare projectExist con:");
							//console.log("defaultName="+defaultName);
							//console.log("defaultType="+defaultType);
							//console.log("defaultPreset="+defaultPreset);
							//prima controllo se non è già stato creato un progetto di default uguale
							sbam.utils.startWaiting();
							$.ajax({
								type: "POST",
								url: "/projectExist",
								data: {
									"defaultName": defaultName,
									"defaultType": defaultType,
									"defaultPreset": defaultPreset
								}
							}).done(function( projects ) {
								if ( projects && projects.length > 0 ) {
									//il projects esiste già
									//lo carico
									projects = JSON.parse(projects);
									var project = projects[0];
									//console.log("projectExist: ESISTE, carico project con id="+project._id);
									sbam.projectEditor.init(project._id);
								} else {
									//il projects NON esiste già
									//console.log("projectExist: NON ESISTE, add project");
									//lo creo
									var presetName = sbam.projectEditor.getPresetByTypeAndName(defaultType,defaultPreset);
									if ( presetName ) {
										sbam.utils.startWaiting();
										$.ajax({
											type: "POST",
											url: "/addProject",
											data: {
												'form': {
													'name':defaultName,
													'type':defaultType
												}, 
												'preset': presetName
											}
										}).done(function( result ) {
											result = JSON.parse(result);
											sbam.utils.stopWaiting();
											if ( result.errormsg && result.errormsg != "" ) {
												console.log( "NON Salvato il project con errormsg: "+result.errormsg );
												//$("#addProjectErrormsg").html(result.errormsg);
												//$("#addProjectErrormsg").show();
											} else {
												//console.log( "Salvato il project con result: " );
												//console.log( result );
												//$("#addProjectErrormsg").hide();
												//$("#popupAddProject").popup( "close" );
												//carico il nuovo progetto
												sbam.projectEditor.init(result._id);
												//aggiorno la lista dei progetti
												sbam.projectEditor.getProjects();
											}
											//$("#popupAddProject").hide();
										}).fail(function( jqXHR, textStatus ) {
											alert( "Request failed: " + textStatus );
										});
									} else {
										sbam.utils.stopWaiting();
										alert("preset '"+defaultPreset+"' per type = '"+defaultType+"' non esistente");
									}
								}
							}).fail(function( jqXHR, textStatus ) {
								alert( "Request failed: " + textStatus );
								console.log( "Request failed: " + textStatus );
							});						
							break;
					}
				}
			}			
		}
		/* non usato. uso solo una variabile "platform" nei tpl per differenziare l'interfaccia
		platformCustomizations: function() {
			if (sbamPlatform) {
				switch(sbamPlatform) {
					case "tuolibro":
						sbam.platform.wpUrl = "";
						break;
					case "mye":
						break;
				}
				
			}
		}*/
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

Number.prototype.formatMoney = function(c, d, t){
	var n = this, 
		c = isNaN(c = Math.abs(c)) ? 2 : c, 
		d = d == undefined ? "." : d, 
		t = t == undefined ? "," : t, 
		s = n < 0 ? "-" : "", 
		i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
		j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
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
				$(".elementTextToolbox").fadeOut("fast");
				$(".elementEffectsToolbox").fadeOut("fast");
				sbam.utils.closeAllPanles();
			}
		});
		
		//attivo i bottoni undo/redo per l'history
		$("#buttonUndo").click( sbam.history.undo );
		$("#buttonRedo").click( sbam.history.redo );
		$("#buttonResetHistory").click( sbam.history.reset );
		
		//attivo bottone di print
		$("#printProjectButton").click(sbam.projectEditor.printProject);
		
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
		//clone project
		$("#buttonCloneProject").click( sbam.projectEditor.cloneProject );
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
		
		
		
		//order project
		$("#orderQty").on("keyup keypress blur change", function(){
			var dirty = $("#orderQty").val();
			var clean = parseInt(dirty);
			if ( isNaN( clean ) ) clean = "";
			$("#orderQty").val(clean);
			sbam.projectEditor.updateProjectOrder();			
		});
		$("#orderCouponCode").on("keyup keypress blur change", function(){
			sbam.projectEditor.updateProjectOrder();			
		});
		$("#popupOrderProject" ).popup({ 
			beforeposition: function( event, ui ) {
				$("#orderQty").val(1);
				$("#orderCouponCode").val("");
				$("#popupOrderProjectContent").show();
				$("#popupOrderProjectResult").hide();
				sbam.projectEditor.updateProjectOrder();
			},
			afterclose: function( event, ui ) {
				$("#mainPdfDownloadLink").hide();
				$("#coverPdfDownloadLink").hide();
				$("#coverletPdfDownloadLink").hide();
				$("#orderPdfDownloadLink").hide();
				$("#stickersPdfDownloadLink").hide();
				$("#printProjectButton").show();
			}
		});	
		$("#formOrderProject").submit(function( event ) {
			event.preventDefault();
		});
		$("#orderProjectButton").click(sbam.projectEditor.saveProjectOrder);

		
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
		/* NON USATO, MA FUNZIA
		//popup
		$("#popupToolboxMedia").on( "popupbeforeposition", function( event, ui ) {
			//var popup = $(event.currentTarget);
        }); 
		*/
		//editing
		$("#editMediaButtonRotateRight").click(function(){sbam.utils.editMedia("rotateRight");});
		$("#editMediaButtonRotateLeft").click(function(){sbam.utils.editMedia("rotateLeft");});
		$("#editMediaButtonFlipHoriz").click(function(){sbam.utils.editMedia("flipHoriz");});
		$("#editMediaButtonFlipVert").click(function(){sbam.utils.editMedia("flipVert");});
		
		//eventi legati ai cambi di contenuti in fase di editing
		$("body").on('focus', '[contenteditable]', function() {
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
		
		
		/* non usato. uso solo una variabile "platform" nei tpl per differenziare l'interfaccia
		//gestisco eventuali customizzazioni in base alla piattaforma dichiarata
		sbam.utils.platformCustomizations();*/

		
		//carico il file json per sbam.projectTypesAndPresets
		sbam.utils.startWaiting();
		$.ajax({
			dataType: "json",
			url: "/data/projectTypesAndPresets.json"
		}).done(function( json ) {
			sbam.projectTypesAndPresets = json;
			sbam.utils.stopWaiting();
			
			//dopo che caricato i preset, l'app è pronta.
			
			//controllo se ci sono actions di boostrap da compiere
			sbam.utils.bootstrapActions();
			
		}).fail(function( jqXHR, textStatus ) {
			alert( "Request failed: " + textStatus );
			console.log( "Request failed: " + textStatus );
			sbam.utils.stopWaiting();
		});						
		
		
		
		
	}
);
	










	
	
/* #### FINALLY THINGS TO DO ON LOAD (AFTER ALL IMAGES ARE LOADED) #### */
	
$(window).load(
	function() {
		console.log("sobuame on load!");
	}
);



}