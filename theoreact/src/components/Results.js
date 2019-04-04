import React, { Component } from "react";
import TrainerResult from "./TrainerResult";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areaIds: [],
      trainingTypeIds: [],
      trainers: []
    };
  }

  componentDidMount = () => {
    if (typeof this.props.location.state != "undefined") {
      let areaIds = this.props.location.state.areaIds;
      let trainingTypeIds = this.props.location.state.trainingTypeIds;
      this.setState({
        areaIds,
        trainingTypeIds
      });
      window.$.ajax({
        type: "GET",
        url: `http://localhost:8080/user/trainersByAreaAndTrainingType/${areaIds}/${trainingTypeIds}`,
        dataType: "json",
        async: true,
        success: trainers => {
          if (trainers.length != 0) {
            this.setState({
              trainers: trainers
            });
          }
        },
        error: () => {
          // alert("No Trainers Available in this area for this Workout Style");
          // this.props.history.push("/"); //gia kapoio logo den doulevei mesa sto results
        }
      });
    }
  };

  render() {
    const { trainers, areaIds, trainingTypeIds } = this.state;
    return (
      <React.Fragment>
        <div class="container py-3">
          {trainers.length == 0 ? (
            <h2>No Trainers were Found</h2>
          ) : (
            <h2>Available Trainers</h2>
          )}
          {areaIds.length == 0 ? <h2>Missing Chosen Areas</h2> : null}
          {trainingTypeIds.length == 0 ? <h2>Missing Training Types</h2> : null}
        </div>
        {trainers.map(trainer => {
          return <TrainerResult key={trainer.id} trainer={trainer} />;
        })}
      </React.Fragment>
    );
  }
}

export default Results;
