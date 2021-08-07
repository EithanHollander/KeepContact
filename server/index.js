const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());

const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/";
MongoClient.connect(uri, {useUnifiedTopology: true})
.then(client => {
  const db = client.db('keep-contact-db');
  console.log('Connected to Keep Contact Database!');

  app.get("/contacts", (req, res) => {
    db.collection('contacts').find().toArray().then(result => {
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
      res.send("Successfully POSTED to contacts");
    });
  });
})
.catch(error => console.error(error))

app.use(cors({
    origin: '*',
    methods: ['GET','POST']
}));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
