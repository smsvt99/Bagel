import React, {Component} from 'react'; 
import JoinARoom from '../JoinARoom/JoinARoom'
import MakeARoom from '../MakeARoom/MakeARoom'

class Start extends Component{ 
    styles = {
    optionStyle : {
        margin: "10px",
        backgroundColor: "whitesmoke",
        fontFamily: 'Sniglet, cursive',
        padding: '5px',
        fontSize: '22px',
        border: '2px solid darkGrey',
        cursor: 'pointer',
        color: 'darkslategrey',
        textAlign: 'center',
    },
    screenStyle : {
        opacity: '.9',
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        position: 'fixed',
        zIndex: '1000000',
        top: '0px',
        left: '0px',
    },
    startStyle : {
        backgroundColor: 'palegoldenrod',
        minWidth: '440px',
        left: '50%',
        top: '50%',
        transform: 'translateX(-50%) translateY(-50%) ',
        zIndex: '189347689',
        position: 'fixed',
        padding: '4px',
        borderRadius: "18px",
        border: "5px solid darkgrey"
    },
    startWrapperStyle : {
        opacity : 1,
        transition : "opacity 1s", 
        zIndex: 14,
    }
}


    state = {
        makeARoom: false,
        joinARoom: false,
    }


    render()
    {
    if(this.props.showStart)
    {
        if(this.state.makeARoom)
        {
            return <MakeARoom
                        styles={this.styles}
                        socket={this.props.socket}
                        hideStart={this.props.hideStart}
                        setMaster = {this.props.setMaster}
                        wait = {this.props.wait}
                        multiplayer = {this.props.multiplayer}
                    />
        }
        else if(this.state.joinARoom)
        {
            return <JoinARoom
                        styles={this.styles}
                        socket={this.props.socket}
                        hideStart={this.props.hideStart}
                        setMaster = {this.props.setMaster}
                        wait = {this.props.wait}
                        multiplayer = {this.props.multiplayer}
                    />
        }
        else 
        {
            return (
                <div id="startWrapper"
                 style={this.styles.startWrapperStyle}>
                    <div style={this.styles.screenStyle}></div>
                    <div style={this.styles.startStyle}>
                        <h1 style={{textAlign : 'center'}}>Polyglot</h1>
                        <div 
                            style={this.styles.optionStyle} 
                            className="startOption"
                            onClick = {()=>{
                                this.setState({
                                    makeARoom : true
                                })
                            }}
                        >
                            Make a Room
                    </div>
                        <div
                            style={this.styles.optionStyle} className="startOption"
                            onClick = {()=>{
                                this.setState({
                                    joinARoom : true
                                })
                            }}
                            >
                            Join a Room
                    </div>
                        <div 
                            style={this.styles.optionStyle}
                            className="startOption"
                            onClick={()=>{
                                this.props.beginTimer();
                                this.props.hideStart();
                            }}
                            >
                            Play Alone
                    </div>
                    </div>
                </div>
            )
        }
    }
    else 
    {
        return null;
    }
}
}


export default Start;