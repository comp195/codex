import React from 'react';

import Header from './Header';
import Output from './Output';

function Input() {
    return (
        <div>
            <Header />
            <textarea id='code' name='core-area' rows='25' cols='100'/>
            <Output />
        </div>
    )
}

export default Input;