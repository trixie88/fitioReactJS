import React, { Component } from "react";
import "./stylesheets/profile.css";
import { Consumer } from "../context";

class UsersProfile extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { loggedIn, loggedInUser, token, dispatch } = value;
          if (!loggedIn) {
            this.props.history.push("/login");
          } else {
            return (
              <div id="user-profile-2" class="user-profile">
                <div class="tabbable">
                  <div class="tab-content no-border padding-24">
                    <div id="home" class="tab-pane in active">
                      <div class="row">
                        <div class="col-xs-12 col-sm-3 center">
                          <span class="profile-picture">
                            <img
                              class="editable img-responsive"
                              alt=" Avatar"
                              id="avatar2"
                              src="http://bootdey.com/img/Content/avatar/avatar6.png"
                            />
                          </span>

                          <div class="space space-4" />

                          <a href="#" class="btn btn-sm btn-block btn-success">
                            <i class="ace-icon fa fa-plus-circle bigger-120" />
                            <span class="bigger-110">Add as a friend</span>
                          </a>
                        </div>

                        <div class="col-xs-12 col-sm-9">
                          <h4 class="blue">
                            <span class="middle">
                              {loggedInUser.firstName} {loggedInUser.lastName}
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
                                <i class="middle ace-icon fa fa-facebook-square bigger-150 blue" />
                              </div>

                              <div class="profile-info-value">
                                <a href="#">Find me on Facebook</a>
                              </div>
                            </div>

                            <div class="profile-info-row">
                              <div class="profile-info-name">
                                <i class="middle ace-icon fa fa-twitter-square bigger-150 light-blue" />
                              </div>

                              <div class="profile-info-value">
                                <a href="#">Follow me on Twitter</a>
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
            );
          }
        }}
      </Consumer>
    );
  }
}

export default UsersProfile;
