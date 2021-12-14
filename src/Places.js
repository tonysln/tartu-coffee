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
            <hr />
           </CardTitle>
          <CardBody className="card-inner">
            {state.markers.map((marker) => (
            <p
            key={marker.position[0] + marker.position[1]}
            >
             {marker.title}
             <br />
             <small>{marker.description}</small>
            </p>
            ))}
          </CardBody>
        </Card>
    );
};

export default Places;