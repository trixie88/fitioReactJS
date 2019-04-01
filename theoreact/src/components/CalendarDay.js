import React, { Component } from "react";

class CalendarDay extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          class="day"
          onClick={this.props.showModal.bind(this, this.props.day)}
        >
          <span class="date" style={{ backgroundColor: "blue" }}>
            {this.props.day}
          </span>
          <p>Click for Available Hours</p>
        </div>
      </React.Fragment>
    );
  }
}

export default CalendarDay;
