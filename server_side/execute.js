const fs = require('fs');
var display = require('./display');

var running = (child,wss) => {
    child.stdout.on('data',(data) => {
        client_code = data.toString();
        display(client_code,wss, true);
        console.log(`stdout: ${client_code}`);
    } )
    child.on('close',() => {
        console.log("Closing Code");
        display("", wss, false)
    })
}

module.exports = running;