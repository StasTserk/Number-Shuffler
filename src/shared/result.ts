export type Failure = { kind: 'failure'; message: string };
export type Success<T> = { kind: 'success'; value: T };

export type Result<T> = Success<T> | Failure;

export function pass<T>(value: T): Success<T> {
    return { kind: 'success', value };
}

export function fail(error: string): Failure {
    return { kind: 'failure', message: error };
}
