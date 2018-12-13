const express = require('express');
const bodyParser = require('body-parser');
const Checkout = require('./db');

const PORT = 3000;
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

const formData = {};

app.post('/form', (req, res) => {
  Object.assign(formData, req.body);
  console.log('formData:', formData);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
