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



//models

function defineModels(mongoose, app, next) {
	
	//definisco gli Schema per i modelli
	var Schema = mongoose.Schema;
	var ObjectId = Schema.ObjectId;	
	function validatePresenceOf(value) {
		return value && value.length;
	}
	
	//Schema user
	var User = new Schema({
		'name': { type: String, index: true, required: false },
		'created_at':{ type: Date, index: true },
		'updated_at':{ type: Date, index: true },
		'ip':{ type: String, index: true }
	});
	User.pre('save', function(next){
		now = new Date();
		this.updated_at = now;
		if ( !this.created_at ) {
			this.created_at = now;
		}
		next();
	});	
	mongoose.model('user', User);
	
	//Schema project
	var maxSizemm = 1000000; //è la massima dimensione salvabile nel db per tutte le dimensioni, ed è in mm. quindi così è 1km, abbondande per la stampa...
	var Project = new Schema({
		'user': { type: Schema.ObjectId, ref: 'user', required: true, index: true },
		'type': { type: String, enum: ['album', 'poster', 'annuario','libro'], index: true, required: true },//NOTA: ogni modifica a type va riportata coerentemente in sobuame.js
		'name': { type: String, index: true, required: true },
		'created_at':{ type: Date, index: true },
		'updated_at':{ type: Date, index: true },
		'dpi':{ type: Number, max: maxSizemm, index: true, required: true },
		'width':{ type: Number, max: maxSizemm, index: true, required: true },
		'height':{ type: Number, max: maxSizemm, index: true, required: true },
		'spline': { type: String, index: false, required: false },
		'variant': { type: String, index: false, required: false },
		'minPageQuantity': { type: Number, max: 256, index: true, required: false },
		'stickersLayers': [{ //i layers sono intesi come url di immagini che verranno prese e stretchate alla misura del bbox e sovrapposte ad ogni immagine di tipo sticker. non sono immagini caricabili dall'utente (sono immagini di template - PNG trasparenti - lette dalla dir dei template), ma solo gli utenti possono assegnarli runtime a livello di intero progetto.
			'url': { type: String, index: true, required: false }
		}],
		'pages': [{ //ogni pagina in un progetto è identificata da 2 parametri (oltre ovviamente al suo _id univoco assegnato da mongo): num e type. num da solo non basta perchè ci sono le pagine speciali, come le copertine, che non lo usano.
			'type': { type: String, enum: ['left','right','cover-1-front','cover-2-front','cover-3-back','cover-4-back','single'], index: true, required: false },
			'num': { type: Number, default: -1, index: false, required: false },//type:left e type:right condividono la numerazione a partire dalla 1 (si inizia con 1 che è right, e vale la regola che tutti le pagine dispari sono right e quelle pari sono left), mentre type:cover-front e cover-back non usano il campo num
			'elements': [{
				'bbox': {
					'x': { type: String, index: true, required: false },
					'y': { type: String, index: true, required: false },
					'w': { type: String, index: true, required: false },
					'h': { type: String, index: true, required: false }
				},
				'style': {
					'foregroundColor': {
						'c':{ type: Number, max: 100, index: true, required: false },
						'm':{ type: Number, max: 100, index: true, required: false },
						'y':{ type: Number, max: 100, index: true, required: false },
						'k':{ type: Number, max: 100, index: true, required: false }
					},
					'backgroundColor': {
						'c':{ type: Number, max: 100, index: true, required: false },
						'm':{ type: Number, max: 100, index: true, required: false },
						'y':{ type: Number, max: 100, index: true, required: false },
						'k':{ type: Number, max: 100, index: true, required: false }
					},
					'font':{ type: String, index: true, required: false },
					'fontSize':{ type: Number, max: 10000, index: false, required: false }, //sono intesi in pt (point)
					'align': { type: String, enum: ['left','right','center','justify'], index: true, required: false }
				},
				'type': { type: String, enum: ['text','image','pagenum'], index: true, required: false },
				'text': {
					'content': { type: String, index: true, required: false },
					'demoContent': { type: Boolean, index: false, required: false }
				},
				'image': {
					'type': { type: String, enum: ['image','sticker'], index: true, required: false },
					'url': { type: String, index: true, required: false },
					'dpi': { type: Number, index: false, required: false }, //uso i dpi dell'immagine come valore di zoom. per ingrandire l'immagine, diminuisco i dpi. per tutto il resto valgono idp del project
					'offsetx': { type: Number, index: false, required: false }, //questi devono essere in mm, non vale la percentuale
					'offsety': { type: Number, index: false, required: false },
					'stickerLayout': { type: String, index: true, required: false } //il layout delle figurine indica se sono singoile, o multipli. per questo campo si usa la naming convention: T-CxR, es. v-3x2 (l'immagine verrà suddivisa su 6 figurine verticali "v" disposte su 2 righe "R" e 3 colonne "C")
				},
				'pagenum': {
					'type': { type: String, enum: ['num','roman','letter'], index: true, required: false },
				}
			}]
		}]
	});
	Project.pre('save', function(next){
		now = new Date();
		this.updated_at = now;
		if ( !this.created_at ) {
			this.created_at = now;
		}
		next();
	});	
	mongoose.model('project', Project);
	
	
	/*
	//Schema permission
	var Permission = new Schema({
		'action': { type: String, required: true, enum: ['modify_all', 'modify_mine'], index: true },
		'on_element_name': { type: String, required: true, enum: ['site', 'page'], index: true },
		'on_element_id': { type: Schema.ObjectId, required: true, index: true }
	});
	mongoose.model('permission', Permission);
	
	//Schema role
	var Role = new Schema({
		'name': { type: String, index: true, required: true },
		'description': { type: String },
		'permissions':[Permission],
		//common fields
		'author': { type: Schema.ObjectId, ref: 'user', required: true, index: true },
		'status': { type: String, required: true, enum: ['public', 'private', 'share'], index: true },
		'created': { type: Date, required: true }
	});
	mongoose.model('role', Role);
	
	//Schema site
	var Site = new Schema({
		'title': { type: String, index: true, required: true },
		'domain': { type: String, index: { unique: true }, required: true, trim: true },
		'description': { type: String },
		'keywords': { type: String },
		//themes: sarà un array di temi, e un tema è un layout.jade + uno style.css
		//common fields
		'author': { type: Schema.ObjectId, ref: 'user', required: true, index: true },
		'status': { type: String, required: true, enum: ['public', 'private', 'share'], index: true },
		'created': { type: Date, required: true }
	});
	mongoose.model('site', Site);
	
	//Schema divOrdered
	var DivOrdered = new Schema({
		'father': { type: Schema.ObjectId, index: true }, //questo può essere sia un id di pagina che di div
		'div': { type: Schema.ObjectId, ref: 'div', index: true },
		'order': { type: Number, index: true}
	});
	
	//Schema div
	var Div = new Schema({
		'type': { type: String, required: true, enum: ['vertCont', 'horizCont', 'module'], index: true },
		'dom_id': { type: String },
		'class': { type: String },
		'is_table': { type: Boolean, default: false },
		'inline_style': { type: Boolean, default: true },
		'children': [DivOrdered],
		'view': { type: String },
		'controller': { type: String },
		//common fields
		'author': { type: Schema.ObjectId, ref: 'user', required: true, index: true },
		'status': { type: String, required: true, enum: ['public', 'private', 'share'], index: true },
		'created': { type: Date, required: true }
	});
	mongoose.model('div', Div);
	
	//Schema page
	var Page = new Schema({
		'site': { type: Schema.ObjectId, ref: 'site', required: true },
		//'site': { type: Schema.ObjectId, ref: 'site' },
		'route': { type: String, index: true, trim: true }, //nota che non è required, perchè la route vuota è accettata come root page del sito
		'divs': [DivOrdered],
		//common fields
		'author': { type: Schema.ObjectId, ref: 'user', required: true, index: true },
		'status': { type: String, required: true, enum: ['public', 'private', 'share'], index: true },
		'created': { type: Date, required: true }
	});
	mongoose.model('page', Page);
	
	//Schema jslModel
	var JslModel = new Schema({
		'name': { type: String, index: true, required: true },
		'jslSchema': { type: String, required: true },
		//common fields
		'author': { type: Schema.ObjectId, ref: 'user', required: true, index: true },
		'status': { type: String, required: true, enum: ['public', 'private', 'share'], index: true },
		'created': { type: Date, required: true }
	});
	mongoose.model('jslModel', JslModel);
	*/



	
	
	//Schema debug
	//usato per testing
	var Debuggin = new Schema({
		'somevalue': { type: String }
	});
	mongoose.model('debuggin', Debuggin);
	
	
	/*
	//Schema element
	var Element = new Schema({
		'jslModel': { type: Schema.ObjectId, ref: 'jslModel', required: true, index: true },
		//common fields
		'author': { type: Schema.ObjectId, ref: 'user', required: true, index: true },
		'status': { type: String, required: true, enum: ['public', 'private', 'share'], index: true },
		'created': { type: Date, required: true }
	});
	mongoose.model('element', Element);
	
	//Schema linkedserver
	var Linkedserver = new Schema({
		'host': { type: String, validate: [validatePresenceOf, app.i18n.__('host is required')], index: { unique: true }, required: true },
		'description': String,
		'author': { type: Schema.ObjectId, ref: 'User' },
		'status': { type: String, required: true, enum: ['public', 'private'] },
		'created': { type: Date }
	});
	mongoose.model('linkedserver', Linkedserver);
	*/
	
	
	
	//esempi
	
	/*
	
	//un serial middleware [init|save|remove]
	User.pre('save', function (next) {
		email(this.email, 'Your record has changed');
		next();
	});
	//un parallel middleware [init|save|remove]
	User.pre('save', true, function (next, done) {
		
		next(); | done();
	});
	
	
	//attaccare metodi custom ad uno schema
	AnimalSchema.methods.findSimilarType = function findSimilarType (next) {
	  return this.find({ type: this.type }, next);
	};	
	var dog = new Animal({ name: 'Rover', type: 'dog' });
	dog.findSimilarType(function (err, dogs) {
	  if (err) return ...
	  dogs.forEach(..);
	})
	//oppure
	dog
	.findSimilarType()
	.where('name': /rover/i)
	.limit(20)
	.run(function (err, rovers) {
	  if (err) ...
	})
	
	
	
	//virtuals
	var PersonSchema = new Schema({
		name: {
			first: String
		  , last: String
		}
	});	
	PersonSchema
	.virtual('name.full')
	.get(function () {
	  return this.name.first + ' ' + this.name.last;
	})
	.set(function (setFullNameTo) {
	  var split = setFullNameTo.split(' ')
		, firstName = split[0]
		, lastName = split[1];

	  this.set('name.first', firstName);
	  this.set('name.last', lastName);
	});	
	
	
	//getters
	function obfuscate (cc) {
	  return '****-****-****-' + cc.slice(cc.length-4, cc.length);
	}
	var AccountSchema = new Schema({
	  creditCardNumber: { type: String, get: obfuscate }
	});	
	//& setters
	function toLower (v) {
	  return v.toLowerCase();
	}
	var UserSchema = new Schema({
	  email: { type: String, set: toLower } 
	});	
	
	
	//relazioni
	//nota: Schema.ObjectId è un data type che indica l'id di un'istanza (documento) qualsiasi (non specifica un model)
	//relazioni 1:1
	var CarSchema = new Schema({ driver: Schema.ObjectId })	//qui non ho specificato l'oggetto (model) relazionato
	var CarSchema = new Schema({ driver: { type: Schema.ObjectId, ref: 'driverModel' } })	//qui ho anche specificato l'oggetto relazionato
	//relazioni 1:N
	var CarSchema = new Schema({ driver: [Schema.ObjectId] })	
	var CarSchema = new Schema({ driver: [{ type: Schema.ObjectId, ref: 'driverModel' }] })	
	//poi sempre
	var Car = mongoose.model('Car', CarSchema);
	//come creo/salvo l'oggetto relazionato
	var myCar = new Car({ driver: myDriver });
		//oppure
		var myCar = new Car();
		myCar.driver = myDriver; //oppure myDriver._id
	myCar.save(function (err) {
		if (err) ...
	});
	//come popolo l'oggetto relazionato
	Car
	.findOne({ model: 'Fiat' })
	.populate('driver', ['name']) //  <-- only return the Driver name
	.run(function (err, myCar) {
		if (err) ..
		console.log('The driver is %s', myCar.driver.name);
	})



	//embedded documents
	//1:1
	var CarSchema = new Schema({ driver: DriverSchema })	//questa va? dicono di no...
	//1:N
	var CarSchema = new Schema({ driver: [DriverSchema] })	
	
	
	*/
	
	
	
	//alla fine chiamo il callback che mi hanno passato
	next();
}

exports.defineModels = defineModels; 

