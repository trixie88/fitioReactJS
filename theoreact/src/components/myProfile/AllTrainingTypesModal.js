import React, { Component } from "react";

class AllTrainingTypesModal extends Component {
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
        console.log(trainingTypes);
        this.setState({
          availableTrainingTypes: trainingTypes
        });
      },
      error: error => {}
    });
  }

  render() {
    return (
      <React.Fragment>
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Add training Types
        </button>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Available Training Types
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <ul class="list-group">
                  {this.state.availableTrainingTypes.map(trainingType => {
                    return (
                      <li key={trainingType.id} class="list-group-item">
                        {trainingType.title}
                        <i
                          style={{ cursor: "pointer" }}
                          class="fas fa-plus-circle float-right"
                          onClick={this.props.addType.bind(this, trainingType)}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                >
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

export default AllTrainingTypesModal;
