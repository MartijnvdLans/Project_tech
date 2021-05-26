const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const slug = require('slug');
const dotenv = require('dotenv').config();
const { MongoClient } = require('mongodb');
const path = require("path");

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

  app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', async (req, res) => {
  const query = {};
  const options = {sort: {age: +1}};
  const users = await db.collection('users').find(query, options).toArray();
  res.render('home', {title:"NetMatch", users})
})

app.post('/liked/*', async (req, res) => {
  console.log(req.body.id)
  const query = {};
  const options = {sort: {age: +1}};
  const users = await db.collection('users').find(query, options).toArray();
  res.render('home', {title:"NetMatch", users})
  // Stap 1: in database opslaan dat de huidige gebruiker iemand anders liked
  // Stap 2: Id like opslaan
  // Stap 3: Controleren of de gebruiker mij ook liked
  // Stap x: Pagina renderen afhankelijk van op de nieuwe gebruiker geliked wordt of animatie
})

app.post('/disliked/*', async (req, res) => {
  console.log(req.body.id)
  const query = {};
  const options = {sort: {age: +1}};
  const users = await db.collection('users').find(query, options).toArray();
  res.render('home', {title:"NetMatch", users})
  // Stap 1: in database opslaan dat de huidige gebruiker iemand anders liked
  // Stap 2: Id like opslaan
  // Stap 3: Controleren of de gebruiker mij ook liked
  // Stap x: Pagina renderen afhankelijk van op de nieuwe gebruiker geliked wordt of animatie
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

app.listen(port, () => {});