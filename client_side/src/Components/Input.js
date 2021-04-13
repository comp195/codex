import { Component, React } from 'react';

import Header from './Header';
import Output from './Output';

// var temp="";

class Input extends Component{
    constructor(props){
        super(props);
        this.state = {code: 'code-area', output: '', needOuput: false, answer: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleOutput = this.handleOutput.bind(this);
        this.takeAnswer = this.takeAnswer.bind(this);
        // this.handleClick = this.handleSubmit.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    componentDidMount(){
        this.props.connection.onopen = () => {
            console.log('Connected to socket at 5000');
            this.props.connection.onmessage = (message) => {
                var data = JSON.parse(message.data);
                console.log(data.name.client_code);
                var temp = this.state.output + data.name.client_code;
                this.setState({output: temp});
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        this.setState({output: ''});
        this.props.connection.send(JSON.stringify({
            type: "message",
            msg: this.state.code,
            newCode: true 
        }));
    
    }

    handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            console.log("Enter Pressed");
            this.props.connection.send(JSON.stringify({
                type: "message",
                msg: this.state.answer + '\n',
                newCode: false
            }))
            this.setState({answer: ''});
        }
        
    }

    // handleOutput = (e) => {
    //     e.preventDefault();
    //     // const temp = this.state.output;
    //     this.setState({output: e.target.value});
    //     // console.log(e.)
    // }

    takeAnswer = (e) => {
        e.preventDefault();
        this.setState({answer: e.target.value});
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

            </form>
            <textarea 
                id='output' 
                value= {this.state.output}
                placeholder="Output will be shown here"
                rows='10' 
                cols='100'
                readOnly
            /> 
            <p>{"\n"}</p>
            <textarea 
                id='answer' 
                value= {this.state.answer}
                rows='3' 
                cols='50'
                onChange={this.takeAnswer}
                onKeyDown={this.handleKeyDown}
            /> 
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