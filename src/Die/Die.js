import React, { Component } from 'react';

const dieStyle = {
    display: "inline",
    border: "5px solid darkgrey",
    width: "90px",
    height: "90px",
    borderRadius: "8px",
    lineHeight: "90px",
    textAlign: "center",
    fontSize: "57px",
    margin: "4px",
    backgroundColor: "whitesmoke",
    cursor: "pointer",
    color: "darkslategrey",
    fontFamily: "'Sniglet', cursive"

}

class Die extends Component {

hasNotAlreadyBeenClicked = (target) => {
    if(!target.classList.contains('clicked')){
        return true
    } else {
        return false
    }
}
    
handleClick = (event) => {
    let index = Array.from(document.getElementsByClassName("die")).indexOf(event.target)
    if (this.props.clickIsAcceptable(index) && this.hasNotAlreadyBeenClicked(event.target)){
        Array.from(document.getElementsByClassName("die")).forEach( letter => {
            if (letter.classList.contains('lastClicked')){
                letter.classList.remove('lastClicked');
                letter.classList.add('clicked')
            }
        })
        event.target.classList.add('lastClicked')
        this.props.setLastClick(index)
        this.props.getLetterFromClick(event.target.textContent);
    }
}
render = () => {
    return (
        <div
            className="die"
            style={dieStyle}
            onClick={this.handleClick}
        >
            {this.props.symbol.toUpperCase()}
        </div>
    )
}
}


export default Die