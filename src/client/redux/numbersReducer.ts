import { createSlice } from '@reduxjs/toolkit';

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
});
