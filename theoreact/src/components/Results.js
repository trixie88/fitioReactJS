import React, { Component } from "react";
import TrainerResult from "./TrainerResult";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      area: "",
      workoutStyle: "",
      trainers: []
    };
  }

  componentDidMount = () => {
    let area = localStorage.getItem("area");
    let workoutStyle = localStorage.getItem("workoutStyle");
    console.log(workoutStyle);
    console.log(area);
    window.$.ajax({
      type: "GET",
      url: `http://localhost:8080/find/trainer/${workoutStyle}/${area}`,
      dataType: "json",
      async: true,
      success: trainers => {
        if (trainers.length != 0) {
          this.setState({
            area: area,
            workoutStyle: workoutStyle,
            trainers: trainers
          });
        }

        localStorage.setItem("area", "");
        localStorage.setItem("workoutStyle", "");
      },
      error: () => {
        // alert("No Trainers Available in this area for this Workout Style");
        this.props.history.push("/"); //gia kapoio logo den doulevei mesa sto results
      }
    });
  };

  render() {
    const { area, workoutStyle, trainers } = this.state;
    return (
      <React.Fragment>
        <div class="container py-3">
          {area == "" ? (
            <h2>No Trainers were Found</h2>
          ) : (
            <h2>
              Trainers in {area} for {workoutStyle}
            </h2>
          )}
        </div>
        {trainers.map(trainer => {
          return (
            <TrainerResult
              key={trainer.id}
              workoutStyle={workoutStyle}
              trainer={trainer}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export default Results;
