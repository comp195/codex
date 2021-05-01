import { Component, React } from 'react';
import "./style.css";
import Header from './Header';

// var temp="";

class Input extends Component{
    constructor(props){
        super(props);
        this.state = {code: '#include <stdio.h>\nint main(){\n\nreturn 0;\n}', output: '', needOutput: false, answer: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleOutput = this.handleOutput.bind(this);
        this.takeAnswer = this.takeAnswer.bind(this);
        // this.handleClick = this.handleSubmit.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        this.props.connection.onopen = () => {
            console.log('Connected to socket at 5000');
            this.props.connection.onmessage = (message) => {
                var data = JSON.parse(message.data);
                if(data.type === 'broadcast'){
                    this.setState({code: data.msg});
                }
                else if (data.type === 'newUsers'){
                    console.log('Here');
                    this.setState({code: data.msg});
                }
                else if (data.type === 'serverResponse'){
                    var temp = this.state.output + data.name.client_code;
                    this.setState({output: temp, needOutput: data.needOutput.needOutput});
                }
                else if (data.type === 'clear'){
                    this.setState({output:''});
                }
                else if (data.type === 'answerBroadcast'){
                    this.setState({answer: data.msg})
                }
                else if (data.type === 'answer'){
                    var newout = this.state.output + data.msg;
                    // console.log(newout);
                    this.setState({output: newout, answer: ''});
                }
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({output: ''});
        this.props.connection.send(JSON.stringify({
            type: "message",
            msg: this.state.code,
            newCode: true 
        }));
    
    }

    handleChange = (e) => {
        this.setState({code: e.target.value},() =>{
            this.props.connection.send(JSON.stringify({
                type: "broadcast",
                msg: this.state.code
            }));
        });

    }

    handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            var temp = this.state.output + this.state.answer + '\n';
            console.log(this.state.output);
            this.setState({output: temp});
            console.log(this.state.answer);
            this.props.connection.send(JSON.stringify({
                type: "answer",
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
        this.setState({answer: e.target.value}, () =>{
            this.props.connection.send(JSON.stringify({
                type: "answerBroadcast",
                msg: this.state.answer
            }));
        });
    }
    

    render(){
        return(
            
            <div className="container">
                <div id="progressbar"></div>
                <div id="scrollPath"></div>
            <Header />

            <form className="input" onSubmit= {this.handleSubmit}>
                <textarea
                    className="codeHere"
                    id='code' 
                    required
                    value = {this.state.code} 
                    rows='25' 
                    cols='100'
                    onChange = {this.handleChange}
                />
                <p>{"\n"}</p>
                <button className="brun"> Run </button>

                <textarea
                className="codeOut"
                id='output' 
                value= {this.state.output}
                placeholder="Output will be shown here"
                rows='25' 
                cols='100'
                readOnly
            /> 
            </form>
            {/* <div className="outArea">
            <textarea
                className="codeOut"
                id='output' 
                value= {this.state.output}
                placeholder="Output will be shown here"
                rows='25' 
                cols='100'
                readOnly
            /> 
            </div> */}
            {this.state.needOutput && <textarea 
                className = "output" 
                id='answer' 
                value= {this.state.answer}
                rows='10' 
                cols='100'
                placeholder="Type Input Here. Press 'Enter' to submit input"
                onChange={this.takeAnswer}
                onKeyDown={this.handleKeyDown}
            /> }
            <p>{"\n"}</p>
            <div className="Alltext">
            <h1 className="text">We are CodeX team:</h1><p>{"\n"}</p>
            <text className="text">Bekzhan Abdimanapov - b_abdimanapov@u.pacific.edu<p>{"\n"}</p>Dhananjay Gurung - d_gurung@u.pacific.edu<p>{"\n"}</p>Rehan Kedia - r_kedia@u.pacific.edu<p>{"\n"}</p></text>
            <text className="text">----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</text><p>{"\n"}</p>
            <h3 className="text">We are computer science students and our goal is to ease up programming education for other computer science students.</h3><p>{"\n"}</p>
            <h3 className="text">Our software is a multi-user programming compiler</h3><p>{"\n"}</p>
            <h3 className="text">The main feature our software has is the ability for multiple users to edit the same code file at the same time</h3><p>{"\n"}</p>
            <text className="text">----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</text><p>{"\n"}</p>
            <h1 className="text">Our mission statement is:</h1><p>{"\n"}</p>
            
            <text className="text">We belive that programming is easy with a good professor and easy to set up development. </text><p>{"\n"}</p>
            <text className="text">Making programming easier for students makes up belive that one day anyone would be able to learn programming.</text><p>{"\n"}</p>
            <div className="text">{"Copyright 2021 CodeX USA, Inc. All rights reserved. \n"}</div>
            </div>
            
            
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