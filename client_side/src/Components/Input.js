import { Component, React } from 'react';

import Header from './Header';
import Output from './Output';

class Input extends Component{
    constructor(props){
        super(props);
        this.state = {code: 'code-area', output: 'Output will be shown here'};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        this.props.connection.onopen = () => {
            console.log('Connected to socket at 5000');
            this.props.connection.onmessage = (message) => {
                var data = JSON.parse(message.data);
                console.log(data.name.client_code);
                this.setState({output: data.name.client_code});
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);

        this.props.connection.send(JSON.stringify({
            type: "message",
            msg: this.state.code
        }));
    
    }

    render(){
        return(
             <div>
            <Header />
            <form onSubmit= {this.handleSubmit}>
                <textarea 
                    id='code' 
                    required
                    value = {this.state.code} 
                    rows='25' 
                    cols='100'
                    onChange = {(e) => this.setState({code : e.target.value})}
                />
                <p>{"\n"}</p>
                <button> Run </button>
                <Output serverResponse={this.state.output}/>
            </form>
        </div>
        )
    }
}


//         // fetch('http://localhost:5000/backend', {
//         //     method: 'POST',
//         //     headers: { "Content-Type": "application/json"},
//         //     body: JSON.stringify(req_body)
//         // })
//         // .then(res => {
//         //     console.log(res);
//         //     return res.json();
//         // })
//         // .then(data => {
//         //     setOutput(data.name);
//         // })
//     }




export default Input;