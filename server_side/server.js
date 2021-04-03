const express = require('express');
var fs = require('fs');
var  {exec, execSync, execFile}  = require('child_process');

var cors = require("cors");

const app = express();

app.use (express.json());
var writeStream = fs.createWriteStream('./code_to_compile.c');

app.listen(5000);
console.log("Now Listening on port 5000");

app.use(cors());

app.get('/backend',(req, res) => {
    console.log("Request was made "+ req.url);
    
});

app.post('/backend', (req, res) => {
    console.log(req.body.code);
    writeStream.write(req.body.code); 
    execFile("gcc", ["code_to_compile.c"], (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        exec("./a.out > compiled_code.txt" ,(error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            const client_code = fs.readFileSync('./compiled_code.txt', 'utf-8');
            var serResponse={
                name: { client_code} 
            }
            res.send(JSON.stringify(serResponse));
        });
    });
});

