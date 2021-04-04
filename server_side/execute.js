const  {exec, execFile}  = require('child_process');
const fs = require('fs');
var display = require('./display');

var running = (client_code, res) => {
    execFile("gcc", ["code_to_compile.c", "-o","code_to_compile"], (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error}`);
            display(error.message,res);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            display(stderr.message,res);
            return;
        }
        exec("./code_to_compile > compiled_code.txt" ,() => {
            client_code = fs.readFileSync('./compiled_code.txt', 'utf-8');
            display(client_code,res);
        });
    });
}

module.exports = running;