import { Box } from '@mui/material';
import * as React from 'react';
import { Header } from './components/Header';
import { NumberPicker } from './components/NumberPicker';
import { NumberViewer } from './components/NumberViewer';

export const App = (): JSX.Element => {
    const numbers = Array(1000)
        .fill(0)
        .map((_, i) => i);
    return (
        <Box>
            <Header />
            <NumberPicker />
            <NumberViewer numbers={numbers} />
        </Box>
    );
};
