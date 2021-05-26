import './Heading.css';
import React from 'react';

const Heading: React.FunctionComponent<{children: React.ReactNode}> = ({children}): JSX.Element => {
    return (
        <div className="heading">
            <h1>{children}</h1>
        </div>
    )
};

export default Heading;