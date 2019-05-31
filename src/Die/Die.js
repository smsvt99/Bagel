import React, { Component } from 'react';
import Diacritics from '../Diacritics/Diacritics.js'

const dieStyle = {
    // display: "inline",
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
    fontFamily: "'Sniglet', cursive",
    transition: "background-color .2s"
}

const wrapperStyle = {
    position: 'relative'
}

class Die extends Component {

    state = {
        showOptions: false
    }

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
handleDown = (event) => {
    let options = event.target.nextSibling;
    this.setState({showOptions:true})
    setTimeout(()=>{
        if(this.state.showOptions){
            options.style.visibility = "initial";
            options.style.top = "0px";
            options.style.opacity = '1';
        }
    },200);
    
    document.getElementsByTagName('body')[0].addEventListener('mouseup', ()=>this.clear(options));

}

clear = (element) => {
    this.setState({showOptions: false})
    element.style.visibility='hidden';
    element.style.top = "-30px";
    element.style.opacity = '0'
}

render = () => {
    return (
        <div style={wrapperStyle}>
            <div
                className="die"
                style={dieStyle}
                onMouseDown={this.handleDown}
                onMouseUp={this.handleClick}
            >
                {this.props.symbol.toUpperCase()}
            </div>
            <Diacritics
                // parent={this.props.key}
                symbol={this.props.symbol}
            />
        </div>
    )
}
}


export default Die