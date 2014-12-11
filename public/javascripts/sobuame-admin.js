if ( true ) {

/* #### GLOBALS #### */

var sbamAdm = {
	users: {
		loginAsNormalUser: function(user) {
			console.log("loginAsNormalUser() con user:");
			console.log(user);
			$.mobile.loading("show");
			$.ajax({
				type: "POST",
				url: "/adminLoginAsNormalUser",
				data: { 
					"username": sbamAdminUsername,
					"password": sbamAdminPassword,
					"loginasuser": user
				}
			}).done(function( ) {
				$.mobile.loading("hide");
				//ora in teoria sono loggato come utente scelto
				//devo solo far partire l'app in nuova finestra
				window.open("http://"+window.location.host,"_blank",'menubar=1,titlebar=1,toolbar=1,scrollbars=1');
			}).fail(function( jqXHR, textStatus ) {
				alert( "Request failed: " + textStatus );
			});		
		},
		getUsers: function() {
			console.log("vado a chiamare adminGetUers con username="+sbamAdminUsername+" e pw="+sbamAdminPassword);
			$.mobile.loading("show");
			$.ajax({
				type: "POST",
				url: "/adminGetUers",
				data: { 
					"username": sbamAdminUsername,
					"password": sbamAdminPassword
				}
			}).done(function( users ) {
				users = JSON.parse(users);
				//arrivati i users, li disegno nel panel
				console.log( "Arrivati i users: " );
				console.log( users );
				//console.log( users.length );
				
				//vuoto il content della pagina
				$("#mainContent").empty();
				
				console.log( "creo la lista degli utenti" );
				//creo la lista degli utenti
				$("#mainContent").append("<ul id='usersListview' data-autodividers='true' data-role='listview'  data-filter='true' data-filter-placeholder='Search users...'  data-inset='true'>");
				$("#usersListview").listview();
				$("#usersListview").filterable();
				
				//#### popolo la lista dei users
				if ( users.length > 0 ) {
					for( var i=0; i < users.length; i++ ) {
						console.log( "ciclo su user i="+i );
						//per ogni user c'è un item nella lista
						$("#usersListview").append("\
							<li data-icon='user' class='userItem' >\
								<a id='userItem"+i+"' class='ui-icon-user ui-btn ui-btn-icon-right'>\
									<h2>"+users[i].name+"</h2>\
									<p class='ui-li-aside'><strong>IP at creation: "+users[i].ip+"</strong><br/><i>Created at: </i>"+users[i].created_at+"<br/><i>Updated at: </i>"+users[i].updated_at+"</p>\
									<p>platform: <strong>"+users[i].platform+"</strong><br/>ID: "+users[i]._id+"</p>\
								</a>\
							</li>");
						//con relativa action di click che fa il login per quell'utente e apre l'app
						$("#userItem"+i).data("user", users[i]);
						$("#userItem"+i).click(function() { sbamAdm.users.loginAsNormalUser($(this).data("user")); });
					}
				}
				$.mobile.loading("hide");
			}).fail(function( jqXHR, textStatus ) {
				alert( "Request failed: " + textStatus );
			});		
		}
	}
}
console.log("sobuame-admin on init!");
 
 

/* #### THEN THINGS TO DO ON READY #### */

$(document).ready(
	function() {
		console.log("sobuame-admin on ready!");
		
		//attivo bottone per visualizzare gli utenti
		$("#admBtnUsers").click(function(){
			sbamAdm.users.getUsers();
		});

		
	}
);







	
	
/* #### FINALLY THINGS TO DO ON LOAD (AFTER ALL IMAGES ARE LOADED) #### */
	
$(window).load(
	function() {
		console.log("sobuame-admin on load!");
	}
);



}