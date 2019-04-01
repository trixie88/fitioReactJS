import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
class Profile extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log("too id einaiaaa " + id);

    window.$.ajax({
      type: "GET",
      url: `http://localhost:8080/find/user/${id}`,
      dataType: "json",
      async: true,
      success: user => {
        console.log(user);
        this.setState({
          user
        });
      },
      error: error => {
        this.props.history.push("/");
      }
    });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
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
                        {user.firstName + " " + user.lastName}
                      </span>
                    </h4>

                    <div class="profile-user-info">
                      <div class="profile-info-row">
                        <div class="profile-info-name">Username</div>

                        <div class="profile-info-value">
                          <span>{user.username}</span>
                        </div>
                      </div>
                    </div>

                    <div class="hr hr-8 dotted" />

                    <div class="profile-user-info">
                      <div class="profile-info-row">
                        <div class="profile-info-name">Email</div>

                        <div class="profile-info-value">
                          <a href="#" target="_blank">
                            {user.email}
                          </a>
                        </div>
                      </div>

                      <div class="profile-info-row">
                        <div class="profile-info-name">
                          <i class="fal fa-calendar-alt" />
                        </div>

                        <div class="profile-info-value">
                          <Link to={`/trainersCalendar/${user.id}`}>
                            Available Dates
                          </Link>
                        </div>
                      </div>

                      <div class="profile-info-row">
                        <div class="profile-info-name">
                          <i class="middle ace-icon fa fa-twitter-square bigger-150 light-blue" />
                        </div>

                        <div class="profile-info-value">
                          <a href="#">Reviews</a>
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
}

export default withRouter(Profile);
