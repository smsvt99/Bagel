import React, {Component} from 'react'; 

class Wait extends Component
{
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
        minWidth: '440px',
        left: '50%',
        top: '50%',
        transform: 'translateX(-50%) translateY(-50%) ',
        zIndex: '189347689',
        position: 'fixed',
        padding: '4px',
        borderRadius: "18px",
        border: "5px solid darkgrey"
    }
    render()
    {
        if(this.props.waiting)
        {
            if(this.props.gameMaster)
            {

            }
            else
            {
                return(<div>
                    <div style={this.screenStyle}></div>
                    <div style={this.boxStyle}>
                        <h1>Polyglot</h1>
                        <h2>{this.props.roomName}</h2>
                        <h2>{this.props.gameMasterName}, will </h2>
                    </div>
                </div>)
            }
        }
        else
        {
            return null;
        }
    }
}

export default Wait;