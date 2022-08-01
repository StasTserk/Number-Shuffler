import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SettingsState = {
    theme: 'light' | 'dark' | 'system';
};

const initialState: SettingsState = {
    theme: 'system',
};
export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTheme(state, { payload }: PayloadAction<SettingsState['theme']>) {
            state.theme = payload;
        },
    },
});
