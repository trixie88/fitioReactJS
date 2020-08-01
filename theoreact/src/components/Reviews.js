import React, { Component } from "react";
import { Consumer } from "../context";
import Review from "./Review";

class Reviews extends Component {
  state = {
    user: {},
    reviews: []
  };

  componentDidMount = () => {
    const { id } = this.props.match.params;

    window.$.ajax({
      type: "GET",
      url:
        "http://localhost:8080/session/review-trainer/" +
        id +
        "?index1=0&index2=10",
      dataType: "json",
      async: true,
      success: reviews => {
        this.setState({
          reviews: reviews.results
        });
        if (reviews.results.length > 0) {
          let user = reviews.results[0].session.trainer;
          this.setState({
            user
          });
        } else {
          this.getUser(id);
        }
      },
      error: () => { }
    });
  };

  getUser = id => {
    window.$.ajax({
      type: "GET",
      url: `http://localhost:8080/user/getUser/${id}`,
      dataType: "json",
      async: true,
      success: user => {
        this.setState({
          user
        });
      },
      error: error => {
        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { loggedIn } = value;
          const { reviews, user } = this.state;
          if (!loggedIn) {
            this.props.history.push("/login");
          } else {
            return (
              <React.Fragment>
                <div class="container">
                  <h2 class="text-center">
                    {reviews.length == 0
                      ? "No Reviews yet for " +
                      user.firstName +
                      " " +
                      user.lastName
                      : "Reviews for " + user.firstName + " " + user.lastName}
                  </h2>
                  {reviews.map(review => (
                    <Review key={review.id} review={review} />
                  ))}
                </div>
              </React.Fragment>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default Reviews;
