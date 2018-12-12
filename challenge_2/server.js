// npm imports
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
// app imports
const jsonToCsv = require(path.join(__dirname, 'jsonToCsv'));
const renderCsvReport = require(path.join(__dirname, 'view'));

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
  res.sendfile(path.join(__dirname, 'client', 'index.html'));
});

app.get('/report', (req, res) => {
  res.redirect('/');
});

app.post('/report', upload.single('reportFile'), (req, res) => {
  fs.readFile(req.file.path, 'utf8', (err, report) => {
    if (err) {
      throw err;
    }

    const [headers, rows] = jsonToCsv(report);
    res.send({ headers, rows });
  });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

