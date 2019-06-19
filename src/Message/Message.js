import React, {Component} from 'react';

class Message extends Component{

    messageStyle = {
        position: "fixed",
        top: "-20px",
        opacity: "0",
        transition: "top .5s, opacity .5s",
        zIndex: '43567586975847365245786',
        backgroundColor: 'whitesmoke',
        color: 'darkslategrey',
        width: '100%',
        textAlign: 'center'
        }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.message.length > 1) {
            let message = document.getElementById("message");
            message.style.top = "-20px";
            message.style.opacity = "0";
            //strange, but apparently necessary
            message.style.top = "0px";
            message.style.opacity = "1"
  
            setTimeout(()=>{
              message.style.top = "-20px";
              message.style.opacity = "0";

              setTimeout(()=>{
                  this.props.clearMessage();
              },500)
            },5000)
        }
      }

    render(){
        return(
            <div
                style={this.messageStyle}
                id="message"
            >{this.props.message}</div>
        )
    }
    
}

export default Message