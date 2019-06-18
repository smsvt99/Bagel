const path = require('path'); 
var express = require('express');

var app = express();
const http = require('http');
const server = http.createServer(app);
const socketIO = require('socket.io');
const io = socketIO(server);

const cors = require('cors');
app.use(cors());



let dice = [
    ['r', 'i', 'f', 'o', 'b', 'x'],
    ['i', 'f', 'e', 'h', 'e', 'y'],
    ['d', 'e', 'n', 'o', 'w', 's'],
    ['u', 't', 'o', 'k', 'n', 'd'],
    ['h', 'm', 's', 'r', 'a', 'o'],
    ['l', 'u', 'p', 'e', 't', 's'],
    ['a', 'c', 'i', 't', 'o', 'a'],
    ['y', 'l', 'g', 'k', 'u', 'e'],
    ['qu', 'b', 'm', 'j', 'o', 'a'],
    ['e', 'h', 'i', 's', 'p', 'n'],
    ['v', 'e', 't', 'i', 'g', 'n'],
    ['b', 'a', 'l', 'i', 'y', 't'],
    ['e', 'z', 'a', 'v', 'n', 'd'],
    ['r', 'a', 'l', 'e', 's', 'c'],
    ['u', 'w', 'i', 'l', 'r', 'g'],
    ['p', 'a', 'c', 'e', 'm', 'd'],
 ];

// var server = app.listen(8081, function () {
//    var host = server.address().address
   var port = 8081;
   
//    console.log("Example app listening at http://%s:%s", host, port)
// })

server.listen(port, () => console.log(`Listening on port ${port}`))

// app.get('/new', (req, res) => {
//     console.log('GET /new')
//     game.shuffle();
//     game.roll();
//     res.send(JSON.stringify(game.board));
// })

io.on('connection', socket => {
    console.log('new connection')

    socket.on('newRoom', info =>{
        console.log(info)
    })
})


class Game{
    constructor(dice){
        this.dice = dice;
        this.board;

    }
    shuffle() {
        for (let i = this.dice.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.dice[i], this.dice[j]] = [this.dice[j], this.dice[i]];
        }
    }
    roll() {
        let board = [[],[],[],[]];
        this.dice.forEach((die, index)=> {
            let randomIndex = Math.ceil(Math.random() * 6) - 1;
            if (index < 4){
                 board[0].push(die[randomIndex])
            } else if (index < 8){
                 board[1].push(die[randomIndex])
            } else if (index < 12){
                 board[2].push(die[randomIndex])
            } else if (index < 16){
                 board[3].push(die[randomIndex])
            }
         })
         this.board = board;
    }
}

let game = new Game(dice);