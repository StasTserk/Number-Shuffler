import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from '../../shared/requestStatus';
import { loadShuffled } from './loadShuffled';

type NumbersState = {
    amountWanted: number;
    numbers: number[];
    status: RequestStatus;
    error?: string;
};

const initialState: NumbersState = {
    amountWanted: 10000,
    numbers: [],
    status: 'ready',
};

export const numberSlice = createSlice({
    name: 'numbers',
    initialState,
    reducers: {
        setAmountWanted(state, action: PayloadAction<number>) {
            state.amountWanted = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadShuffled.pending, (state) => {
            state.status = 'loading';
            state.error = undefined;
        });
        builder.addCase(loadShuffled.rejected, (state, { payload }) => {
            state.status = 'error';
            state.error = payload;
        });
        builder.addCase(loadShuffled.fulfilled, (state, { payload }) => {
            state.status = 'ready';
            state.numbers = payload;
        });
    },
});
