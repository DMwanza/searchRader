// import React, { useEffect } from 'react';
// import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

// function Map() {
//   const mapStyles = {
//     height: '400px',
//     width: '100%',
//   };

//   const defaultCenter = {
//     lat: 40.712776,
//     lng: -74.005974,
//   };


//   return (
//     <LoadScript googleMapsApiKey="AIzaSyBaPcG3u0CdFBTHEYN8k-bKU3911d-DNhw">
//       <GoogleMap
//         mapContainerStyle={mapStyles}
//         zoom={10}
//         center={defaultCenter}
//       >
//         {/* Add markers for rental properties here */}
//         <Marker position={{ lat: -1.286389, lng: 36.817223 }} />
//       </GoogleMap>
//     </LoadScript>
//   );
// }
import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const Map = ({ filteredMarkers }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="map-container">
      <GoogleMap
        mapContainerStyle={{ height: "400px", width: "100%" }}
        zoom={10}
        center={{ lat: -1.2921, lng: 36.8219 }} // Default center
      >
        {filteredMarkers.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            // You can add more properties to the marker if needed
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;


