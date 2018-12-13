// Util Functions
const postFormData = (data, nextView, view) => {
  fetch('/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data),
    })
    .then(() => nextView(view))
};

// Components
const Nav = () => (
  <h1>Multistep Checkout Experience</h1>
);

const Checkout = (props) => (
  <button onClick={props.checkoutClick}>Checkout</button>
);

const FieldFactory = ({name, label, changeFactory}) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input type='text' name={name} onChange={changeFactory(name)}/>
  </div>
);

class Form1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };

    this.click = this.click.bind(this);
  }

  onChangeFactory(field) {
    return (event) => {
      this.setState({ [field]: event.target.value });
    };
  }

  click() {
    console.log('form1 was clicked');
    console.log('Sending JSON:', JSON.stringify(this.state));
    postFormData(this.state, this.props.nextView, 'form2');
  }

  render() {
    const fields = [
      {
        name: 'name',
        label: 'Name',
        changeFactory: this.onChangeFactory.bind(this),
      },
      {
        name: 'email',
        label: 'Email',
        changeFactory: this.onChangeFactory.bind(this),
      },
      {
        name: 'password',
        label: 'Password',
        changeFactory: this.onChangeFactory.bind(this),
      },
    ];
    const fieldComponents = fields.map(field => <FieldFactory {...field} />);
    return (
      <form>
        {fieldComponents}
        <button type='button' onClick={this.click}>Next</button>
      </form>
    );
  }
}

class Form2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addrLine1: '',
      addrLine2: '',
      city: '',
      state: '',
      zipcode: '',
      phone: '',
    };

    this.click = this.click.bind(this);
  }

  onChangeFactory(field) {
    return (event) => {
      this.setState({ [field]: event.target.value });
    };
  }

  click() {
    console.log('form2 was clicked');
    console.log('Sending JSON:', JSON.stringify(this.state));
    postFormData(this.state, this.props.nextView, 'form3');
  }

  render() {
    const fields = [
      {
        name: 'addrLine1',
        label: 'Address Line 1',
        changeFactory: this.onChangeFactory.bind(this),
      },
      {
        name: 'addrLine2',
        label: 'Address Line 2',
        changeFactory: this.onChangeFactory.bind(this),
      },
      {
        name: 'city',
        label: 'City',
        changeFactory: this.onChangeFactory.bind(this),
      },
      {
        name: 'state',
        label: 'State',
        changeFactory: this.onChangeFactory.bind(this),
      },
      {
        name: 'zipcode',
        label: 'Zip Code',
        changeFactory: this.onChangeFactory.bind(this),
      },
      {
        name: 'phone',
        label: 'Phone Number',
        changeFactory: this.onChangeFactory.bind(this),
      },
    ];
    const fieldComponents = fields.map(field => <FieldFactory {...field} />);
    return (
      <form>
        {fieldComponents}
        <button type='button' onClick={this.click}>Next</button>
      </form>
    );
  }
}

// const Form2 = (props) => (
//   <form>
//     <label htmlFor='addrLine1'>Address Line 1</label>
//     <input type='text' name='addrLine1'/>
//     <label htmlFor='addrLine2'>AddressLine2</label>
//     <input type='text' name='addrLine2'/>
//     <label htmlFor='city'>City</label>
//     <input type='text' name='city'/>
//     <label htmlFor='state'>State</label>
//     <input type='text' name='state'/>
//     <label htmlFor='zipcode'>Zip Code</label>
//     <input type='text' name='zipcode'/>
//     <label htmlFor='phone'>Phone Number</label>
//     <input type='text' name='phone'/>
//     <button onClick={props.form2Click}>Next</button>
//   </form>
// );

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
      currentView: 'form1',
    }

    this.checkoutClick = this.checkoutClick.bind(this);
    this.form2Click = this.form2Click.bind(this);
    this.form3Click = this.form3Click.bind(this);
    this.confirmationClick = this.confirmationClick.bind(this);
    this.nextView = this.nextView.bind(this);
  }

  nextView(view) {
    this.setState({ currentView: view });
  }

  checkoutClick(event) {
    event.preventDefault();
    console.log('checkout was clicked');
    this.setState({ currentView: 'form1' });
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
    const form1 = <Form1 nextView={this.nextView}/>;
    const form2 = <Form2 nextView={this.nextView}/>;
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
