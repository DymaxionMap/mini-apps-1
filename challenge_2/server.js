// npm imports
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// app imports
const jsonToCsv = require(path.join(__dirname, 'jsonToCsv'));

// File upload setup
const UPLOAD_DIR = 'uploads';
const upload = multer({ dest: path.join('client', UPLOAD_DIR) });

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
  res.sendfile(path.join(__dirname, 'client', 'index.html'));
});

app.get(`/client/${UPLOAD_DIR}/:filename`, (req, res) => {
  console.log(req.params.filename);
  res.redirect('/');
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

