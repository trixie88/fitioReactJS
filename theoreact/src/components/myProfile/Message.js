import React, { Component } from "react";

class Message extends Component {
  reply = () => {
    let token = localStorage.getItem("token");
    let content = document.getElementById("typedMessage").value;

    window.$.ajax({
      type: "POST",
      contentType: "text/plain",
      url:
        "http://localhost:8080/messages/save/" +
        this.props.message.sender.username,
      headers: { "X-MSG-AUTH": token },
      data: content,
      async: true,
      success: () => {
        alert("SUCCESFULLY SENT");
      },
      error: () => {}
    });
  };

  render() {
    return (
      <React.Fragment>
        <tr>
          <td>{this.props.count}</td>
          <td>
            {this.props.message.sender.firstName}{" "}
            {this.props.message.sender.lastName}
          </td>
          <td>
            {this.props.message.receiver.firstName +
              " " +
              this.props.message.receiver.lastName}
          </td>
          <td>{this.props.message.text.substring(0, 6)}...</td>
          <td>{this.props.message.date}</td>
          <td class="text-center">
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Read
            </button>
            <button
              class="btn btn-danger btn-xs"
              onClick={this.props.delete.bind(this, this.props.message.id)}
            >
              <span class="glyphicon glyphicon-remove" /> Delete
            </button>
          </td>
        </tr>

        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  {this.props.message.sender.firstName +
                    " to " +
                    this.props.message.receiver.firstName}
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
                Message: {this.props.message.text}
                <br />
                <br />
                <br />
                {this.props.type == "inbox" ? (
                  <textarea
                    id="typedMessage"
                    rows="4"
                    cols="50"
                    width="100px"
                    placeholder="Reply Here"
                  />
                ) : null}
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                {this.props.type == "inbox" ? (
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={this.reply}
                  >
                    Reply
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Message;
