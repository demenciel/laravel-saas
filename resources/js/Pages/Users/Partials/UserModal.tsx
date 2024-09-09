import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Avatar, FormControl, Select, MenuItem, FormHelperText } from '@mui/material';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { useSnackbar } from '@/Hooks/SnackbarProvider';
import InputLabel from '@/Components/InputLabel';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
    roles?: Role[];
    currentUser?: User;
    isEdit?: boolean;
}

interface Role {
    id?: number;
    name?: string;
}

export default function UserModal({ isOpen, onClose, user, roles, currentUser, isEdit }: UserModalProps) {
    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const { showSnackbar } = useSnackbar();
    const { data, setData, submit, processing, errors, reset } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        role_id: user?.role?.id || '',
        photo: user?.profile_photo_path || null,
        password: '',
        password_confirmation: '',
        roles: roles || [],
    });

    useEffect(() => {
        if (user) {
            setData({
                ...data,
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
                role_id: user.role?.id || '',
                photo: user.profile_photo_path ? `/storage/${user.profile_photo_path}` : null,
                password: '',
                password_confirmation: '',
                roles: roles || [],
            });
            setAvatarPreview(user.profile_photo_path || null);
        } else {
            reset();
            setAvatarPreview(null);
        }
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(data).forEach(key => {
            if (data[key as keyof typeof data] !== null && key !== 'photo') {
                formData.append(key, data[key as keyof typeof data] as string);
            }
        });
        if (avatar instanceof File) {
            formData.append('photo', avatar);
        }

        const routeUrl = user ? route('users.update', user.id) : route('users.store');
        const method = user ? 'put' : 'post';
        submit(method, routeUrl, {
            data: formData,
            preserveScroll: true,
            onSuccess: () => {
                showSnackbar(`User ${user ? 'updated' : 'created'} successfully`, 'success');
                onClose();
            },
            onError: (errors) => {
                const firstError = Object.values(errors)[0] || 'An error occurred';
                showSnackbar(`Error ${user ? 'updating' : 'creating'} user: ${firstError}`, 'error');
            },
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log('file change', e.target.files);
        if (file) {
            setAvatar(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const canEdit = () => {
        if (!isEdit) {
            return true;
        }
        if (user && user.id === currentUser?.id) {
            return true;
        }
        return false;
    }

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    padding: '32px',
                    backgroundColor: 'primary.background',
                },
            }}
        >
            <DialogTitle>{user ? 'Edit User' : 'Create User'}</DialogTitle>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <Box display="flex" justifyContent="center" mb={2}>
                            <Avatar
                                src={avatarPreview || undefined}
                                sx={{ width: 100, height: 100, cursor: 'pointer' }}
                                onClick={() => document.getElementById('avatar-input')?.click()}
                            />
                            <input
                                id="avatar-input"
                                type="file"
                                disabled={canEdit()}
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </Box>
                        <TextField
                            label="Name"
                            disabled={canEdit()}
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            error={!!errors.name}
                            helperText={errors.name}
                            fullWidth
                        />
                        <FormControl fullWidth>
                            <InputLabel id="role-select-label">Role</InputLabel>
                            <Select
                                labelId="role-select-label"
                                value={data.role_id || ''}
                                label="Role"
                                disabled={canEdit()}
                                onChange={e => setData('role_id', e.target.value)}
                            >
                                {data?.roles?.length > 0 && data?.roles?.map((role) => (
                                    <MenuItem key={role.id} value={String(role.id) || 3}>
                                        {role.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Email"
                            type="email"
                            disabled={canEdit()}
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            error={!!errors.email}
                            helperText={errors.email}
                            fullWidth
                        />
                        <TextField
                            label="Phone"
                            disabled={canEdit()}
                            value={data.phone}
                            onChange={e => setData('phone', e.target.value)}
                            error={!!errors.phone}
                            helperText={errors.phone}
                            fullWidth
                        />
                        <TextField
                            label="Address"
                            disabled={canEdit()}
                            value={data.address}
                            onChange={e => setData('address', e.target.value)}
                            error={!!errors.address}
                            helperText={errors.address}
                            fullWidth
                        />
                        {
                            !user && (
                                <>
                                    <TextField
                                        label="Password"
                                        type="password"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        error={!!errors.password}
                                        helperText={errors.password}
                                        fullWidth
                                    />
                                    <TextField
                                        label="Password Confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={e => setData('password_confirmation', e.target.value)}
                                        error={!!errors.password_confirmation}
                                        helperText={errors.password_confirmation}
                                        fullWidth
                                    />
                                </>
                            )
                        }
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={onClose}
                        color="error"
                    >
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary" disabled={processing}>
                        {user ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog >
    );
}
