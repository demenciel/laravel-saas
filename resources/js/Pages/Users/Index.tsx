import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { PageProps, User } from '@/types';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useTheme } from '@/Hooks/useTheme';

/* import UserModal from './Partials/UserModal';
import DeleteUserModal from './Partials/DeleteUserModal'; */

type SortField = 'name' | 'email' | 'phone' | 'role';
type SortOrder = 'asc' | 'desc';

export default function UsersIndex({ auth, users }: PageProps & { users: User[] }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const theme = useTheme();
    const appUrl = usePage().props.appUrl || null;

    const [sortedUsers, setSortedUsers] = useState<User[]>(users);
    const [sortField, setSortField] = useState<SortField>('name');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

    useEffect(() => {
        setSortedUsers([...users].sort((a, b) => {
            if (sortField === 'role') {
                return sortOrder === 'asc'
                    ? (a.role?.name || '').localeCompare(b.role?.name || '')
                    : (b.role?.name || '').localeCompare(a.role?.name || '');
            }
            return sortOrder === 'asc'
                ? (a[sortField] || '').localeCompare(b[sortField] || '')
                : (b[sortField] || '').localeCompare(a[sortField] || '');
        }));
    }, [users, sortField, sortOrder]);

    const handleSort = (field: SortField) => {
        if (field === sortField) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) return null;
        return sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Users</h2>}
        >
            <Head>
                <title>TechnoSaas - Manage Users</title>
                <meta name="description" content="Manage users of your SaaS application with TechnoSaas. Add, edit, or remove users easily." />
                <meta name="keywords" content="User Management, TechnoSaas, SaaS Users, Laravel, React, TypeScript, Tailwind CSS" />
                <meta property="og:title" content="TechnoSaas - Manage Users" />
                <meta property="og:description" content="Manage users of your SaaS application with TechnoSaas. Add, edit, or remove users easily." />
                <meta property="og:url" content={`${appUrl}/users`} />
                <meta property="og:image" content={`${appUrl}/Preview.png`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="TechnoSaas - Manage Users" />
                <meta name="twitter:description" content="Manage users of your SaaS application with TechnoSaas. Add, edit, or remove users easily." />
                <meta name="twitter:image" content={`${appUrl}/Preview.png`} />
            </Head>

            <Box
                sx={{ py: 3, p: 8 }}>
                <Paper sx={{ maxWidth: 'xl', mx: 'auto', p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6">Users List</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setIsCreateModalOpen(true)}
                        >
                            Add New User
                        </Button>
                    </Box>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {['Name', 'Email', 'Phone', 'Role'].map((header) => (
                                        <TableCell
                                            key={header}
                                            onClick={() => handleSort(header.toLowerCase() as SortField)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                {header}
                                                <SortIcon field={header.toLowerCase() as SortField} />
                                            </Box>
                                        </TableCell>
                                    ))}
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>{user.role?.name}</TableCell>
                                        <TableCell>
                                            <Button
                                                color="primary"
                                                onClick={() => {
                                                    setSelectedUser(user);
                                                    setIsEditModalOpen(true);
                                                }}
                                                sx={{ mr: 1 }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                color="error"
                                                onClick={() => {
                                                    setSelectedUser(user);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>

            {/* <UserModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                user={null}
            />
            <UserModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                user={selectedUser}
            />
            <DeleteUserModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                user={selectedUser}
            /> */}
        </AuthenticatedLayout>
    );
}
