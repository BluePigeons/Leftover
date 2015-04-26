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

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + "/views");


var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
      extended: true
}));

app.get('/', function (req, res) {
    res.render('index');
    console.log('OK');
});

app.get('/login', function (req, res) {
    res.render('logged');
    console.log('OK');
});


app.get('/welcome', function (req, res) {
    res.render('welcome');
    console.log('Welcome');
});

app.get('/braintree', function (req, res){
    res.render('braintree');
    console.log('braintree');  
});

app.post('/checkout', function (req, res){
    console.log('checkout');
    console.log(req.body.payment_method_nonce);
    var nonce = req.body.payment_method_nonce;
    res.render('checkout');
    console.log('checkout');  
});

//MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
//	if (err) throw err;
//
//	//Find one document in our collection
//	db.collection('coll').findOne({}, function(err, doc) { 
//			
//			if (err) throw err;
//
//			//Print the result
//			console.dir(doc);
//			//Close the db
//			db.close();
//	});

//	//Declare success
//	console.dir("Called findOne");

//});

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
//Receive a payment method nonce from your client
app.post("/purchases", function (req, res) {
      console.log(req);
      var nonce = req.body.payment_method_nonce;
      console.log('purchases')
        // Use payment method nonce here
});

//Create a transaction
//gateway.transaction.sale({
//  amount: '11.30',
//    paymentMethodNonce: 'nonce-from-the-client',
//    }, function (err, result) {
//});


app.get('*', function(req, res){
	res.status(404).send("Page not found");
});

//braintree.setup("CLIENT-TOKEN-FROM-SERVER", "dropin", {
//      container: "checkout"
//});


app.listen(8080);
console.log("Express server started on port 8080");
