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
import Profile from "./components/Profile";
import { TrainersCalendar } from "./components/TrainersCalendar";
import BookTrainingSession from "./components/BookTrainingSession";
import EditAccount from "./components/EditAccount";
import EditTrainingTypesAndAreas from "./components/EditTrainingTypesAndAreas";

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
            <Route path="/Reviews/:id" component={Reviews} />
            <Route path="/searchResults" component={Results} />
            <Route path="/myCalendar" component={Calendar} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/settings" component={EditAccount} />
            <Route
              path="/editTrainingTypesAndAreas"
              component={EditTrainingTypesAndAreas}
            />
            <Route path="/trainingSession" component={TrainingSession} />
            <Route
              path="/bookTrainingSession"
              component={BookTrainingSession}
            />
            <Route path="/register" exact component={Register} />
            <Route path="/trainersCalendar/:id" component={TrainersCalendar} />
          </Switch>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;
