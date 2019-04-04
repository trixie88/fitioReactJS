import React, { Component } from "react";
import TrainingTypeSearch from "./TrainingTypeSearch";
import AreaSearch from "./AreaSearch";

class Main extends Component {
  state = {
    chosenTrainingTypesIDs: [],
    chosenAreaIds: []
  };

  goToResultsPage = e => {
    e.preventDefault();
    console.log("+++++++++++++++++++++++++++++++++");
    this.props.theoProps.history.push({
      pathname: "/searchResults",
      state: {
        areaIds: this.state.chosenAreaIds,
        trainingTypeIds: this.state.chosenTrainingTypesIDs
      }
    });
    // let area = document.getElementById("area").value;
    // let workoutStyle = document.getElementById("workoutStyle").value;
    // localStorage.setItem("area", area);
    // localStorage.setItem("workoutStyle", workoutStyle);
    // this.props.theoProps.history.push("/searchResults");
  };

  changeTrainingTypes = (trainingType, e) => {
    if (e.target.checked) {
      this.addTrainingType(trainingType);
    } else {
      this.removeTrainingType(trainingType);
    }
  };

  addTrainingType = trainingType => {
    if (!this.state.chosenTrainingTypesIDs.includes(trainingType.id)) {
      let cloneArray = this.state.chosenTrainingTypesIDs;
      cloneArray.push(trainingType.id);
      this.setState({
        chosenTrainingTypesIDs: cloneArray
      });
      // this.setState({
      //   chosenTrainingTypesIDs: [
      //     ...this.state.chosenTrainingTypesIDs,
      //     trainingType.id
      //   ]
      // });
    }
  };

  removeTrainingType = trainingType => {
    if (this.state.chosenTrainingTypesIDs.includes(trainingType.id)) {
      let cloneArray = this.state.chosenTrainingTypesIDs;
      let index = cloneArray.indexOf(trainingType.id);
      cloneArray.splice(index, 1);
      this.setState({
        chosenTrainingTypesIDs: cloneArray
      });
      // console.log(trainingType);
      // this.setState({
      //   chosenTrainingTypesIDs: [
      //     ...this.state.chosenTrainingTypesIDs.filter(
      //       id => id != trainingType.id
      //     )
      //   ]
      // });
    }
  };

  changeArea = (area, e) => {
    if (e.target.checked) {
      this.addArea(area);
    } else {
      this.removeArea(area);
    }
  };

  addArea = area => {
    if (!this.state.chosenAreaIds.includes(area.id)) {
      let cloneArray = this.state.chosenAreaIds;
      cloneArray.push(area.id);
      this.setState({
        chosenAreaIds: cloneArray
      });
    }
  };

  removeArea = area => {
    if (this.state.chosenAreaIds.includes(area.id)) {
      let cloneArray = this.state.chosenAreaIds;
      let index = cloneArray.indexOf(area.id);
      cloneArray.splice(index, 1);
      this.setState({
        chosenAreaIds: cloneArray
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div id="searcharea" class="jumbotron jumbotron-fluid big-banner">
          <div class="container">
            <p class="text-center h1 text-white font-weight-bolder">
              Find your personal trainer today!
            </p>
            <p class="text-center h6 pb-3 text-white">
              Start training that booty!!!
            </p>
            <form
              onSubmit={this.goToResultsPage.bind(this)}
              id="myForm"
              class="form-inline row justify-content-between"
            >
              {/* <button
                type="button"
                class="btn btn-warning btn-block"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={this.configureModal.bind(this, "trainingTypesModal")}
              >
                Choose Trainings Types
              </button> */}
              <TrainingTypeSearch
                changeTrainingTypes={this.changeTrainingTypes}
              />

              <AreaSearch changeArea={this.changeArea} />
              {/* <button
                type="button"
                class="btn btn-warning btn-block"
                data-toggle="modal"
                data-target="#exampleModal2"
              >
                Choose Areas
              </button> */}

              {/* <input
              type="text"
              id="area"
              class="form-control form-control-lg mr-0 col-sm-5"
              placeholder="Choose area"
            />
            <input
              type="text"
              id="workoutStyle"
              class="form-control form-control-lg mr-0 col-sm-5"
              placeholder="Or choose workout style"
            /> */}
            </form>
            <div style={{ textAlign: "center" }}>
              <button
                class="btn btn-primary btn-lg col-sm-2"
                type="submit"
                form="myForm"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* <ModalAreasAndTypes
          state={this.state}
          changeTrainingTypes={this.changeTrainingTypes}
        /> */}
      </React.Fragment>
    );
  }
}

export default Main;
