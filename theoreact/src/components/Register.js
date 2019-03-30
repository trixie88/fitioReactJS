import React, { Component } from "react";

// TODO: Password repeat validation, check if email AND username already exists
class Register extends Component {
  constructor(props) {
    super(props);
    this.email = React.createRef();
    this.username = React.createRef();
    this.password = React.createRef();
    this.firstName = React.createRef();
    this.lastName = React.createRef();
    this.role = 1;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const uname = this.username.current.value;
    const pass = this.password.current.value;
    const em = this.email.current.value;
    const fname = this.firstName.current.value;
    const lname = this.lastName.current.value;
    // const ph = this.phone.current.value;

    console.log("Submitting...", uname, pass, em, fname, lname);

    const url = "http://localhost:8080/register/save";
    let formData = {
      username: uname,
      password: pass,
      email: em,
      firstName: fname,
      lastName: lname,
      role: {
        id: 1
      }
    };

    fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(formData), // data can be `string` or {object}!
      headers: { "Content-Type": "application/json" }
    })
      .then(() => {
        console.log("Success redirecting");
        this.props.history.push("/login");
      })
      .catch(error => console.error("Error:", error));

    // window.$.ajax({
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     url: 'http://localhost:8080/register/save',
    //     dataType: 'json',
    //     type: 'POST',
    //     data: {
    //         username: uname,
    //         password: pass,
    //         email: em,
    //         firstName: fname,
    //         lastName: lname,
    //         role: 1
    //     }
    // }).then(data => {
    //     console.log('Data returned');
    //     console.log(JSON.stringify(data));
    //     // localStorage.setItem('token', json.token);
    // }).fail(function(xhr) {
    //     //Ajax request failed.
    //     var errorMessage = xhr.status + ': ' + xhr.statusText;
    //     alert('Error - ' + errorMessage);
    // });

    event.preventDefault();
  }

  render() {
    // const {rolename} = this.props.match.params;

    return (
      <div className="container col-8">
        <div className="text-center">
          <h1 className="mx-auto">
            Register as {this.props.match.params.rolename}
          </h1>
        </div>
        <form onSubmit={this.handleSubmit} className="pt-3 pb-2">
          {/* onInput='p2.setCustomValidity(p2.value != password.value ? "Passwords do not match" : "")' */}
          <div className="form-group row justify-content-center">
            <label htmlFor="email" className="col-sm-3 col-form-label">
              Email
            </label>
            <div className="col-sm-4">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="email@mail.com"
                required
                ref={this.email}
              />
            </div>
          </div>
          <div className="form-group row justify-content-center">
            <label htmlFor="email" className="col-sm-3 col-form-label">
              Username
            </label>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                required
                ref={this.username}
              />
            </div>
          </div>
          <div className="form-group row justify-content-center">
            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">
              Password
            </label>
            <div className="col-sm-4 ">
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                name="password"
                minLength="8"
                aria-describedby="passwordHelpBlock"
                required
                ref={this.password}
              />
              <small id="passwordHelpBlock" className="form-text text-muted">
                At least 8 characters long
              </small>
            </div>
          </div>
          <div className="form-group row justify-content-center">
            <label htmlFor="repeatPassword" className="col-sm-3 col-form-label">
              Repeat Password
            </label>
            <div className="col-sm-4">
              <input
                type="password"
                className="form-control"
                id="repeatPassword"
                name="p2"
                aria-describedby="password2HelpBlock"
                required
              />
              <small id="password2HelpBlock" className="form-text text-muted">
                Passwords must match
              </small>
            </div>
          </div>
          <div className="form-group row justify-content-center">
            <label htmlFor="firstName" className="col-sm-3 col-form-label">
              First Name
            </label>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                required
                ref={this.firstName}
              />
            </div>
          </div>
          <div className="form-group row justify-content-center">
            <label htmlFor="lastName" className="col-sm-3 col-form-label">
              Last Name
            </label>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                required
                ref={this.lastName}
              />
            </div>
          </div>
          {/* <div className="form-group row justify-content-center">
                        <label htmlFor="phone" className="col-sm-3 col-form-label">Phone</label>
                        <div className="col-sm-4">
                            <input type="tel" className="form-control" pattern="69{1}[0-9]{8}" id="phone" name="phone"
                                aria-describedby="phoneHelpBlock" required ref={this.phone} />
                            <small id="phoneHelpBlock" className="form-text text-muted">
                                10 digits - Format 69XXXXXXXX
                            </small>
                        </div>
                    </div> */}
          <div className="form-group row justify-content-center">
            <div className="col-sm-3">
              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
