import { React, Component } from "react";
import Input from "./Input";
import Output from "./Output";

var connection = new WebSocket('ws://localhost:5000');


class Realtime extends Component{

    componentDidMount(){
        connection.onopen = () => {
            console.log('Connected to socket at 5000');
            connection.onmessage = (message) => {
                var data = JSON.parse(message.data);
                console.log(data.name.client_code);
                this.setState({output: data.name.client});
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