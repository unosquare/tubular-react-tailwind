import * as React from 'react';
import columns from './columns';
import { Grid } from '../src/Grid/Grid';
import { OverlayContainer } from '../src/Overlay/OverlayContainer';
import { CompareOperators } from 'tubular-common';
import '../dist/styles.css';

columns.forEach((col) => {
    col.filterOperator = col.filterOperator || CompareOperators.None;
});

export const App: React.FunctionComponent = () => {
    return (
        <>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Grid gridName="employees" columns={columns} dataSource={'https://tubular.azurewebsites.net/api/orders/paged'} />
            </div>
            <OverlayContainer />
        </>
    );
};
