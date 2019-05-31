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
  componentDidUpdate = () => {
    if(!this.state.timerIsRunning){
      const options = {
        mode: 'no-cors',
        method: 'GET'
      };

      const queryString = "https://cors-anywhere.herokuapp.com/https://en.wiktionary.org/w/api.php?action=query&format=json&titles=" + this.state.wordList.join("|")
      fetch(queryString)
        .then(data=>data.json())
        .then(data=> {
          console.log(data)
          let results = [];
          Object.values(data.query.pages).forEach(value => {
            let result = {};
              result.lemma = value.title
            if(value.missing === "" || value.title.length < 3 ){
              result.score = 0
            } else {
              switch(value.title.length){
                case 3: result.score = 1; break;
                case 4: result.score = 1; break;
                case 5: result.score = 2; break;
                case 6: result.score = 3; break;
                case 7: result.score = 5; break;
                default: result.score = 11; break;
              }
            }
            results.push(result)
          })
          console.log(results)
      //   .then(data=>{
      //   this.setState({
      //     wiki: data,
      //   })
      // })
  })
}
  }

  timerIsDone = () => {
    this.setState({
      timerIsRunning: false
    })
  }

  getLetterFromClick = (letter) => {
    this.setState({
        currentWord : this.state.currentWord + letter.toLowerCase()
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
      timerIsRunning = {this.state.timerIsRunning}
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