import React, { Component } from 'react';

class Wait extends Component {
    buttonStyle = {
        margin: "10px",
        backgroundColor: "whitesmoke",
        fontFamily: 'Sniglet, cursive',
        padding: '5px',
        fontSize: '22px',
        border: '2px solid darkGrey',
        cursor: 'pointer',
        color: 'darkslategrey',
        textAlign: 'center',
    }
    screenStyle = {
        opacity: '.9',
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        position: 'fixed',
        zIndex: '1000000',
        top: '0px',
        left: '0px',
    }
    boxStyle = {
        backgroundColor: 'palegoldenrod',
        width: '440px',
        left: '50%',
        top: '50%',
        transform: 'translateX(-50%) translateY(-50%) ',
        zIndex: '189347689',
        position: 'fixed',
        padding: '4px',
        borderRadius: "18px",
        border: "5px solid darkgrey"
    }
    loaderStyle = {
        textAlign: 'center',
        fontSize: '50px',
        color: 'darkslategrey'
    }
    whiteBoxStyle = {
        padding: '10px',
        margin: '20px',
        border: '2px solid darkgrey',
        borderRadius: '14px',
        backgroundColor: 'whitesmoke'
    }
    state = {
        dots: " . ",
    }
    componentDidMount = () => {
        setInterval(() => {
            if (this.state.dots.length >= 12)
                this.setState({
                    dots: " . "
                })
            else
                this.setState({
                    dots: this.state.dots + " . "
                })
        }, 1000)
    }
    masterStartGame = () => {
        this.props.socket.emit('masterStartGame', this.props.room)
    }
    render() {
        if (this.props.waiting) {
            if (this.props.gameMaster) {
                return (<div>
                    <div style={this.screenStyle}></div>
                    <div style={this.boxStyle}>
                        <h1
                            style={{ textAlign: 'center' }}
                        >
                            Polyglot
                        </h1>
                        <div
                            style={this.loaderStyle}
                            id="loader"
                        >
                            {this.state.dots}
                        </div>
                        <div style={this.whiteBoxStyle}>
                        <h2
                            style={{ textAlign: 'center' }}
                        >
                            Room: {this.props.room}
                        </h2>
                        
                            <h2>
                                Members:
                            </h2>
                            <ul>
                                {this.props.roomMates.map(mate => <li>{mate}</li>)}
                            </ul>
                        </div>
                        <div
                            style={this.buttonStyle}
                            className="startOption"
                            onClick={this.masterStartGame}
                            >
                                Start Game
                            </div>
                    </div>
                </div>)
            }
            else {
                return (<div>
                    <div style={this.screenStyle}></div>
                    <div style={this.boxStyle}>
                        <h1
                            style={{ textAlign: 'center' }}
                        >
                            Polyglot
                        </h1>
                        <div
                            style={this.loaderStyle}
                            id="loader"
                        >
                            {this.state.dots}
                        </div>
                        <div style={this.whiteBoxStyle}>
                        <h2
                            style={{ textAlign: 'center' }}
                        >
                            Room: {this.props.room}
                        </h2>
                        
                            <h2>
                                Members:
                            </h2>
                            <ul>
                                {this.props.roomMates.map(mate => <li>{mate}</li>)}
                            </ul>
                        </div>
                        <h2>Your Game Master ({this.props.gameMasterName}) will begin your game soon</h2>
                    </div>
                </div>)
            }
        }
        else {
            return null;
        }
    }
}

export default Wait;