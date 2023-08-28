import React, { Component } from 'react';
import Validator from './utils/validator';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: '',
      subject: '',
      message: '',
      errors: {},
    };
    const requiredWith = (value, field, state) => (!state[field] && !value) || !!value;
    const rules = [
      {
        field: 'name',
        method: 'isEmpty',
        validWhen: false,
        message: 'The name field is required.',
      },
      {
        field: 'name',
        method: 'isLength',
        args: [{min: 5}],
        validWhen: true,
        message: 'The name must be at least 5 characters.',
      },
      {
        field: 'email',
        method: 'isEmpty',
        validWhen: false,
        message: 'The email field is required.',
      },
      {
        field: 'email',
        method: 'isEmail',
        validWhen: true,
        message: 'The email must be a valid email address.',
      },
      {
        field: 'address',
        method: 'isEmpty',
        validWhen: false,
        message: 'The address field is required.',
      },
      {
        field: 'message',
        method: requiredWith,
        args: ['subject'],
        validWhen: true,
        message: 'The message field is required when subject is present.',
      },
    ];
    this.validator = new Validator(rules);
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    this.setState({
      errors: this.validator.validate(this.state),
    });
    console.log(this.state);
  };

  render() {
    const {errors} = this.state;
    return (
      <div className="App">
        <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />
        <h1>Elegant Contact Form.</h1>
        <form>
          <h1>Should you have any questions, please do not hesitate to contact me :</h1>
          <div className="contentform">
            <div id="sendmessage"> Your message has been sent successfully. Thank you. </div>
            <div className="leftcontact">
              <div className="form-group">
                <p>Name <span>*</span></p>
                <span className="icon-case"><i className="fa fa-user"></i></span>
                <input type="text" name="name" value={this.state.name} onChange={this.handleInput}/>
                {errors.name && <div className="validation" style={{display: 'block'}}>{errors.name}</div>}
              </div>
              <div className="form-group">
                <p>E-mail <span>*</span></p>
                <span className="icon-case"><i className="fa fa-envelope-o"></i></span>
                <input type="email" name="email" value={this.state.email} onChange={this.handleInput}/>
                {errors.email && <div className="validation" style={{display: 'block'}}>{errors.email}</div>}
              </div>
              <div className="form-group">
                <p>Address <span>*</span></p>
                <span className="icon-case"><i className="fa fa-location-arrow"></i></span>
                <input type="text" name="address" value={this.state.address} onChange={this.handleInput}/>
                {errors.address && <div className="validation" style={{display: 'block'}}>{errors.address}</div>}
              </div>
            </div>

            <div className="rightcontact">
              <div className="form-group">
                <p>Subject</p>
                <span className="icon-case"><i className="fa fa-comment-o"></i></span>
                <input type="text" name="subject" value={this.state.subject} onChange={this.handleInput}/>
                {errors.subject && <div className="validation" style={{display: 'block'}}>{errors.subject}</div>}
              </div>
              <div className="form-group">
                <p>Message</p>
                <span className="icon-case"><i className="fa fa-comments-o"></i></span>
                <textarea name="message" value={this.state.message} onChange={this.handleInput}/>
                {errors.message && <div className="validation" style={{display: 'block'}}>{errors.message}</div>}
              </div>
            </div>
          </div>
          <button type="button" className="bouton-contact" onClick={this.handleSubmit}>Send</button>
        </form>
      </div>
    );
  }
}

export default App;
