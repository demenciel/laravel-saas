
import { useTheme } from '@/Hooks/useTheme';
import { SVGAttributes } from 'react';

export default function ApplicationLogo({ classes, width, height }: { classes?: string, width: number, height: number }) {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    return (
        isDarkMode ? (
            <>
                <img
                    width={width}
                    height={height}
                    className={`${classes}`}
                    src='/DarkLogo.png'
                />
            </>

        ) : (
            <>
                <img width={width}
                    height={height}
                    className={`classes`} src='/Logo.png' />
            </>
        )
    );
}
