import React from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import Menu from './Menu';
import "./App.css";

function App() {
  // TODO: Hooks
  const state = {
    lat: 58.380745,
    lng: 26.725872,
    zoom: 15,
    newMarkerOpacity: 0.0,
    activeLocation: {
      title: "Tartu Coffee",
      description: "",
      rating: "",
    },
    addingNewPlace: false,
    newLocation: {
      title: "",
      description: "",
      rating: "",
    },
    markers: localStorage.getItem("markers")
    ? JSON.parse(localStorage.getItem("markers"))
    : []
  };
  
  const newMarkerCreation = (e) => {
    this.setState((prevState) => ({
      lat: e.latlng.lat,
      lng: e.latlng.lng,
      zoom: 18,
      newMarkerOpacity: 0.75,
      activeLocation: {
        title: "Add New Place",
        description: "",
        rating: "",
      },
      addingNewPlace: true,
      newLocation: {
        title: "",
        description: "",
        rating: "",
      },
      markers: prevState.markers
    }));
  };

  const locationSelected = (e, marker) => {
    this.setState((prevState) => ({
      lat: e.latlng.lat,
      lng: e.latlng.lng,
      zoom: 18,
      newMarkerOpacity: 0.0,
      activeLocation: {
        title: marker.title,
        description: marker.description,
        rating: marker.rating,
      },
      addingNewPlace: false,
      newLocation: {
        title: "",
        description: "",
        rating: "",
      },
      markers: prevState.markers
    }));
  };

  const position = [state.lat, state.lng];

  return (
    <div>
      <Map
        center={position}
        zoom={state.zoom}
        className="map"
        onClick={newMarkerCreation}
        doubleClickZoom={false}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {state.markers.map((marker) => (
          <Marker
            position={marker.position}
            key={marker.position[0] + marker.position[1]}
            onClick={(e) => locationSelected(e, marker)}
          ></Marker>
        ))}
        <Marker
          position={position}
          key={position[0] + position[1]}
          opacity={state.newMarkerOpacity}
          className="activeMarker"
        ></Marker>
      </Map>
      <Menu state={state} />
    </div>
  );
}

export default App;
