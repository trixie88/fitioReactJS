import React, { Component } from "react";
import { Consumer } from "../context";
import { Link, withRouter } from "react-router-dom";

class UserHeader extends Component {
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
      error: () => {}
    });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { loggedIn, token, dispatch, loggedInUser } = value;
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
                    </div>
                  </div>
                </nav>
              ) : null}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default withRouter(UserHeader);
