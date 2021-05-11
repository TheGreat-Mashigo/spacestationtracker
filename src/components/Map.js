import React from "react";
import GoogleMapReact from "google-map-react";
import iss from "./images/iss.svg";
import { API } from "aws-amplify";

const MAP_KEY = process.env.GOOGLE_MAP_API_KEY;
console.log("55555555555555555555", MAP_KEY);
const img = <img src={iss} alt="iss" className="iss-icon" />;

const SpaceStation = ({ img }) => <div>{img}</div>;

class Map extends React.Component {
  state = {
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 4,
  };

  componentDidMount() {
    this.getCoordinates();
    this.interval = setInterval(this.getCoordinates, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getCoordinates = () => {
    try {
      API.get("trackerapi", "/location").then((res) => {
        this.setState({
          center: {
            lng: res.location.iss_position.longitude,
            lat: res.location.iss_position.latitude,
          },
        });
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    console.log("LAT:", this.state.center.lat);
    console.log("LNG:", this.state.center.lng);
    return (
      <div>
        <p>Latitude: {this.state.center.lat}</p>
        <p>Longitude: {this.state.center.lng}</p>
        <div className="map" style={{ height: "100vh", width: "100wh" }}>
          <GoogleMapReact
            className="map-container"
            bootstrapURLKeys={{
              key: "AIzaSyA74VUGQbcHcp8oEU-DkKY960sPVmGApic",
            }}
            // bootstrapURLKeys={{ key: process.env.GOOGLE_MAP_API_KEY}}
            center={this.state.center}
            zoom={this.state.zoom}
          >
            <SpaceStation
              className="iss-icon"
              lat={this.state.center.lat}
              lng={this.state.center.lng}
              img={img}
            />
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default Map;
