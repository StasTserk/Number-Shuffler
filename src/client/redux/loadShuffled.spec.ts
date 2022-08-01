import { loadShuffled } from './loadShuffled';
import { fail, pass } from '../../shared/result';

describe('loadShuffled', () => {
    const loadShuffledThunk = loadShuffled(5);
    const dispatch = jest.fn();
    const fetch = jest.fn();
    global.fetch = fetch;

    beforeEach(() => {
        fetch.mockClear();
        dispatch.mockClear();
    });

    it('calls the fetch api', async () => {
        await loadShuffledThunk(dispatch, () => ({}), undefined);
        expect(fetch).toHaveBeenCalledWith('/numbers?amount=5', {
            method: 'GET',
        });
    });

    it('on error response, dispatches `rejected` action', async () => {
        // arrange
        const response: Response = {
            ok: false,
            status: 400,
            json: () => Promise.resolve(fail('error message')),
        } as Response;

        fetch.mockResolvedValueOnce(response);

        // act
        await loadShuffledThunk(dispatch, () => ({}), undefined);

        // assert
        expect(fetch).toHaveBeenCalled();

        expect(dispatch).toHaveBeenCalledWith(
            expect.objectContaining({ type: loadShuffled.pending.type })
        );
        expect(dispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                type: loadShuffled.rejected.type,
                payload: 'error message',
            })
        );
    });

    it('on success response, dispatches `fulfilled` status with number payload', async () => {
        // arrange
        const response: Response = {
            ok: true,
            status: 200,
            json: () => Promise.resolve(pass([1, 2, 4, 3])),
        } as Response;

        fetch.mockResolvedValueOnce(response);

        // act
        await loadShuffledThunk(dispatch, () => ({}), undefined);

        // assert
        expect(fetch).toHaveBeenCalled();

        expect(dispatch).toHaveBeenCalledWith(
            expect.objectContaining({ type: loadShuffled.pending.type })
        );
        expect(dispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                type: loadShuffled.fulfilled.type,
                payload: [1, 2, 4, 3],
            })
        );
    });
});
