import React, { Component } from 'react';
import Die from '../Die/Die.js';

const rowStyle = {
    display: "flex",
    flexDirection: "row"
}

const boardStyle = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: "lightblue",
    padding: "4px",
    borderRadius: "18px",
    margin: "5px",
    border: "5px solid darkgrey"
}

class Board extends Component {

    //move this back to Die.js, change to 'adjacent', use ...syntax instead of push
    clickIsAcceptable = (index) => {
        if(!this.props.timerIsRunning){
            return false
        }

        if (!this.props.lastClick && this.props.lastClick != 0){
            console.log('first if, lastClick', this.props.lastClick)
            return true
        }

        let left = [0, 4, 8, 12]
        let right = [3, 7, 11, 15]
        let lastClick = this.props.lastClick
        
        let acceptableClicks = [];
        acceptableClicks.push(lastClick + 4);
        acceptableClicks.push(lastClick - 4);

        if (!left.includes(lastClick)) {
            acceptableClicks.push(lastClick - 1);
            acceptableClicks.push(lastClick - 5);
            acceptableClicks.push(lastClick + 3);
        }
        if (!right.includes(lastClick)) {
            acceptableClicks.push(lastClick + 1);
            acceptableClicks.push(lastClick + 5);
            acceptableClicks.push(lastClick - 3);
        }
        if (acceptableClicks.includes(index)) {
            return true
        } else {
            return false
        }
    }
    // setLastClick = (index) => {
    //     this.setState({
    //         lastClick: index
    //     })
    // }
    // getLetterFromClick = (letter) => {
    //     this.setState({
    //         currentWord : this.state.currentWord + letter
    //     })
    // }
    render() {
        let board = [];
        if (this.props.diceArray != null) {
            this.props.diceArray.forEach(innerArray => {
                let row = [];
                innerArray.forEach(letter => {
                    row.push(<Die
                        setLastClick={this.props.setLastClick} 
                        symbol={letter}
                        clickIsAcceptable={this.clickIsAcceptable}
                        getLetterFromClick = {this.props.getLetterFromClick}
                        />)
                })
                board.push(<div style={rowStyle}>{row}</div>)
            })
        }
        return <div style={boardStyle}>{board}</div>
    }

}

export default Board;