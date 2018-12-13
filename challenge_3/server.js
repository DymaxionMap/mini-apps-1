const express = require('express');
const bodyParser = require('body-parser');
const Checkout = require('./db');

const PORT = 3000;
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/form', (req, res) => {
  const formData = req.body;
  console.log('formData:', formData);
  Checkout.create(formData, (err) => {
    if (err) {
      throw err;
    }

    // Find and log data for testing purposes
    Checkout.find({ name: formData.name }, (err, items) => {
      if (err) {
        throw err;
      }

      items.forEach(item => console.log(item.email));
      res.sendStatus(200);
    });
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
