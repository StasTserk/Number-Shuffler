import { Express, Request, Response } from 'express';
import { Result, fail, pass } from '../shared/result';
import { INumberProvider } from './NumberProvider';
import { NumbersApi } from './NumbersApi';

describe('NumbersApi', () => {
    let app: Express;
    let numbersApi: NumbersApi;
    let numberProvider: INumberProvider;
    let responseMock: Response;

    beforeEach(() => {
        app = {
            get: jest.fn(),
        } as unknown as Express;
        numberProvider = {
            GetShuffledNumbers: jest.fn(),
        };
        numbersApi = new NumbersApi(numberProvider);
        responseMock = {} as Response;
        responseMock.status = jest.fn().mockReturnValue(responseMock);
        responseMock.json = jest.fn().mockReturnValue(responseMock);
    });

    it('can be initialized', () => {
        expect(numbersApi instanceof NumbersApi).toBeTruthy();
    });

    it('registers a get handler', () => {
        numbersApi.register(app);
        expect(app.get).toHaveBeenCalledWith('/numbers', expect.any(Function));
    });

    describe('handleGet', () => {
        it('with NaN "amount" query returns failure', () => {
            numbersApi.handleGet(
                { query: { amount: 'not a number ' } } as unknown as Request,
                responseMock
            );

            expect(responseMock.status).toHaveBeenCalledWith(400);
            expect(responseMock.json).toHaveBeenCalledWith(
                expect.objectContaining({ kind: 'failure' })
            );
        });

        it('with normal numeric query, requests that many numbers', () => {
            const successResult: Result<number[]> = pass([1, 4, 2, 3]);
            (numberProvider.GetShuffledNumbers as jest.Mock).mockReturnValue(
                successResult
            );

            numbersApi.handleGet(
                { query: { amount: '4' } } as unknown as Request,
                responseMock
            );

            expect(numberProvider.GetShuffledNumbers).toHaveBeenCalledWith(4);
        });

        it('with failure result, passes any errors forward', () => {
            const failureResult: Result<number[]> = fail(
                'Arbitrary number provider error'
            );
            (numberProvider.GetShuffledNumbers as jest.Mock).mockReturnValue(
                failureResult
            );

            numbersApi.handleGet(
                { query: { amount: '-5' } } as unknown as Request,
                responseMock
            );

            expect(responseMock.status).toHaveBeenCalledWith(400);
            expect(responseMock.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    kind: 'failure',
                    message: 'Arbitrary number provider error',
                })
            );
        });

        it('with success result, passes numbers forward', () => {
            const successResult: Result<number[]> = pass([1, 4, 2, 3]);
            (numberProvider.GetShuffledNumbers as jest.Mock).mockReturnValue(
                successResult
            );

            numbersApi.handleGet(
                { query: { amount: '4' } } as unknown as Request,
                responseMock
            );

            expect(responseMock.status).toHaveBeenCalledWith(200);
            expect(responseMock.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    kind: 'success',
                    value: [1, 4, 2, 3],
                })
            );
        });
    });
});
