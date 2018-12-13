const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/checkout');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('We\'re connected!');
});

const checkoutSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  addrLine1: String,
  addrLine2: String,
  city: String,
  state: String,
  zipcode: String,
  phone: String,
  creditcard: String,
  expiry: String,
  cvv: String,
  billingzip: String,
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;