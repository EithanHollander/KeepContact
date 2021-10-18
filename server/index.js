const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;
mongoose.connect("mongodb://localhost:27017/sit-db", {useUnifiedTopology: true});

const PhoneSchema = new mongoose.Schema({
  shortFormat: String,
  fullFormat: String
});

const RecurrenceSchema = new mongoose.Schema({
  amount: Number,
  jump: String
});

const ConnectionSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: {
    type: PhoneSchema,
    required: true
  },
  lastCommunicated: Date,
  nextComm: Date,
  recurrence: {
    type: RecurrenceSchema,
    required: true
  }
});

const Connection = new mongoose.model("Connection", ConnectionSchema);

const app = express();
app.use(bodyParser.json());

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

app.get("/connections", async (req, res) => {

  let connections = await Connection.find().exec();
  connections.sort((x,y) => {
    var xDate = new Date(x.nextComm);
    var yDate = new Date(y.nextComm);
    return xDate - yDate;
  });
  res.send(connections);
});

app.post("/connections", async (req, res) => {

  const newConnection = req.body;
  const currentDate = new Date();
  const nextComm = calcNextComm(currentDate, newConnection.recurrence);

  const connectionToInsert = new Connection({
    ...newConnection,
    lastCommunicated: currentDate,
    nextComm: nextComm
  });

  await connectionToInsert.save();
  res.send();
});

app.patch("/connections/:id", async (req, res) => {
  const id = req.params.id;
  const shouldUpdateComm = (req.query.comm === 'true');
  let connectionToUpdate = await Connection.findById(id).exec();

  if (shouldUpdateComm) {
    const lastComm = new Date();
    const nextComm = calcNextComm(lastComm, connectionToUpdate.recurrence);

    connectionToUpdate.lastCommunicated = lastComm;
    connectionToUpdate.nextComm = nextComm;
    await connectionToUpdate.save();

  } else {
    const detail = req.body;
    await Connection.findOneAndUpdate({_id: id}, detail);
  }
  res.send();
});

app.use(cors({
    origin: '*',
    methods: ['GET','POST','PATCH']
}));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
