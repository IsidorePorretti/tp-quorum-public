const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const Participant = require("./Models/Participant");
const MilkDelivery = require("./Models/MilkDelivery");
const Cheese = require("./Models/Cheese");
const CheeseTraceability = require("./Models/CheeseTraceability");
const Certificate = require("./Models/Certificate");
const CertificateTraceability = require("./Models/CertificateTraceability");

app.use(bodyParser());
app.use(cors());

//PARTICIPANTS
app.get('/participants/:participantId', function (req, res) {
  res.send(Participant.Participant())
});


//MILK DELIVERIES
app.post('/milk-deliveries', function (req, res) {
  res.send(MilkDelivery.MilkDelivery(req.body.id, req.body.quantity, req.body.price))
});

app.get('/milk-deliveries/:milkDeliveryId', function (req, res) {
  res.send(MilkDelivery.getMilkDelivery(req.params.milkDeliveryId))
});

app.get('/milk-deliveries', function (req, res) {
  res.send(MilkDelivery.getMilkDeliveries())
});

//CHEESE
app.post('/cheeses', function (req, res) {
  res.send(Cheese.Cheese(req.body.id, req.body.milk))
});

app.get('/cheeses/:cheedeId', function (req, res) {
  res.send(Cheese.getCheese(req.params.cheedeId))
});

app.get('/cheeses', function (req, res) {
  res.send(Cheese.getCheeses())
});

//CHEESES TRACEABILITY
app.get('/cheeses/traceability/:cheedeId', function (req, res) {
  res.send(CheeseTraceability.CheeseTraceability())
});


//CERTIFICATES
app.get('/certificates/:cheedeId', function (req, res) {
  res.send(Certificate.Certificate())
});

app.get('/certificates/traceability/:certificateId', function (req, res) {
  res.send(CertificateTraceability.CertificateTraceability())
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
