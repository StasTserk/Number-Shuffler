import { fail, pass, Result } from '../shared/result';

const MAX_ELEMENTS = 100000;
export interface INumberProvider {
    GetShuffledNumbers(amount: number): Result<number[]>;
}

export class NumberProvider implements INumberProvider {
    GetShuffledNumbers(amount: number): Result<number[]> {
        if (amount < 0) {
            return fail('amount of numbers must be positive');
        }
        if (amount > MAX_ELEMENTS) {
            return fail('amount of numbers must be under 100000');
        }
        const numbers = Array<number>(amount);
        for (let i = 0; i < amount; i++) {
            const swapIndex = Math.floor(Math.random() * (amount - i)) + i;
            const temp = numbers[i] || i + 1;
            numbers[i] = numbers[swapIndex] || swapIndex + 1;
            numbers[swapIndex] = temp;
        }
        return pass(numbers);
    }
}
