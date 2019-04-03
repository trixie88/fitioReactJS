import React, { Component } from "react";
import AllTrainingTypesModal from "./AllTrainingTypesModal";

class EditTrainingTypesAndAreas extends Component {
  state = {
    user: {},
    trainingTypes: [],
    areas: []
  };

  componentDidMount() {
    if (localStorage.getItem("user") !== "") {
      let user = JSON.parse(localStorage.getItem("user"));
      this.setState({
        user
      });
      this.getTrainingTypes(user.id);
      this.getAreas(user.id);
    }
  }

  getTrainingTypes = trainersId => {
    window.$.ajax({
      type: "GET",
      url: `http://localhost:8080/find/trainers-types/${trainersId}`,
      dataType: "json",
      async: true,
      success: trainingTypes => {
        console.log(trainingTypes);
        this.setState({
          trainingTypes
        });
      },
      error: error => {
        // this.props.history.push("/");
      }
    });
  };

  getAreas = trainersId => {
    window.$.ajax({
      type: "GET",
      url: `http://localhost:8080/find/trainers-areas/${trainersId}`,
      dataType: "json",
      async: true,
      success: areas => {
        console.log(areas);
        this.setState({
          areas
        });
      },
      error: error => {
        // this.props.history.push("/");
      }
    });
  };

  addType = type => {
    let typeExists = false;

    this.state.trainingTypes.forEach(trainingType => {
      if (trainingType.id == type.id) {
        typeExists = true;
      }
    });

    if (!typeExists) {
      this.setState({
        trainingTypes: [...this.state.trainingTypes, type]
      });
    }
  };

  removeTrainingType = type => {
    this.setState({
      trainingTypes: [
        ...this.state.trainingTypes.filter(
          trainingType => trainingType.id != type.id
        )
      ]
    });
  };

  saveChanges = () => {
    const { id } = this.state.user;
    const { trainingTypes } = this.state;
    window.$.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: `http://localhost:8080/find/addTrainingTypes/${id}`,
      headers: { "X-MSG-AUTH": localStorage.getItem("token") },
      data: JSON.stringify(trainingTypes),
      async: true,
      success: () => {
        alert("koble");
      },
      error: () => {
        alert("errorr");
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm">
              <div class="card" style={{ width: "400px", marginLeft: "100px" }}>
                <div class="card-body">
                  <h4 class="card-title">Your TrainingTypes</h4>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    Add training Types
                  </button>
                </div>
                <ul class="list-group list-group-flush">
                  {this.state.trainingTypes.map(trainingType => {
                    return (
                      <li key={trainingType.id} class="list-group-item">
                        {trainingType.title}
                        <i
                          style={{ cursor: "pointer" }}
                          class="fas fa-window-close float-right"
                          onClick={this.removeTrainingType.bind(
                            this,
                            trainingType
                          )}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div class="col-sm" style={{ marginLeft: "100px" }}>
              <div class="card" style={{ width: "400px", marginLeft: "100px" }}>
                <div class="card-body">
                  <h4 class="card-title">Your Areas</h4>
                  <button type="button" class="btn btn-primary">
                    Add Areas
                  </button>
                </div>
                <ul class="list-group list-group-flush">
                  {this.state.areas.map(area => {
                    return (
                      <li key={area.id} class="list-group-item">
                        {area.city}
                        <i
                          style={{ cursor: "pointer" }}
                          class="fas fa-window-close float-right"
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <button class="btn btn-success" onClick={this.saveChanges.bind(this)}>
            Save Changes
          </button>
        </div>
        {/* modal */}
        <AllTrainingTypesModal addType={this.addType} />
      </React.Fragment>
    );
  }
}

export default EditTrainingTypesAndAreas;
