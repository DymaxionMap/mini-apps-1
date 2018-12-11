// node imports
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// app imports
const jsonToCsv = require(path.join(__dirname, 'jsonToCsv'));


const app = express();
const port = 3000;

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
  res.sendfile(path.join(__dirname, 'client', 'index.html'));
});

app.get('/report', (req, res) => {
  res.redirect('/');
});

app.post('/report', (req, res) => {
  const report = req.body.reportText;
  const csv = jsonToCsv(report);
  console.log(csv);
  res.redirect('/');
})

app.listen(port, () => console.log(`App listening on port ${port}!`));

