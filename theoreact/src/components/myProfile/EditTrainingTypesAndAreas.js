import React, { Component } from "react";
import AllTrainingTypesModal from "./AllTrainingTypesModal";
import AllAreasModal from "./AllAreasModal";
import { Consumer } from "../../context";
class EditTrainingTypesAndAreas extends Component {
  state = {
    user: {},
    trainingTypes: [],
    areas: []
  };

  componentDidMount() {
    if (localStorage.getItem("user") !== "") {
      let user = JSON.parse(localStorage.getItem("user"));
      console.log("++++++++++++");
      console.log(user);
      this.setState({
        user,
        trainingTypes: user.trainingTypes,
        areas: user.areas
      });
      // this.getTrainingTypes(user.id);
      // this.getAreas(user.id);
    }
  }

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

  addArea = chosenArea => {
    console.log(chosenArea);
    let areaExists = false;
    this.state.areas.forEach(area => {
      if (area.id == chosenArea.id) {
        areaExists = true;
      }
    });

    if (!areaExists) {
      this.setState({
        areas: [...this.state.areas, chosenArea]
      });
    }
  };

  removeArea = chosenArea => {
    this.setState({
      areas: [...this.state.areas.filter(area => area.id != chosenArea.id)]
    });
  };

  saveChanges = dispatch => {
    let user = this.state.user;
    user.areas = this.state.areas;
    user.trainingTypes = this.state.trainingTypes;

    window.$.ajax({
      type: "PUT",
      contentType: "application/json; charset=utf-8",
      url: `http://localhost:8080/user/update`,
      headers: { "X-MSG-AUTH": localStorage.getItem("token") },
      data: JSON.stringify(user),
      async: true,
      success: userUpdated => {
        dispatch({ type: "EDIT_ACCOUNT", payload: userUpdated });
        localStorage.setItem("user", JSON.stringify(userUpdated));
        alert("Succesfylly Edited");
        this.props.history.push("/myProfile");
      },
      error: () => {
        console.log("error");
      }
    });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { loggedIn, dispatch } = value;
          // console.log(loggedInUser.role.id);
          if (!loggedIn) {
            this.props.history.push("/login");
          } else {
            return (
              <React.Fragment>
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-sm">
                      <div class="card" style={{ width: "400px", marginLeft: "100px" }} >
                        <div class="card-body">
                          <h4 class="card-title">Your TrainingTypes</h4>
                          <AllTrainingTypesModal addType={this.addType} />
                        </div>
                        <ul class="list-group list-group-flush">
                          {this.state.trainingTypes.map(trainingType => {
                            return (
                              <li key={trainingType.id} class="list-group-item">
                                {trainingType.title}
                                <i style={{ cursor: "pointer" }} class="fas fa-window-close float-right"
                                  onClick={this.removeTrainingType.bind(this, trainingType)} />
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>

                    <div class="col-sm" style={{ marginLeft: "100px" }}>
                      <div class="card" style={{ width: "400px", marginLeft: "100px" }}  >
                        <div class="card-body">
                          <h4 class="card-title">Your Areas</h4>
                          <AllAreasModal addArea={this.addArea} />
                        </div>
                        <ul class="list-group list-group-flush">
                          {this.state.areas.map(area => {
                            return (
                              <li key={area.id} class="list-group-item">
                                {area.city}
                                <i style={{ cursor: "pointer" }} class="fas fa-window-close float-right" onClick={this.removeArea.bind(this, area)} />
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: "center" }}>
                  <button
                    class="btn btn-success"
                    onClick={this.saveChanges.bind(this, dispatch)}
                  >
                    Save Changes
                  </button>
                </div>
                {/* modal */}
                {/* <AllTrainingTypesModal addType={this.addType} /> */}
              </React.Fragment>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default EditTrainingTypesAndAreas;
