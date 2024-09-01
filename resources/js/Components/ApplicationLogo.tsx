import { SVGAttributes } from 'react';

export default function ApplicationLogo({ classes, width, height }: { classes?: string, width: number, height: number }) {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
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
                <img className={`classes`} src='/Logo.png' />
            </>
        )
    );
}
