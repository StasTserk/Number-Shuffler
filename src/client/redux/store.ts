import { bindActionCreators, configureStore } from '@reduxjs/toolkit';
import { loadShuffled } from './loadShuffled';
import { numberSlice } from './numbersReducer';
import { settingsSlice } from './settingsReducer';

export const store = configureStore({
    reducer: {
        numbers: numberSlice.reducer,
        settings: settingsSlice.reducer,
    },
});

export const numberActions = bindActionCreators(
    { ...numberSlice.actions, loadShuffled },
    store.dispatch
);

export const settingsActions = bindActionCreators(
    { ...settingsSlice.actions },
    store.dispatch
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
