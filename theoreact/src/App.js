import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import UserHeader from "./components/UserHeader";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Register from "./components/Register";
import { Provider } from "./context";
import "./App.css";
import LoginPage from "./components/LoginPage";
import UsersProfile from "./components/UsersProfile";
import Messages from "./components/Messages";
import Results from "./components/Results";
import Main from "./components/Main";
import Reviews from "./components/Reviews";
import Calendar from "./components/Calendar";
import TrainingSession from "./components/TrainingSession";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <Header />
          <UserHeader />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/login" component={LoginPage} />
            <Route path="/myProfile" component={UsersProfile} />
            <Route path="/messages" component={Messages} />
            <Route path="/myReviews" component={Reviews} />
            <Route path="/searchResults" component={Results} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/trainingSession" component={TrainingSession} />
            <Route path="/register" exact component={Register} />
          </Switch>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;
