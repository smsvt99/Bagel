import React, { Component } from 'react';
import Board from './Board/Board.js';
import Timer from './Timer/Timer.js';
import Submit from './Submit/Submit.js';
import Start from './Start/Start.js'
import Wait from './Wait/Wait.js';
import Message from './Message/Message';
import socketIO from 'socket.io-client';
 
import './App.css';

class App extends Component {

  state = {
    beginTimer: false,
    currentWord: "",
    diceArray: null,
    displayStart: true,
    endpoint: 'http://localhost:8081',
    gameMaster: false,
    gameMasterName: null,
    lastClick: null,
    message: " ",
    room: null,
    roomMates: [],
    showStart: true,
    socket: null,
    timerIsRunning: true,
    waiting: false,
    wordList: [],
  }


  componentDidMount = () => {
    this.setState({
      socket : socketIO(this.state.endpoint)
    }, ()=>{
      this.state.socket.on('message', message => {
        this.setState({
          message: message
        })
      })
      this.state.socket.on('roomStatusUpdate', room => {
        this.setState({
          roomMates : room.roomMates,
          room : room.name,
          gameMasterName : room.masterName
        })
      })
      this.state.socket.on('serverStartGame', (array) => {
        this.setState({
          beginTimer: true,
          waiting: false,
          showStart: false,
          diceArray: array
        })
      })
      this.state.socket.on('serverStopTimer', ()=> {
        this.timerIsDone();
      })
    })

    // fetch('/new')
    //   .then(data => data.json())
    //   .then(data => {
    //     this.setState({
    //       diceArray: data,
    //     })
    //   })
  }

  componentWillUpdate = (nextProps, nextState) => {
    //only run this code when timerIsRunning changes from True to False
    if (nextState.timerIsRunning !== this.state.timerIsRunning && !nextState.timerIsRunning) {
      if (this.state.wordList.length) {
        let uniqueWordList = [...new Set(this.state.wordList)]
        const queryString = "https://cors-anywhere.herokuapp.com/https://en.wiktionary.org/w/api.php?action=query&format=json&titles=" + uniqueWordList.join("|")
        fetch(queryString)
          .then(data => data.json())
          .then(data => {
            let results = [];
            Object.values(data.query.pages).forEach(value => {
              let result = {};
              result.lemma = value.title
              if (value.missing === "") {
                result.score = -1
              } else if (value.title.length < 3) {
                result.score = 0
              }
              else {
                switch (value.title.length) {
                  case 3: result.score = 1; break;
                  case 4: result.score = 2; break;
                  case 5: result.score = 3; break;
                  case 6: result.score = 4; break;
                  case 7: result.score = 5; break;
                  default: result.score = 11; break;
                }
              }
              results.push(result)
            })
            this.setState({
              scoreInfo: results
            })
          })
        } else {
          this.setState({
            scoreInfo: [{lemma: '', score: ''}]
          })
        }
      }
    }

    timerIsDone = () => {
      this.setState({
        timerIsRunning: false
      })
    }

    getLetterFromClick = (letter) => {
      this.setState({
        currentWord: this.state.currentWord + letter.toLowerCase()
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
      Array.from(document.getElementsByClassName("die")).forEach(letter => {
        letter.classList.remove('lastClicked');
        letter.classList.remove('clicked')
      })
    }
    clear = () => {
      this.setState({
        lastClick: null,
        currentWord: ""
      })
      Array.from(document.getElementsByClassName("die")).forEach(letter => {
        letter.classList.remove('lastClicked');
        letter.classList.remove('clicked')
      })
    }
    upperFirst = () => {
      if(this.state.currentWord){
      this.setState({
        currentWord: this.state.currentWord[0].toUpperCase() + this.state.currentWord.slice(1, this.state.currentWord.length)
      })
    }
    }
    beginTimer = () => {
      this.setState({
        beginTimer:true
      })
    }
    hideStart = () => {
      document.getElementById("startWrapper").style.opacity = 0;
      setTimeout(()=>{
        this.setState({
          showStart: false
        })
      }, 1000) 
    }
    setMaster = () => {
      this.setState({
        gameMaster: true
      })
    }
    wait = () => {
      this.setState({
        waiting: true
      })
    }
    clearMessage = () => {
      this.setState({
        message:" "
      })
    }

    render(){
      return (
        <div className="column">
          <Message
            message={this.state.message}
            clearMessage={this.clearMessage}
          />
          <Wait
            waiting = {this.state.waiting}
            gameMaster = {this.state.gameMaster}
            gameMasterName = {this.state.gameMasterName}
            room = {this.state.room}
            roomMates = {this.state.roomMates}
            socket = {this.state.socket}
          />
          <Start
            beginTimer={this.beginTimer}
            showStart = {this.state.showStart}
            hideStart = {this.hideStart}
            socket = {this.state.socket}
            setMaster = {this.setMaster}
            wait = {this.wait}
          />
          <Timer
            beginTimer={this.state.beginTimer}
            timerIsDone={this.timerIsDone}
            clear={this.clear}
          />
          <Board
            diceArray={this.state.diceArray}
            getLetterFromClick={this.getLetterFromClick}
            setLastClick={this.setLastClick}
            lastClick={this.state.lastClick}
            timerIsRunning={this.state.timerIsRunning}
            scoreInfo={this.state.scoreInfo}
          />
          <Submit
            currentWord={this.state.currentWord}
            submit={this.submit}
            clearBoard={this.clearBoard}
            upperFirst={this.upperFirst}
          />
        </div>

      )
    }
  }
 
  export default App;