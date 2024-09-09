import { createTheme } from '@mui/material';
import { createContext, useContext, useEffect, useState } from 'react';

// Define your Tailwind colors
const tailwindColors = {
    light: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        background: 'hsl(var(--background))',
        text: 'hsl(var(--foreground))',
    },
    dark: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        background: 'hsl(var(--background))',
        text: 'hsl(var(--foreground))',
    },
};

// Create MUI theme with Tailwind colors
const getMuiTheme = (mode: 'light' | 'dark') => createTheme({
    palette: {
        mode,
        primary: {
            main: tailwindColors[mode].primary,
            light: `hsl(from ${tailwindColors[mode].primary} h s calc(l + 10%))`,
        },
        secondary: {
            main: tailwindColors[mode].secondary,
            light: `hsl(from ${tailwindColors[mode].secondary} h s calc(l + 10%))`,
        },
        background: {
            default: tailwindColors[mode].background,
        },
        text: {
            primary: tailwindColors[mode].text,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: `color-mix(in srgb, ${tailwindColors[mode].primary} 90%, ${mode === 'light' ? 'white' : 'black'})`,
                    },
                },
            },
        },
    },
});

interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    toggleTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

export const useThemeProvider = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        }
    }, []);

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return { theme, toggleTheme, getMuiTheme };
};