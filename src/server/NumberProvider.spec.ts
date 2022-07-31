import { Success } from '../shared/result';
import { NumberProvider } from './NumberProvider';

describe('GetShuffledNumbers', () => {
    let provider: NumberProvider;

    beforeEach(() => {
        provider = new NumberProvider();
    });

    it('can be initialized', () => {
        expect(provider instanceof NumberProvider).toBeTruthy();
    });

    it('returns failure on negative number', () => {
        const result = provider.GetShuffledNumbers(-5);

        expect(result.kind).toBe('failure');
    });
    it('returns failure on a much larger number', () => {
        const result = provider.GetShuffledNumbers(1e10);

        expect(result.kind).toBe('failure');
    });
    it('returns a list containing the number of elements asked for', () => {
        const result = provider.GetShuffledNumbers(100);

        expect(result.kind).toBe('success');
        expect((result as Success<number[]>).value.length).toEqual(100);
    });
    it('returns a list containing each number between 1 and the number asked for', () => {
        const result = provider.GetShuffledNumbers(10);
        const expectedContents = Array(10)
            .fill(0)
            .map((_, i) => i + 1);

        const shuffledNumbers = (result as Success<number[]>).value;

        expect(
            shuffledNumbers.every(
                (number) => expectedContents.indexOf(number) !== -1
            )
        ).toBeTruthy();
    });
});
