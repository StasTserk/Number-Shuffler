import * as React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

export const Header = (): JSX.Element => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Shuffled Number List Generator
                </Typography>
                <IconButton>
                    <SettingsIcon sx={{ color: 'white' }} />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};
