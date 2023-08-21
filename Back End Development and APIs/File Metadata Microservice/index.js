var express = require('express');
var cors = require('cors');
require('dotenv').config()
const bodyParser = require("body-parser");
const multer  = require('multer')
const upload = multer({ dest: './public/uploads/' })
var app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse",  upload.single('upfile'), (req, res) => {
  if(req.file){
    res.json({name: req.file.originalname, type: req.file.mimetype, size: req.file.size})
  }else{
    res.send("file not found")
  }
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
