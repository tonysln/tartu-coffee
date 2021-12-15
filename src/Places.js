import React from "react";
import {
    Card,
    CardTitle,
    CardBody
  } from "reactstrap";
import "./App.css";


function Places({ state }) {
    return (
        <Card body className="messageCard shadow places-card">
          <CardTitle>
            <h4>
                📍 My Places
            </h4>
           </CardTitle>
          <CardBody className="card-inner list-group">
            <ul className="list-group list-group-flush">
              {state.markers.map((marker) => (
              <li
              className="list-group-item"
              key={marker.position[0] + marker.position[1]}
              >
              <strong>{marker.title}</strong>
              <br />
              <small>{marker.description}</small>
              </li>
              ))}
            </ul>
          </CardBody>
        </Card>
    );
};

export default Places;