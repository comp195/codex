const express = require('express');
var running = require('./execute.js')
var fs = require('fs');


var cors = require("cors");

const app = express();

app.use (express.json());

app.listen(5000);
console.log("Now Listening on port 5000");

app.use(cors());

app.get('/backend',(req, res) => {
    console.log("Request was made "+ req.url);
    
});

app.post('/backend', (req, res) => {
    var writeStream = fs.createWriteStream('./code_to_compile.c');
    var client_code="";
    console.log(req.body.code);
    writeStream.write(req.body.code); 

// Call to Function in module execute.js
    running(client_code,res);

    writeStream.end();
});

