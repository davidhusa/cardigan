const express = require("express");
const app = express();
const dbURL = require("./secrets").MongoDBURL
app.use(express.static('public'));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var db;
const mongoClient = require('mongodb').MongoClient;
mongoClient.connect(dbURL, (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(port, () => {
    console.log(`Running server on port ${port}`);
  });
})

app.set('view engine', 'ejs');

const port = 8080;
// -------
function viewPath(path) {
  return __dirname + "/views/" + Array.prototype.join.bind(arguments, '/')() + ".html";
}
// -------

app.get('/', (req, res) => {
  var cursor = db.collection('comments').find().toArray((err, results) => {
    res.render('index.ejs', {comments: results});
  });
})

app.get('/cards', (req, res) => {
  var cursor = db.collection('cards').find().toArray((err, results) => {
    res.render('cards.ejs', {cards: results});
  });
})

app.post('/comments', (req, res) => {
  console.log(db)
  db.collection('comments').save(req.body, (err, result) => {
    if (err) return console.log(db.collection);
    console.log('saved');
    res.redirect('/');
  })
})

// -------

// db.collection('cards').find().toArray((err, results) => { console.log(results) })
