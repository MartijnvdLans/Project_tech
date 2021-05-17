const express = require('express');
const app = express();
const port = 3000;


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

app.use(function (req, res, next) {
  res.status(404).send('404: Page not found')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})