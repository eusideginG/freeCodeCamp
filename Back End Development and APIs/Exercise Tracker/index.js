const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//use css static
app.use(express.static('public'));

//send html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const Schema = mongoose.Schema;
const UsersSchema = new Schema({
  username: {type: String, required: true},
  log: [{description: {type: String, required: true},
         duration: {type: Number, required: true},
         date: {type: String, default: Date.now()}
       }]
});

const User = mongoose.model("User", UsersSchema);

//create new user
app.post("/api/users", (req, res) => {
  const username = req.body.username
  const user = new User({
    username: username
  });
  user.save()
    .then(() => {res.json({username: req.body.username,
        _id: user._id})})
    .catch((err) => {console.log(err)})
})

//display all users
app.get("/api/users", (req, res) => {
  User.find({}, (err, users) => {
    if (err) return;
    res.json(users);
  });
})

//add exersice for a user
app.post("/api/users/:_id/exercises", async (req, res) => {
  let {description, duration, date } = req.body;
  let id = req.params._id;
  console.log(date)
  if (!date) {
    date = new Date().toDateString();
  } else {
    date = new Date(date).toDateString();
  }

  try{
    let findOne = await User.findOne({
      _id: id 
    })

    if (findOne){
      findOne.count++;
      findOne.log.push({
        description: description,
        duration: parseInt(duration),
        date: date
      });
      findOne.save();

      res.json({
          username: findOne.username,
          description: description,
          duration: parseInt(duration),
          _id: id,
          date: date
        });
    }

  } catch (err) {
    console.error(err);
  }
})

//display user exersice log
app.get("/api/users/:_id/logs", async (req, res) => {
  const {from, to, limit} = req.query;
  const {_id} = req.params;
  User.findById(_id, (err, userData) => {
    if(err || !userData) {
      res.send("Could not find user");
    }
    else{
      let dateFilter = null;
      if(from){
        const fromDate = new Date(from).getTime();
        if(to){
          const toDate = new Date(to).getTime();
        dateFilter = userData.log.filter(x => new Date(x.date).getTime() >= fromDate && new Date(x.date).getTime() <= toDate);
        }else{
        dateFilter = userData.log.filter(x => new Date(x.date).getTime() >= fromDate);
      }
      }
      if(limit){
      dateFilter = userData.log.slice(0, limit);
    }
      data = {id: userData._id, username: userData.username, count: userData.__v, log: dateFilter || userData.log}
      res.json(data)
    }
  })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})