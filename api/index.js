const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const Participant = require('./Models/Participant')
const MilkDelivery = require('./Models/MilkDelivery')
const Cheese = require('./Models/Cheese')
const CheeseTraceability = require('./Models/CheeseTraceability')
const Certificate = require('./Models/Certificate')
const CertificateTraceability = require('./Models/CertificateTraceability')

app.use(bodyParser())
app.use(cors())
app.use(function (err, req, res, next) {
  res.status(err.status).send(err.message);
});

// PARTICIPANTS
app.get('/participants/:participantId', function (req, res) {
  res.send(Participant.Participant())
})

// MILK DELIVERIES
app.get('/milk-deliveries', async function (req, res, next) {
  let mds = await MilkDelivery.getMilkDeliveries(req.header('X-Participant'))
  if (mds.error) {
    next({status: 500, message: mds.error})
  } else {
    res.send(mds)
  }
})

app.post('/milk-deliveries', async function (req, res, next) {
  let result = await MilkDelivery.MilkDelivery(req.header('X-Participant'), req.body.quantity, req.body.price, req.body.dairy)
  if (result.error) {
    next({status: 500, message: result.error})
  } else {
    res.send(result)
  }
})

app.post('/milk-deliveries/:milkDeliveryID/approval', async function (req, res) {
  let result = await MilkDelivery.validateMilkDelivery(req.header('X-Participant'), req.params.milkDeliveryID)
  if (result.error) {
    next({status: 500, message: result.error})
  } else {
    res.send(result)
  }
})

// CHEESE
app.post('/cheeses', function (req, res) {
  res.send(Cheese.Cheese(req.body.deliveries))
})

app.get('/cheeses/:cheedeId', function (req, res) {
  res.send(Cheese.getCheese(req.params.cheedeId))
})

app.get('/cheeses', function (req, res) {
  res.send(Cheese.getCheeses())
})

/*
app.get('/cheeses', async function (req, res) {
  let cheeses = await Cheese.getCheeses(req.header('X-Participant'))
  res.send(cheeses)
})
*/

// CHEESES TRACEABILITY
app.get('/cheeses/traceability/:cheedeId', function (req, res) {
  res.send(CheeseTraceability.CheeseTraceability())
})

// CERTIFICATES
app.get('/certificates/:cheedeId', function (req, res) {
  res.send(Certificate.Certificate())
})

app.get('/certificates/traceability/:certificateId', function (req, res) {
  res.send(CertificateTraceability.CertificateTraceability())
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
