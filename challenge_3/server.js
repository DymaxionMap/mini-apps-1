const express = require('express');
const bodyParser = require('body-parser');
const Checkout = require('./db');

const PORT = 3000;
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

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
  const {databaseId, ...formData} = req.body;
  console.log('id:', databaseId);
  console.log('formData:', formData);

  Checkout.updateOne({ _id: databaseId }, formData, (err) => {
    if (err) {
      throw err;
    }

    res.sendStatus(200);
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
