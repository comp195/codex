import { Component } from "react";

class Realtime extends Component{
    ws = new WebSocket('ws://localhost:5000');

    render(){
        return(
            <h1>Hello</h1>
        )
    }
}

export default Realtime 