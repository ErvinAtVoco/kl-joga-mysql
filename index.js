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
    layoutsDir:__dirname+'/view/layouts/'
}))

app.use(express.static('public'));

const bodyParser = require('body-parser');
const mysql = require("mysql");
app.use(bodyParser.urlencoded({extended: true}));

//connect to database
const db = mysql.createConnection({
    host:"localhost",
    user:"joogaa",
    password:"JoogaaParool123",
    database:"joga_mysql"
});

db.connect(function(err){
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
    let query = 'SELECT * FROM article WHERE slug="${req.params.slug}"'
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

app.listen(3000,() => {
    console.log('app is started at localhost')
});


