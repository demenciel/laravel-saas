import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, SnackbarOrigin, Alert } from '@mui/material';

interface SnackbarContextType {
    showSnackbar: (message: string, severity?: 'success' | 'info' | 'warning' | 'error', position?: SnackbarOrigin) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [snackbar, setSnackbar] = useState<{ message: string, severity: 'success' | 'info' | 'warning' | 'error', position: SnackbarOrigin } | null>(null);

    const showSnackbar = (message: string, severity: 'success' | 'info' | 'warning' | 'error' = 'info', position: SnackbarOrigin = { vertical: 'bottom', horizontal: 'center' }) => {
        setSnackbar({ message, severity, position });
    };

    const handleClose = () => {
        setSnackbar(null);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            {snackbar && (
                <Snackbar
                    open={true}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            )}
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = (): SnackbarContextType => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};