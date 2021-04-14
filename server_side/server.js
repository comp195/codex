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

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    let child;
    console.log('Connected to websocket');
    ws.on('message', (message) => {
        var client_code="";
        var message = JSON.parse(message);
        console.log(message.msg);
        if(message.newCode == true){
            console.log(message.newCode);
            fs.writeFileSync('./code_to_compile.c',message.msg);

            execFile("gcc", ["code_to_compile.c", "-o","code_to_compile"], (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error}`);
                    display(error.message,ws,false);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    display(stderr.message,ws,false);
                    return;
                }
                child = spawn("stdbuf",['-o0','./code_to_compile']);

                // Call to Function in module execute.js
                running(child,ws);
            })
        }
        else{
            if(message.newCode === false){
                    console.log("Answer to stdin received");
                    child.stdin.write(message.msg);
                }
        }
    })
})

server.listen(5000, () =>{
    console.log("Now Listening on port 5000");
});

app.use(cors());

app.get('/backend',(req, res) => {
    console.log("Request was made "+ req.url);
});