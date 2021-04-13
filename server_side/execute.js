const fs = require('fs');
var display = require('./display');

var running = (child,res) => {
    child.stdout.on('data',(data) => {
        client_code = data.toString();
        display(client_code,res);
        console.log(`stdout: ${client_code}`);
    } )
    child.on('close',() => {
        console.log("Closing Code");
    })
}

module.exports = running;