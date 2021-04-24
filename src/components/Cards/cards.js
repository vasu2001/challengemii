import React from "react";
import "./cards.css";

const cards = () => {
    const shoot = () => {
        window.location = '/competition';
    }
    
  return (
    <div className="card" onClick={shoot}>
      <div className="content">
        <div>
          <p className="title">Hack The Space</p>
          <div style={{ position: "absolute", bottom: "10px", left: "25px" }}>
            <p className="startDate">Starts: April 16th, 2021</p>
            <p className="startDate">Ends: April 19th, 2021</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default cards;
