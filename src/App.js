// import React, { useEffect } from "react";
// // import React, { useEffect, useState } from "react";
// import Map from './components/map'
// import "./App.css";
// import moment from 'moment'

// import { API } from "aws-amplify";

// function App() {
//   // const [location, updateLocation] = useState()
//   // const [longitude, setLongitude] = useState();
//   // const [latitude, setLatitude] = useState();
  
//   // async function updateLocation(data){
//   //   setLatitude(parseFloat(latitude));
//   //         // setLongitude(parseFloat(longitude));
//   // }

//   useEffect(() => {
//     async function callApi() {
//       try {
//         const locationData = await API.get("trackerapi", "/location");
//         console.log("location data :", locationData);
//         // const { longitude, latitude } = await locationData.iss_position;
//         console.log(moment(locationData.location.timestamp).format("DD-MM-YYYY HH:mm:ss"))
//         if (locationData){
//           // console.log(longitude)
//           // console.log(latitude)
//           // setLatitude(parseFloat(latitude));
//           // setLongitude(parseFloat(longitude));
//         }
  
//         // console.log('location data :',JSON.stringify(locationData,null,2))
//         // console.log("********************:",location);
//         // updateLocation(locationData.location)
//       } catch (error) {
//         console.log("********************:", error);
//         console.log(error);
//       }
//     }
//     callApi();
//     const interval = setInterval(() => callApi(), 0000)
//         return () => {
//           clearInterval(interval);
//         }
    
//   }, []);
//   return (
//     <div className="App">
//       <h1>ISS Tracker</h1>
//       {
//         // <Map center={{ lat: latitude, lng: this.longitude }} />
//         <Map />
//       }
//     </div>
//   );
// }

// export default App;


import React from "react";
import Map from './components/Map'
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>ISS Tracker</h1>
      {
        <Map />
      }
    </div>
  );
}

export default App;
