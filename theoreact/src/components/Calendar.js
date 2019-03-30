import React, { Component } from "react";
import "./stylesheets/calendar.css";
import DayWithSession from "./DayWithSession";
import { withRouter, Link } from "react-router-dom";
import { Consumer } from "../context";

export class Calendar extends Component {
  state = {
    sessions: [],
    month: 0,
    modalSessions: [],
    dateOfModal: ""
  };

  componentDidMount() {
    var date = new Date();
    var month = date.getMonth();
    this.setState({
      month: month + 1
    });
    let token = localStorage.getItem("token");
    window.$.ajax({
      type: "GET",
      url: "http://localhost:8080/session/trainer-sessions",
      headers: { "X-MSG-AUTH": token },
      dataType: "json",
      async: true,
      success: sessions => {
        this.setState({
          sessions: sessions
        });
      },
      error: () => {}
    });
  }

  hideModal = () => {
    window.$("#sessionModal").modal("hide");
  };

  showModal = day => {
    let dayToString = day.toString();

    if (day < 10) {
      dayToString = "0" + dayToString;
    }

    let date = "2019-" + this.state.month + "-" + dayToString;
    let token = localStorage.getItem("token");
    window.$.ajax({
      type: "GET",
      url: "http://localhost:8080/session/trainer-sessions-date/" + date,
      headers: { "X-MSG-AUTH": token },
      dataType: "json",
      async: true,
      success: modalSessions => {
        console.log(modalSessions);
        this.setState({
          modalSessions: modalSessions,
          dateOfModal: date
        });
      },
      error: () => {}
    });
    window.$("#sessionModal").modal("show");
  };

  generateDays = () => {
    let days = [];
    let month = this.state.month;
    let monthToString;
    if (month < 10) {
      monthToString = "0" + month.toString();
    } else {
      monthToString = month.toString();
    }
    let daysWithSession = this.state.sessions.map(session => {
      if (session.date.slice(5, 7) == monthToString) {
        return parseInt(session.date.slice(8, 10));
      }
    });

    for (var i = 1; i <= 31; i++) {
      if (daysWithSession.includes(i)) {
        days.push(
          <DayWithSession
            month={this.state.month}
            day={i}
            showModal={this.showModal}
          />
        );
      } else {
        days.push(
          <div class="day">
            <span class="date">{i}</span>
          </div>
        );
      }
    }
    return days;
  };

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
          if (!loggedIn) {
            this.props.history.push("/login");
          } else {
            return (
              <React.Fragment>
                <div class="bodyDivCalendar">
                  <h1 class="h1Calendar">{this.state.month + "/ 2019"}</h1>
                  <button onClick={this.previousMonth}>Previous Month</button>
                  <button onClick={this.nextMonth}>Next Month</button>

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
                          <h6>Your sessions for {this.state.dateOfModal}</h6>
                          <hr />
                          <ul class="list-group">
                            {this.state.modalSessions.map(session => (
                              <Link
                                class="list-group-item"
                                to={{
                                  pathname: "/trainingSession",
                                  state: { session: session }
                                }}
                                onClick={this.hideModal}
                              >
                                {"Time: " +
                                  session.time +
                                  " , Area: " +
                                  session.area.city +
                                  " ,Type: " +
                                  session.trainingType.title}
                              </Link>
                            ))}
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

export default withRouter(Calendar);
