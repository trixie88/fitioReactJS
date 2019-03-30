import React, { Component } from 'react'

class ThreeSteps extends Component {
  render() {
    return (
      <section id="home-icons" class="pt-2">
        <p class="text-center h1 pb-3 font-weight-bold">Booty training in 3 easy steps!</p>
        <div class="container">
          <div class="row">
            <div class="col-md-4 mb-4 text-center">
              <i class="fas fa-search fa-5x mb-2"></i>
              <h3>Search for the personal trainer you need</h3>
              <p>Use the filters to find a personal trainer of the specialty you need in your area.</p>
            </div>
            <div class="col-md-4 mb-4 text-center">
              <i class="far fa-eye fa-5x mb-2"></i>
              <h3>View the trainer's profile</h3>
              <p>Read information about the trainer's experience and services they provide.</p>
            </div>
            <div class="col-md-4 mb-4 text-center">
              <i class="fas fa-check fa-5x mb-2"></i>
              <h3>Book your appointment in 1 minute for FREE</h3>
              <p>See the trainer's available hours, fill in your contact information and you're set!</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ThreeSteps;

