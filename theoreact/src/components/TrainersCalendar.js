import React, { Component } from "react";
import "./stylesheets/calendar.css";
import CalendarDay from "./CalendarDay";
import { withRouter, Link } from "react-router-dom";
import { Consumer } from "../context";

export class TrainersCalendar extends Component {
  state = {
    user: {},
    sessions: [],
    month: 0,
    modalSessions: [],
    dateOfModal: ""
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    var date = new Date();
    var month = date.getMonth();

    this.setState({
      month: month + 1
    });
    let token = localStorage.getItem("token");
    window.$.ajax({
      type: "GET",
      url: `http://localhost:8080/session/trainersSession/${id}`,
      headers: { "X-MSG-AUTH": token },
      dataType: "json",
      async: true,
      success: sessions => {
        this.setState({
          sessions: sessions
        });
      },
      error: () => { }
    });
    this.getUser(id);
  }

  getUser = id => {
    window.$.ajax({
      type: "GET",
      url: `http://localhost:8080/user/getUser/${id}`,
      dataType: "json",
      async: true,
      success: user => {
        this.setState({
          user
        });
      },
      error: error => {
        this.props.history.push("/");
      }
    });
  };

  hideModal = () => {
    window.$("#sessionModal").modal("hide");
  };

  showModal = day => {
    const { id } = this.props.match.params;
    let dayToString = day.toString();

    if (day < 10) {
      dayToString = "0" + dayToString;
    }
    let monthToString = this.state.month.toString();

    if (this.state.month < 10) {
      monthToString = "0" + monthToString;
    }

    let date = "2019-" + monthToString + "-" + dayToString;
    let token = localStorage.getItem("token");
    console.log("to date einai");
    console.log(date);
    window.$.ajax({
      type: "GET",
      url: `http://localhost:8080/session/trainer-sessions-date/${date}/${id}`,
      headers: { "X-MSG-AUTH": token },
      dataType: "json",
      async: true,
      success: modalSessions => {
        console.log("ta modal esessions einai");
        console.log(modalSessions);
        this.setState({
          modalSessions: modalSessions,
          dateOfModal: date
        });
      },
      error: () => { }
    });
    window.$("#sessionModal").modal("show");
  };

  generateModalAvailableHours = dayOfModal => {
    const { id } = this.props.match.params;
    let availableHours = [
      "10:00:00",
      "11:00:00",
      "12:00:00",
      "13:00:00",
      "14:00:00",
      "15:00:00",
      "16:00:00",
      "17:00:00",
      "18:00:00",
      "19:00:00",
      "20:00:00"
    ];

    let closedHours = this.state.modalSessions.map(session => {
      return session.time;
    });

    availableHours = availableHours.filter(hour => {
      return !(closedHours.indexOf(hour) > -1);
    });

    let timeSlots = [];
    availableHours.forEach(hour => {
      timeSlots.push(
        <Link
          class="list-group-item"
          to={{
            pathname: "/bookTrainingSession",
            state: { day: dayOfModal, hour: hour, trainersId: id }
          }}
          onClick={this.hideModal}
        >
          {"Hour: " + hour + " , Click to Book"}
        </Link>
      );
    });
    return timeSlots;
  };


  generateDays = () => {
    let days = [];
    let stateMonth = this.state.month;
    // let monthToString;
    // if (stateMonth < 10) {
    //   monthToString = "0" + stateMonth.toString();
    // } else {
    //   monthToString = stateMonth.toString();
    // }

    let date = new Date();
    let currentDayOfMonth = date.getDate();
    let currentMonth = date.getMonth() + 1;

    if (stateMonth < currentMonth) {
      for (var i = 1; i <= 31; i++) {
        days.push(
          <div class="day">
            <span class="date"> {i} </span>
          </div>
        );
      }
    }
    if (stateMonth == currentMonth) {
      for (var i = 1; i <= currentDayOfMonth; i++) {
        days.push(
          <div class="day">
            <span class="date"> {i} </span>
          </div>
        );
      }
      for (var i = currentDayOfMonth + 1; i <= 31; i++) {
        days.push(
          <CalendarDay month={this.state.month} day={i} showModal={this.showModal} />
        );
      }
    }
    if (stateMonth > currentMonth) {
      for (var i = 1; i <= 31; i++) {
        days.push(
          <CalendarDay month={this.state.month} day={i} showModal={this.showModal} />
        );
      }
    }

    // if (currentMonth <= stateMonth) {
    //   for (var i = 1; i <= currentDayOfMonth; i++) {
    //     days.push(
    //       <div class="day">
    //         <span class="date"> {i} </span>
    //       </div>
    //     );
    //   }
    //   for (var i = currentDayOfMonth + 1; i <= 31; i++) {
    //     days.push(
    //       <CalendarDay month={this.state.month} day={i} showModal={this.showModal} />
    //     );
    //   }
    // } else {
    //   for (var i = 1; i <= 31; i++) {
    //     days.push(
    //       <div class="day">
    //         <span class="date"> {i} </span>
    //       </div>
    //     );
    //   }
    // }
    return days;
  };

  // generateDays = () => {
  //   let days = [];
  //   let month = this.state.month;
  //   let monthToString;
  //   if (month < 10) {
  //     monthToString = "0" + month.toString();
  //   } else {
  //     monthToString = month.toString();
  //   }

  //   for (var i = 1; i <= 31; i++) {
  //     days.push(
  //       <CalendarDay
  //         month={this.state.month}
  //         day={i}
  //         showModal={this.showModal}
  //       />
  //     );
  //   }
  //   return days;
  // };

  nextMonth = () => {
    let thisMonth = this.state.month;
    if (thisMonth == 12) {
      this.setState({
        month: 1
      });
    } else {
      this.setState({
        month: thisMonth + 1
      });
    }
  };

  previousMonth = () => {
    let thisMonth = this.state.month;
    if (thisMonth == 1) {
      this.setState({
        month: 12
      });
    } else {
      this.setState({
        month: thisMonth - 1
      });
    }
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { loggedIn } = value;
          const { user } = this.state;
          if (!loggedIn) {
            this.props.history.push("/login");
          } else {
            return (
              <React.Fragment>
                <div class="bodyDivCalendar">
                  <h1 class="h1Calendar">{this.state.month + "/ 2019 "}</h1>
                  <div class="h1Calendar">
                    <h2>
                      Available dates of {user.firstName + " " + user.lastName}
                    </h2>
                    <button
                      class="btn btn-warning"
                      onClick={this.previousMonth}
                    >
                      Previous Month
                    </button>
                    <button class="btn btn-warning" onClick={this.nextMonth}>
                      Next Month
                    </button>
                  </div>

                  <section id="calendar" class="collectonme">
                    <div id="day-labels">
                      <div class="label">DAY</div>
                      <div class="label">DAY</div>
                      <div class="label">DAY</div>
                      <div class="label">DAY</div>
                      <div class="label">DAY</div>
                      <div class="label">DAY</div>
                      <div class="label">DAY</div>
                    </div>
                    <div id="one" class="week">
                      <div class="day noDate" />
                      <div class="day noDate" />
                      <div class="day noDate" />
                      <div class="day noDate" />
                      {this.generateDays()}
                    </div>
                  </section>

                  {/* Modal */}
                  <div
                    class="modal fade"
                    id="sessionModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">
                            Training sessions
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
                          <h6>Available hours for {this.state.dateOfModal}</h6>
                          <hr />
                          <ul class="list-group">
                            {this.generateModalAvailableHours(
                              this.state.dateOfModal
                            )}
                          </ul>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default withRouter(TrainersCalendar);
