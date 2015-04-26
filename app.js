var MongoClient = require('mongodb').MongoClient;
var express = require('express'),
    app = express(),
    http = require('http'),
    cons = require('consolidate'),
    stylus = require('stylus'),
    braintree = require('braintree');        

//set path to the views (template) directory
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'jade');

app.use(stylus.middleware({
    debug: true,
    src: __dirname + '/views',
    dest: __dirname + '/public'
}));  
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/Stylesheets/images'));

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + "/views");


var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
      extended: true
}));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/logged', function (req, res) {
    res.render('logged');
});

app.get('/payment', function (req, res) {
    console.log('get payment');
    res.render('payment');
});

app.get('/welcome', function (req, res) {
    res.render('welcome');
});

app.get('/braintree', function (req, res){
    res.render('braintree');
});

app.post('/checkout', function (req, res){
    var nonce = req.body.payment_method_nonce;
    
    gateway.transaction.sale({
          amount: '10.00',
          paymentMethodNonce: 'nonce-from-the-client',
    }, function (err, result) {
       
    });
    res.render('checkout');
});

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




app.use(bodyParser.urlencoded({extended: true}));
var Meal = require('./models/meal')
app.post('/meal', function(req, res){
    console.log(req.body);


    var meal = new Meal({
        postedby : req.body.postedby 
        //imageLink : req.body.imagelink,
        //expiration: req.body.expiration
    })
    meal.save(function (err, meal)
    {
        if(err) { 
    }
        res.json(201, meal)
    })    
})

//We add here the Braintree credentials
var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   'x7jxr43qhhq55w8j',
    publicKey:    'rnrw7bk65pff8wjn',
    privateKey:   'fc0b95e54a475d5917687a4973c6e622'
});

//Send a client token to your client
app.get("/client_token", function (req, res) {
    gateway.clientToken.generate({}, function (err, response) {
        
      var clientToken = response.clientToken
      res.send(clientToken);
    });
});

app.get('*', function(req, res){
	res.status(404).render("404");
});

app.listen(8080);
console.log("Express server started on port 8080");

var ngrok = require('ngrok');
ngrok.connect(8080, function (err, url) {
       // https://leftover.ngrok.com -> 127.0.0.1:8080  
});
