import { React, Component } from "react";
import Input from "./Input";

var connection = new WebSocket('ws://localhost:5000');


class Realtime extends Component{

    componentDidMount(){
        connection.onopen = () => {
            console.log('Connected to socket at 5000');
            connection.onmessage = (message) => {
                console.log(message.data);
            }
        }
    }

    render(){
        return(
           <Input connection={connection}/> 
        )
    }
}

export default Realtime 