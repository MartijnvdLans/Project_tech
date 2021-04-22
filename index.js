const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/movies', (req, res) => {
  res.send('<h1>This will be a list of movies!</h1>')
})

app.get('/movies/:movieId/:slug', (req, res) => {
  res.send(`<h1>This is the detail page of ${req.params.slug}!</h1>`)
})

app.use(function (req, res, next) {
  res.status(404).send('404: Pagina niet gevonden')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})