const express = require('express');
const bodyParser = require('body-parser');
const Checkout = require('./db');

const PORT = 3000;
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/checkout', (req, res) => {
  Checkout.create({}, (err, checkoutItem) => {
    if (err) {
      throw err;
    }

    console.log('Created checkoutItem with id:', checkoutItem._id);

    res.json({ id: checkoutItem._id });
  })
});

app.post('/form', (req, res) => {
  const { databaseId, ...formData } = req.body;
  console.log('id:', databaseId);
  console.log('formData:', formData);

  Checkout.updateOne({ _id: databaseId }, formData, (err) => {
    if (err) {
      throw err;
    }

    res.sendStatus(200);
  });
});

app.get('/confirmation', (req, res) => {
  const databaseId = req.query.databaseId;
  console.log('conf id:', databaseId);
  Checkout.findOne({ _id: databaseId }, (err, checkoutItem) => {
    if (err) {
      throw err;
    }

    console.log('checkoutItem:', checkoutItem);
    res.json(checkoutItem);
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
