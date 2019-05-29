import React, { Component } from 'react';
import Board from './Board/Board.js';
import Timer from './Timer/Timer.js'
import Submit from "./Submit/Submit.js"

import './App.css';

class App extends Component {

  state = {
    diceArray: null,
    lastClick: null,
    currentWord: "",
    wordList: [],
    timerIsRunning: true
  }

  componentDidMount = () => {
    fetch('/new')
    .then(data=>data.json())
    .then(data=>{
      this.setState({
        diceArray: data,
      })
    })
  }

  timerIsDone = () => {
    this.setState({
      timerIsRunning: false
    })
  }

  getLetterFromClick = (letter) => {
    this.setState({
        currentWord : this.state.currentWord + letter
    })
}
setLastClick = (index) => {
  this.setState({
      lastClick: index
  })
}

  submit = () => {
    let wordListCopy = [...this.state.wordList]
    wordListCopy.push(this.state.currentWord)
    this.setState({
      wordList: wordListCopy,
      lastClick: null,
      currentWord: ""
    })
    Array.from(document.getElementsByClassName("die")).forEach( letter => {
          letter.classList.remove('lastClicked');
          letter.classList.remove('clicked')
    })
  }

  render(){
  return(
  <div class="column">
    <Timer
      timerIsDone={this.timerIsDone}
    />
    <Board
      diceArray = {this.state.diceArray}
      getLetterFromClick = {this.getLetterFromClick}
      setLastClick = {this.setLastClick}
      lastClick = {this.state.lastClick}
      //die is a child
    />
    <Submit
      currentWord = {this.state.currentWord}
      submit={this.submit}
      clearBoard={this.clearBoard}
    />
  </div>

  )
  }
}

export default App;
