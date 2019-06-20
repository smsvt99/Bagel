import React, {Component} from 'react'; 

class MakeARoom extends Component
{
    state = {
        master: "",
        name: ""
    }
    handleMaster = (e) => {
        this.setState({
            master:e.target.value
        }) 
    } 
    handleName = (e) => {
        this.setState({
            name:e.target.value
        }) 
    }
    createRoom = () => {
        // this.props.hideStart();
        this.props.setMaster();
        this.props.multiplayer();
        // this.props.wait()
        this.props.socket.emit('newRoom', {
            master: this.state.master,
            name: this.state.name,
            public: false
        })
    }
    render()
    {
        return(
            <div id="startWrapper"
            style={this.props.styles.startWrapperStyle}>
               <div style={this.props.styles.screenStyle}></div>
               <div style={this.props.styles.startStyle}>
                   <h1 style={{textAlign : 'center'}}>New Room</h1>
                   <h2>Your Name:</h2>
                   <input 
                        type="text"
                        onChange={this.handleMaster}
                        value={this.state.master}
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
                        onClick = {this.createRoom}
                        >
                       Create
                   </div>
               </div>
           </div>
        )
    }
}

export default MakeARoom;