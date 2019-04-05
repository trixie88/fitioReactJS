import React, { Component } from "react";
import { Consumer } from "../../context";
import RatingModal from "./RatingModal";
class TrainingSession extends Component {
  state = {
    session:
      this.props.location.state != null
        ? this.props.location.state.session
        : null,
    pastSession: false
  };

  componentDidMount() {
    if (this.state.session != null) {
      // const script = document.createElement("script");
      // script.src = "../../../public/javascript/rating.js";
      // script.async = true;
      // this.instance.appendChild(script);
      const { session } = this.state;
      console.log(this.state.session);
      let date = new Date();
      let day = date.getDay();
      let month = date.getMonth() + 1;

      let year = date.getFullYear();
      let hour = date.getHours();
      console.log(day);
      if (day < 10) {
        day = "0" + day;
      }
      if (month < 10) {
        month = "0" + month;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      let currentDate = year + "-" + month + "-" + day;

      if (session.date < currentDate) {
        this.setState({
          pastSession: true
        });
        console.log("einai paliooo");
      }
      if (session.date == currentDate) {
        let sessionTime = session.time.slice(0, 2);
        if (sessionTime < hour) {
          this.setState({
            pastSession: true
          });
        }
      }
    }
  }

  cancelSession = session => {
    console.log(session);
    window.$.ajax({
      type: "POST",
      url: `http://localhost:8080/session/cancel-session/${session.id}`,
      headers: { "X-MSG-AUTH": localStorage.getItem("token") },
      async: true,
      success: () => {
        alert("Succesfuly Canceled");
        this.props.history.push("/myProfile");
      },
      error: () => {}
    });
  };

  addReview = rating => {
    // let rating = document.getElementById("ratingVathmos").innerText;
    let review = document.getElementById("typedReview").value;
    console.log(review);
    console.log(rating);
    window.$.ajax({
      type: "POST",
      contentType: "text/plain",
      url: `http://localhost:8080/session/add-comment/${
        this.state.session.id
      }/${rating}`,
      headers: { "X-MSG-AUTH": localStorage.getItem("token") },
      data: review,
      async: true,
      success: () => {
        alert("Succesfuly Reviewed");
        window.$("#exampleModal").modal("hide");
        this.props.history.push("/myProfile");
      },
      error: () => {}
    });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { loggedIn } = value;
          const { state } = this.props.location;
          const { pastSession } = this.state;
          if (!loggedIn) {
            this.props.history.push("/login");
          } else if (state == null) {
            this.props.history.push("/myCalendar");
          } else {
            const {
              area,
              client,
              date,
              time,
              trainer,
              trainingType
            } = this.props.location.state.session;
            return (
              <React.Fragment>
                <br />
                <div
                  class="card"
                  style={{ width: "400px", marginLeft: "100px" }}
                >
                  <div class="card-body">
                    <h4 class="card-title">{date + " " + time}</h4>
                    <h6 class="card-text">
                      {"Training Type: " + trainingType.title}
                    </h6>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      {"Area: " + area.city + " , Adress: " + area.address}
                    </li>
                    <li class="list-group-item">
                      {"Client: " + client.firstName + " " + client.lastName}
                    </li>
                    <li class="list-group-item">
                      {"Trainer: " + trainer.firstName + " " + trainer.lastName}
                    </li>
                    <li class="list-group-item">{"Price: " + trainer.price}</li>
                  </ul>
                  <div class="card-body">
                    {pastSession ? (
                      <button
                        type="button"
                        class="btn btn-info"
                        data-toggle="modal"
                        data-target="#exampleModal"
                      >
                        Review Session
                      </button>
                    ) : (
                      <button
                        onClick={this.cancelSession.bind(
                          this,
                          this.props.location.state.session
                        )}
                        class="btn btn-danger"
                      >
                        Cancel Training
                      </button>
                    )}
                    {/* <button
                      onClick={this.cancelSession.bind(
                        this,
                        this.props.location.state.session
                      )}
                      class="btn btn-danger"
                    >
                      Cancel Training
                    </button> */}
                  </div>
                </div>
                <br />
                <RatingModal addReview={this.addReview} />
              </React.Fragment>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default TrainingSession;
