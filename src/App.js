import React, { Component } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import {
  Card,
  CardTitle,
  CardBody,
  Input,
  Button,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import "./App.css";

class App extends Component {
  state = {
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
  };

  markers = localStorage.getItem("markers")
    ? JSON.parse(localStorage.getItem("markers"))
    : [];

  // TODO: Add a second page with a list view of all the markers!

  newMarkerCreation = (e) => {
    this.setState({
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
    });
  };

  locationSelected = (e, marker) => {
    this.setState({
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
    });
  };

  formSubmitted = (e) => {
    e.preventDefault();

    const newLoc = this.state.newLocation;
    newLoc.position = [this.state.lat, this.state.lng];
    this.markers.push(newLoc);
    localStorage.setItem("markers", JSON.stringify(this.markers));

    this.setState((prevState) => ({
      lat: prevState.lat,
      lng: prevState.lng,
      zoom: 18,
      newMarkerOpacity: 0.0,
      activeLocation: this.state.newLocation,
      addingNewPlace: false,
      newLocation: {
        title: "",
        description: "",
        rating: "",
      },
    }));
  };

  valueChanged = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      lat: prevState.lat,
      lng: prevState.lng,
      zoom: 18,
      newMarkerOpacity: prevState.newMarkerOpacity,
      activeLocation: prevState.activeLocation,
      addingNewPlace: true,
      newLocation: {
        ...prevState.newLocation,
        [name]: value,
      },
    }));
  };

  render() {
    const position = [this.state.lat, this.state.lng];

    const markerItems = this.markers.map((marker) => (
      <Marker
        position={marker.position}
        key={marker.position[0] + marker.position[1]}
        onClick={(e) => this.locationSelected(e, marker)}
      ></Marker>
    ));

    return (
      <div>
        <Map
          center={position}
          zoom={this.state.zoom}
          className="map"
          onClick={this.newMarkerCreation}
          doubleClickZoom={false}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markerItems}
          <Marker
            position={position}
            key={position[0] + position[1]}
            opacity={this.state.newMarkerOpacity}
            className="activeMarker"
          ></Marker>
        </Map>
        <Card body className="messageCard shadow">
          <CardTitle>
            <h4>
              <span
                role="img"
                aria-label="coffee"
                style={{ display: "inline-block" }}
              >
                ☕
              </span>{" "}
              {this.state.addingNewPlace ? (
                <Input
                  onChange={this.valueChanged}
                  type="text"
                  name="title"
                  id="titleInput"
                  placeholder="New Coffee Place"
                />
              ) : (
                this.state.activeLocation.title
              )}
            </h4>
            <hr />
          </CardTitle>
          <CardBody className="card-inner">
            {this.state.addingNewPlace ? (
              <div>
                <Form onSubmit={this.formSubmitted}>
                  <FormGroup>
                    <Label for="ratingInput">Rating</Label>
                    <Input
                      onChange={this.valueChanged}
                      type="text"
                      name="rating"
                      id="ratingInput"
                      placeholder="0% - 100%"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="descriptionInput">Description</Label>
                    <Input
                      onChange={this.valueChanged}
                      type="textarea"
                      name="description"
                      id="descriptionInput"
                      placeholder="Really great lattes!"
                    />
                  </FormGroup>
                  <Button
                    type="submit"
                    disabled={
                      !this.state.newLocation.title ||
                      !this.state.newLocation.rating ||
                      !this.state.newLocation.description
                    }
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            ) : this.state.activeLocation.rating ? (
              <>
                <div className="star-ratings-sprite">
                  <span
                    style={{ width: this.state.activeLocation.rating }}
                    className="star-ratings-sprite-rating"
                  ></span>
                </div>
                <span>{this.state.activeLocation.description}</span>
              </>
            ) : (
              <>
                <span>Favorite coffee places in Tartu.</span>
                <br />
                <Button
                  type="button"
                  outline
                  size="sm"
                  className="mt-3 mr-2"
                  onClick={() => {
                    const insertedRawUnsanitizedTotallySafeList = prompt(
                      "Insert list of locations (stringified JSON):"
                    );

                    if (insertedRawUnsanitizedTotallySafeList === null) {
                      return;
                    }

                    localStorage.setItem(
                      "markers",
                      insertedRawUnsanitizedTotallySafeList
                    );
                    window.location.replace("/");
                  }}
                >
                  Load List
                </Button>
                <Button
                  type="button"
                  outline
                  size="sm"
                  className="mt-3"
                  color="danger"
                  onClick={() => {
                    localStorage.clear();
                    window.location.replace("/");
                  }}
                >
                  Delete All
                </Button>
              </>
            )}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default App;
