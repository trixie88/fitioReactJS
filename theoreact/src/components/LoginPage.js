import React, { Component } from "react";
import { Consumer } from "../context";

class LoginPage extends Component {
  state = {
    username: "",
    password: ""
  };

  submitForm = (dispatch, e) => {
    e.preventDefault();
    const { username, password } = this.state;

    let loginCredential = {
      username: username,
      password: password
    };

    window.$.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: "http://localhost:8080/login/user",
      data: JSON.stringify(loginCredential),
      dataType: "json",
      async: true,
      success: data => {
        localStorage.setItem("token", data.alphanumeric);
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch({ type: "SET_LOGGED_IN_BOOLEAN", payload: true });
        dispatch({ type: "FILL_LOGGEDINUSER", payload: data.user });
        dispatch({ type: "FILL_TOKEN_IN_STATE", payload: data.alphanumeric });
        this.props.history.push("/myProfile");
      },
      error: function() {
        alert("errorr");
      }
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { username, password } = this.state;
    return (
      <Consumer>
        {value => {
          const { loggedIn, dispatch } = value;
          if (loggedIn) {
            this.props.history.push("/myProfile");
          } else {
            return (
              <div>
                <form onSubmit={this.submitForm.bind(this, dispatch)}>
                  <div className="container">
                    <div className="form-group col-sm-4 mx-auto text-center">
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={username}
                        required
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group col-sm-4 mx-auto text-center">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="container">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block col-sm-4 mx-auto"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default LoginPage;
