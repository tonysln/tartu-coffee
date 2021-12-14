import React from "react";
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


function Menu({ state, setState }) {
    const formSubmitted = (e) => {
        e.preventDefault();
    
        const newLoc = state.newLocation;
        newLoc.position = [state.lat, state.lng];
        state.markers.push(newLoc);
        localStorage.setItem("markers", JSON.stringify(state.markers));
    
        setState((prevState) => ({
          lat: prevState.lat,
          lng: prevState.lng,
          zoom: 18,
          newMarkerOpacity: 0.0,
          activeLocation: state.newLocation,
          addingNewPlace: false,
          newLocation: {
            title: "",
            description: "",
            rating: "",
          },
          markers: prevState.markers
        }));
    };
    
    const valueChanged = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
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
          markers: prevState.markers
        }));
    };


    return (
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
              {state.addingNewPlace ? (
                <Input
                  onChange={valueChanged}
                  type="text"
                  name="title"
                  id="titleInput"
                  placeholder="New Coffee Place"
                />
              ) : (
                  state.activeLocation.title
                )}
            </h4>
            <hr />
           </CardTitle>
          <CardBody className="card-inner">
            {state.addingNewPlace ? (
              <div>
                <Form onSubmit={formSubmitted}>
                  <FormGroup>
                    <Label for="ratingInput">Rating</Label>
                    <Input
                      onChange={valueChanged}
                      type="text"
                      name="rating"
                      id="ratingInput"
                      placeholder="0% - 100%"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="descriptionInput">Description</Label>
                    <Input
                      onChange={valueChanged}
                      type="textarea"
                      name="description"
                      id="descriptionInput"
                      placeholder="Really great lattes!"
                    />
                  </FormGroup>
                  <Button
                    type="submit"
                    disabled={
                      !state.newLocation.title ||
                      !state.newLocation.rating ||
                      !state.newLocation.description
                    }
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            ) : state.activeLocation.rating ? (
              <>
                <div className="star-ratings-sprite">
                  <span
                    style={{ width: state.activeLocation.rating }}
                    className="star-ratings-sprite-rating"
                  ></span>
                </div>
                <span>{state.activeLocation.description}</span>
              </>
            ) : (
                  <>
                    <span>Favorite coffee places in Tartu.</span>
                    <br />
                    <Button
                      type="button"
                      outline
                      size="sm"
                      className="mt-3 mr-2 mb-2"
                      onClick={() => {
                        const storageList = prompt(
                          "Insert list of locations (stringified JSON):"
                        );

                        if (!storageList)
                          return;

                        localStorage.setItem(
                          "markers",
                          storageList
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
                      className="mt-3 mb-2"
                      color="danger"
                      onClick={() => {
                        localStorage.clear();
                        window.location.replace("/");
                      }}
                    >
                      Delete All
                </Button>
                    <br />
                    <span className="text-muted small" style={{ opacity: "0.6" }}>
                      Created by{" "}
                      <a
                        className="text-muted"
                        style={{ textDecoration: "underline" }}
                        href="https://github.com/tonysln"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Anton
                  </a>
                    </span>
                  </>
                )}
          </CardBody>
        </Card>
    );
};

export default Menu;