import React, { Component } from "react";

class SendMessageModal extends Component {
  reply = () => {
    let token = localStorage.getItem("token");
    let content = document.getElementById("typedMessage").value;

    window.$.ajax({
      type: "POST",
      contentType: "text/plain",
      url:
        "http://localhost:8080/messages/save/" + this.props.receiver.username,
      headers: { "X-MSG-AUTH": token },
      data: content,
      async: true,
      success: () => {
        alert("SUCCESFULLY SENT");
        document.getElementById("typedMessage").value = "";
        window.$("#exampleModal").modal("hide");
      },
      error: () => {}
    });
  };

  render() {
    console.log(this.props.sender.firstName);
    return (
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
                {this.props.sender.firstName +
                  " to " +
                  this.props.receiver.firstName}
              </h5>
            </div>
            <div class="modal-body">
              <textarea
                id="typedMessage"
                rows="4"
                cols="50"
                width="100px"
                placeholder="Type Your Message Here"
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>

              <button
                type="button"
                class="btn btn-primary"
                onClick={this.reply}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SendMessageModal;
