import React, { Component } from "react";

const Context = React.createContext();

export class Provider extends Component {
  state = {
    loggedIn: localStorage.getItem("token") == "" ? false : true,
    trainingSessions: [],
    myReviews: [],
    token: "",
    loggedInUser: {},
    inbox: [],
    outbox: [],
    dispatch: action => this.setState(state => this.reducer(state, action))
  };

  reducer = (state, action) => {
    switch (action.type) {
      case "SET_LOGGED_IN_BOOLEAN":
        this.setState({
          loggedIn: action.payload
        });
        break;
      case "FILL_TRAINING_SESSIONS":
        return {
          ...state,
          trainingSessions: action.payload
        };
      case "FILL_LOGGEDINUSER":
        this.setState({
          loggedInUser: action.payload
        });
        break;
      // return {
      //   ...state,
      //   loggedInUser: action.payload
      // };
      case "FILL_TOKEN_IN_STATE":
        this.setState({
          token: action.payload
        });
        break;
      case "FILL_INBOX_MESSAGES":
        this.setState({
          inbox: action.payload
        });
        break;
      case "FILL_MY_REVIEWS":
        this.setState({
          myReviews: action.payload
        });
        break;
      case "EDIT_ACCOUNT":
        console.log("apo contextt messa");
        console.log(action.payload);
        this.setState({
          loggedInUser: action.payload
        });
      case "TEST":
        console.log("+++++++++++++++++++++");
        console.log("to state einaii ayti ti stigmi");
        console.log(this.state);
        console.log("+++++++++++++++++++++");
        break;
      default:
        return state;
    }
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token !== "") {
      window.$.ajax({
        type: "GET",
        url: "http://localhost:8080/login/userFromToken",
        headers: { "X-MSG-AUTH": token },
        dataType: "json",
        async: true,
        success: user => {
          localStorage.setItem("user", JSON.stringify(user));
          this.setState({
            loggedInUser: user,
            loggedIn: true,
            token: token
          });
        },
        error: () => {
          localStorage.setItem("user", "");
          localStorage.setItem("token", "");
          this.setState({
            loggedInUser: "",
            loggedIn: false,
            token: ""
          });
        }
      });
    }
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
