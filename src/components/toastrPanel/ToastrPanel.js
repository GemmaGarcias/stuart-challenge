import React from 'react';

export default function ToastrPanel({children}) {

    return(
        <div className="panel">
            <p className="text">{children}</p>
        </div>
    )
}
