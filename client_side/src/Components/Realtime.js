import { React, Component } from "react";
import Input from "./Input";

var connection = new WebSocket('ws://34.222.29.88:5000');


class Realtime extends Component{

    render(){
        return(
           <Input connection={connection}/> 
        )
    }
}

export default Realtime 
