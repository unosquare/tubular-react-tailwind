import * as React from 'react';

export const SvgFilterWrapper: React.FunctionComponent<any> = ({ children, className="h-5 w-5 inline-block", viewBox = "0 0 16 16" }) => {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox}
            fill="currentColor"
        >
            {children}
        </svg>
    );
};
