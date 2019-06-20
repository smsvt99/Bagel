import React, { Component } from 'react';

const titleStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "440px",
    alignItems: 'flex-end'
}
const deleteStyle = {
    border: "3px solid darkGrey",
    width: "40px",
    height: "40px",
    backgroundColor: "orangeRed",
    textAlign: "center",
    borderRadius: "50%",
    color: "whitesmoke",
    fontSize: '30px',
    lineHeight: '40px',
    marginRight: '5px',
    cursor: 'pointer'
}
const timerStyle = {
    border: "5px solid darkgrey",
    padding: "5px",
    width: "90px",
    backgroundColor: "lightblue",
    textAlign: "center",
    borderRadius: "8px",
    color: "whitesmoke"
}
const nameStyle = {
    // paddingTop: "15px"
}

class Timer extends Component {
    state = {
        time: 180,
        timerBegun: false
    }
    componentDidUpdate = () => {
        if (this.props.beginTimer && !this.state.timerBegun) {
            // Poorly planned design, but will do for now. Three booleans control the functionality of the timer: App.state.timerIsRunning, App.state.beginTimer, and Timer.state.timerBegun. Two initialized at false but, despite the name, TIMERISRUNNING INITIALIZED AS TRUE

            //SINGLE PLAYER
            //Start.js changes beginTimer to true when the board is requested from the server.
            //That causes an update to Timer.js which then runs this function, flipping timerBegin to true and beginning the recursive tick function. This is to prevent that function being called more than once: only start the tick if it's not already going.
            //when the count reaches zero, the time is reset, and all three booleans return to false, BUT TIMERISRUNNING IS SET IMMEDIATED BACK TO TRUE
            //When timerIsRunning changes from True to False, App.js fires the "big function" which fetches from the API and renders Scores.js
            //Scores.js


            this.setState({ timerBegun: true })
            let myTimeout = setTimeout(() => {
                this.tick()
            }, 1000)
        }
    }
    tick = () => {
        let timeout;
        if (this.state.time > 0) {
            this.setState({
                time: this.state.time - 1
            }, () => {
                if (this.state.time !== 0)
                    timeout = setTimeout(this.tick, 1000)
                else {
                    this.setState({
                        time: 180,
                        timerBegun: false
                    })
                    if (this.props.singlePlayer)
                        this.props.timerIsDone()
                        Array.from(document.getElementsByClassName("die")).forEach( letter => {
                            letter.classList.remove('lastClicked');
                            letter.classList.remove('clicked');
                        })
                }
            })
        }
        // else {
        //     clearTimeout(timeout)
        //     this.setState({
        //         time:10,
        //         timerBegun: false
        //     })
        //     if(this.props.singlePlayer)
        //         this.props.timerIsDone()
        // }
    }
    render() {
        return (
            <div style={titleStyle}>
                <h1 style={nameStyle}>Polyglot</h1>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <div onClick={this.props.clear} style={deleteStyle}>X</div>
                    <h1 style={timerStyle}>{this.state.time}</h1>
                </div>
            </div>
        )
    }
}

export default Timer