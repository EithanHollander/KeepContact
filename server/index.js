const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());

const { MongoClient } = require("mongodb");
const { ObjectId } = require('mongodb');

function calcNextComm(lastComm, recurrence) {
  // lastComm: Date
  // recurrence: {amount, jump}
  const amount = parseInt(recurrence.amount);

  var nextComm = new Date(lastComm);
  switch (recurrence.jump) {
    case 'day':
      nextComm.setDate(lastComm.getDate() + amount);
      break;
    case 'week':
      nextComm.setDate(lastComm.getDate() + amount*7);
      break;
    case 'month':
      nextComm.setMonth(lastComm.getMonth() + amount);
      break;
    case 'year':
      nextComm.setFullYear(lastComm.getFullYear() + amount);
      break;
  }
  return nextComm;
}

const uri = "mongodb://localhost:27017/";
MongoClient.connect(uri, {useUnifiedTopology: true})
.then(client => {
  const db = client.db('keep-contact-db');
  console.log('Connected to Keep Contact Database!');

  app.get("/contacts", (req, res) => {
    db.collection('contacts').find().toArray().then(result => {
      result.sort((firstContact, secondContact) => {
        var firstContactDate = new Date(firstContact.nextComm);
        var secondContactDate = new Date(secondContact.nextComm);
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

    const lastComm = new Date(newContact.lastCommunicated);
    const nextComm = calcNextComm(lastComm, newContact.recurrence);

    contactToInsert = {
      ...newContact,
      nextComm: nextComm.toJSON()
    }

    db.collection('contacts').insertOne(contactToInsert).then(() => {
      res.send("Successfull POST to contacts");
    });
  });

  app.put("/comm", (req, res) => {
    console.log("PUT: /comm");
    console.log(req.body);

    const {id, date} = req.body;
    const query = { _id: new ObjectId(id) };
    db.collection('contacts').findOne(query).then((result) => {
      const newLastComm = new Date(date);
      const nextComm = calcNextComm(newLastComm, result.recurrence);

      const newValue = { $set: {lastCommunicated: date, nextComm: nextComm.toJSON()} };
      console.log(newValue);
      db.collection('contacts').updateOne(query, newValue).then(() => {
        res.send("Successfull PUT to comm");
      });
    })

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
