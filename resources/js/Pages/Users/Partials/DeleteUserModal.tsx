import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { useSnackbar } from '@/Hooks/SnackbarProvider';

interface DeleteUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
}

export default function DeleteUserModal({ isOpen, onClose, user }: DeleteUserModalProps) {
    const { showSnackbar } = useSnackbar();
    const { delete: destroy, processing } = useForm({});

    const handleDelete = () => {
        if (!user) return;

        destroy(route('users.destroy', user.id), {
            preserveScroll: true,
            onSuccess: () => {
                showSnackbar('User deleted successfully', 'success');
                onClose();
            },
            onError: () => {
                showSnackbar('Error deleting user', 'error');
            },
        });
    };

    if (!user) return null;

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Delete User</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2}>
                    <Typography>
                        Are you sure you want to delete the user "{user.name}"?
                    </Typography>
                    <Typography color="error">
                        This action cannot be undone.
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={handleDelete}
                    variant="contained"
                    color="error"
                    disabled={processing}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
