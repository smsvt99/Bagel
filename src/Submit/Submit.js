import React from "react";

const submitStyle = {
    backgroundColor: "orange",
    borderRadius: "18px",
    border: "5px solid darkslategrey",
    width: "441px",
    height: "80px",
    fontSize: "57px",
    lineHeight: "80px",
    textAlign: "center",
    color: "darkslategrey",
    fontFamily: "'Sniglet', cursive",
    cursor: "pointer"
}

const Submit = (props) => {
    return(
    <div 
        style={submitStyle}
        onClick={props.submit}
    >
        {props.currentWord}
    </div>)
}

export default Submit;