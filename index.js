const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('home', {title:"This is the homepage"});
})

app.get('/matches', (req, res) => {
  res.send('<h1>This will be a list of the people you matched with!</h1>')
})

app.get('/genres', (req, res) => {
  res.send(`<h1>This will be a list of genres that will help you find a match!</h1>`)
})

app.get('/movies-series', (req, res) => {
  res.send(`<h1>This is a list of movies and series you can add to your list! test</h1>`)
})

app.use(function (req, res, next) {
  res.status(404).send('404: Page not found')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})