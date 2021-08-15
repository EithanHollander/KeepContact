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
  const db = client.db('sit-db');
  console.log('Connected to SIT Database!');

  // Get All Connections
  app.get("/connections", (req, res) => {
    db.collection('connections').find().toArray().then(result => {
      result.sort((firstConnection, secondConnection) => {
        var firstConnectionDate = new Date(firstConnection.nextComm);
        var secondConnectionDate = new Date(secondConnection.nextComm);
        return firstConnectionDate - secondConnectionDate;
      });
      console.log("GET: /connections");
      console.log(result);

      res.send(result);
    });
  });

  // Add a new Connection
  app.post("/connections", (req, res) => {
    console.log("POST: /connections");
    const newConnection = req.body;
    console.log(newConnection);

    const lastComm = new Date(newConnection.lastCommunicated);
    const nextComm = calcNextComm(lastComm, newConnection.recurrence);

    connectionToInsert = {
      ...newConnection,
      nextComm: nextComm.toJSON()
    }

    db.collection('connections').insertOne(connectionToInsert).then(() => {
      res.send("Successfull POST to connections");
    });
  });

  // Update last & next Comm of a Connection
  app.put("/connections/comm", (req, res) => {
    console.log("PUT: /connections/comm");
    console.log(req.body);

    const {id, date} = req.body;
    const query = { _id: new ObjectId(id) };
    db.collection('connections').findOne(query).then((result) => {
      const newLastComm = new Date(date);
      const nextComm = calcNextComm(newLastComm, result.recurrence);

      const newValue = { $set: {lastCommunicated: date, nextComm: nextComm.toJSON()} };
      console.log(newValue);
      db.collection('connections').updateOne(query, newValue).then(() => {
        res.send("Successfull PUT to connections/comm");
      });
    })
  })

  app.put("/connections/detail", (req ,res) => {
    console.log("PUT: /connections/detail");
    console.log(req.body);

    const {id, detail} = req.body;
    const query = { _id: new ObjectId(id) };
    const newValue = { $set: detail};
    db.collection('connections').updateOne(query, newValue).then(() => {
      res.send("Successfully PUT to connections/detail")
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
