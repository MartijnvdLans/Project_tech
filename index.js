// Hier roep ik alle apps op die ik nodig heb en gebruik voor de app
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const path = require("path");
const currentUserId = '60af7f7f4bb8382860d3e978';

// Hier connect ik met de Database
let db = null;
async function connectDB() {
  const url = process.env.DB_URI;
  const options = { useUnifiedTopology: true };
  const client = new MongoClient(url, options)
  await client.connect();
  db = await client.db(process.env.DB_NAME) 
}

connectDB()
  .then(() => {
    console.log('connected to Mongo!') // Als de database connect laat de console het weten
  })
  .catch( error => {
    console.log(error) // Anders console logt het de error
  })

app.use(express.static(path.join(__dirname, "public"))) // Dit zorgt ervoor dat het path begint bij public
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (req, res) => {
  const query = {beoordeeld: false} // De pagina laat de eerste query zien die NIET beoordeeld is
  const shows = await db.collection('Shows').findOne(query)
  res.render('home', {title:"NetMatch", shows})
})

app.post('/like', async (req, res) => {
  const queryList = { beoordeeld: false }; // Heeft een andere naam om niet met de profile update in conflict te komen
  await db.collection('Shows').updateOne(queryList, {
  $set: {beoordeeld: true}
  });

  const query = {}
  const update = {
    "$push": {
      "liked": (req.body.id),
    }
  }
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
        res.redirect('/') // Redirect omdat ik conflicten kreeg met render
      }
    })
})

app.post('/dislike', async (req, res) => {
  const queryList = { beoordeeld: false }; // Net als bij Like krijgt deze een andere naam om een conflict te voorkomen
  await db.collection('Shows').updateOne(queryList, {
  $set: {beoordeeld: true}
  });

  const query = {}
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
        res.redirect('/') // Redirect omdat ik conflicten kreeg met render
      }
    })
})

app.get('/matches', async (req, res) => {
    const queryId = {_id: ObjectId(currentUserId)}; // Hierdoor zoekt hij het profiel met 'currentUserId' die boven in het document benoemd staat
    let currentUser = await db.collection('profile').findOne(queryId); 
    const queryMovie = {id: {$in:currentUser.liked}} // Zoekt de Array die in liked zit in het profiel dat hierboven is gevonden
    let myLikes = await db.collection('Shows').find(queryMovie).toArray();
    res.render('matches', {title:"NetMatch: Matches", myLikes})
})

app.use(function (req, res, next) {
  res.status(404).send('404: Page not found')
})

app.listen(process.env.PORT || 3000, () => {});