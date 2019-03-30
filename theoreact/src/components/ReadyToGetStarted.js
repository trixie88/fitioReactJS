import React, { Component } from 'react'

class ReadyToGetStarted extends Component {
  render() {
    return (
      <React.Fragment>
                 <section id="home-heading" class="p-5">
                    <div class="dark-overlay">
                    <div class="row">
                        <div class="col">
                        <div class="container pt-5">
                            <h1>Are You Ready To Get Started?</h1>
                            <p class="hidden-sm-down"></p>
                        </div>
                        </div>
                    </div>
                    </div>
                </section>

                {/* <!-- BOXES WITH STATS --> */}
                <section id="boxes" class="py-5">
                    <div class="container">
                    <div class="row">
                        <div class="col-md-3">
                        <div class="card text-center card-outline-primary">
                            <div class="card-block">
                            <h3 class="text-primary pt-2">500</h3>
                            <p>Personal Trainers</p>
                            </div>
                        </div>
                        </div>

                        <div class="col-md-3">
                        <div class="card text-center card-outline-primary">
                            <div class="card-block">
                            <h3 class="text-primary pt-2">37,000</h3>
                            <p>Registered Users</p>
                            </div>
                        </div>
                        </div>

                        <div class="col-md-3">
                        <div class="card text-center card-outline-primary">
                            <div class="card-block">
                            <h3 class="text-primary pt-2">33</h3>
                            <p>Workout Specialties</p>
                            </div>
                        </div>
                        </div>

                        <div class="col-md-3">
                        <div class="card text-center card-outline-primary">
                            <div class="card-block">
                            <h3 class="text-primary pt-2">1567</h3>
                            <p>Perfect Booties</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </section>

      </React.Fragment>
    );
  }
}

export default ReadyToGetStarted;
