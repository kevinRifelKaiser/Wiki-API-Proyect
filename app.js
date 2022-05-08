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

app.route('/articles')
    .get(function(req, res) {
        Article.find({}, function(err, foundArticles) {
            if(!err) {
                res.send(foundArticles);
            } else {
                res.send(err);
            }
        });
    })
    .post(function(req, res) {

        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        
        newArticle.save(function(err) {
            if(!err) {
                res.send('Successfully added a new article.')
            } else {
                res.send(err);
            }
        });
    })
    .delete(function(req, res) {
        Article.deleteMany(function(err) {
            if(!err) {
                res.send('Successfully deleted all articles.');
            } else {
                res.send(err);
            }
        });
    });

//REST API: Get rout
app.get('/articles', );

//REST API: Post rout
app.post('/articles', ); 

//REST API: Delete rout
app.delete('/articles' , );










//Home rout
app.get('/', function(req, res) {
    res.render('list', {});
});

//Server
app.listen(port, function(res, req) {
    console.log('Server running on port ' + port);
});

