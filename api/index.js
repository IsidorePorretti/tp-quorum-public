const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const Participant = require("./Participant");
const MilkDelivery = require("./MilkDelivery");
const Cheese = require("./Cheese");
const CheeseTraceability = require("./CheeseTraceability");
const Certificate = require("./Certificate");
const CertificateTraceability = require("./CertificateTraceability");

app.use(bodyParser());

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


//CHEESE
app.post('/cheeses', function (req, res) {
  res.send(Cheese.Cheese(req.body.id, req.body.milk))
});

app.get('/cheeses/:cheedeId', function (req, res) {
  res.send(Cheese.getCheese(req.params.cheedeId))
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
