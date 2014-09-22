

/* #### GLOBAL SOBUAME (sbam) CLIENT APPLICATION #### */

var sbam = {
	config: {
		fontDir: 'fonts/', //sottocartella di public/ - se la si cambia, va cambiata anche nell'app.js
		mainMarginLeft: 10, //sono i margini (px) considerati per posizionare la coppia di pagine aperte. si riferiscono alla window, quindi il margin top deve considerare anche la navigation bar per non andargli sopra
		mainMarginRight: 10, 
		mainMarginTop: 45, 
		mainMarginBottom: 10,
		pdfDpi: 300, //risoluzione di stampa (dpi). se cambiata qui va cambiata anche in app.js nel backend
		imagesDpiMinWarn: 200, //risoluzione sotto la quale viene visualizzata un'icona di warning per bassa risoluzinoe (dpi)
		imagesDpiMax: 4800, //risoluzione massima sopra la quale non lascio andare l'utente. da questa risoluzione ricavo anche il valore minimo del cursore di zoom (dpi)
		imagesDpiMin: 130 //risoluzione minima sotto la quale non lascio andare l'utente. da questa risoluzione ricavo anche il valore massimo del cursore di zoom (dpi)
	},
	project: {}, //projetto aperto corrente come ritornato dalla query al db
	pageLeftIdx: -1, //questa contiene l'index dell'array sbam.project.pages[] riferito alla pagina correntemente caricata in page editor come pagina sinistra
	pageRightIdx: -1, //questa contiene l'index dell'array sbam.project.pages[] riferito alla pagina correntemente caricata in page editor come pagina sinistra
	currentView: "", //può valere "projectEditor" o "pageEditorCouple" o "pageEditorSingle"
	currentMediaPath: "", //è il path corrente all'interno del repository dell'utente e del project correntemente aperto (se vuoto è inteso come la root del repository dell'utente e del project correntemente aperto: repo/USERID/files/project_PROJECTID/)
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
					'tpl': '00-txts_01-imgs'
				},
				{
					'type': 'cover-2-front',
					'tpl': '01-txts_01-imgs'
				},
				{
					'type': 'right',
					'tpl': '01-txts_00-imgs',
					'num': 1
				},
				{
					'type': 'left',
					'tpl': '00-txts_02-imgs',
					'num': 2
				},
				{
					'type': 'right',
					'tpl': '02-txts_00-imgs',
					'num': 3
				},
				{
					'type': 'left',
					'tpl': '02-txts_01-imgs',
					'num': 4
				},
				{
					'type': 'cover-3-back',
					'tpl': '01-txts_02-imgs'
				},
				{
					'type': 'cover-4-back',
					'tpl': '02-txts_02-imgs'
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
					'tpl': '10-txts_10-imgs',
					'num': 1
				}
			]
		},
		'annuario': {
			'label': 'Annuario',
			'minPageQuantity': 4,
			'sizes': {
				'standard': {
					'width': 200,
					'height': 300
				}
			},
			'defaultPages': [
				{
					'type': 'cover-1-front',
					'tpl': '00-txts_01-imgs'
				},
				{
					'type': 'cover-2-front',
					'tpl': '01-txts_01-imgs'
				},
				{
					'type': 'right',
					'tpl': '01-txts_00-imgs',
					'num': 1
				},
				{
					'type': 'left',
					'tpl': '00-txts_02-imgs',
					'num': 2
				},
				{
					'type': 'right',
					'tpl': '02-txts_00-imgs',
					'num': 3
				},
				{
					'type': 'left',
					'tpl': '02-txts_01-imgs',
					'num': 4
				},
				{
					'type': 'cover-3-back',
					'tpl': '01-txts_02-imgs'
				},
				{
					'type': 'cover-4-back',
					'tpl': '02-txts_02-imgs'
				}
			]
		},
		'libro': {
			'label': 'Fotolibro',
			'minPageQuantity': 2,
			'sizes': {
				'piccolo': {
					'width': 150,
					'height': 200
				},
				'quadrato': {
					'width': 200,
					'height': 200
				},
				'grande': {
					'width': 200,
					'height': 300
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
					'tpl': '00-txts_01-imgs'
				},
				{
					'type': 'cover-2-front',
					'tpl': '01-txts_01-imgs'
				},
				{
					'type': 'right',
					'tpl': '01-txts_00-imgs',
					'num': 1
				},
				{
					'type': 'left',
					'tpl': '00-txts_02-imgs',
					'num': 2
				},
				{
					'type': 'right',
					'tpl': '02-txts_00-imgs',
					'num': 3
				},
				{
					'type': 'left',
					'tpl': '02-txts_01-imgs',
					'num': 4
				},
				{
					'type': 'cover-3-back',
					'tpl': '01-txts_02-imgs'
				},
				{
					'type': 'cover-4-back',
					'tpl': '02-txts_02-imgs'
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
					$("#panelHistory li").first().next().after("<li data-icon='"+icon+"' class='historyItem'><a class='ui-icon-"+icon+" ui-btn ui-btn-icon-right' id='historyItem"+i+"'>"+sbam.history.snapshots[i].label+"</a></li>");
					$("#historyItem"+i).data("new_position", i);
					//con relativa action di click che ricarica la snapshot indicata
					$("#historyItem"+i).click(function() { sbam.history.restore($(this).data("new_position"),true); });
				}
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
			console.log("################# history.restore sta per chiamare drawPage!");
			//ma devo proprio? dorei farlo solo quando uso un undo() redo(), ma non per ogni add() per esempio... 
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
					var isSelected = false;
					for( var i=0; i < projects.length; i++ ) {
						//per ogni project c'è un item nella lista
						var icon = "circle-o";
						if ( projects[i]._id == sbam.project._id ) {
							icon = "circle";
							isSelected = true;
						}
						$("#panelProjectsListview").prepend("<li data-icon='"+icon+"' class='projectItem' ><a class='ui-icon-"+icon+" ui-btn ui-btn-icon-right' id='projectItem"+i+"'>"+projects[i].name+"</a></li>");
						//con relativa action di click che inizializza il projectEditor sul progetto cliccato
						$("#projectItem"+i).data("project_id", projects[i]._id);
						$("#projectItem"+i).click(function() { sbam.projectEditor.init($(this).data("project_id")); });
					}
					if ( isSelected ) {
						$("#buttonDelProject").show();
						$("#buttonModifyProject").show();
						//assegno il titolo del project corrente (se c'è) al popup di cancellazione projects
						$("#currentProjectTitle").html(sbam.project.name);
					}
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
		saveProject: function(next) {
			//prima controllo se il numero di pagine è congruo con minPageQuantity
			if ( sbam.project.type && sbam.projectTypes[sbam.project.type] && sbam.pageEditor.getPagesNum() % sbam.projectTypes[sbam.project.type].minPageQuantity ) {
				alert("Il numero di pagine deve essere un multiplo di "+sbam.projectTypes[sbam.project.type].minPageQuantity+", mentre ora hai "+sbam.pageEditor.getPagesNum()+" pagine. Devi aggiungere "+(sbam.projectTypes[sbam.project.type].minPageQuantity-sbam.pageEditor.getPagesNum() % sbam.projectTypes[sbam.project.type].minPageQuantity)+" pagine per poter salvare.");
			} else {
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
							$.mobile.loading("hide");
							$("#buttonSave").css( "background-color","transparent" );
							$("#buttonSave").addClass( "ui-state-disabled" );
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
			var myCouple = sbam.pageEditor.getCouple(pageIdx);
			
			//console.log("pageEditor: init");
			sbam.pageEditor.getPage(myCouple.num_left,myCouple.type_left,"left", function(){
				sbam.pageEditor.getPage(myCouple.num_right,myCouple.type_right,"right", function(){
					console.log("################# pageEditor.init sta per chiamare drawPage!");
					sbam.pageEditor.drawPage();
					sbam.pageEditor.getPages(); //parallelamente ai getPage chiamo anche un getPages() per aggiornare il panel
				});
			});
		},
		getPage: function(pageNum,type,what,next) {
			//console.log("pageEditor: getPage");
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
				var isSelected = false;
				var selectedLabel = "";
				for( var i=0; i < sbam.project.pages.length; i++ ) {
					//console.log("vado a ciclare su questa page:");
					//console.log(sbam.project.pages[i]);
					var myCouple = sbam.pageEditor.getCouple(i);
					//console.log("che ritorna questa couple:");
					//console.log(myCouple);
					if ( sbam.project.pages[i].type == "single" ) {
						//una pagina singola viene salvata come pagina left
						var icon = "circle-o";
						if ( sbam.pageLeftIdx >=0 && sbam.pageLeftIdx == i ) {
							icon = "circle";
							isSelected = true;
							selectedLabel = "pag "+sbam.project.pages[i].num;
						}
						$("#panelPages li").last().prev().prev().before("<li data-icon='"+icon+"' class='pageItem'><a class='ui-icon-"+icon+" ui-btn ui-btn-icon-right' id='pageItem"+i+"'><img src='/images/page-single.png' style='margin-right:10px;'>pag "+sbam.project.pages[i].num+"</a></li>");
						//con relativa action di click che inizializza il pageEditor sul progetto cliccato
						$("#pageItem"+i).data("page_idx", i);
						$("#pageItem"+i).click(function() { sbam.pageEditor.init($(this).data("page_idx")); });						
					} else if (	myCouple.triggerCouple ) {
						var icon = "circle-o";
						if ( 
							sbam.pageLeftIdx >=0 && sbam.project.pages[sbam.pageLeftIdx].num == myCouple.num_left && sbam.project.pages[sbam.pageLeftIdx].type == myCouple.type_left 
							|| 
							sbam.pageRightIdx >=0 && sbam.project.pages[sbam.pageRightIdx].num == myCouple.num_right && sbam.project.pages[sbam.pageRightIdx].type == myCouple.type_right 
						) {
							icon = "circle";
							isSelected = true;
							selectedLabel = myCouple.label;
						}
						//console.log("ciao! la pag i="+i+" sarebbe: ##### sbam.pageLeftIdx="+sbam.pageLeftIdx+" per cui icon="+icon);
						//console.log("ciao! la pag i="+i+" sarebbe: ##### sbam.pageRightIdx="+sbam.pageRightIdx+" per cui icon="+icon);
						//console.log(myCouple);
						/*
						console.log("ciao! la pag i="+i+" sarebbe: LEFT sbam.project.pages[sbam.pageLeftIdx].num="+sbam.project.pages[sbam.pageLeftIdx].num);
						console.log("ciao! la pag i="+i+" sarebbe: LEFT myCouple.num_left="+myCouple.num_left);
						console.log("ciao! la pag i="+i+" sarebbe: LEFT sbam.project.pages[sbam.pageLeftIdx].type="+sbam.project.pages[sbam.pageLeftIdx].type);
						console.log("ciao! la pag i="+i+" sarebbe: LEFT myCouple.type_left="+myCouple.type_left);
						*/
						//console.log("ciao! la pag i="+i+" sarebbe: RIGHT sbam.project.pages[sbam.pageRightIdx].num="+sbam.project.pages[sbam.pageRightIdx].num);
						//console.log("ciao! la pag i="+i+" sarebbe: RIGHT myCouple.num_right="+myCouple.num_right);
						//console.log("ciao! la pag i="+i+" sarebbe: RIGHT sbam.project.pages[sbam.pageRightIdx].type="+sbam.project.pages[sbam.pageRightIdx].type);
						//console.log("ciao! la pag i="+i+" sarebbe: RIGHT myCouple.type_right="+myCouple.type_right);

						$("#panelPages li").last().prev().prev().before("<li data-icon='"+icon+"' class='pageItem'><a class='ui-icon-"+icon+" ui-btn ui-btn-icon-right' id='pageItem"+i+"'><img src='/images/"+myCouple.icon+"' style='margin-right:10px;'>"+myCouple.label+"</a></li>");
						//con relativa action di click che inizializza il pageEditor sul progetto cliccato
						$("#pageItem"+i).data("page_idx", i);
						$("#pageItem"+i).click(function() { sbam.pageEditor.init($(this).data("page_idx")); });
					}
				}
				if ( isSelected ) {
					$("#buttonDelPage").show();
					//assegno il titolo del project corrente (se c'è) al popup di acncellazione projects
					$("#currentPagesLabel").html(selectedLabel);
				} else {
					$("#buttonDelPage").hide();
					//assegno il titolo del project corrente (se c'è) al popup di acncellazione projects
					$("#currentPagesLabel").html("");
				}
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
			} else if ( what == "right" ) {
				sbam.pageRightIdx = -1;
				$("#rightPageCont").remove();
			} else  if ( what == "both" ) {
				sbam.pageLeftIdx = -1;
				sbam.pageRightIdx = -1;
				$("#leftPageCont").remove();
				$("#rightPageCont").remove();
			}
		},
		/*
		drawPage viene richiamata da:
			- history.restore
			- pageEditor.init
			- on window resize
		*/
		drawPage: function() {
			console.log("########### chiamato drawPage!");
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
					//distinguo il caso di pagina singola e pagine doppie
					if ( sbam.currentView == "pageEditorSingle" ) {
						var leftSizPos = sbam.utils.thepositioner( $(sbam.outerCont).width(), $(sbam.outerCont).height(), sbam.project.width, sbam.project.height, false,"center",sbam.config.mainMarginTop,sbam.config.mainMarginBottom,sbam.config.mainMarginLeft,sbam.config.mainMarginRight);
						//SERVE? $("#leftPageCont").css("background-color","#fff");
						//nel caso di pagina singola non uso mai la page right
						$("#rightPageCont").remove();
					} else {
						//leftPageCont e rightPageCont in base all'outerCont e al size del project
						var leftSizPos = sbam.utils.thepositionerPageLeft( $(sbam.outerCont).width(), $(sbam.outerCont).height(), sbam.project.width, sbam.project.height,sbam.config.mainMarginTop,sbam.config.mainMarginBottom,sbam.config.mainMarginLeft,sbam.config.mainMarginRight);
						var rightSizPos = sbam.utils.thepositionerPageRight( $(sbam.outerCont).width(), $(sbam.outerCont).height(), sbam.project.width, sbam.project.height,sbam.config.mainMarginTop,sbam.config.mainMarginBottom,sbam.config.mainMarginLeft,sbam.config.mainMarginRight);
						$("#rightPageCont").height(rightSizPos.h);
						$("#rightPageCont").width(rightSizPos.w);
						$("#rightPageCont").css("position","absolute");
						$("#rightPageCont").css("left",rightSizPos.x);
						$("#rightPageCont").css("top",rightSizPos.y);
						//$("#rightPageCont").css("background-color","#eeeeff");
						//sizepos anche della canvas della pagina
						if ( sbam.pageRightIdx > -1 ) {
							$("#rightPageCanvas").height(rightSizPos.h);
							$("#rightPageCanvas").width(rightSizPos.w);
						} else if ( sbam.pageRightIdx == -1 ) {
							$("#rightPageCont").remove();
						}
					}
					$("#leftPageCont").height(leftSizPos.h);
					$("#leftPageCont").width(leftSizPos.w);
					$("#leftPageCont").css("position","absolute");
					$("#leftPageCont").css("left",leftSizPos.x);
					$("#leftPageCont").css("top",leftSizPos.y);
					//$("#leftPageCont").css("background-color","#eeffee");
					//sizepos anche della canvas della pagina
					if ( sbam.pageLeftIdx > -1 ) {
						$("#leftPageCanvas").height(leftSizPos.h);
						$("#leftPageCanvas").width(leftSizPos.w);
					} else if ( sbam.pageLeftIdx == -1 ) {
						$("#leftPageCont").remove();
					}
				}
				
			}
			
			// questa viene solo richiamata da pageEditor.drawPage
			function renderer(container,idx,mode) {
				console.log("###### chiamato rendere!");
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
							//console.log("pageEditor.drawPage.sizeAndPosElement: element.bbox:");
							//console.log(element.bbox);
							//console.log("pageEditor.drawPage.sizeAndPosElement: $(container).width():"+$(container).width());
							//console.log("pageEditor.drawPage.sizeAndPosElement: $(container).height():"+$(container).height());
							/*
							element.bbox.x
							element.bbox.y
							element.bbox.w
							element.bbox.h
							*/
							//per ogni misura specificata la normalizzo
							norm_x = bboxValToPixel(element.bbox.x,$(container).width(),sbam.project.width);
							norm_y = bboxValToPixel(element.bbox.y,$(container).height(),sbam.project.height);
							norm_w = bboxValToPixel(element.bbox.w,$(container).width(),sbam.project.width);
							norm_h = bboxValToPixel(element.bbox.h,$(container).height(),sbam.project.height);
							//poi assegno le misure come stili css
							$("#"+element._id).css("position","absolute");
							$("#"+element._id).css("width",norm_w+"px");
							$("#"+element._id).css("height",norm_h+"px");
							$("#"+element._id).css("left",norm_x+"px");
							$("#"+element._id).css("top",norm_y+"px");
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
							if ( element.style.font ) {
								var fontFamilyName = "font"+element._id;
								$("#"+element._id).before("<style> @font-face { font-family: "+fontFamilyName+"; src: url('/"+sbam.config.fontDir+element.style.font+"'); } </style>");
								$("#"+element._id).css("font-family",fontFamilyName);  
							}
							if ( element.style.fontSize ) {
								var normFont = Math.round(Number(element.style.fontSize) * 0.3528 / sbam.project.width * $(container).width() * 10 ) / 10;
								$("#"+element._id).css("font-size",normFont+"px");  
							}
							if ( element.style.align ) {
								$("#"+element._id).css("text-align",element.style.align);  
							}
						}
					}
					// questa viene solo richiamata da pageEditor.drawPage.renderer.createElements
					function createImageWidget(element) {
						/*
						########## flusso tra i vari helpers: ##########
						ajax("/getWidgetImg").done() -> setWidgetDefaultZoomAndOffset() -> ( fitOrFillImage() -> setZoomByDpi() -> setZoom() ) | setZoom()
						setZoom() -> zoomSlider.change() -> setDpiByZoom() -> setWidgetImgSize() & setWidgetImgOffset() -> imageWidgetSave()
						*/
						console.log("##### chiamata createImageWidget");
						//helper functions
						function logEmAll(me) {
							
							console.log(me+"() curDpi="+curDpi+" curZoom="+getZoom()+" originalImgPixW="+originalImgPixW);
							console.log(me+"() curDpi="+curDpi+" curZoom="+getZoom()+" originalImgPixH="+originalImgPixH);
							console.log(me+"() curDpi="+curDpi+" curZoom="+getZoom()+" bboxPixW="+bboxPixW);
							console.log(me+"() curDpi="+curDpi+" curZoom="+getZoom()+" bboxPixH="+bboxPixH);
							console.log(me+"() curDpi="+curDpi+" curZoom="+getZoom()+" bboxMmW="+bboxMmW);
							console.log(me+"() curDpi="+curDpi+" curZoom="+getZoom()+" bboxMmH="+bboxMmH);
							console.log(me+"() curDpi="+curDpi+" curZoom="+getZoom()+" originalImgMmW="+originalImgMmW);
							console.log(me+"() curDpi="+curDpi+" curZoom="+getZoom()+" originalImgMmH="+originalImgMmH);
							console.log(me+"() curDpi="+curDpi+" curZoom="+getZoom()+" placedImgPixW="+placedImgPixW);
							console.log(me+"() curDpi="+curDpi+" curZoom="+getZoom()+" placedImgPixH="+placedImgPixH);				
							console.log(me+"() curDpi="+curDpi+" curZoom="+getZoom()+" placedImgPixX="+placedImgPixX);
							console.log(me+"() curDpi="+curDpi+" curZoom="+getZoom()+" placedImgPixY="+placedImgPixY);				
							
						}		
						function imageWidgetSave() {
							//recupero il mio elemento dalla mia pagina
							var storedElement = sbam.pageEditor.getPageElementById(idx,element._id);
							//poi gli scrivo i valori
							storedElement.image.offsetx = placedImgMmX;
							storedElement.image.offsety = placedImgMmY;
							storedElement.image.zoom = curZoom;
							logEmAll("imageWidgetSave");
						}
						function setWidgetImgSize() {
							//ricavo le dimensioni dell'immagine originale in mm:
							originalImgMmW = originalImgPixW / sbam.utils.dpi2dpmm(curDpi);
							originalImgMmH = originalImgPixH / sbam.utils.dpi2dpmm(curDpi);
							//ricavo le dimensioni dell'immagine zoomata in px:
							placedImgPixW = originalImgMmW * bboxPixW / bboxMmW;
							placedImgPixH = originalImgMmH * bboxPixH / bboxMmH;
							logEmAll("setWidgetImgSize");
							//e applico i css
							$("#image"+element._id).css("width",String(placedImgPixW)+"px");
							$("#image"+element._id).css("height",String(placedImgPixH)+"px");
						}
						function setWidgetImgOffset() {
							//converto l'offset noto in mm, in px
							placedImgPixX = placedImgMmX / bboxMmW * bboxPixW;
							placedImgPixY = placedImgMmY / bboxMmH * bboxPixH;
							logEmAll("setWidgetImgOffset");
							//e applico i css
							$("#image"+element._id).css("left",String(placedImgPixX)+"px");
							$("#image"+element._id).css("top",String(placedImgPixY)+"px");
							//l'offset fa parte del model della pagina, quindi posso salvarlo nella mia pagina
							imageWidgetSave();
						}
						function getZoom() {
							//mi aspetto che val vada da 0 a maxZoomSlider
							//return $( "#slider"+element._id ).val();
							return curZoom;
						}
						function setZoom(myZoom) {
							//mi aspetto che val vada da 0 a maxZoomSlider
							curZoom = myZoom;
							$( "#slider"+element._id ).val(curZoom*maxZoomSlider).slider("refresh");
							logEmAll("setZoom");
						}
						function setZoomByDpi() {
							//prima calcolo lo curZoom tra 0 e 1
							curZoom = 0; 
							if ( curDpi <= sbam.config.pdfDpi ) {
								curZoom = 1 / ( 1 - ( curDpi - sbam.config.imagesDpiMin ) / ( sbam.config.imagesDpiMin - sbam.config.pdfDpi ) );
							} else if ( curDpi > sbam.config.pdfDpi ) {
								curZoom = - Math.log ( ( curDpi - sbam.config.pdfDpi ) * ( 1 - Math.exp(-smooth*0.5) ) / ( sbam.config.imagesDpiMax - sbam.config.pdfDpi ) + Math.exp(-smooth*0.5) ) / smooth;
							}
							logEmAll("setZoomByDpi");
							//poi lo assegno normalizzandolo sul max dello slider
							setZoom(curZoom);
						}
						function setDpiByZoom() {
							//mi serve un valore di curZoom che mi va da 0 a 1, quindi normalizzo il valore che mi arriva dallo slider
							curZoom = $( "#slider"+element._id ).val() / maxZoomSlider;
							//uso due formule diverse a seconda che lo curZoom sia maggiore o minore di metà scala
							if ( curZoom <= 0.5 ) {
								curDpi = sbam.config.pdfDpi + ( Math.exp(-smooth*curZoom) - Math.exp(-smooth*0.5) ) / ( 1 - Math.exp(-smooth*0.5) ) * ( sbam.config.imagesDpiMax - sbam.config.pdfDpi );
							} else if ( curZoom > 0.5 ) {
								curDpi = sbam.config.imagesDpiMin + ( sbam.config.imagesDpiMin - sbam.config.pdfDpi ) * ( 1 - 1 / curZoom );
							}
							logEmAll("setDpiByZoom");
							setWidgetImgSize();
							setWidgetImgOffset();
						}
						function setWidgetDefaultZoomAndOffset() {
							//se mancano sia zoom che offset, applico per default un fill all'immagine da cui ricavo entramni
							if ( ( !element.image.zoom || element.image.zoom=="" ) && ( !element.image.offsetx || element.image.offsetx=="" ) && ( !element.image.offsety || element.image.offsety=="" ) ) {
								console.log("setWidgetDefaultZoomAndOffset: manca tutto!!!");
								fillImage();
							} else {
								//se non sono passati tutti assieme, considero i singoli parametri uno ad uno, e se non è definito assegno un default
								if ( element.image.zoom && element.image.zoom != "" ) {
									setZoom(element.image.zoom);
								} else {
									setZoom(0.5); //mezzo lo zoom a metà slider, cioè sul valore pdfDpi
								}
								if ( element.image.offsetx && element.image.offsetx != "" ) {
									placedImgMmX = element.image.offsetx;
								}
								if ( element.image.offsety && element.image.offsety != "" ) {
									placedImgMmY = element.image.offsety;
								}
							}
							logEmAll("setWidgetDefaultZoomAndOffset");
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
							//siccome sto definendo i default, non ho ancora curDpi, e quindi non è stato ancora calcolato originalImgMmW e originalImgMmH pur avendo già definito originalImgPixW e originalImgPixH
							//quindi passo a thepositioner i valori in px al posto di quelli in mm, tanto quello che conta è solo l'aspect ratio
							var pos = sbam.utils.thepositioner(bboxMmW,bboxMmH,originalImgPixW,originalImgPixH,crop);
							console.log("fitOrFillImage() pos=");
							console.log(pos);
							//ottengo e salvo size e offset dell'immagine in mm
							placedImgMmX = pos.x;
							placedImgMmY = pos.y;
							//salvo curDpi
							curDpi = sbam.utils.dpmm2dpi( originalImgPixW / pos.w );
							logEmAll("fitOrFillImage");
							setZoomByDpi();
						}
						
						
						
						
						//varuiabili comuni usate dal widget immagini e dai suoi helper
						var bboxPixW = 0;
						var bboxPixH = 0;
						var bboxMmW = bboxValToMm(element.bbox.w,sbam.project.width);
						var bboxMmH = bboxValToMm(element.bbox.h,sbam.project.height);
						var originalImgPixW = 0;
						var originalImgPixH = 0;
						var originalImgMmW = 0;
						var originalImgMmH = 0;
						var placedImgPixX = 0;
						var placedImgPixY = 0;
						var placedImgMmX = 0;
						var placedImgMmY = 0;
						var placedImgPixW = 0;
						var placedImgPixH = 0;
						var curDpi = 0; //questa viene cambiata dallo zoom slider, e sono i dpi in cui visualizzare l'immagine (quindi cambiando i dpi, cambia lo zoom)
						var curZoom = 0; //questa va da 0 a 1 ed è direttamente agganciata allo slider, moltiplicandola per maxZoomSlider
						var maxZoomSlider = 100000; //tenerlo alto, è la precisione dello slider, ilnumero di tick possibli, e serve per mantenere precisione nella conversione in dpi
						//fisso anche una variabile che è il moltiplicatore dell'esponenziale, e rappresenta la velocità con cui lo curZoom va da 0.5 a 0 (ovvero con cui si rimpiccioliscono le immagini)
						//andando verso 1 la velocità aumenta, andando verso 10 la velocità diminuisce
						var smooth = 10; 
						
						//appendo subito il container della mia immagine, ovvero il suo bbox
						//e la toolbox con relativo anchor di piazzamento
						$(container).append("\
							<a id='"+element._id+"' href='#toolbox"+element._id+"' data-rel='popup' data-transition='fade' data-position-to='#toolboxAnchor"+element._id+"' class='elementImage'>\
								<div id='waitIcon"+element._id+"' class='ui-loader ui-corner-all ui-body-a ui-loader-default' style='display:block;position:relative;'>\
									<span class='ui-icon-loading'></span>\
									<h1>loading</h1>\
								</div>\
								<div id='toolboxAnchor"+element._id+"' class='elementImageToolboxAnchor'></div>\
							</a>\
							<div id='toolbox"+element._id+"' data-role='popup' data-corners='false' class='elementImageToolbox'>\
								<table class='elementImageToolboxZoomContainer'>\
									<tr>\
										<td>\
											<div class='ui-btn ui-corner-all ui-icon-search-minus ui-btn-icon-notext ui-btn-inline' data-mini='true'>Zoom out</div>\
										</td>\
										<td style='width:70%;'>\
											<input type='number' data-type='range' id='slider"+element._id+"' name='slider"+element._id+"' class='elementImageToolboxSlider ui-btn-inline' min='0' max='"+maxZoomSlider+"' data-mini='true' data-highlight='true'/>\
										</td>\
										<td>\
											<div class='ui-btn ui-corner-all ui-icon-search-plus ui-btn-icon-notext ui-btn-inline' data-mini='true'>Zoom in</div>\
										</td>\
									</tr>\
								</table>\
								<div id='navbar"+element._id+"' data-role='navbar'>\
									<ul>\
										<li>\
											<a href='#' data-icon='star'>B</a>\
										</li>\
										<li>\
											<a href='#' data-icon='gear'>C</a>\
										</li>\
										<li>\
											<a href='#' data-icon='arrow-l'>D</a>\
										</li>\
										<li>\
											<a href='#' data-icon='arrow-r'>E</a>\
										</li>\
									</ul>\
								</div>\
							</div>");
						//attivo i widget di jq mobile
						$( "#slider"+element._id ).slider({ stop: function( event, ui ) { 
							//aggiorno l'history
							sbam.history.add("Modify image");
						}});
						//$( "#slider"+element._id ).slider();
						$( "#slider"+element._id ).change(setDpiByZoom);
						
						$( "#navbar"+element._id ).navbar();
						$( "#toolbox"+element._id ).popup({
							beforeposition: function( event, ui ) {
								//on open del toolbox lo posiziono
								$( "#toolboxAnchor"+element._id ).css("left",Math.round($("#"+element._id).width()/2));
								$( "#toolboxAnchor"+element._id ).css("bottom",-Math.round($("#toolbox"+element._id).height()/2));
							}
							
						});
						//faccio una chiamata ajax per sapere le dimensioni in px dell'immagine originale, e l'url dell'immagine in cache da visualizzare
						//il risultato ritornato sarà del tipo: widgetImg.features.size.width
						
						//QUI!!!
						//devo implementare un caching
						//solito db key/val con:
						//key = url + projectId
						//val = widgetImg
						
						$.mobile.loading("show");
						$.ajax({
							type: "POST",
							url: "/getWidgetImg",
							data: { 
								"url": element.image.url,
								"projectId": sbam.project._id
							}
						}).done(function( widgetImg ) {
							widgetImg = JSON.parse(widgetImg);
							//ho tutto per visualizzare la mia immagine
							//console.log("widgetImg:");
							//console.log(widgetImg);
							//tolgo wait generale
							$.mobile.loading("hide");
							//elimino eventuale wait icon specifica del caricamento immagine
							$("#waitIcon"+element._id).remove();
							//elimino eventuale immagine già presente
							$("#"+element._id+" img").remove();
							//finalmente visualizzo la mia immagine
							$("#"+element._id).prepend("<img id='image"+element._id+"' src='"+widgetImg.cachedUrl+"' />");
							//widgetImg.originalW
							//popolo un po' di variabili che mi serviranno
							originalImgPixW = widgetImg.originalW;
							originalImgPixH = widgetImg.originalH;
							bboxPixW = $("#"+element._id).width();
							bboxPixH = $("#"+element._id).height();
							logEmAll("ajax(getWidgetImg).done");
							//per poter calcolare dimensioni e posizione dell'immagine, devo prima definire zoom e offset nel caso non lo fossero
							setWidgetDefaultZoomAndOffset();
							
						}).fail(function( jqXHR, textStatus ) {
							alert( "Request failed: " + textStatus );
							console.log( "Request failed: " + textStatus );
						});						
						
					}
					// questa viene solo richiamata da pageEditor.drawPage.renderer.createElements
					function createTextWidget(element) {
						$(container).append("<div id='"+element._id+"' contenteditable='true'  onclick='document.execCommand(\"selectAll\",false,null)' class='elementText'>"+element.text.content+"</div>");
					}
					if ( sbam.project.pages[idx].elements && sbam.project.pages[idx].elements.length > 0 ) {
						for ( var i=0; i<sbam.project.pages[idx].elements.length; i++) {
							var element = sbam.project.pages[idx].elements[i];
							//console.log("pageEditor.drawPage.renderer: ciclo su element:");
							//console.log(element);
							//prima creo l'elemento
							switch ( element.type ) {
								case "text":
									createTextWidget(element);
									break;
								case "image":
									createImageWidget(element);
									break;
								case "pagenum":
									break;
								case "sticker":
									break;
							}
							//poi ne applico gli style
							styleElement(element,container);
							//poi ne applico il bbox
							sizeAndPosElement(element,container);
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
			if ( sbam.pageLeftIdx >= 0 && sbam.project.pages[sbam.pageLeftIdx] || sbam.pageRightIdx >= 0 && sbam.project.pages[sbam.pageRightIdx] ) {
				var curLeftPage = sbam.project.pages[sbam.pageLeftIdx];
				var curRightPage = sbam.project.pages[sbam.pageRightIdx];
				if ( curLeftPage && curLeftPage.type == "single" ) sbam.currentView = "pageEditorSingle";
				//elimino eventuali pages già presenti
				$("#leftPageCont").remove();
				$("#rightPageCont").remove();
				//dentro all'outerCont creo un leftPageCont e un rightPageCont
				//li devo creare sempre tutti e due, poi sizeAndPosInterface decide quali tenere e quali togliere
				$(sbam.outerCont).append("<div id='leftPageCont'><canvas id='leftPageCanvas'></canvas></div><div id='rightPageCont'><canvas id='rightPageCanvas'></canvas></div>");
				
				//dopo che ho aggiunto tutti gli elementi all'interfaccia, chiamo questo metodo per piazzarli / dimensionarli
				sizeAndPosInterface();
				//infine genero gli elementi dinamici con i contenuti delle pagine
				//(lo devo fare dopo il sizeAndPosInterface perchè il rendering si basa sulle dimensioni della pagina)
				if ( sbam.pageLeftIdx >= 0 ) {
					renderer("#leftPageCont",sbam.pageLeftIdx);
				}
				if ( sbam.pageRightIdx >= 0 ) {
					renderer("#rightPageCont",sbam.pageRightIdx);
				}
				
				sbam.utils.closeAllPanles();
			}
		},
		updateElementText: function (elementId,content) {
			console.log("pageEditor.updateElementText: cerco elementId="+elementId);
			//helper functions
			function updateInPage(pageIdx, elementId, content) {
				console.log("pageEditor.updateElementText.updateInPage: lo cerco in pageIdx="+pageIdx);
				if ( pageIdx > -1 ) {
					//console.log(sbam.project.pages[pageIdx]);
					if ( sbam.project.pages[pageIdx] && sbam.project.pages[pageIdx].elements && sbam.project.pages[pageIdx].elements.length > 0 ) {
						for ( var i=0; i<sbam.project.pages[pageIdx].elements.length; i++) {
							var element = sbam.project.pages[pageIdx].elements[i];
							if ( element._id == elementId ) {
								console.log("pageEditor.updateElementText.updateInPage: TROVATO in pageIdx="+pageIdx+" ora ci metto il content: "+content);
								element.text.content = content;
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
		getMedia: function() {
			//console.log("utils: getMedia");
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
					console.log( "Arrivati i files: " );
					console.log( files );
					//butto files eventualmente preesistenti
					$(".mediaItem").remove();
					//il bottone di delete sarà visibile solo se un file è selezionato
					$("#buttonDelMedia").hide();
					/*
					//assegno il titolo del project corrente (se c'è) al popup di cancellazione files
					$("#currentProjectTitle").html("");
					//#### popolo il popup di creazione new project
					//helper function
					function resetAddForm(){
						//azzero i campi hidden
						$('#addProjectForm input#width').val("");
						$('#addProjectForm input#height').val("");
						$('#addProjectForm input#minPageQuantity').val("");
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
					*/
					
					//#### popolo la lista dei media
					if ( files.length == 0 ) {
						$("#empty-media").show();
					} else if ( files.length > 0 ) {
						$("#empty-media").hide();
						//var isSelected = false;
						for( var i=0; i < files.length; i++ ) {
							//per ogni project c'è un item nella lista
							var icon = "circle-o";
							/*
							if ( files[i]._id == sbam.project._id ) {
								icon = "circle";
								//isSelected = true;
							}
							*/
							
							//distinguo tra folders e files
							if ( files[i].type == "folder" ) {
								
							} else {
								
							}
							
							//$("#panelMediaListview").prepend("<li class='mediaItem' ><a class='ui-icon-"+icon+" ui-btn ui-btn-icon-right' id='mediaItem"+i+"'><img src='"+files[i].path+"'><h2>"+files[i].name+"</h2><p>Broken Bells</p></a><a href='#popupToolboxMedia' data-rel='popup' data-position-to='window' data-transition='pop'>Purchase album</a></li>");
							$("#panelMediaListview").prepend("<li class='mediaItem' ><a href='#popupToolboxMedia' data-rel='popup' data-position-to='window' data-transition='pop' id='mediaItem"+i+"' title='"+files[i].name+"'><img src='"+files[i].thumbUrl+"'><h2>"+files[i].name+"</h2><p>"+files[i].name+"</p></a><a class='sbamDraggable'>Metti nella pagina</a></li>");
							//e action di click
							//$("#mediaItem"+i).data("project_id", projects[i]._id);
							//$("#mediaItem"+i).click(function() { sbam.projectEditor.init($(this).data("project_id")); });								
						}
						//update della listview
						$( "#panelMediaListview" ).listview( "refresh" );
						//abilito il drag and drop (da fare dopo update della listview)
						$(".sbamDraggable").pep({
							initiate: function() {
								//this.$el.text('initiate')
								console.log("D&D init");
								//sposto l'elemento draggato fuori dal panel, così posso chiudere il panel senza che l'elemento draggato scompaia
								this.$el.appendTo("body");
								//lo riposiziono
								var curX = sbam.currentMousePos.x - this.$el.outerWidth(true) / 2;
								var curY = sbam.currentMousePos.y - this.$el.outerHeight(true) / 2;
								this.$el.css("border","none");
								this.$el.css("position","absolute");
								this.$el.css("top",curY);
								this.$el.css("left",curX);
								//chiudo tutti i pannelli
								sbam.utils.closeAllPanles();
							},
							start: function() {
								//this.$el.text('start')
								console.log("D&D start");
								
							},
							stop: function() {
								//this.$el.text('stop')
								console.log("D&D end");
								this.$el.remove();
							}
						});
						
						/*
						if ( isSelected ) {
							$("#buttonDelMedia").show();
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
		closeAllPanles: function() {
			$("#panelPages").panel( "close" );
			$("#panelHistory").panel( "close" );
			$("#panelProjects").panel( "close" );
			$("#panelMedia").panel( "close" );
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
			if ( sbam.history.mustSave ) {
				$("#buttonSave").css( "background-color","#ffbbbb" );
				$("#buttonSave").removeClass( "ui-state-disabled" );
			} else {
				$("#buttonSave").css( "background-color","" );
				$("#buttonSave").addClass( "ui-state-disabled" );
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
		}
	}
};
console.log("sobuame on init!");







/* #### OTHER GLOBAL FUNCTIONS #### */

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
		$( window ).resize( sbam.pageEditor.drawPage );
		
		//gestisco i bottoni undo/redo per l'history
		$("#buttonUndo").click( sbam.history.undo );
		$("#buttonRedo").click( sbam.history.redo );
		$("#buttonResetHistory").click( sbam.history.reset );
		//ogni volta che apro un pannello devo popolarlo in ajax
		$("#panelProjects").panel({ beforeopen: sbam.projectEditor.getProjects });
		$("#panelPages").panel({ beforeopen: sbam.pageEditor.getPages });
		$("#panelHistory").panel({ beforeopen: sbam.history.getHistory });
		$("#panelMedia").panel({ beforeopen: sbam.utils.getMedia });
		//save
		$("#buttonSave").click( sbam.projectEditor.saveProject );
		//new page
		$("#buttonAddPage").click( sbam.pageEditor.addPage );
		//del project
		$("#delProjectButton").click( sbam.projectEditor.delProject );
		//del page
		$("#delPageButton").click( sbam.pageEditor.delPagesCouple );
		//account login
		$("#accountLoginButton").click( function() {
			sbam.projectEditor.saveProject(function(){
				window.location = "/login";
			});
		});
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
		
		//eventi legati ai cambi di contenuti in fase di editing
		$('body').on('focus', '[contenteditable]', function() {
			var $this = $(this);
			$this.data('before', $this.html());
			return $this;
		}).on('blur', '[contenteditable]', function() {
			var $this = $(this);
			if ($this.data('before') !== $this.html()) {
				$this.data('before', $this.html());
				$this.trigger('change');
				//alert("avremmo cambiato: "+$this.data('before'));
				//chiamo updateElementText
				sbam.pageEditor.updateElementText($this.attr("id"),$this.data('before'));
			}
			return $this;
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



