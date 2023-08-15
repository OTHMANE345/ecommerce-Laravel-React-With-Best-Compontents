import React from "react";
import {  Button } from "react-bootstrap"; // Importing Card and Button components from react-bootstrap
import './card-style.css';
import { Link } from 'react-router-dom';

const Card = props => {
  return (

    <div  className="card text-center">
      <div className="overflow">
        <img variant="top" src={`http://127.0.0.1:8000/${props.imgsrc}`} alt="image1" className="card-img-top"/>
        </div>
      <div className="card-body text-dark">
        <h4 className="card-title">
        {props.title}
        </h4>
        <p style={{height:'100px'}}>
        {props.description}
        </p>
        <Link className="btn btn-outline-success" to={'/showdetailsofproduct/'+props.id } >Show more</Link>
      </div>
    </div>
  );
};

export default Card; // Exporting the corrected Card component
