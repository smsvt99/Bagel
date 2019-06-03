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
    return !target.classList.contains('clicked')
}
    
handleClick = (event) => {
    let index = Array.from(document.getElementsByClassName("die")).indexOf(event.target)
    if (this.props.clickIsAcceptable(index) && this.hasNotAlreadyBeenClicked(event.target)){
        this.colorClicks(event.target)
        this.props.setLastClick(index)
        this.props.getLetterFromClick(event.target.textContent);
    }
}
colorClicks = (target) => {
    Array.from(document.getElementsByClassName("die")).forEach( letter => {
        if (letter.classList.contains('lastClicked')){
            letter.classList.remove('lastClicked');
            letter.classList.add('clicked')
        }
    })
    target.classList.add('lastClicked')
}
handleDown = (event) => {
    let index = Array.from(document.getElementsByClassName("die")).indexOf(event.target)
    if (this.props.clickIsAcceptable(index) && this.hasNotAlreadyBeenClicked(event.target)){
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
                colorClicks={this.colorClicks}
                setLastClick = {this.props.setLastClick}
                getLetterFromClick = {this.props.getLetterFromClick}
                symbol={this.props.symbol}
            />
        </div>
    )
}
}


export default Die