import React, { Component } from "react";

class Main extends Component {
  goToResultsPage = e => {
    e.preventDefault();
    console.log("+++++++++++++++++++++++++++++++++");
    let area = document.getElementById("area").value;
    let workoutStyle = document.getElementById("workoutStyle").value;
    localStorage.setItem("area", area);
    localStorage.setItem("workoutStyle", workoutStyle);
    this.props.theoProps.history.push("/searchResults");
  };

  render() {
    return (
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
            class="form-inline row justify-content-between"
          >
            <input
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
            />
            <button class="btn btn-primary btn-lg col-sm-2" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Main;
