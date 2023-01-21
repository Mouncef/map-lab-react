import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from "./components/Map";

class App extends Component {

    constructor(props) {

        super(props);

        this.state = {
            defaultPlace: {
                lat: '',
                lng: ''
            }
        };

    }
    componentDidMount() {
        if ("geolocation" in navigator) {

            console.log("Available");
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                        defaultPlace: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                },

                (error) => {

                    console.error("Error Code = " + error.code + " - " + error.message);

                }
            );


            /*navigator.geolocation.watchPosition(function(position) {

                console.log("Latitude is :", position.coords.latitude);

                console.log("Longitude is :", position.coords.longitude);

            },

                function(error) {

                    console.error("Error Code = " + error.code + " - " + error.message);

                });*/
        }
        else {

            console.log("Not Available");

        }
    }

    render() {
    return (
      <div className="App">
        <div className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
            {
                this.state.defaultPlace.lat !== '' && this.state.defaultPlace.lng !== ''  && <Map defaultPlace={this.state.defaultPlace}/>
            }
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
