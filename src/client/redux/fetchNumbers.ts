import { createAsyncThunk } from '@reduxjs/toolkit';

type LoadShuffledOptions = { numberNeeded: number };

export const loadShuffled = createAsyncThunk<
    number[],
    LoadShuffledOptions,
    { rejectValue: string }
>('numbers/loadShuffled', async ({ numberNeeded }, { rejectWithValue }) => {
    const numbers = Array(numberNeeded)
        .fill(0)
        .map((_, i) => i);
    return Promise.resolve(numbers);
});
