import React from "react";

const submitStyle = {
    backgroundColor: "orange",
    borderRadius: "18px",
    border: "5px solid darkslategrey",
    width: "100%",
    height: "80px",
    fontSize: "57px",
    lineHeight: "80px",
    textAlign: "center",
    color: "darkslategrey",
    cursor: "pointer"
}

const upperCaseStyle = {
    height: "80px",
    width: '90px',
    fontSize: "57px",
    lineHeight: "80px",
    border: "5px solid darkgrey",
    backgroundColor : 'lightBlue',
    textAlign: 'center',
    color: "darkslategrey",
    cursor: "pointer",
    borderRadius: "18px",
    marginRight: '5px'
}

const Submit = (props) => {
    const upperCase = () => {
        if(props.currentWord){
            return props.currentWord[0] + props.currentWord[0].toUpperCase()
        } else {
            return "--"
        }
    }
    return(
    <div style={{display: 'flex', width: '441px'}}>
        <div onClick={props.upperFirst} style={upperCaseStyle}>{upperCase()}</div>
        <div 
            style={submitStyle}
            onClick={props.submit}
        >
            {props.currentWord}
        </div>
    </div>
    )
}

export default Submit;