import { Article } from './db.js';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { PORT } from './config.js';

//Express
const app = express();

//EJS
app.set('view engine', 'ejs');

//BodyParser
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Use static CSS sheet
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname + '/public')));

//Requests targeting all Articles//
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

//Requests targeting a specific article//
app.route('/articles/:articleTitle')
.get(function(req, res) {
    Article.findOne({title: req.params.articleTitle}, function(err, foundArticle) {
        if(foundArticle) {
            res.send(foundArticle);
        } else {
            res.send('No articles matching that title was found.');
        }
    });
})
.put(function(req, res) {
    Article.updateOne(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        function(err) {
            if(!err) {
                res.send('Successfully updated article.');
            } else {
                res.send(err);
            }
        }
    );
})
.patch(function(req, res) {
    Article.updateOne(
        {title: req.params.articleTitle},
        {$set: req.body},
        function(err) {
            if(!err) {
                res.send('Successfully updated article.');
            } else {
                res.send(err);
            }
        }
    );
})
.delete(function(req, res) {
    Article.deleteOne(
        {title: req.params.articleTitle},
        function(err) {
            if(!err) {
                res.send('Successfully deleted article.');
            } else {
                res.send(err);
            }
        }
    );
});

//Home rout
app.get('/', function(req, res) {
    res.render('list', {});
});

//Server
app.listen(PORT, function(res, req) {
    console.log('Server running on port ' + PORT);
});

