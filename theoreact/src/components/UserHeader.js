import React, { Component } from "react";
import { Consumer } from "../context";
import { Link, withRouter } from "react-router-dom";
import NewTraininSessionsModal from "./NewTraininSessionsModal";

class UserHeader extends Component {

  state = {
    newTrainingSessions: []
  }

  getReviews = (dispatch, loggedInUser) => {
    window.$.ajax({
      type: "GET",
      url: `http://localhost:8080/session/review-trainer/${
        loggedInUser.id
        }?index1=0&index2=10`,
      dataType: "json",
      async: true,
      success: reviews => {
        console.log(reviews.results);
        dispatch({ type: "FILL_MY_REVIEWS", payload: reviews.results });
        this.props.history.push("/Reviews/" + loggedInUser.id);
      },
      error: () => { }
    });
  };

  componentWillMount() {
    if (localStorage.getItem("user") !== "") {
      let user = JSON.parse(localStorage.getItem("user"));
      window.$.ajax({
        type: "GET",
        url: `http://localhost:8080/session/newTrainingSessions/${user.id}`,
        headers: { "X-MSG-AUTH": localStorage.getItem("token") },
        dataType: "json",
        async: true,
        success: newTrainingSessions => {
          this.setState({
            newTrainingSessions
          });
        },
        error: () => { }
      });

    }
  }
  showModal = () => {
    window.$("#newSessionsModal").modal("show");
  }

  removeSessionFromNew = (session) => {
    window.$.ajax({
      type: "POST",
      url: `http://localhost:8080/session/notified/${session.id}`,
      headers: { "X-MSG-AUTH": localStorage.getItem("token") },
      async: true,
      success: () => {
        this.setState({
          newTrainingSessions: [...this.state.newTrainingSessions.filter(newSession => newSession.id != session.id)]
        });
      },
      error: () => { }
    });
    window.$("#newSessionsModal").modal("hide");
  }

  render() {
    return (
      <Consumer>
        {value => {
          const {
            loggedIn,
            token,
            dispatch,
            loggedInUser,
            newMessagesCount
          } = value;
          return (
            <React.Fragment>
              {loggedIn ? (
                <nav class="navbar navbar-light navbar-expand-md bg-warning">
                  <div class="container">
                    <div class="btn-group btn-group-toggle mr-2">
                      <label class="btn btn-secondary">
                        <Link style={{ color: "white" }} to="/myProfile">
                          My Profile
                        </Link>
                      </label>
                      <label class="btn btn-secondary">
                        <Link to="/myCalendar" style={{ color: "white" }}>
                          My Training Sessions
                        </Link>
                      </label>
                      <label class="btn btn-secondary">
                        <Link style={{ color: "white" }} to="/messages">
                          My Messages
                        </Link>
                      </label>
                      <label class="btn btn-secondary">
                        <Link
                          onClick={this.getReviews.bind(
                            this,
                            dispatch,
                            loggedInUser
                          )}
                          style={{ color: "white" }}
                        >
                          My Reviews
                        </Link>
                      </label>
                      <label class="btn btn-secondary">
                        <div class="btn-group">
                          <button
                            type="button"
                            class="btn btn-danger dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i class="fas fa-bell" />
                          </button>
                          <div class="dropdown-menu">
                            <Link class="dropdown-item" to="/messages">
                              {"New Messages: " + newMessagesCount}
                            </Link>
                            <button class="dropdown-item" onClick={this.showModal} >
                              {"New TrainingSessions: " + this.state.newTrainingSessions.length}
                            </button>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </nav>
              ) : null}
              <NewTraininSessionsModal newTrainingSessions={this.state.newTrainingSessions} removeSessionFromNew={this.removeSessionFromNew}></NewTraininSessionsModal>

            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default withRouter(UserHeader);
