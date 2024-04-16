import React from "react";
import "./Reviewsbar.css";
import { useNavigate } from "react-router-dom";

export default function Reviewsbar({onClick, title}) {

  return (
    <div className="reviewBorder" onClick={onClick}>
      <div className="single-graph margin">
        <span className="graphTitle">{title}</span>
        <div
          className="graph"
          data-name="Completed"
          style={{
            "--percentage": 90,
            "--fill": "#0669AD",
          }}
        ></div>
        <div className="graph" data-name="Average"
          style={{
            "--percentage": 60,
            "--fill": "#E62A39",
          }}>
        </div>
        <div className="graph" data-name="Low"
          style={{
            "--percentage": 30,
            "--fill": "#FEDA3E",
          }}>
        </div>
      </div>
      <div className="identifier">
        <div className="eachCard">
          <span className="eachBox" style={{ backgroundColor: '#0669AD' }}></span>
          <span className="eachBoxTitle">Completed</span>
        </div>
        <div className="eachCard">
          <span className="eachBox" style={{ backgroundColor: '#E62A39' }}></span>
          <span className="eachBoxTitle">Average</span>
        </div>
        <div className="eachCard">
          <span className="eachBox" style={{ backgroundColor: '#FEDA3E' }}></span>
          <span className="eachBoxTitle">Low</span>
        </div>
      </div>
    </div>
  );
}
