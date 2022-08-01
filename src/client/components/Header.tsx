import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import SettingsMenu from './SettingsMenu';

export const Header = (): JSX.Element => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Shuffled Number List Generator
                </Typography>
                <SettingsMenu />
            </Toolbar>
        </AppBar>
    );
};
