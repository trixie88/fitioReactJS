import React, { Component } from "react";

class TrainingTypeSearch extends Component {
  state = {
    availableTrainingTypes: []
  };

  componentDidMount() {
    window.$.ajax({
      type: "GET",
      url: `http://localhost:8080/trainingType/all`,
      dataType: "json",
      async: true,
      success: trainingTypes => {
        this.setState({
          availableTrainingTypes: trainingTypes
        });
      },
      error: error => { }
    });
  }

  render() {
    return (
      <React.Fragment>
        <button type="button" class="btn btn-warning btn-block" data-toggle="modal" data-target="#exampleModal" >
          Choose Trainings Types
        </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Available Training Types
                </h5>
              </div>
              <div class="modal-body">
                {this.state.availableTrainingTypes.map(trainingType => {
                  return (
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value={trainingType.id}
                        id="defaultCheck1"
                        onClick={this.props.changeTrainingTypes.bind(this, trainingType)} />
                      <label class="form-check-label" for="defaultCheck1">
                        {trainingType.title}
                      </label>
                    </div>
                  );
                })}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TrainingTypeSearch;
