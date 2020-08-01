import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "./TextInputGroup";

class EditAccount extends Component {
  state = {
    user: {},
    email: "",
    firstName: "",
    lastName: "",
    price: "",
    areas: [],
    trainingTypes: []
  };

  componentDidMount() {
    if (localStorage.getItem("user") !== "") {
      let user = JSON.parse(localStorage.getItem("user"));
      this.setState({
        user,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        price: user.price
      });
    }
  }
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
      url: `http://localhost:8080/user/update`,
      headers: { "X-MSG-AUTH": localStorage.getItem("token") },
      data: JSON.stringify(user),
      async: true,
      success: userUpdated => {
        dispatch({ type: "EDIT_ACCOUNT", payload: userUpdated });
        localStorage.setItem("user", JSON.stringify(userUpdated));
        alert("Succesfylly Edited");
        this.props.history.push("/myProfile");
      },
      error: () => {
        console.log("Error could not update account");
      }
    });
  };

  render() {
    const { email, firstName, lastName, price } = this.state;
    return (
      <Consumer>
        {value => {
          const { loggedIn, dispatch } = value;
          if (!loggedIn) {
            this.props.history.push("/login");
          } else {
            return (
              <div className="card mb-12">
                <div className="card-header">Edit Account </div>

                <div className="card-body">
                  <form onSubmit={this.editAccount.bind(this, dispatch)}>
                    <TextInputGroup label="Name" name="firstName" placeholder="Enter name" value={firstName} onChange={this.onChange} />
                    <TextInputGroup label="LastName" name="lastName" placeholder="Enter name" value={lastName} onChange={this.onChange} />
                    <TextInputGroup label="Email" name="email" placeholder="Enter email" value={email} type="email" onChange={this.onChange} />
                    <TextInputGroup label="Price" name="price" placeholder="Enter price" value={price} onChange={this.onChange} />
                    <input type="submit" value="Save" className="btn btn-success btn-block" />
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
