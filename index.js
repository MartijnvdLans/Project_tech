const express = require('express');
const app = express();
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
app.listen(3000 || process.env.PORT, () => {});


app.get('/', async (req, res) => {
  const query = {};
  const options = {sort: {age: +1}};
  const users = await db.collection('users').find(query, options).toArray();
  res.render('home', {title:"NetMatch", users})
})

app.get('/matches', async (req, res) => {
  const query = {};
  const options = {sort: {age: +1}};
  const matches = await db.collection('Matches').find(query, options).toArray();
  res.render('matches', {title:"NetMatch: Matches", matches})
})

app.use(function (req, res, next) {
  
  res.status(404).send('404: Page not found')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})