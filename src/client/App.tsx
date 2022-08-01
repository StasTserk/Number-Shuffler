import { Box } from '@mui/material';
import * as React from 'react';
import { useEffect } from 'react';
import { Header } from './components/Header';
import NumberPicker from './components/NumberPicker';
import NumberViewer from './components/NumberViewer';
import { numberActions } from './redux/store';

export const App = (): JSX.Element => {
    useEffect(() => {
        numberActions.loadShuffled(1000);
    }, []);
    return (
        <Box>
            <Header />
            <NumberPicker />
            <NumberViewer />
        </Box>
    );
};
