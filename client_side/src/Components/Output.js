import React from 'react';


function Output(props) {
    console.log(props.serverResponse);
    return (
        <div>
            <textarea 
                id='output' 
                value= {props.serverResponse.client_code}
                rows='10' 
                cols='100'
            />
        </div>
    )
}

export default Output;