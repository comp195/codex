var display = (client_code,res,needOutput) => {
    var serResponse={
                name: { client_code},
                needOutput: { needOutput }
            }
    res.send(JSON.stringify(serResponse));
}

module.exports = display;
