const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/form1', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
