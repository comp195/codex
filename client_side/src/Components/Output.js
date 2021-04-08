import React from 'react';


function Output(props) {
    return (
        <div>
            <textarea 
                id='output' 
                defaultValue= {props.serverResponse}
                rows='10' 
                cols='100'
            />
        </div>
    )
}

export default Output;