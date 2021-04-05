import { Component } from "react";
import Input from "./Input";

class Realtime extends Component{
    ws = new WebSocket('ws://localhost:5000');

    render(){
        return(
           <Input /> 
        )
    }
}

export default Realtime 