import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import {
    Box,
    CircularProgress,
    Paper,
    SxProps,
    Typography,
} from '@mui/material';
import * as React from 'react';
import { RootState } from '../redux/store';
import { connect } from 'react-redux';
import { RequestStatus } from '../../shared/requestStatus';

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
const numberEntryStyle: SxProps = { p: 2, textAlign: 'center' };
type NumberViewerProps = {
    numbers: number[];
    status: RequestStatus;
};

const mapStateToProps = ({
    numbers: { numbers, status },
}: RootState): NumberViewerProps => {
    return { numbers, status };
};

const NumberItem = ({ number }: { number: number }): JSX.Element => {
    return (
        <Paper variant="outlined" square sx={numberEntryStyle}>
            <Typography variant="body2">{number}</Typography>
        </Paper>
    );
};

export const NumberViewer = ({
    numbers,
    status,
}: NumberViewerProps): JSX.Element => {
    return (
        <Paper sx={viewerStyle} elevation={2}>
            <Typography variant="body1">Randomly Generated Numbers:</Typography>
            {status === 'loading' && <CircularProgress />}
            {status === 'error' && (
                <ReportProblemIcon color="error" fontSize="large" />
            )}
            {status === 'ready' && (
                <Box sx={numberGridStyle}>
                    {numbers.map((n) => (
                        <NumberItem number={n} key={n} />
                    ))}
                </Box>
            )}
        </Paper>
    );
};

export default connect(mapStateToProps)(NumberViewer);
