import { React, Component } from "react";
import Input from "./Input";

var connection = new WebSocket('ws://localhost:5000');


class Realtime extends Component{

    render(){
        return(
           <Input connection={connection}/> 
        )
    }
}

export default Realtime 