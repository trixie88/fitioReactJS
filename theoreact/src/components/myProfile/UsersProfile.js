import React, { Component } from "react";
import "../stylesheets/profile.css";
import { Consumer } from "../../context";
import { Link, withRouter } from "react-router-dom";

class UsersProfile extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { loggedIn, loggedInUser, token, dispatch } = value;
          // console.log(loggedInUser.role.id);
          if (!loggedIn) {
            this.props.history.push("/login");
          } else {
            return (
              <React.Fragment>
                <div id="user-profile-2" class="user-profile">
                  <div class="tabbable">
                    <div class="tab-content no-border padding-24">
                      <div id="home" class="tab-pane in active">
                        <div class="row">
                          <div class="col-xs-6 col-sm-3 center">
                            <span class="profile-picture">
                              <img
                                class="editable img-responsive"
                                alt=" Avatar"
                                id="avatar2"
                                src="http://bootdey.com/img/Content/avatar/avatar6.png"
                              />
                            </span>

                            <div class="space space-4" />
                          </div>

                          <div class="col-xs-6 col-sm-3">
                            <h4 class="blue">
                              <span class="middle">
                                {loggedInUser.firstName} {loggedInUser.lastName}{" "}
                                {/* {loggedInUser.role.id == 2 ? "Trainer" : null} */}
                              </span>
                            </h4>

                            <div class="profile-user-info">
                              <div class="profile-info-row">
                                <div class="profile-info-name">Username</div>

                                <div class="profile-info-value">
                                  <span>{loggedInUser.username}</span>
                                </div>
                              </div>
                            </div>

                            <div class="hr hr-8 dotted" />

                            <div class="profile-user-info">
                              <div class="profile-info-row">
                                <div class="profile-info-name">Email</div>

                                <div class="profile-info-value">
                                  <a href="#" target="_blank">
                                    {loggedInUser.email}
                                  </a>
                                </div>
                              </div>

                              <div class="profile-info-row">
                                <div class="profile-info-name">
                                  <i class="fas fa-cog" />
                                </div>

                                <div class="profile-info-value">
                                  <Link to="/settings">Edit Account</Link>
                                </div>
                              </div>
                              <div class="profile-info-row">
                                <div class="profile-info-name">
                                  <i class="fas fa-cog" />
                                </div>

                                <div class="profile-info-value">
                                  <Link to="#">Change Password</Link>
                                </div>
                              </div>
                              <div class="profile-info-row">
                                <div class="profile-info-name">
                                  <i class="fas fa-cog" />
                                </div>

                                <div class="profile-info-value">
                                  <Link to="/editTrainingTypesAndAreas">
                                    Edit TrainingTypes and Areas
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="space-20" />
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

export default withRouter(UsersProfile);
