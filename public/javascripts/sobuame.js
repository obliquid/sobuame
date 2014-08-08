

/* #### GLOBAL SOBUAME (sbam) CLIENT APPLICATION #### */

var sbam = {
	//vars
	project: {}, //projetto aperto corrente come ritornato dalla query al db
	pageLeftIdx: -1, //questa contiene l'index dell'array sbam.project.pages[] riferito alla pagina correntemente caricata in page editor come pagina sinistra
	pageRightIdx: -1, //questa contiene l'index dell'array sbam.project.pages[] riferito alla pagina correntemente caricata in page editor come pagina sinistra
	currentView: "", //può valere "pageEditor" o "projectEditor"
	projectTypes: { //NOTA: ogni modifica ai types va riportata coerentemente in models.js
		'album': {
			'label': 'Album e figurine',
			'minPageQuantity': 4,
			'sizes': {
				'standard': {
					'width': 21,
					'height': 29.7
				}
			},
			'defaultPages': [
				{
					'type': 'cover-1-front'
				},
				{
					'type': 'cover-2-front'
				},
				{
					'type': 'right',
					'num': 1
				},
				{
					'type': 'left',
					'num': 2
				},
				{
					'type': 'right',
					'num': 3
				},
				{
					'type': 'left',
					'num': 4
				},
				{
					'type': 'cover-3-back'
				},
				{
					'type': 'cover-4-back'
				}
			]
		},
		'poster': {
			'label': 'Poster e figurine',
			'sizes': {
				'orizzontale': {
					'width': 40,
					'height': 30
				},
				'verticale': {
					'width': 30,
					'height': 40
				}
			},
			'defaultPages': [
				{
					'type': 'single',
					'num': 1
				}
			]
		},
		'annuario': {
			'label': 'Annuario',
			'minPageQuantity': 4,
			'sizes': {
				'standard': {
					'width': 20,
					'height': 30
				}
			},
			'defaultPages': [
				{
					'type': 'cover-1-front'
				},
				{
					'type': 'cover-2-front'
				},
				{
					'type': 'right',
					'num': 1
				},
				{
					'type': 'left',
					'num': 2
				},
				{
					'type': 'right',
					'num': 3
				},
				{
					'type': 'left',
					'num': 4
				},
				{
					'type': 'cover-3-back'
				},
				{
					'type': 'cover-4-back'
				}
			]
		},
		'libro': {
			'label': 'Fotolibro',
			'minPageQuantity': 2,
			'sizes': {
				'piccolo': {
					'width': 15,
					'height': 20
				},
				'quadrato': {
					'width': 20,
					'height': 20
				},
				'grande': {
					'width': 20,
					'height': 30
				}
			},
			'defaultPages': [
				{
					'type': 'cover-1-front'
				},
				{
					'type': 'cover-2-front'
				},
				{
					'type': 'right',
					'num': 1
				},
				{
					'type': 'left',
					'num': 2
				},
				{
					'type': 'right',
					'num': 3
				},
				{
					'type': 'left',
					'num': 4
				},
				{
					'type': 'cover-3-back'
				},
				{
					'type': 'cover-4-back'
				}
			]
		}
	},
	history: {
		/*
		PROCESSO:
		
		restore() viene chiamato ogni volta che si modifica l'history in qualche modo
		restore() e reset() per ora sono gli unici metodi che richiamano updateButtons()
		
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
					$("#historyItem"+i).click(function() { sbam.history.restore($(this).data("new_position")); });
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
			sbam.history.restore(sbam.history.position+1);
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
				sbam.history.restore(nextPosition);
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
				sbam.history.restore(nextPosition);
			}
			//console.log("sbam.history.redo() END position:"+sbam.history.position+" su un array lungo: "+sbam.history.snapshots.length);
		},
		restore: function(nextPosition) {
			//console.log("restore su "+sbam.history.position+"/"+sbam.history.snapshots.length);
			sbam.history.position = nextPosition;
			sbam.project = $.extend(true, {}, sbam.history.snapshots[sbam.history.position].content);
			sbam.history.getHistory();//aggiorna la lista
			//sbam.projectEditor.drawProject();//?? non dovrebbe ridisegnare il project ogni volta che compio un'operazione che comporta l'aggiornamento dell'history
			sbam.history.updateButtons();
		},
		reset: function() {
			//console.log("reset current history. will delete "+sbam.history.snapshots.length+" elements");
			sbam.history.position = 0;
			sbam.history.snapshots.splice(1, sbam.history.snapshots.length - 1);
			sbam.history.getHistory();
			sbam.projectEditor.drawProject();
			sbam.history.updateButtons();
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
			//console.log("controllerei sbam.project:");
			//console.log(sbam.project);
			//QUI function per questa roba
			if ( !sbam.project || $.isEmptyObject(sbam.project) || ( sbam.project && sbam.project.type=="poster" ) ) {
				//se un project non è caricato, oppure se è di tipo poster, non le visualizzo
				//console.log("NON caricato");
				$("#buttonPages").addClass( "ui-state-disabled" );
			} else {
				//console.log("caricato");
				$("#buttonPages").removeClass( "ui-state-disabled" );
			}
		}
	},
	projectEditor: {
		/*
		PROCESSO:
		solo init viene chiamata direttamente (passandogli sempre un projectId), poi a catena:
		init -> getProject
		getProject -> loadProject
		loadProject -> drawProject
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
				//onchange del type, devo creare il size
				$('#typeFieldset input:radio').change(
					function(){
						//azzero i campi hidden
						resetAddForm();
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
			$.mobile.loading("show");
			$.ajax({
				type: "POST",
				url: "/addProject",
				data: {
					'form': sbam.utils.form2json('#addProjectForm'),
					'pages': sbam.projectTypes[$('input[name=type]:checked', '#addProjectForm').val()].defaultPages
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
					sbam.projectEditor.getProjects();
					//sbam.projectEditor.init(result._id);
				}
				//$("#popupAddProject").hide();
			}).fail(function( jqXHR, textStatus ) {
				alert( "Request failed: " + textStatus );
			});		
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
			sbam.projectEditor.drawProject();
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
		drawProject: function() {
			sbam.currentView = "projectEditor";
			//prima disegno la gui
			//console.log("projectEditor: draw");
			//SIAMO SICURI SERVA? sbam.utils.closeAllPanles();
			//$("#buttonPages").fadeOut();
			//$("#buttonUndo").fadeOut();
			//$("#buttonRedo").fadeOut();
			
			//poi raffiguro sbam.project come lista di coppie di pagine
		},
		saveProject: function(next) {
			//prima controllo se il numero di pagine è congruo con minPageQuantity
			if ( sbam.pageEditor.getPagesNum() % sbam.projectTypes[sbam.project.type].minPageQuantity ) {
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
					project = JSON.parse(project);
					//finito di salvare il project
					$.mobile.loading("hide");
					$("#buttonSave").css( "background-color","transparent" );
					$("#buttonSave").addClass( "ui-state-disabled" );
					sbam.history.reset();
					sbam.history.add("Save page");
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
		init -> drawPagesCouple
		init -> getPages
		*/
		//chiedo il pageNumLeft invece del pageId perchè il pageId esiste solo dopo il save nel db, ma io ho bisogno di leggere le pagine anche prima
		init: function(pageNumLeft,typeLeft,pageNumRight,typeRight) {
			//console.log("pageEditor: init");
			sbam.pageEditor.getPage(pageNumLeft,typeLeft,"left", function(){
				sbam.pageEditor.getPage(pageNumRight,typeRight,"right", function(){
					sbam.pageEditor.drawPagesCouple();
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
					console.log("vado a ciclare su questa page:");
					console.log(sbam.project.pages[i]);
					var myCouple = sbam.pageEditor.getCouple(i);
					//console.log("che ritorna questa couple:");
					//console.log(myCouple);
					if ( myCouple.triggerCouple ) {
						var icon = "circle-o";
						//console.log(i);
						//console.log(myCouple.idx_left);
						//console.log(myCouple.idx_right);
						if ( 
							sbam.pageLeftIdx >=0 && sbam.project.pages[sbam.pageLeftIdx].num == myCouple.num_left && sbam.project.pages[sbam.pageLeftIdx].type == myCouple.type_left 
							|| 
							sbam.pageRightIdx >=0 && sbam.project.pages[sbam.pageRightIdx].num == myCouple.num_right && sbam.project.pages[sbam.pageRightIdx].type == myCouple.type_right 
						) {
							icon = "circle";
							isSelected = true;
							selectedLabel = myCouple.label;
						}
						$("#panelPages li").last().prev().prev().before("<li data-icon='"+icon+"' class='pageItem'><a class='ui-icon-"+icon+" ui-btn ui-btn-icon-right' id='pageItem"+i+"'><img src='/images/"+myCouple.icon+"' style='margin-right:10px;'>"+myCouple.label+"</a></li>");
						//con relativa action di click che inizializza il pageEditor sul progetto cliccato
						$("#pageItem"+i).data("page_num_left", myCouple.num_left);
						$("#pageItem"+i).data("page_num_right", myCouple.num_right);
						$("#pageItem"+i).data("page_type_left", myCouple.type_left);
						$("#pageItem"+i).data("page_type_right", myCouple.type_right);
						$("#pageItem"+i).click(function() { sbam.pageEditor.init($(this).data("page_num_left"),$(this).data("page_type_left"),$(this).data("page_num_right"),$(this).data("page_type_right")); });
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
			var idx_left = 0;
			var idx_right = 0;
			var num_left = 0;
			var num_right = 0;
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
			/* NO, creo sempre una sola pagina alla volta, poi in fase di save avverto se il numero totale non torna
			//poi creo N pagine fino a raggiungere minPageQuantity:
			for ( var i=0; i<sbam.projectTypes[sbam.project.type].minPageQuantity; i++ ) {
				var type = "left";
				if ( sbam.utils.isOdd(firstNumAvail+i) ) type = "right";
				sbam.project.pages.push({
					'type':type,
					'num':firstNumAvail+i
				});
			}
			*/
			//creo la mia pagina
			var type = "left";
			if ( sbam.utils.isOdd(firstNumAvail) ) type = "right";
			sbam.project.pages.push({
				'type':type,
				'num':firstNumAvail
			});
			
			
			//caricamento delle pagine nell'editor
			//devo passare 2 pag non una
			/*
			//NO, ANCHE SE FUNZIONA 
			var myCouple = sbam.pageEditor.getCouple(i);
			sbam.pageEditor.init(myCouple.num_left,myCouple.type_left,myCouple.num_right,myCouple.type_right);
			*/
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
			} else if ( what == "right" ) {
				sbam.pageRightIdx = -1;
			} else  if ( what == "both" ) {
				sbam.pageLeftIdx = -1;
				sbam.pageRightIdx = -1;
			}
		},
		drawPagesCouple: function() {
			sbam.currentView = "pageEditor";
			//prima disegno la gui
			//console.log("pageEditor: draw");
			//SIAMO SICURI CHE SERVE? sbam.utils.closeAllPanles();
			//$("#buttonPages").fadeIn();
			//$("#buttonUndo").fadeIn();
			//$("#buttonRedo").fadeIn();
			//poi raffiguro sbam.project come lista di coppie di pagine
		},
	},
	utils: {
		/* ora come ora non in uso
		closeAllPanles: function() {
			$("#panelPages").panel( "close" );
			$("#panelHistory").panel( "close" );
			$("#panelProjects").panel( "close" );
		},
		*/
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
		}
	}
};






//on init salvo sempre una snapshot vuota all'inizio dell'history
console.log("sobuame initialized!");



















/* #### THEN THINGS TO DO ON READY #### */

$(document).ready(
	function()
	{
		console.log("sobuame on ready!");
		
		//gestisco i bottoni undo/redo per l'history
		$("#buttonUndo").click( sbam.history.undo );
		$("#buttonRedo").click( sbam.history.redo );
		$("#buttonResetHistory").click( sbam.history.reset );
		//ogni volta che apro un pannello devo popolarlo in ajax
		$("#panelProjects").panel({ beforeopen: sbam.projectEditor.getProjects });
		$("#panelPages").panel({ beforeopen: sbam.pageEditor.getPages });
		$("#panelHistory").panel({ beforeopen: sbam.history.getHistory });
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
		

		
		
		/* QUESTI NON VANNO
		$(document).on("mobileinit", function (e, ui) {
		  //var next_page = ui.nextPage[0].id;
		  console.log("mobileinit:");
		  alert("mobileinit:");
		});
		$(document).on("pagecontainerbeforeload", function (e, ui) {
		  //var next_page = ui.nextPage[0].id;
		  console.log("pagecontainerbeforeload:");
		  alert("pagecontainerbeforeload:");
		});
		$(document).on("pagebeforeload", function (e, ui) {
		  //var next_page = ui.nextPage[0].id;
		  console.log("pagebeforeload:");
		  alert("pagebeforeload:");
		});
		*/
		
		
		
		/* QUESTI VANNO
		$(document).on("pagecreate", function (e, ui) {
			//una sola volta la prima volta che si naviga in questa pagina (NON se la pagina è quella di default)
		  //var next_page = ui.nextPage[0].id;
		  console.log("pagecreate:");
		  alert("pagecreate:");
		});
		$(document).on("pageinit", function (e, ui) {
			//una sola volta la prima volta che si naviga in questa pagina (NON se la pagina è quella di default)
		  //var next_page = ui.nextPage[0].id;
		  console.log("pageinit:");
		  alert("pageinit:");
		});
		$(document).on("pagecontainerhide", function (e, ui) {
			//ogni volta che la pagina sparisce (anche quando si entra nell'app SE questa pagina non è quella di default)
		  var next_page = ui.nextPage[0].id;
		  console.log("pagecontainerhide: next: "+next_page);
		  alert("pagecontainerhide: next: "+next_page);
		});
		$(document).on("pagecontainershow", function (e, ui) {
			//var prev_page = ui.prevPage[0].id;
			//console.log("pagecontainershow: prev: "+prev_page);
			//alert("pagecontainershow: prev: "+prev_page);
			console.log("pagecontainershow: e: ");
			console.log(e);
			console.log("pagecontainershow: ui: ");
			console.log(ui);
		});	
		*/
	}
);

	















	
	
/* #### FINALLY THINGS TO DO ON LOAD (AFTER ALL IMAGES ARE LOADED) #### */
	
$(window).load(
	function()
	{
		console.log("sobuame loaded!");
	}
);



