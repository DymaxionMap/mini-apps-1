// npm imports
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: path.join('client', 'uploads') });

// app imports
const jsonToCsv = require(path.join(__dirname, 'jsonToCsv'));
const csvToText = require(path.join(__dirname, 'csvToText'));

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.get(`/client/uploads/:filename`, (req, res) => {
  const readFilePath = path.join(__dirname, 'client', 'uploads', req.params.filename);
  fs.readFile(readFilePath, 'utf8', (err, report) => {
    if (err) {
      throw err;
    }

    const [headers, rows] = jsonToCsv(report);
    const csvText = csvToText(headers, rows);
    const writeFilePath = path.join(__dirname, 'client', 'downloads', req.params.filename);
    fs.writeFile(writeFilePath, csvText, (err) => {
      if (err) {
        throw err;
      }

      res.sendFile(writeFilePath);
    });
  });
})

app.get('/report', (req, res) => {
  res.redirect('/');
});

app.post('/report', upload.single('reportFile'), (req, res) => {
  const filePath = req.file.path;
  fs.readFile(filePath, 'utf8', (err, report) => {
    if (err) {
      throw err;
    }

    const [headers, rows] = jsonToCsv(report);
    res.send({ headers, rows, filePath});
  });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

