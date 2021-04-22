const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/movies', (req, res) => {
  res.send('<h1>This will be a list of movies!</h1>')
})

app.get('/movies/:movieId/:slug', (req, res) => {
  res.send(`<h1>This is the detail page of ${req.params.slug}!</h1>`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})