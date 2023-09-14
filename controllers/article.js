//import database connection
const con = require('../utils/db');

//get all articles
const getAllArticles = (req, res) => {
    let query = "SELECT * FROM article;"
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        res.render('index', {
            articles: articles
        })
    })
}

//get articles by slug
const getArticlesBySlug = (req, res) => {
    let query = `SELECT article.name as title, article.slug, article.image, article.body, article.published, author.name AS name FROM article LEFT JOIN author ON article.author_id = author.id WHERE article.slug = "${req.params.slug}"`
    let article
    con.query(query, (err, result) => {
        if (err) throw err;
        article = result
        res.render('article', {
            article: article
        })
    })
}

//get articles by author
const getArticlesByAuthor = (req, res) => {
    let query = `SELECT article.name as title, article.image, article.slug, author.name as name FROM article INNER JOIN author ON article.author_id=author.id WHERE article.author_id = (SELECT id FROM author WHERE name = "${req.params.author}")`
    let authors = []
    con.query(query, (err, result) => {
        authors = result
        let authorName = result[0].name;
        res.render('author', {
            authors: authors,
            authorName: authorName
        })
    })
}

module.exports = {
    getAllArticles,
    getArticlesBySlug,
    getArticlesByAuthor
}