import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Consumer } from "../context";

class Header extends Component {
  constructor(props) {
    super(props);
    this.username = React.createRef();
    this.password = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const loginData = {
      username: this.username.current.value,
      password: this.password.current.value
    };

    window.$.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: "http://localhost:8080/login/user",
      data: JSON.stringify(loginData),
      dataType: "json",
      success: token => {
        console.log(token);
      },
      error: () => {
        console.log("error");
      }
    });
    event.preventDefault();
  }

  logout(dispatch) {
    localStorage.setItem("user", "");
    localStorage.setItem("token", "");
    dispatch({ type: "SET_LOGGED_IN_BOOLEAN", payload: false });
    dispatch({ type: "FILL_LOGGEDINUSER", payload: {} });
    dispatch({ type: "FILL_TOKEN_IN_STATE", payload: "" });
    dispatch({ type: "FILL_INBOX_MESSAGES", payload: [] });
    this.props.history.push("/");
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { loggedIn, dispatch } = value;

          return (
            <React.Fragment>
              <nav className="navbar navbar-expand-sm bg-primary navbar-dark sticky-top py-4">
                <div className="container">
                  <Link className="navbar-brand" to="/">
                    <i className="fas fa-running" /> <strong>fit.io</strong>
                  </Link>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapsibleNavbar"
                  >
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div
                    className="collapse navbar-collapse justify-content-end"
                    id="collapsibleNavbar"
                  >
                    <ul className="navbar-nav">
                      {loggedIn ?
                        (<React.Fragment>
                          <li className="nav-item">
                            <Link to="#" className="nav-link" onClick={this.logout.bind(this, dispatch)} >
                              Logout
                            </Link>
                          </li>
                        </React.Fragment>)
                        : (
                          <React.Fragment>
                            <li className="nav-item">
                              <Link to="/login" className="nav-link">
                                Login
                            </Link>
                            </li>

                            <li className="nav-item dropdown">
                              <a className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdownRegisterLink"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                Register
                            </a>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdownRegisterLink"
                              >
                                <Link className="dropdown-item"
                                  to={{
                                    pathname: "/register",
                                    state: { roleId: 1 }
                                  }} >
                                  Register as User
                              </Link>
                                <Link className="dropdown-item"
                                  to={{
                                    pathname: "/register",
                                    state: { roleId: 2 }
                                  }}>
                                  {" "}
                                  Register as Trainer
                              </Link>
                              </div>
                            </li>
                          </React.Fragment>)}
                    </ul>
                  </div>
                </div>
              </nav>
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default withRouter(Header);
