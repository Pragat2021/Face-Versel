import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          sendLocationToDatabase(latitude, longitude);
        },
        (error) => {
          setMessage("Error fetching location: " + error.message);
        }
      );
    } else {
      setMessage("Geolocation is not supported by this browser.");
    }
  };

  const sendLocationToDatabase = async (latitude, longitude) => {
    try {
      const response = await axios.post("http://localhost:5000/api/location", {
        latitude,
        longitude,
      });
      setMessage("Location sent successfully!");
    } catch (error) {
      setMessage("Error sending location: " + error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Location Sender App</h1>
      <button onClick={getLocation}>Send My Location</button>
      {location && (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
