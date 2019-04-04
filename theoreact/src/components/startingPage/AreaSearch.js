import React, { Component } from "react";

class AreaSearch extends Component {
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
          areas: areas
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
          class="btn btn-warning btn-block"
          data-toggle="modal"
          data-target="#exampleModal2"
        >
          Choose Areas
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
              </div>
              <div class="modal-body">
                {this.state.areas.map(area => {
                  return (
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value={area.id}
                        id="defaultCheck1"
                        onClick={this.props.changeArea.bind(this, area)}
                      />
                      <label class="form-check-label" for="defaultCheck1">
                        {area.city}
                      </label>
                    </div>
                  );
                })}
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

export default AreaSearch;
