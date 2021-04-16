const WebSocket = require('ws');

var display = (client_code,wss,needOutput) => {
    var serResponse={
                type: "serverResponse",
                name: { client_code},
                needOutput: { needOutput }
            }
    msg=JSON.stringify(serResponse);
    wss.clients.forEach(function each(client){
        if (client.readyState == WebSocket.OPEN){
            client.send(msg);
        }
    });
}

module.exports = display;
