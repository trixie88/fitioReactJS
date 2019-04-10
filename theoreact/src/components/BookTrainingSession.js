import React, { Component } from "react";
import { Consumer } from "../context";

class BookTrainingSession extends Component {
  state = {
    client: JSON.parse(localStorage.getItem("user")),
    trainer: {},
    trainingTypes: [],
    areas: []
  };

  componentDidMount() {
    const { trainersId } = this.props.location.state;
    this.getUser(trainersId);
    // this.getTrainingTypes(trainersId);
    // this.getAreas(trainersId);
  }

  getUser = trainersId => {
    window.$.ajax({
      type: "GET",
      url: `http://localhost:8080/user/getUser/${trainersId}`,
      dataType: "json",
      async: true,
      success: trainer => {
        console.log(trainer);
        this.setState({
          trainer,
          trainingTypes: trainer.trainerTypes,
          areas: trainer.trainerAreas
        });
      },
      error: error => {
        this.props.history.push("/");
      }
    });
  };

  // getTrainingTypes = trainersId => {
  //   window.$.ajax({
  //     type: "GET",
  //     url: `http://localhost:8080/user/trainers-types/${trainersId}`,
  //     dataType: "json",
  //     async: true,
  //     success: trainingTypes => {
  //       console.log(trainingTypes);
  //       this.setState({
  //         trainingTypes
  //       });
  //     },
  //     error: error => {
  //       this.props.history.push("/");
  //     }
  //   });
  // };

  // getAreas = trainersId => {
  //   window.$.ajax({
  //     type: "GET",
  //     url: `http://localhost:8080/user/trainers-areas/${trainersId}`,
  //     dataType: "json",
  //     async: true,
  //     success: areas => {
  //       console.log(areas);
  //       this.setState({
  //         areas
  //       });
  //     },
  //     error: error => {
  //       this.props.history.push("/");
  //     }
  //   });
  // };

  bookSession = (day, hour) => {
    let areaID = document.getElementById("area").value;
    let trainingTypeID = document.getElementById("trainingType").value;
    if (areaID == 0 || trainingTypeID == 0) {
      alert("Pleace choose Area and Training Type");
    } else {
      let trainerID = this.state.trainer.id;
      window.$.ajax({
        type: "POST",
        url: `http://localhost:8080/session/book/${trainerID}/${trainingTypeID}/${areaID}/${day}/${hour}`,
        headers: {
          "X-MSG-AUTH": localStorage.getItem("token")
        },
        async: true,
        success: () => {
          alert("Succesfully Booked");
          this.props.history.push("/myProfile");
        },
        error: () => {
          alert("Something went Wrong");
        }
      });
    }
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { loggedIn } = value;
          const { client, trainer } = this.state;
          const { state } = this.props.location;
          if (!loggedIn) {
            this.props.history.push("/login");
          } else if (state == null) {
            this.props.history.push("/calendar");
          } else {
            const { day, hour, trainersId } = this.props.location.state;
            return (
              <React.Fragment>
                <br />
                <div
                  class="card"
                  style={{ width: "400px", marginLeft: "100px" }}
                >
                  <div class="card-body">
                    <h4 class="card-title">{day + " " + hour}</h4>
                    <h6 class="card-text">BOOK BELOW</h6>
                  </div>
                  <select
                    id="trainingType"
                    class="browser-default custom-select"
                  >
                    <option selected value={0}>
                      Choose Training type
                    </option>
                    {this.state.trainingTypes.map(trainingType => {
                      return (
                        <option value={trainingType.id}>
                          {trainingType.title}
                        </option>
                      );
                    })}
                  </select>
                  <select id="area" class="browser-default custom-select">
                    <option selected value={0}>
                      Choose Area
                    </option>
                    {this.state.areas.map(area => {
                      return <option value={area.id}>{area.city}</option>;
                    })}
                  </select>
                  <ul class="list-group list-group-flush">
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
                      onClick={this.bookSession.bind(this, day, hour)}
                      type="button"
                      class="btn btn-warning"
                    >
                      BOOK TRAINING
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

export default BookTrainingSession;
