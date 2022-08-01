import { createSlice } from '@reduxjs/toolkit';
import { loadShuffled } from './loadShuffled';

type NumbersState = {
    numbers: number[];
    status: 'loading' | 'error' | 'ready';
    error?: string;
};

const initialState: NumbersState = {
    numbers: [],
    status: 'ready',
};

export const numberSlice = createSlice({
    name: 'numbers',
    initialState,
    reducers: {},
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
