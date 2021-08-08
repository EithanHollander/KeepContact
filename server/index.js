const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());

const { MongoClient } = require("mongodb");
const { ObjectId } = require('mongodb');

const uri = "mongodb://localhost:27017/";
MongoClient.connect(uri, {useUnifiedTopology: true})
.then(client => {
  const db = client.db('keep-contact-db');
  console.log('Connected to Keep Contact Database!');

  app.get("/contacts", (req, res) => {
    db.collection('contacts').find().toArray().then(result => {
      result.sort((firstContact, secondContact) => {
        var firstContactDate = new Date(firstContact.lastCommunicated);
        var secondContactDate = new Date(secondContact.lastCommunicated);
        return firstContactDate - secondContactDate;
      });
      console.log("GET: /contacts");
      console.log(result);

      res.send(result);
    });
  });

  app.post("/contacts", (req, res) => {
    console.log("POST: /contacts");
    const newContact = req.body;
    console.log(newContact);

    db.collection('contacts').insertOne(newContact).then(() => {
      res.send("Successfull POST to contacts");
    });
  });

  app.put("/comm", (req, res) => {
    console.log("PUT: /comm");
    console.log(req.body);

    const {id, date} = req.body;
    console.log(id);
    const query = { _id: new ObjectId(id) };
    const newValue = { $set: {lastCommunicated: date} };

    db.collection('contacts').updateOne(query, newValue).then(()=> {
      res.send("Successfull PUT to comm");
    });
  })
})
.catch(error => console.error(error))

app.use(cors({
    origin: '*',
    methods: ['GET','POST', 'PUT']
}));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
