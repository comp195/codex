

var display = (client_code,res) => {
    var serResponse={
                name: { client_code} 
            }
    res.send(JSON.stringify(serResponse));
}

module.exports = display;
