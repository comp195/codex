import { React, useState } from 'react';

import Header from './Header';
import Output from './Output';


function Input(props) {
    const [code,setCode] = useState('code-area');
    const [output,setOutput] = useState('Output will be shown here');
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const req_body = { code }
        console.log(e);

        props.connection.send(JSON.stringify({
            type: "message",
            msg: req_body
        }));

        console.log(code);
        // fetch('http://localhost:5000/backend', {
        //     method: 'POST',
        //     headers: { "Content-Type": "application/json"},
        //     body: JSON.stringify(req_body)
        // })
        // .then(res => {
        //     console.log(res);
        //     return res.json();
        // })
        // .then(data => {
        //     setOutput(data.name);
        // })
    }


    return (
        <div>
            <Header />
            <form onSubmit= {handleSubmit}>
                <textarea 
                    id='code' 
                    required
                    value={code} 
                    rows='25' 
                    cols='100'
                    onChange = {(e) => setCode(e.target.value)}
                />
                <p>{"\n"}</p>
                <button> Run </button>
                <Output serverResponse={output}/>
            </form>
        </div>
    )
}

export default Input;