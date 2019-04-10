import React, { Component } from "react";

class Review extends Component {
  generateStars = stars => {
    let ratings = [];
    for (var i = 0; i < stars; i++) {
      ratings.push(
        <span class="float-right">
          <i class="text-warning fa fa-star" />
        </span>
      );
    }
    return ratings;
  };

  generateImage = () => {
    if (this.props.review.session.client.photoLink == null || this.props.review.session.client.photoLink == "") {
      return (<img src="https://www.chiosstartup.com/1.jpg" alt="profile pic" class="img img-rounded img-fluid" />)
    } else {
      return (<img src={this.props.review.session.client.photoLink} alt="profile pic" class="img img-rounded img-fluid" />)
    }
  }

  render() {
    return (
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-2">
              {this.generateImage()}
              {/* <img src={this.props.review.session.client.photoLink} alt="profile pic" class="img img-rounded img-fluid"/> */}
              <p class="text-secondary text-center">{this.props.review.date}</p>
            </div>
            <div class="col-md-10">
              <p>
                <strong>
                  {this.props.review.session.client.firstName +
                    " " +
                    this.props.review.session.client.lastName}
                </strong>
                {this.generateStars(this.props.review.rating)};
              </p>
              <div class="clearfix" />
              <p>{this.props.review.comment}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Review;
