import React, { Component } from "react";
import "../stylesheets/messages.css";
import { Consumer } from "../../context";
import PageOfPagination from "../PageOfPagination";
import Message from "./Message";

class Messages extends Component {
  state = {
    messages: [],
    count: 0, //how Many Messages
    type: "inbox", //default is sent
    numberOfPages: 0, //default 0
    currentPage: 1
  };

  componentDidMount() {
    setInterval(this.getMessages, 5000);

    // let token = localStorage.getItem("token");
    // window.$.ajax({
    //   type: "GET",
    //   contentType: "application/json; charset=utf-8",
    //   url: "http://localhost:8080/messages/inbox?index1=0&index2=10",
    //   headers: {
    //     "X-MSG-AUTH": token
    //   },
    //   dataType: "json",
    //   async: true,
    //   success: data => {
    //     this.setState({
    //       count: data.count,
    //       messages: data.results
    //     });
    //     this.calculateNumberOfPages();
    //   },
    //   error: () => {}
    // });
  }

  getMessages = () => {
    let token = localStorage.getItem("token");
    if (token != "") {
      window.$.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "http://localhost:8080/messages/inbox?index1=0&index2=10",
        headers: {
          "X-MSG-AUTH": token
        },
        dataType: "json",
        async: true,
        success: data => {
          if (data.count !== this.state.count) {
            this.setState({
              count: data.count,
              messages: data.results
            });
            this.calculateNumberOfPages();
          }
        },
        error: () => {}
      });
    }
  };

  calculateNumberOfPages = () => {
    let count = this.state.count;
    let wholeNum;
    let remainder;
    let numberOfPages;
    if (count < 10) {
      this.setState({
        numberOfPages: 1
      });
    }
    if (count > 10) {
      wholeNum = Math.floor(count / 10);
      remainder = count % 10;
      if (remainder > 0) {
        numberOfPages = wholeNum + 1;
      } else {
        numberOfPages = wholeNum;
      }
    }
    this.setState({
      numberOfPages: numberOfPages
    });
  };

  changePage = page => {
    console.log(page);
    if (page != 0 && page <= this.state.numberOfPages) {
      let token = localStorage.getItem("token");
      let index1 = (page - 1) * 10;
      window.$.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: `http://localhost:8080/messages/sent?index1=${index1}&index2=10`,
        headers: {
          "X-MSG-AUTH": token
        },
        dataType: "json",
        async: true,
        success: data => {
          console.log(data);
          this.setState({
            count: data.count,
            currentPage: page,
            messages: data.results
          });
          this.calculateNumberOfPages();
        },
        error: () => {}
      });
    }
  };

  generateNumberOfPage = () => {
    let pages = [];
    for (var i = 1; i <= this.state.numberOfPages; i++) {
      pages.push(
        <PageOfPagination key={i} pageNum={i} changePage={this.changePage} />
      );
    }
    return pages;
  };

  inboxMessages = () => {
    let token = localStorage.getItem("token");
    window.$.ajax({
      type: "GET",
      contentType: "application/json; charset=utf-8",
      url: "http://localhost:8080/messages/inbox?index1=0&index2=10",
      headers: {
        "X-MSG-AUTH": token
      },
      dataType: "json",
      async: true,
      success: data => {
        this.setState({
          count: data.count,
          messages: data.results,
          type: "inbox"
        });
        this.calculateNumberOfPages();
      },
      error: () => {}
    });
  };

  sentMessages = () => {
    let token = localStorage.getItem("token");
    window.$.ajax({
      type: "GET",
      contentType: "application/json; charset=utf-8",
      url: "http://localhost:8080/messages/sent?index1=0&index2=10",
      headers: {
        "X-MSG-AUTH": token
      },
      dataType: "json",
      async: true,
      success: data => {
        this.setState({
          count: data.count,
          messages: data.results,
          type: "sent"
        });
        this.calculateNumberOfPages();
      },
      error: () => {}
    });
  };

  delete = messageId => {
    window.$.ajax({
      type: "DELETE",
      url: "http://localhost:8080/e-personal/messages/" + messageId,
      async: true,
      success: () => {
        this.setState({
          messages: [
            ...this.state.messages.filter(message => message.id != messageId)
          ]
        });
      },
      error: () => {}
    });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { loggedIn } = value;
          const { messages } = this.state;
          let count = this.state.currentPage * 10 - 10;
          if (!loggedIn) {
            this.props.history.push("/login");
          } else {
            return (
              <React.Fragment>
                <div class="container">
                  <div class="row col-md-12 col-md-offset-2 custyle">
                    <button
                      onClick={this.inboxMessages}
                      class="btn btn-primary btn-xs pull-right"
                    >
                      Inbox{" "}
                    </button>
                    <button
                      onClick={this.sentMessages}
                      class="btn btn-primary btn-xs pull-right"
                    >
                      Sent{" "}
                    </button>

                    {this.state.type == "sent" ? (
                      <h1> Sent Messages </h1>
                    ) : (
                      <h1> Inbox Messages </h1>
                    )}
                    <div class="alert alert-primary" role="alert">
                      {this.state.count + " messages"}
                    </div>
                    <table class="table table-striped custab">
                      <thead>
                        <tr>
                          <th> ID </th>
                          <th> Sender </th>
                          <th> Receiver </th>
                          <th> Text </th>
                          <th> Date </th>
                          <th class="text-center"> Action </th>
                        </tr>
                      </thead>
                      <tbody>
                        {" "}
                        {messages.length == 0 ? (
                          <img
                            src="http://photodentro.edu.gr/v/images/loading.gif"
                            alt="Loading"
                            width="80"
                          />
                        ) : null}
                        {messages.map(message => {
                          count = count + 1;

                          return (
                            <Message
                              key={message.id}
                              message={message}
                              count={count}
                              type={this.state.type}
                              delete={this.delete}
                            />
                          );
                        })}{" "}
                      </tbody>
                    </table>
                  </div>
                </div>
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    <li class="page-item">
                      <p
                        class="page-link"
                        onClick={this.changePage.bind(
                          this,
                          this.state.currentPage - 1
                        )}
                        style={{ cursor: "pointer" }}
                      >
                        Previous
                      </p>
                    </li>
                    {this.generateNumberOfPage()}
                    <li class="page-item">
                      <p
                        class="page-link"
                        onClick={this.changePage.bind(
                          this,
                          this.state.currentPage + 1
                        )}
                        style={{ cursor: "pointer" }}
                      >
                        Next
                      </p>
                    </li>
                  </ul>
                </nav>
              </React.Fragment>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default Messages;
