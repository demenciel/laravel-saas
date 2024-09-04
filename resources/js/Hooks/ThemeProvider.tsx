import React from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { ThemeContext, useThemeProvider, } from './useTheme';
interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC = ({ children }) => {
    const { theme, toggleTheme, getMuiTheme } = useThemeProvider();
    const muiTheme = getMuiTheme(theme);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <MUIThemeProvider theme={muiTheme}>
                {children}
            </MUIThemeProvider>
        </ThemeContext.Provider>
    );
};