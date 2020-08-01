import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class TrainerResult extends Component {
  render() {
    const { firstName, lastName, price } = this.props.trainer;
    return (
      <div className="container-fluid py-1">
        <div className="container">
          <div className="row bg-light border">
            <div className="col-lg-3 border-right text-center pt-5">
              <img className="img-fluid" src={this.props.trainer.photoLink} alt="Profile Picture" style={{ width: "170px" }} />
            </div>
            <div className="col-lg-3 pt-4 px-4 border-right">
              <h4 className="text-primary">
                {firstName} {lastName}
              </h4>
              {this.props.trainer.trainingTypes.map(trainingType => {
                return <p>{trainingType.title}</p>;
              })}
            </div>
            <div className="col-lg-3 pt-4 px-4 border-right">
              <p className="card-text">
                <i className="fas fa-wallet" /> {price}&euro;
              </p>
              <p className="card-text">

                <i className="far fa-calendar-alt">
                  <Link to={`/trainersCalendar/${this.props.trainer.id}`}>
                    Available Dates
                  </Link>
                </i>
              </p>
              <p className="card-text">
                <i className="fas fa-map-marked-alt" /> Three Laloun 101,
                PETRALONA, ATTIKI
              </p>
            </div>
            <div className="col-lg-3 p-5">
              <Link to={`/profile/${this.props.trainer.id}`} className="btn btn-primary btn-block">
                Go to Profile
              </Link>
              <button type="button" className="btn btn-danger btn-block">
                CANCEL <i className="fas fa-ban" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(TrainerResult);
