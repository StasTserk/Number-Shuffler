import { Theme } from '@mui/material';
import { Box, ThemeProvider, useMediaQuery } from '@mui/material';
import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Header } from './components/Header';
import NumberPicker from './components/NumberPicker';
import NumberViewer from './components/NumberViewer';
import { SettingsState } from './redux/settingsReducer';
import { numberActions, RootState } from './redux/store';
import { darkTheme, lightTheme } from './theme';

type AppProps = { theme: SettingsState['theme'] };
const mapStateToProps = ({ settings }: RootState): AppProps => {
    return { theme: settings.theme };
};
type AppActions = { loadNumbers: (amount: number) => void };
const mapDispatchToProps = (): AppActions => ({
    loadNumbers: numberActions.loadShuffled,
});

export const App = ({
    theme,
    loadNumbers,
}: AppProps & AppActions): JSX.Element => {
    useEffect(() => {
        loadNumbers(10000);
    }, [loadNumbers]);

    const prefersDarkTheme = useMediaQuery('(prefers-color-scheme: dark)');

    let themeToUse: Theme;
    if (theme === 'dark' || (theme === 'system' && prefersDarkTheme)) {
        themeToUse = darkTheme;
    } else {
        themeToUse = lightTheme;
    }

    return (
        <ThemeProvider theme={themeToUse}>
            <Box
                sx={{
                    height: '100vh',
                    width: '100vw',
                    backgroundColor: 'background.default',
                }}>
                <Header />
                <NumberPicker />
                <NumberViewer />
            </Box>
        </ThemeProvider>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
