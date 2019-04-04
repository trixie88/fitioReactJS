import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import UserHeader from "./components/UserHeader";
import Landing from "./components/startingPage/Landing";
import Footer from "./components/Footer";
import Register from "./components/Register";
import { Provider } from "./context";
import "./App.css";
import LoginPage from "./components/LoginPage";
import UsersProfile from "./components/myProfile/UsersProfile";
import Messages from "./components/myProfile/Messages";
import Results from "./components/Results";
import Main from "./components/startingPage/Main";
import Reviews from "./components/Reviews";
import Calendar from "./components/myCalendar/Calendar";
import TrainingSession from "./components/myCalendar/TrainingSession";
import Profile from "./components/Profile";
import { TrainersCalendar } from "./components/TrainersCalendar";
import BookTrainingSession from "./components/BookTrainingSession";
import EditAccount from "./components/myProfile/EditAccount";
import EditTrainingTypesAndAreas from "./components/myProfile/EditTrainingTypesAndAreas";

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
