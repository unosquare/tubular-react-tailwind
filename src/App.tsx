import * as React from 'react';
import { Grid } from './Grid';
import { OverlayContainer } from './OverlayContainer';

export const App: React.FunctionComponent = () => {
    return (
        <>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Grid />
            </div>
            <OverlayContainer />
        </>
    );
};
