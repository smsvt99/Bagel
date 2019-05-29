import React, {Component} from 'react';

const titleStyle= {
    display: "flex",
    justifyContent: "space-between",
    width: "440px",
    alignContent: "baseline"
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
    paddingTop: "15px"
}

class Timer extends Component{
    state = {
        time: 120
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
            <h1 style={nameStyle}>Bagel</h1>
            <h1 style={timerStyle}>{this.state.time}</h1>
        </div>
    )
    }
}

export default Timer