const Nav = () => (
  <h1>Multistep Checkout Experience</h1>
);

const Checkout = () => (
  <button>Checkout</button>
);

const Form1 = () => (
  <form>
    <label htmlFor='name'>Name</label>
    <input type='text' name='name'/>
    <label htmlFor='email'>Email</label>
    <input type='text' name='email'/>
    <label htmlFor='password'>Password</label>
    <input type='text' name='password'/>
    <button>Next</button>
  </form>
);

const Form2 = () => (
  <form>
    <label htmlFor='addrLine1'>Address Line 1</label>
    <input type='text' name='addrLine1'/>
    <label htmlFor='addrLine2'>AddressLine2</label>
    <input type='text' name='addrLine2'/>
    <label htmlFor='city'>City</label>
    <input type='text' name='city'/>
    <label htmlFor='state'>State</label>
    <input type='text' name='state'/>
    <label htmlFor='zipcode'>Zip Code</label>
    <input type='text' name='zipcode'/>
    <label htmlFor='phone'>Phone Number</label>
    <input type='text' name='phone'/>
    <button>Next</button>
  </form>
);

const Form3 = () => (
  <form>
    <label htmlFor='creditcard'>Credit Card Number</label>
    <input type='text' name='creditcard'/>
    <label htmlFor='expiry'>Expiry Date</label>
    <input type='text' name='expiry'/>
    <label htmlFor='cvv'>CVV</label>
    <input type='text' name='cvv'/>
    <label htmlFor='billingzip'>Billing Zip Code</label>
    <input type='text' name='billingzip'/>
    <button>Next</button>
  </form>
);

const Confirmation = () => (
  <div>
    <table>
      <tbody>
      </tbody>
    </table>
    <button>Purchase</button>
  </div>
);

const tableRow = (props) => (
  <tr>
    <td></td>
    <td></td>
  </tr>
);

// Temporarily show all the forms for development
const App = () => (
  <div>
    <Nav />
    <Checkout />
    <Form1 />
    <Form2 />
    <Form3 />
    <Confirmation />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

