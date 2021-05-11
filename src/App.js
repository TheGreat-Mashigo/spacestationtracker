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
