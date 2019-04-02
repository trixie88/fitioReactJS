import React, { Component } from "react";
import { Consumer } from "../context";
import TextInputGroup from "./TextInputGroup";
// let user = JSON.parse(localStorage.getItem("user"));
class EditAccount extends Component {
  state = {
    user: JSON.parse(localStorage.getItem("user")),
    email: JSON.parse(localStorage.getItem("user")).email,
    firstName: JSON.parse(localStorage.getItem("user")).firstName,
    lastName: JSON.parse(localStorage.getItem("user")).lastName,
    price: JSON.parse(localStorage.getItem("user")).price,
    areas: [],
    trainingTypes: []
  };

  componentDidMount() {}
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  editAccount = (dispatch, e) => {
    e.preventDefault();
    const {
      email,
      firstName,
      lastName,
      price,
      areas,
      trainingTypes
    } = this.state;
    if (email === "" || firstName === "" || lastName === "" || price === "") {
      alert("Enter All Fields");
      return;
    }

    let user = JSON.parse(localStorage.getItem("user"));
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.price = price;

    window.$.ajax({
      type: "PUT",
      contentType: "application/json; charset=utf-8",
      url: `http://localhost:8080/e-personal/users/${user.id}`,
      headers: { "X-MSG-AUTH": localStorage.getItem("token") },
      data: JSON.stringify(user),
      async: true,
      success: userUpdated => {
        //didn't use the userUpdated cause server returns userUpdated without Id which causes troubles later in the app
        dispatch({ type: "EDIT_ACCOUNT", payload: user });
        localStorage.setItem("user", JSON.stringify(user));
        alert("Succesfylly Edited");
        this.props.history.push("/myProfile");
      },
      error: () => {
        console.log("error");
      }
    });
  };

  render() {
    const { email, firstName, lastName, price } = this.state;
    return (
      <Consumer>
        {value => {
          const { loggedIn, dispatch } = value;
          // console.log(loggedInUser.role.id);
          if (!loggedIn) {
            this.props.history.push("/login");
          } else {
            return (
              <div className="card mb-12">
                <div className="card-header">Edit Account</div>
                <div className="card-body">
                  <form onSubmit={this.editAccount.bind(this, dispatch)}>
                    <TextInputGroup
                      label="Name"
                      name="firstName"
                      placeholder="Enter name"
                      value={firstName}
                      onChange={this.onChange}
                      //   error={errors.name}
                    />
                    <TextInputGroup
                      label="LastName"
                      name="lastName"
                      placeholder="Enter name"
                      value={lastName}
                      onChange={this.onChange}
                      //   error={errors.name}
                    />
                    <TextInputGroup
                      label="Email"
                      name="email"
                      placeholder="Enter email"
                      value={email}
                      type="email"
                      onChange={this.onChange}
                      //   error={errors.email}
                    />
                    <TextInputGroup
                      label="Price"
                      name="price"
                      placeholder="Enter price"
                      value={price}
                      onChange={this.onChange}
                      //   error={errors.phone}
                    />

                    <input
                      type="submit"
                      value="Save"
                      className="btn btn-light btn-block"
                    />
                  </form>
                </div>
              </div>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default EditAccount;
