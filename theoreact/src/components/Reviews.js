import React, { Component } from "react";
import { Consumer } from "../context";
import Review from "./Review";

class Reviews extends Component {
  state = {
    reviews: []
  };

  componentDidMount = () => {
    let userLoggedIn = localStorage.getItem("user");
    if (userLoggedIn != "") {
      userLoggedIn = JSON.parse(userLoggedIn);
      window.$.ajax({
        type: "GET",
        url:
          "http://localhost:8080/session/review-trainer/" +
          userLoggedIn.id +
          "?index1=0&index2=10",
        dataType: "json",
        async: true,
        success: reviews => {
          console.log(reviews);
          this.setState({
            reviews: reviews.results
          });
          //   dispatch({ type: "FILL_MY_REVIEWS", payload: reviews });
          //   this.props.history.push("/myReviews");
        },
        error: () => {}
      });
    }
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { loggedIn, loggedInUser } = value;
          const { reviews } = this.state;
          if (!loggedIn) {
            this.props.history.push("/login");
          } else {
            return (
              <React.Fragment>
                <div class="container">
                  <h2 class="text-center">
                    {"Reviews for " +
                      loggedInUser.firstName +
                      " " +
                      loggedInUser.lastName}
                  </h2>
                  {reviews.map(review => (
                    // <h1>eeee</h1>
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
