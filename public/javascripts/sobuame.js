/* #### THEN THINGS TO DO ON READY #### */


$(document).ready(
	function()
	{
		console.log("sobuame init!");
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
	}
);



