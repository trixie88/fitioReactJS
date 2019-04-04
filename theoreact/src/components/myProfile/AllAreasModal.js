import React, { Component } from "react";

class AllAreasModal extends Component {
  state = {
    areas: []
  };

  componentDidMount() {
    window.$.ajax({
      type: "GET",
      url: `http://localhost:8080/area/all`,
      dataType: "json",
      async: true,
      success: areas => {
        console.log(areas);
        this.setState({
          areas
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
          data-target="#exampleModal2"
        >
          Add Areas
        </button>
        <div
          class="modal fade"
          id="exampleModal2"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Available Areas
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
                  {this.state.areas.map(area => {
                    return (
                      <li key={area.id} class="list-group-item">
                        {area.city}
                        <i
                          style={{ cursor: "pointer" }}
                          class="fas fa-plus-circle float-right"
                          onClick={this.props.addArea.bind(this, area)}
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

export default AllAreasModal;
