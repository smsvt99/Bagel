import React, { Component } from 'react';

class Score extends Component {
    scoreStyle = {             //ul
        marginTop: '40px',
        width: '80%',
        height: '60%',
        backgroundColor: 'whiteSmoke',
        borderRadius: "18px",
        listStyle: 'none',
        padding: '5px',
        margin: 'auto',
        color: 'darkSlateGrey',
        border: '2px solid darkGrey',
        overflow: 'auto'
    }

    scoreWrapperStyle = {
        opacity: '0',
        textAlign: 'center',
        width: '450px',
        height: '450px',
        fontSize: '30px',
        borderRadius: "18px",
        margin: "auto",
        border: "5px solid darkgrey",
        backgroundColor: "lightblue",
        position: 'absolute',
        top: '500px',
        zIndex: '11',
        transition: 'opacity .5s, top .5s',
        boxShadow: '-10px 10px 7px darkslate grey'
    }
    screenStyle = {
        opacity: '0',
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        position: 'fixed',
        zIndex: '10',
        top: '0px',
        left: '0px',
        transition: "opacity .5s",
    }
    otherWrapperStyle = {
        position: 'relative'
    }
    headerStyle = {
        margin: '20px'
    }
    red = {
        color: 'red',
    }
    spacer = {
        display: 'inline-block',
        width: '26%'
    }
    aSpacer = {
        display: 'inline-block',
        width: '26%',
        fontSize: "26px",
        color: 'darkSlateGrey'
    }
    strike = {
        textDecoration: 'line-through',
        display: 'inline-block',
        width: '26%'
    }


    componentDidUpdate = () => {
        //This timeout by necessity
        setTimeout(() => {
            if (document.getElementById('screen')) {
                document.getElementById('screen').style.opacity = ".8";
                document.getElementById('scores').style.opacity = "1";
                document.getElementById('scores').style.top = '1px';
            }
        }, 200)
    }
    next = () => {
        document.getElementById('scores').style.opacity = "0";
        document.getElementById('scores').style.top = '-500px';
        setTimeout(() => {
            this.props.backToWait()
        }, 500)
    }
    render() {
        let caboose;
        if (this.props.singlePlayer) {
            caboose = <a style={{ color: 'darkSlateGrey', fontSize: '22px', marginBottom: '20px' }} href="javascript:;" onClick={() => { this.props.socket.emit('requestBoardForSingle'); this.props.beginTimer(); }}>Play Again?</a>;
        }
        else
            caboose = <a
                style={{ color: 'darkSlateGrey', fontSize: '22px', marginBottom: '20px' }}
                href="javascript:;"
                onClick={this.next}
            >
                Next
                    </a>

        if (this.props.scoreInfo) {
            let list = [];
            let sum = 0;
            this.props.scoreInfo.forEach(word => {
                sum += word.score
                let linkText;
                if (word.score > 0) {
                    linkText = "definition"
                } else {
                    linkText = ""
                }

                list.push(
                    <li
                        style={word.score <= 0 ? this.red : null}>
                        <span style={word.score <= 0 ? this.strike : this.spacer}>
                            {word.lemma}
                        </span>
                        <span style={this.spacer}>
                            {word.score}
                        </span>
                        <a
                            href={"https://en.wiktionary.org/wiki/" + word.lemma}
                            target="_blank"
                            style={this.aSpacer}
                        >
                            {linkText}
                        </a>
                    </li>)
            })
            list.push(<hr style={{ width: '75%' }} />)
            list.push(<h1>Total: {sum}</h1>)
            list.push(<hr style={{ width: '75%' }} />)
            list.push(caboose)
            return (
                <div style={this.otherWrapperStyle}>
                    <div id="screen" style={this.screenStyle}></div>
                    <div id="scores" style={this.scoreWrapperStyle}>
                        <h1 style={this.headerStyle}>Score</h1>
                        <ul style={this.scoreStyle}>
                            {list}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }
}

export default Score;