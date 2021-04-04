const  {exec, execFile}  = require('child_process');
const fs = require('fs');
var running = (client_code, res) => {
    execFile("gcc", ["code_to_compile.c", "-o","code_to_compile"], (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            client_code = error.message;
            var serResponse={
                name: { client_code} 
            }
            res.send(JSON.stringify(serResponse));
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        exec("./code_to_compile > compiled_code.txt" ,(error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            client_code = fs.readFileSync('./compiled_code.txt', 'utf-8');
            var serResponse={
                name: { client_code} 
            }
            res.send(JSON.stringify(serResponse));
        });
    });
}

module.exports = running;