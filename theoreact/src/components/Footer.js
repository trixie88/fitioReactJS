import React, { Component } from 'react'

export class Footer extends Component {
  render() {
    return (
        <footer id="main-footer" className="text-center p-4 bg-primary">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="text-center text-white">Copyright 2019 &copy; fit.io</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
