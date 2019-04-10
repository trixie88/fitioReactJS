import React, { Component } from "react";
import "../stylesheets/profile.css";
import { Consumer } from "../../context";
import { Link, withRouter } from "react-router-dom";

class UsersProfile extends Component {

  state = {
    user: {},
    photoLink: ""
  }

  componentWillMount() {
    if (localStorage.getItem("user") != null && localStorage.getItem("user") != "") {
      let user = JSON.parse(localStorage.getItem("user"));
      this.setState({
        user: user,
        photoLink: user.photoLink
      })
    }
  }

  uploadPic = () => {
    let profilePicInput = document.getElementById("profilePicInput");
    let files = profilePicInput.files;
    if (files.length === 0) {
      alert("Please select a file");
    } else {
      var formData = new FormData();
      formData.append("file", files[0]);
      window.$.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/files/uploadFile",
        data: formData,
        processData: false,
        contentType: false,
        success: (response) => {
          this.savePhotoLink(response.fileDownloadUri);
        },
        error: (error) => {
          console.log(error);
          // process error
        }
      });
    }
  }

  savePhotoLink = (link) => {
    let user = JSON.parse(localStorage.getItem("user"));
    window.$.ajax({
      type: "POST",
      contentType: "text/plain",
      url: `http://localhost:8080/files/savePhotoLink/${user.id}`,
      // headers: { "X-MSG-AUTH": token },
      data: link,
      async: true,
      success: () => {
        user.photoLink = link;
        localStorage.setItem("user", JSON.stringify(user));
        this.setState({
          photoLink: link
        })
        alert("SUCCESFULLY UPLOADED");

      },
      error: () => { }
    });
  };

  generateProfilePic = () => {
    if (this.state.photoLink == "" || this.state.photoLink == null) {
      return (<img class="editable img-responsive" alt="Upload A Pictt" src="https://www.chiosstartup.com/1.jpg" style={{ width: "250px" }} />)
    } else {
      return (<img class="editable img-responsive" alt="Upload A Picdd" src={this.state.photoLink} style={{ width: "250px" }} />)
    }
  }


  render() {
    return (
      <Consumer>
        {value => {
          const { loggedIn, loggedInUser, token, dispatch } = value;
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
                          <div class="col-xs-12 col-sm-3 center">
                            <span class="profile-picture">
                              {this.generateProfilePic()}
                            </span>

                            <div class="space space-4" />

                            <div class="form-group">
                              <label for="exampleFormControlFile1">Select Picture Below</label>
                              <input type="file" class="form-control-file" id="profilePicInput" accept=".jpg, .png, .gif" />
                            </div>
                            <button type="button" class="btn btn-primary" onClick={this.uploadPic}>
                              Upload
                              </button>
                          </div>

                          <div class="col-xs-6 col-sm-3">
                            <h4 class="blue">
                              <span class="middle">
                                {loggedInUser.firstName} {loggedInUser.lastName}{" "}
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
