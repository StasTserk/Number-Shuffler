import { Box, Paper, SxProps, Typography } from '@mui/material';
import * as React from 'react';
import { RootState } from '../redux/store';
import { connect } from 'react-redux';

const viewerStyle: SxProps = {
    p: 2,
    my: 2,
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 208px)',
};
const numberGridStyle: SxProps = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
    gap: 2,
};

type NumberViewerProps = {
    numbers: number[];
};

const mapStateToProps = (state: RootState): NumberViewerProps => {
    return { numbers: state.numbers.numbers };
};

const NumberItem = ({ number }: { number: number }): JSX.Element => {
    return (
        <Paper variant="outlined" square sx={{ p: 2 }}>
            {number}
        </Paper>
    );
};

export const NumberViewer = ({ numbers }: NumberViewerProps): JSX.Element => {
    return (
        <Paper sx={viewerStyle} elevation={2}>
            <Typography variant="body1">Randomly Generated Numbers:</Typography>
            <Box sx={numberGridStyle}>
                {numbers.map((n) => (
                    <NumberItem number={n} key={n} />
                ))}
            </Box>
        </Paper>
    );
};

export default connect(mapStateToProps)(NumberViewer);
