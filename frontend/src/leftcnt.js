import React from "react";
import "./styles/body.css";
const Left=(props)=>{
    return(<div id="about">
        <div id="left"><img src={props.img} alt={props.alt}></img></div>
        <div id="leftctnt">
            <h2>{props.topic}</h2>
            <p>{props.ctnt}</p>
        </div>
    </div>);
}
export default Left;