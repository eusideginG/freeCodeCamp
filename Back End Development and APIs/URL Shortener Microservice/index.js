require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dns = require('dns');
const parse_url = require('url');
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Basic Configuration
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;

const urlSchema = new mongoose.Schema({
  url: {type: String, required: true}
});

var urlModel=mongoose.model('urls',urlSchema);

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({greeting: 'hello API'});
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

app.post("/api/shorturl", (req, res) => {
  const formurl = req.body.url;
  const url_validation = dns.lookup(parse_url.parse(formurl).hostname, (err, adrs) => {
    if(!adrs){
      return res.json({error: 'invalid url'});
    } 
    else{
      const url = new urlModel({url: formurl})
      url.save((err, data) => {
        res.json({original_url: data.url, short_url: data.id})
      })
    }
  })
});
app.get("/api/shorturl/:url_id", (req, res) => {
  let url_id = req.params.url_id;
  urlModel.findById(url_id, (err, data) => {
    if(!data){
      return res.json({error: 'invalid url'});
    }
    else{
      res.redirect(data.url)
    }
  })
});