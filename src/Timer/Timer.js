import React, {Component} from 'react';

const titleStyle= {
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

class Timer extends Component{
    state = {
        time: 20
    }
    componentDidMount = () => {
        setTimeout(()=>{
            this.tick()
        }, 1000)
    }
    tick = () => {
        if (this.state.time > 0){
            this.setState({
                time: this.state.time - 1
            }, ()=>{
                setTimeout(this.tick, 1000)
            })
        } else {
            this.props.timerIsDone()
        }
    }
    render(){
    return(
        <div style={titleStyle}>
            <h1 style={nameStyle}>Polyglot</h1>
            <div style={{display: 'flex', alignItems: 'flex-end'}}>
                <div onClick={this.props.clear} style={deleteStyle}>X</div>
                <h1 style={timerStyle}>{this.state.time}</h1>
            </div>
        </div>
    )
    }
}

export default Timer