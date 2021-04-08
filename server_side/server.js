const express = require('express');
var running = require('./execute.js')
const WebSocket = require('ws');
var http = require('http');
var fs = require('fs');

var app = express();
var server = http.createServer(app);
var cors = require("cors");



app.use (express.json());



const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Connected to websocket');
    ws.on('message', (message) => {
        var client_code="";
        var message = JSON.parse(message);
        console.log(message.msg);
        fs.writeFileSync('./code_to_compile.c',message.msg);

    // Call to Function in module execute.js
        running(client_code,ws);

    })
})

server.listen(5000, () =>{
    console.log("Now Listening on port 5000");
});

app.use(cors());

app.get('/backend',(req, res) => {
    console.log("Request was made "+ req.url);
});

// app.post('/backend', (req, res) => {
//     var writeStream = fs.createWriteStream('./code_to_compile.c');
//     var client_code="";
//     console.log(req.body.code);
//     writeStream.write(req.body.code); 

// // Call to Function in module execute.js
//     running(client_code,res);

//     writeStream.end();
// });

