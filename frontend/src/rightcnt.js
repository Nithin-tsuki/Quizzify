import React from "react";
import "./styles/body.css";
const Right=(props)=>{
    return(<div id="about">
        <div id="leftctnt">
            <h2>{props.topic}</h2>
            <p>{props.ctnt}</p>
        </div>
        <div id="left" style={{paddingRight:10}}><img src={props.img}></img></div>
    </div>);
}
export default Right;