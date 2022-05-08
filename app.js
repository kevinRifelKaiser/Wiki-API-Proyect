//Express
const express = require('express');
const app = express();
const port = 3000;

//EJS
const ejs = require('ejs');
app.set('view engine', 'ejs');

//BodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

//Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/wikiDB');
//Mongoose schema
const wikiSchema = new mongoose.Schema ({
    title: String,
    content: String
});
//Mongoose model
const Article = mongoose.model('Article', wikiSchema);




//Home rout
app.get('/', function(req, res) {
    res.render('list', {});
});





//Server
app.listen(port, function(res, req) {
    console.log('Server running on port ' + port);
});

