const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const slug = require('slug');
const dotenv = require('dotenv').config();
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const path = require("path");
const currentUserId = "60af7f7f4bb8382860d3e978";

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
  const shows = await db.collection('Shows').findOne(query);
  res.render('home', {title:"NetMatch", shows})
})

app.post('/like', async (req, res) => {
  const query = {}
  const shows = await db.collection('Shows').findOne(query);
  const update = {
    "$push": {
      "liked": (req.body.id)
    }
  };
  // Return the updated document instead of the original document
  const options = { returnNewDocument: true };
  return db.collection('profile').findOneAndUpdate(query, update, options)
    .then(updatedDocument => {
      if(updatedDocument) {
        console.log(`Successfully updated document: ${updatedDocument}.`)
      } else {
        console.log("No document matches the provided query.")
      }
      setTimeout(animation, 1000);
      function animation() {
        res.render('home', {title: "Netmatch", shows})
      }
    })
    
  
  // like opslaan
  // laat het volgende profiel zien
})

app.post('/dislike', async (req, res) => {
  const query = {}
  const shows = await db.collection('Shows').findOne(query);
  const update = {
    "$push": {
      "disliked": (req.body.id)
    }
  };
  // Return the updated document instead of the original document
  const options = { returnNewDocument: true };
  return db.collection('profile').findOneAndUpdate(query, update, options)
    .then(updatedDocument => {
      if(updatedDocument) {
        console.log(`Successfully updated document: ${updatedDocument}.`)
      } else {
        console.log("No document matches the provided query.")
      }
      setTimeout(animation, 1000);
      function animation() {
        res.render('home', {title: "Netmatch", shows})
      }
    })
})

app.get('/matches', async (req, res) => {
  const query = {}
  const shows = await db.collection('Shows').find(query).toArray();
    // const queryId = {_id: ObjectId(currentUserId)};
    // let currentUser = await db.collection('profile').findOne(queryId);
    // const queryMovie = {_id: {$in:currentUser.liked}}
    // let myLikes = await db.collection('Shows').find(queryMovie).toArray();
    // console.log(queryMovie)
    res.render('matches', {title:"NetMatch: Matches", shows})
})

app.use(function (req, res, next) {
  
  res.status(404).send('404: Page not found')
})

app.listen(port, () => {});