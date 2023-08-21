// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
app.use(express.json());
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


// req api returns current time
app.get("/api/", (req, res) => {
  let unix_date = new Date().getTime();
  let utc_date  = new Date().toUTCString();
  res.json({unix: unix_date, utc: utc_date})
});


// req api/unix_time
app.get("/api/:date?", (req,res) => {
  let unix_date;
  let utc_date;
  let uri_date;
  if(req.params.date.length === 13){
    uri_date = parseInt(req.params.date);
  }
  else{
    uri_date = req.params.date;
  }
  unix_date = new Date(uri_date).getTime();
  utc_date = new Date(uri_date).toUTCString();
  
  if(!unix_date){
    return res.send({error : "Invalid Date"})
  }
  else{
    return res.json({unix: unix_date, utc: utc_date})
  }
});

let temp = new Date("2015-12-25").toUTCString();
console.log(temp)