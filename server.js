var express = 		require('express');
var bodyParser = 	require("body-parser");
var cookieParser = 	require('cookie-parser')

var app = express();

//for handling cookies
app.use(cookieParser());

//for handling static folder files, eg. images
app.use(express.static('public'));

//for handling POST requests
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/post_data', function (req, res) {
 	doseCalc1 = (req.body.cupSize) / 1000;
   doseCalc2 = doseCalc1 * (req.body.brewRatio);

 response = {
      	cupSize:req.query.cupSize,
      	brewRatio:req.query.brewRatio,
   		dryDose: doseCalc2	
   };


   console.log(response);
   res.end(JSON.stringify(response));
});

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   
   doseCalc1 = (req.query.cupSize) / 1000;
   doseCalc2 = doseCalc1 * (req.query.brewRatio);

response = {
      	cupSize:req.query.cupSize,
      	brewRatio:req.query.brewRatio,
   		dryDose: doseCalc2	
   };


   console.log(response);
   res.end(JSON.stringify(response));
})

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.send('Hello GET');
    console.log("Cookies: ", req.cookies)
})

// This responds a POST request for the homepage
app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {   
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
})

var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})