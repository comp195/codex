import React from 'react';

function Output() {
    return (
        <div>
            <input type="submit" value="Run" />
            <p>{"\n"}</p>
            <textarea rows='10' cols='100'>Output will be shown here</textarea>
        </div>
    )
}

export default Output;