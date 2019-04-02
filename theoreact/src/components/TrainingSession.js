import React, { Component } from "react";
import { Consumer } from "../context";

class TrainingSession extends Component {
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

  render() {
    return (
      <Consumer>
        {value => {
          const { loggedIn } = value;
          const { state } = this.props.location;
          if (!loggedIn) {
            this.props.history.push("/login");
          } else if (state == null) {
            this.props.history.push("/calendar");
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
                    <button
                      onClick={this.cancelSession.bind(
                        this,
                        this.props.location.state.session
                      )}
                      class="btn btn-danger"
                    >
                      Cancel Training
                    </button>
                  </div>
                </div>
                <br />
              </React.Fragment>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default TrainingSession;
