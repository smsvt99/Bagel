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
    diceArray: [['a','r','m','a'],['v','i','r','v'],['m','q','v','e'],['c','a','n','o']],
    displayStart: true,
    endpoint: 'http://localhost:8081',
    everyonesWords: null,
    gameMaster: false,
    gameMasterName: null,
    lastClick: null,
    message: " ",
    name: null,
    room: null,
    // roomMates: [],
    scores: null,
    showStart: true,
    singlePlayer: true,
    socket: null,
    timerIsRunning: true,
    uniques: [], //set?
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
        console.log('MY UNIQUES', room.uniques)
        console.log('MY UNIQUES ARRAY', room.uniquesArray)
        this.setState({
          // roomMates : room.roomMates,
          scores: room.scores,
          room : room.name,
          gameMasterName : room.masterName,
          uniques: room.uniquesArray,
          scores:room.scores
        })
      })
      this.state.socket.on('serverStartGame', (array) => {
        this.backToWait();
        this.setState({
          beginTimer: true,
          waiting: false,
          showStart: false,
          diceArray: array,
          wordList : []
        })
      })
      this.state.socket.on('serverStopTimer', ()=> {
        this.timerIsDone();
        this.setState({
          currentWord: ""
        })
        Array.from(document.getElementsByClassName("die")).forEach( letter => {
              letter.classList.remove('lastClicked');
              letter.classList.remove('clicked');
            })
      })
      this.state.socket.on('joinSuccessful', (name) => {
        // this.hideStart();
        // this.wait();
        this.setState({
          waiting: true,
          showStart: false,
          name: name
        })
      })
      this.state.socket.on('boardForSingle', board => {
        this.setState({
          diceArray: board,
          scoreInfo:null
        })
      })
    })
  }
  backToWait = () => {
    this.setState({
      timerIsRunning: true,
      waiting: true,
      scoreInfo: null,
      wordList : []
    })
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
              scoreInfo: results,
              currentWord: '',
              lastClick: null
            }, () => {
              if(!this.state.singlePlayer)
                this.myResultsToServer();
            })
          })
        } else {
          //If no words were entered, send empty some dummy data.
          this.setState({
            scoreInfo: [{lemma: '', score: 0}],
            currentWord: '',
            lastClick: null
          }, () => {
            if(!this.state.singlePlayer)
              this.myResultsToServer();
          })
        }
      }
    }

    myResultsToServer = () => {
      let uniqueWords = [];
      let score = 0;
      this.state.scoreInfo.forEach(item=>{
          console.log(item)
          score += item.score
          if (item.score > 0)
            uniqueWords.push(item.lemma);
        })
      this.state.socket.emit('myResultsToServer', {
        room: this.state.room,
        name: this.state.name,
        "uniqueWords": uniqueWords,
        "score": score
      })
    }

    timerIsDone = () => {
      this.setState({
        timerIsRunning: false,
        beginTimer: false
      },()=>{
        this.setState({
          timerIsRunning: true
        })
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
    multiplayer = () => {
      this.setState({
        singlePlayer : false
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
            // roomMates = {this.state.roomMates}
            socket = {this.state.socket}
            scores = {this.state.scores}
            uniques = {this.state.uniques}
          />
          <Start
            beginTimer={this.beginTimer}
            showStart = {this.state.showStart}
            hideStart = {this.hideStart}
            socket = {this.state.socket}
            setMaster = {this.setMaster}
            wait = {this.wait}
            multiplayer = {this.multiplayer}
          />
          <Timer
            beginTimer={this.state.beginTimer}
            timerIsDone={this.timerIsDone}
            clear={this.clear}
            singlePlayer={this.state.singlePlayer}
          />
          <Board
            diceArray={this.state.diceArray}
            getLetterFromClick={this.getLetterFromClick}
            setLastClick={this.setLastClick}
            lastClick={this.state.lastClick}
            timerIsRunning={this.state.timerIsRunning}
            scoreInfo={this.state.scoreInfo}
            singlePlayer={this.state.singlePlayer}
            backToWait={this.backToWait}
            socket={this.state.socket}
            beginTimer={this.beginTimer}
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