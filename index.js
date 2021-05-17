const express = require('express');
const app = express();
const port = 3000;
const slug = require('slug');
const dotenv = require('dotenv').config();

console.log(process.env.TESTVAR);

const categories = ["action", "adventure", "sci-fi", "animation", "horror", "thriller", "fantasy", "comedy"]

const movies = [{
  "id": 23486,
  "slug": "thor-ragnarok",
  "name": "Thor: Ragnarok",
  "year": 2016,
  "categories": ["action", "adventure", "sci-fi"],
  "storyline": "Info onver de film van Thor die enorm lang kan zijn."
},
{"id": 436,
  "slug": "cars-2",
  "name": "Cars 2",
  "year": 2012,
  "categories": ["action", "adventure", "pratende auto's"],
  "storyline": "Auto gaat racen maar is lastig."
}

];

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home', {title:"This is the homepage"})
})

app.get('/matches', (req, res) => {
  res.send('<h1>This will be a list of the people you matched with!</h1>')
})

app.get('/series', (req, res) => {
  res.render('movielist', {title: "All movies", movies})
})

app.get('/series/:movieId/:slug', (req, res) => {
  const movie = movies.find(movie => movie.id == req.params.movieId); 
  res.render('moviedetails', {title: `Movie details for ${movie.name}`, movie})
})

app.get('/serie/add', (req, res) => {
  res.render('addmovie', {title: "Add movie", categories})
})

app.post('/serie/add', (req, res) => {
  let movie = {slug: slug(req.body.name), id: 32423, name: req.body.name, year: req.body.year, categories: req.body.categories, storyline: req.body.storyline};
  movies.push(movie);
  res.render('movielist', {title: "Film is succesvol toegevoegd!", movies})
})

app.use(function (req, res, next) {
  
  res.status(404).send('404: Page not found')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})