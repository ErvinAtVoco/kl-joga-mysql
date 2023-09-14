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
app.use(bodyParser.urlencoded({extended: true}));

//import article routers
const articleRoutes = require('./routes/article');

//use article routes
app.use('/', articleRoutes);
app.use('/article', articleRoutes);

const con = require('./utils/db');
con.connect(function(err){
    if(err) throw err;
    console.log('connected to joga_mysql db');
});
app.listen(3000,() => {
    console.log('app is started at localhost')
});


