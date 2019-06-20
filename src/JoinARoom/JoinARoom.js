import React, {Component} from 'react'; 

class JoinARoom extends Component
{
    state = {
        member: "",
        name: ""
    }
    handleMember = (e) => {
        this.setState({
            member:e.target.value 
        })
    } 
    handleName = (e) => {
        this.setState({
            name:e.target.value
        }) 
    }
    attemptJoin = () => {
        this.props.socket.emit('attemptJoin', {
            member: this.state.member,
            name: this.state.name,
        })
        this.props.multiplayer();
    }
    render()
    {
        return(
            <div id="startWrapper"
            style={this.props.styles.startWrapperStyle}>
               <div style={this.props.styles.screenStyle}></div>
               <div style={this.props.styles.startStyle}>
                   <h1 style={{textAlign : 'center'}}>Join Room</h1>
                   <h2>Your Name:</h2>
                   <input 
                        type="text"
                        onChange={this.handleMember}
                        value={this.state.member}
                        ></input>
                   <h2>Room Name:</h2>
                   <input 
                        type="text"
                        onChange={this.handleName}
                        value={this.state.name}    
                        ></input>
                   <div 
                        style = {this.props.styles.optionStyle}
                        className = "startOption"
                        onClick = {this.attemptJoin}
                        >
                       Join
                   </div>
               </div>
           </div>
        )
    }
}

export default JoinARoom;