import { Express, Request, Response } from 'express';
import { INumberProvider } from './NumberProvider';
import { fail } from '../shared/result';

export class NumbersApi {
    private readonly _provider: INumberProvider;
    constructor(provider: INumberProvider) {
        this._provider = provider;
    }

    register(app: Express) {
        app.get('/numbers', (req, res) => {
            this.handleGet(req, res);
        });
    }

    handleGet(request: Request, response: Response) {
        const amountQuery = request.query.amount as string;
        if (isNaN(Number(amountQuery))) {
            return response.status(400).json(fail('Amount must be a number.'));
        }
        const amount = parseInt((request.query.amount as string) || '10000');
        const numbersResult = this._provider.GetShuffledNumbers(amount);
        return response
            .status(numbersResult.kind === 'success' ? 200 : 400)
            .json(numbersResult);
    }
}
