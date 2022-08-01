import { createAsyncThunk } from '@reduxjs/toolkit';
import { Result } from '../../shared/result';

export const loadShuffled = createAsyncThunk<
    number[],
    number,
    { rejectValue: string }
>('numbers/loadShuffled', async (numberNeeded, { rejectWithValue }) => {
    const response = await fetch(`/numbers?amount=${numberNeeded}`, {
        method: 'GET',
    });

    const result = (await response.json()) as Result<number[]>;
    if (result.kind === 'success') {
        return result.value;
    }
    return rejectWithValue(result.message);
});
