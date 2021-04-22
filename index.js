const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/series', (req, res) => {
  res.send('Lijst met series')
})

app.get('/movies', (req, res) => {
  res.send('<h1>This will be a list of movies!</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})