var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator')
var mongojs = require('mongojs')
var db = mongojs('blogposts', ['posts']);
var ObjectId = mongojs.ObjectId;
var app = express();

var middlewareOptions = {

};

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



//Set static path
app.use(express.static(path.join(__dirname, 'public')));

//Gloabal Vars
app.use(function(req, res, next){
    res.locals.errors = null;
    next();
});

//Express validation middleware
app.use(expressValidator(middlewareOptions));

app.get('/', function(req, res){
    db.posts.find(function (err, docs) {
        res.render('index', {
            title: 'Blog Posts',
            posts: docs
        });
    })
});

//View posts page
app.get('/viewPosts', function(req, res){
    db.posts.find(function (err, docs) {
        res.render('viewPosts', {
            title: 'Blog Posts',
            posts: docs
        });
    })
});

//New posts page
app.get('/newPost', function(req, res){
        res.render('newPost', {
            title: 'Blog Posts',
        });
});

//Add post function
app.post('/posts/add', function(req, res){

    req.checkBody('title', 'Title is Required').notEmpty();
    req.checkBody('blogpost', 'Blog Post is Required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('index', {
        title: 'Blog Posts',
        posts: posts,
        errors: errors
        });
    } else{
        var newPost = {
            title: req.body.title,
            blogpost: req.body.blogpost,
        }
            db.posts.insert(newPost, function(err, result){
                if(err){
                    console.log(err);
                }
                res.redirect('/viewPosts');
            });
    }
});

//Delete post function
app.delete('/posts/delete/:id', function(req, res){
    db.posts.remove({"_id":ObjectId(req.params.id)});
    res.redirect('/viewPosts');
 })

//Amend post/title function
 app.put('/posts/update/:id', function(req,res){
     const data = req.body;
     db.posts.update({_id: ObjectId(req.params.id)}, {$set: data},function(err, result){
         if(err){
             console.log(err);
         }
         res.send('updated successfully');
     });
 });

app.listen(3000, function(){
    console.log('Server started on Port 3000...');
})
