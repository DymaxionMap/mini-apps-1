const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  console.log('Got a get request!');
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
