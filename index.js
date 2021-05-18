const express = require('express');
const app = express();
const port = 3000;
const slug = require('slug');
const dotenv = require('dotenv').config();
const { MongoClient } = require('mongodb');

console.log(process.env.TESTVAR);

let db = null;
async function connectDB() {
  const url = process.env.DB_URL;
  const options = { useUnifiedTopology: true };
  const client = new MongoClient(url, options)
  await client.connect();
  db = await client.db(process.env.DB_NAME) 
}

connectDB()
  .then(() => {
    console.log('connected to Mongo!')
  })
  .catch( error => {
    console.log(error)
  })

app.use(express.static('public'))
app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const query = {};
  const options = {sort: {age: +1}};
  const users = await db.collection('users').find(query, options).toArray();
  res.render('home', {title:"NetMatch", users})
})

app.get('/matches', (req, res) => {
  res.send('<h1>This will be a list of the people you matched with!</h1>')
})

app.get('/series', (req, res) => {
  res.render('movielist', {title: "All movies", movies})
})

// app.get('/series/:movieId/:slug', (req, res) => {
//   const movie = movies.find(movie => movie.id == req.params.movieId); 
//   res.render('moviedetails', {title: `Movie details for ${movie.name}`, movie})
// })

// app.get('/serie/add', (req, res) => {
//   res.render('addmovie', {title: "Add movie", categories})
// })

// app.post('/serie/add', (req, res) => {
//   let movie = {slug: slug(req.body.name), id: 32423, name: req.body.name, year: req.body.year, categories: req.body.categories, storyline: req.body.storyline};
//   movies.push(movie);
//   res.render('movielist', {title: "Film is succesvol toegevoegd!", movies})
// })

app.use(function (req, res, next) {
  
  res.status(404).send('404: Page not found')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})