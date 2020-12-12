import "../css/App.css";
import React, { Component } from "react";
import AddAppointments from "./AddAppointments";
import SearchAppointments from "./SearchAppointments";
import ListAppointments from "./ListAppointments";

class App extends Component {
  // Constructor is where we initialize things.
  constructor() {
    // Super allows us to get informationl
    super();
    this.state = {
      myAppointments: [],
      lastIndex: 0,
    };
  }

  // Use React lifecycle method componentDidMount to collect data.json info.
  componentDidMount() {
    fetch("./data.json")
      .then((response) => response.json())
      .then((result) => {
        // using JS map function here
        const apts = result.map((item) => {
          // aptId was added later on, and add lastIndex above in line 14
          item.aptId = this.state.lastIndex;
          this.setState({ lastIndex: this.state.lastIndex + 1 });

          return item;
        });
        this.setState({
          myAppointments: apts,
        });
      });
  }

  render() {
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments />
                <SearchAppointments />
                <ListAppointments appointments={this.state.myAppointments} />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
