import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadShuffled = createAsyncThunk<
    number[],
    number,
    { rejectValue: string }
>('numbers/loadShuffled', async (numberNeeded, { rejectWithValue }) => {
    const numbers = Array(numberNeeded)
        .fill(0)
        .map((_, i) => i);
    if (Math.random() > 0.5) {
        return rejectWithValue('Randomly decided to fail');
    }
    return numbers;
});
