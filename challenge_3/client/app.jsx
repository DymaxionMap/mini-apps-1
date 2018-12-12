const Nav = () => (
  <h1>Multistep Checkout Experience</h1>
);

const Checkout = (props) => (
  <button onClick={props.checkoutClick}>Checkout</button>
);

const Form1 = (props) => (
  <form>
    <label htmlFor='name'>Name</label>
    <input type='text' name='name'/>
    <label htmlFor='email'>Email</label>
    <input type='text' name='email'/>
    <label htmlFor='password'>Password</label>
    <input type='text' name='password'/>
    <button onClick={props.form1Click}>Next</button>
  </form>
);

const Form2 = (props) => (
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
    <button onClick={props.form2Click}>Next</button>
  </form>
);

const Form3 = (props) => (
  <form>
    <label htmlFor='creditcard'>Credit Card Number</label>
    <input type='text' name='creditcard'/>
    <label htmlFor='expiry'>Expiry Date</label>
    <input type='text' name='expiry'/>
    <label htmlFor='cvv'>CVV</label>
    <input type='text' name='cvv'/>
    <label htmlFor='billingzip'>Billing Zip Code</label>
    <input type='text' name='billingzip'/>
    <button onClick={props.form3Click}>Next</button>
  </form>
);

const Confirmation = (props) => (
  <div>
    <table>
      <tbody>
      </tbody>
    </table>
    <button onClick={props.confirmationClick}>Purchase</button>
  </div>
);

const tableRow = (props) => (
  <tr>
    <td></td>
    <td></td>
  </tr>
);

// Temporarily show all the forms for development
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentView: 'checkout',
    }

    this.checkoutClick = this.checkoutClick.bind(this);
    this.form1Click = this.form1Click.bind(this);
    this.form2Click = this.form2Click.bind(this);
    this.form3Click = this.form3Click.bind(this);
    this.confirmationClick = this.confirmationClick.bind(this);
  }

  checkoutClick(event) {
    event.preventDefault();
    console.log('checkout was clicked');
    this.setState({ currentView: 'form1' });
  }

  form1Click(event) {
    event.preventDefault();
    console.log('form1 was clicked');
    this.setState({ currentView: 'form2' });
  }

  form2Click(event) {
    event.preventDefault();
    console.log('form2 was clicked');
    this.setState({ currentView: 'form3' });
  }

  form3Click(event) {
    event.preventDefault();
    console.log('form3 was clicked');
    this.setState({ currentView: 'confirmation' });
  }

  confirmationClick(event) {
    event.preventDefault();
    console.log('confirmation was clicked');
  }

  render() {
    const checkout = <Checkout checkoutClick={this.checkoutClick}/>;
    const form1 = <Form1 form1Click={this.form1Click}/>;
    const form2 = <Form2 form2Click={this.form2Click}/>;
    const form3 = <Form3 form3Click={this.form3Click}/>;
    const confirmation = <Confirmation confirmationClick={this.confirmationClick}/>;
    const views = {
      checkout,
      form1,
      form2,
      form3,
      confirmation,
    };

    return (
      <div>
        <Nav />
        {views[this.state.currentView]}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
