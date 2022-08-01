import { loadShuffled } from './loadShuffled';
import { numberSlice, NumbersState } from './numbersReducer';

describe('numbersReducer', () => {
    it('should initialize with a base state', () => {
        const expectedState: NumbersState = {
            numbers: [],
            amountWanted: 10000,
            error: undefined,
            status: 'ready',
        };

        const initialState = numberSlice.reducer(undefined, {
            type: 'null_action',
        });

        expect(expectedState).toMatchObject(initialState);
    });

    it('can update amount of numbers wanted', () => {
        const expectedState: Partial<NumbersState> = {
            amountWanted: 500,
        };

        const actualState = numberSlice.reducer(
            undefined,
            numberSlice.actions.setAmountWanted(500)
        );

        expect(actualState).toMatchObject(
            expect.objectContaining(expectedState)
        );
    });

    it('when loading numbers stars, updates status accordingly', () => {
        const actualState = numberSlice.reducer(undefined, {
            type: loadShuffled.pending.type,
        });
        expect(actualState.status).toEqual('loading');
    });

    it('when loading numbers fails, stores numbers and error message', () => {
        const actualState = numberSlice.reducer(undefined, {
            type: loadShuffled.rejected.type,
            payload: 'Error message',
        });
        expect(actualState.status).toEqual('error');
        expect(actualState.error).toEqual('Error message');
    });

    it('when numbers successfully loaded, stores result', () => {
        const actualState = numberSlice.reducer(undefined, {
            type: loadShuffled.fulfilled.type,
            payload: [1, 2, 3, 4],
        });
        expect(actualState.status).toEqual('ready');
        expect(actualState.numbers).toEqual([1, 2, 3, 4]);
    });
});
