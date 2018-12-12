// npm imports
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
// app imports
const jsonToCsv = require(path.join(__dirname, 'jsonToCsv'));
const renderCsvReport = require(path.join(__dirname, 'view'));

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
  res.sendfile(path.join(__dirname, 'client', 'index.html'));
});

app.get('/report', (req, res) => {
  res.redirect('/');
});

app.post('/report', upload.single('reportFile'), (req, res) => {
  console.log('req.file:', req.file);
  console.log('req.body:', req.body);
  // console.log(typeof req.body.reportFile);
  // console.log(req.body.reportFile);
  // const report = req.body.reportText;
  // const [headers, rows] = jsonToCsv(report);
  // res.send(renderCsvReport(headers, rows));
  res.redirect('/');
})

app.listen(port, () => console.log(`App listening on port ${port}!`));

