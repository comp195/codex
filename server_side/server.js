//Pre-built Modules
const express = require('express');
const WebSocket = require('ws');
var http = require('http');
var fs = require('fs');

//Custom created modules
var running = require('./execute.js')
const  {execFile,spawn}  = require('child_process');
var display = require('./display')



var app = express();
var server = http.createServer(app);
var cors = require("cors");

app.use (express.json());

let child;

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected ...');
    ws.on('message', (message) => {
        var client_code="";
        var message = JSON.parse(message);
        console.log(message.msg);
        if(message.type == 'broadcast'){
            wss.broadcast(message,ws);
        }
        else if(message.type == 'answerBroadcast'){
            wss.broadcast(message,ws);
        }
        else if(message.type == 'message'){
            console.log(message.newCode);
            var clearOut = {
                type: 'clear'
            };
            wss.broadcast(clearOut,ws);

            fs.writeFileSync('./code_to_compile.c',message.msg);

            execFile("gcc", ["code_to_compile.c", "-o","code_to_compile"], (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error}`);
                    display(error.message,wss,false);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    display(stderr.message,wss,false);
                    return;
                }
                child = spawn("stdbuf",['-o0','./code_to_compile']);

                // Call to Function in module execute.js
                running(child,wss);
            })
        }
        else if( message.type == 'answer'){
            console.log("Answer to stdin received");
            wss.broadcast(message, ws);
            child.stdin.write(message.msg);
        }
    })
})

wss.broadcast = (msg,ws) => {
    msg=JSON.stringify(msg);
    wss.clients.forEach(function each(client){
        if (client != ws && client.readyState == WebSocket.OPEN){
            client.send(msg);
        }
    });
};

server.listen(5000, () =>{
    console.log("Now Listening on port 5000");
});

app.use(cors());

