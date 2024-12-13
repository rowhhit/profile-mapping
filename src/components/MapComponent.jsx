import React from "react";
import { Map, Marker } from "react-map-gl";

const MapComponent = ({ latitude, longitude }) => (
  <Map
    initialViewState={{
      latitude: latitude || 37.7749,
      longitude: longitude || -122.4194,
      zoom: 10
    }}
    style={{ width: "100%", height: "400px" }}
    mapStyle="mapbox://styles/mapbox/streets-v11"
    mapboxAccessToken="pk.eyJ1Ijoicm93aGl0MTIwNCIsImEiOiJjbTRrNWVlaTIwNWZlMmtzaGg1dXcxMzh4In0.c-zERmLr9TL3w4KshWqtHQ"
  >
    <Marker latitude={latitude} longitude={longitude} />
  </Map>
);

export default MapComponent;
