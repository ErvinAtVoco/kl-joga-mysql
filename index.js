//application packages
const express = require('express');
const app = express();
const path = require('path');
//add template engine
const hbs = require('express-handlebars');
//setup template engine directory and files extensions
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname:'hbs',
    defaultLayout:'main',
    layoutsDir:__dirname+'/views/layouts'
}))

app.use(express.static('public'));

const bodyParser = require('body-parser');
const mysql = require("mysql");
app.use(bodyParser.urlencoded({extended: true}));

//connect to database
const con = mysql.createConnection({
    host:"localhost",
    user:"joogaa",
    password:"JoogaaParool123",
    database:"joga_mysql"
});

con.connect(function(err){
    if(err) throw err;
    console.log('connected to joga_mysql db');
});

//Show all articles
app.get('/', (req, res) => {
    let query = "SELECT * FROM article";
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        console.log(articles)
        res.render('index', {
            articles: articles
        })
    })
})

//show articles by this slug
app.get('/article/:slug', (req, res) => {
    let query = `SELECT article.name as title, article.slug, article.image, article.body, article.published, author.name AS name FROM article LEFT JOIN author ON article.author_id = author.id WHERE article.slug = "${req.params.slug}"`
    let article
    con.query(query, (err, result) => {
        if (err) throw err;
        article = result
        console.log(article);
        res.render('article', {
            article: article
        })
    })
})

app.get('/:author', (req, res) => {
    let query = `SELECT article.name as title, article.image, article.slug, author.name as name FROM article INNER JOIN author ON article.author_id=author.id WHERE article.author_id = (SELECT id FROM author WHERE name = "${req.params.author}")`
    let authors = []
    con.query(query, (err, result) => {
        authors = result
        let authorName = result[0].name
        console.log (authors);
        console.log (authorName);
        res.render('author', {
            authors: authors,
            authorName: authorName
        })
    })
})


app.listen(3000,() => {
    console.log('app is started at localhost')
});


