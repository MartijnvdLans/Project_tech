const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/movies', (req, res) => {
  res.send('<h1>This will become a list of movies</h1>')
});

app.get('/movies/:movieId/:slug', (req, res) => {
  res.send(`<h1>This will become a detail page for ${req.params.slug}</h1>`)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});