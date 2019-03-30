import React, { Component } from "react";
import Main from "./Main";
import ThreeSteps from "./ThreeSteps";
import ReadyToGetStarted from "./ReadyToGetStarted";

class Landing extends Component {
  render() {
    return (
      <React.Fragment>
        <Main theoProps={this.props} />
        <ThreeSteps />
        <ReadyToGetStarted />
      </React.Fragment>
    );
  }
}

export default Landing;
