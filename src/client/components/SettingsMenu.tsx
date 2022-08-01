import * as React from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import GitHubIcon from '@mui/icons-material/GitHub';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import SettingsIcon from '@mui/icons-material/Settings';
import {
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from '@mui/material';
import { useState } from 'react';
import { SettingsState } from '../redux/settingsReducer';
import { RootState, settingsActions } from '../redux/store';
import { connect } from 'react-redux';

type SettingsProps = { theme: SettingsState['theme'] };
const mapStateToProps = ({ settings }: RootState): SettingsProps => ({
    theme: settings.theme,
});

type SettingsActions = { setTheme: (theme: SettingsState['theme']) => void };
const mapDispatchToProps = (): SettingsActions => ({
    setTheme: settingsActions.setTheme,
});

export const SettingsMenu = ({
    theme,
    setTheme,
}: SettingsProps & SettingsActions): JSX.Element => {
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(
        null
    );
    const open = !!anchorElement;
    const handleOpen = (evt: React.MouseEvent<HTMLElement>) => {
        setAnchorElement(evt.currentTarget);
    };
    const handleClose = () => {
        setAnchorElement(null);
    };
    return (
        <>
            <IconButton
                id="settings-button"
                aria-haspopup="true"
                aria-label="Settings"
                onClick={handleOpen}>
                <SettingsIcon sx={{ color: 'white' }} />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorElement}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'settings-button',
                }}>
                <MenuItem
                    href="https://github.com/StasTserk/Number-Shuffler"
                    component="a"
                    divider>
                    <ListItemIcon>
                        <GitHubIcon />
                    </ListItemIcon>
                    <ListItemText>Github</ListItemText>
                </MenuItem>
                <MenuItem
                    selected={theme === 'light'}
                    onClick={() => {
                        handleClose();
                        setTheme('light');
                    }}>
                    <ListItemIcon>
                        <LightModeIcon />
                    </ListItemIcon>
                    <ListItemText>Light Theme</ListItemText>
                </MenuItem>
                <MenuItem
                    selected={theme === 'system'}
                    onClick={() => {
                        handleClose();
                        setTheme('system');
                    }}>
                    <ListItemIcon>
                        <SettingsBrightnessIcon />
                    </ListItemIcon>
                    <ListItemText>System Default</ListItemText>
                </MenuItem>
                <MenuItem
                    divider
                    selected={theme === 'dark'}
                    onClick={() => {
                        handleClose();
                        setTheme('dark');
                    }}>
                    <ListItemIcon>
                        <DarkModeIcon />
                    </ListItemIcon>
                    <ListItemText>Dark Theme</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsMenu);
