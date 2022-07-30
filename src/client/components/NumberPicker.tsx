import { Button, Stack, TextField } from '@mui/material';
import * as React from 'react';
export const NumberPicker = (): JSX.Element => {
    return (
        <Stack spacing={4} direction="row" sx={{ m: 2 }}>
            <TextField label="Amount to Shuffle" />
            <Button variant="contained">Generate Numbers</Button>
        </Stack>
    );
};
