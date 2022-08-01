import { SxProps } from '@mui/material';
import { Alert, Button, Stack, TextField } from '@mui/material';
import * as React from 'react';
import { connect } from 'react-redux';
import { RequestStatus } from '../../shared/requestStatus';
import { numberActions, RootState } from '../redux/store';

const pickerContainerStyle: SxProps = {
    m: 2,
    '& > .MuiAlert-root': { alignItems: 'center' },
};

type NumberPickerProps = {
    error?: string;
    amountWanted: number;
    status: RequestStatus;
};
type NumberPickerActions = {
    setAmountWanted: (amount: number) => void;
    generateNumbers: (amount: number) => void;
};

const mapStateToProps = ({ numbers }: RootState): NumberPickerProps => {
    return {
        error: numbers.error,
        amountWanted: numbers.amountWanted,
        status: numbers.status,
    };
};
const mapDispatchToProps = (): NumberPickerActions => {
    return {
        setAmountWanted: numberActions.setAmountWanted,
        generateNumbers: numberActions.loadShuffled,
    };
};

export const NumberPicker = ({
    amountWanted,
    error,
    generateNumbers,
    setAmountWanted,
    status,
}: NumberPickerProps & NumberPickerActions): JSX.Element => {
    return (
        <Stack spacing={4} direction="row" sx={pickerContainerStyle}>
            <TextField
                label="Amount to Shuffle"
                type="number"
                value={amountWanted}
                onChange={(e) => setAmountWanted(parseInt(e.target.value) || 0)}
            />
            <Button
                variant="contained"
                onClick={() => generateNumbers(amountWanted)}>
                Generate Numbers
            </Button>
            {error && <Alert severity="error">{error}</Alert>}
            {status === 'loading' && <Alert severity="info">Loading... </Alert>}
        </Stack>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(NumberPicker);
