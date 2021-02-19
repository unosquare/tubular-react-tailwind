import * as React from 'react';

export const SvgFilterWrapper: React.FunctionComponent<any> = ({ children }) => {
    return (
        <svg
            className="h-5 w-5 inline-block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            {children}
        </svg>
    );
};
