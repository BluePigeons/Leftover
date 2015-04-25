var MongoClient = require('mongodb').MongoClient;
var express = require('express'),
		app = express(),
		cons = require('consolidate');

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + "/views");


MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
	if (err) throw err;

	//Find one document in our collection
	db.collection('coll').findOne({}, function(err, doc) { 
			
			if (err) throw err;

			//Print the result
			console.dir(doc);
			//Close the db
			db.close();
	});

	//Declare success
	console.dir("Called findOne");

});

app.get('/', function(req, res){
	res.render('hello', { 'name' : 'Swig'} );
});

app.get('*', function(req, res){
	res.status(404).send("Page not found");
});


app.listen(8080);
console.log("Express server started on port 8080");
