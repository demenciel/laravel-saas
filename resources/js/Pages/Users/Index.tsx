import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import { PageProps, User } from "@/types";
import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Box,
    IconButton,
    Avatar,
    Popover,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UserModal from "./Partials/UserModal";
import DeleteUserModal from "./Partials/DeleteUserModal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ArrowDropDownCircleTwoTone } from "@mui/icons-material";

/* import UserModal from './Partials/UserModal';
import DeleteUserModal from './Partials/DeleteUserModal'; */
type SortField = "name" | "email" | "phone" | "role";
type SortOrder = "asc" | "desc";

type Role = {
    id: number;
    name: string;
};

export default function UsersIndex({
    auth,
    users,
    roles,
}: PageProps & { users: User[]; roles: Role[] }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isShowModalOpen, setIsShowModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const appUrl = usePage().props.appUrl || null;

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const [sortedUsers, setSortedUsers] = useState<User[]>(users);
    const [sortField, setSortField] = useState<SortField>("name");
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

    useEffect(() => {
        setSortedUsers(
            [...users].sort((a, b) => {
                if (sortField === "role") {
                    return sortOrder === "asc"
                        ? (a.role?.name || "").localeCompare(b.role?.name || "")
                        : (b.role?.name || "").localeCompare(
                            a.role?.name || ""
                        );
                }
                return sortOrder === "asc"
                    ? (a[sortField] || "").localeCompare(b[sortField] || "")
                    : (b[sortField] || "").localeCompare(a[sortField] || "");
            })
        );
    }, [users, sortField, sortOrder]);

    const handleSort = (field: SortField) => {
        if (field === sortField) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) return null;
        return sortOrder === "asc" ? (
            <ArrowUpwardIcon fontSize="small" />
        ) : (
            <ArrowDownwardIcon fontSize="small" />
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Manage Users
                </h2>
            }
        >
            <Head>
                <title>Manage Users | TechnoSaas</title>
                <meta
                    name="description"
                    content="Manage users of your SaaS application with TechnoSaas. Add, edit, or remove users easily."
                />
                <meta
                    name="keywords"
                    content="User Management, TechnoSaas, SaaS Users, Laravel, React, TypeScript, Tailwind CSS"
                />
                <meta property="og:title" content="Manage Users | TechnoSaas" />
                <meta
                    property="og:description"
                    content="Manage users of your SaaS application with TechnoSaas. Add, edit, or remove users easily."
                />
                <meta property="og:url" content={`${appUrl}/users`} />
                <meta property="og:image" content={`${appUrl}/Preview.png`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="Manage Users | TechnoSaas"
                />
                <meta
                    name="twitter:description"
                    content="Manage users of your SaaS application with TechnoSaas. Add, edit, or remove users easily."
                />
                <meta name="twitter:image" content={`${appUrl}/Preview.png`} />
            </Head>

            <div className="container mx-auto flex flex-col p-16">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                    }}
                >
                    <Typography
                        variant="h6"
                        className="text-gray-800 dark:text-gray-100"
                    >
                        All Users
                    </Typography>
                    <IconButton
                        color="primary"
                        onClick={() => setIsCreateModalOpen(true)}
                        size="small"
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
                <Box
                    sx={{ backgroundColor: "transparent" }}
                    className="p-4 sm:p-8 rounded-lg bg-whiteshadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-3 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                >
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {["Name", "Email", "Phone", "Role"].map(
                                        (header) => (
                                            <TableCell
                                                key={header}
                                                onClick={() =>
                                                    handleSort(
                                                        header.toLowerCase() as SortField
                                                    )
                                                }
                                                sx={{ cursor: "pointer" }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    {header}
                                                    <SortIcon
                                                        field={
                                                            header.toLowerCase() as SortField
                                                        }
                                                    />
                                                </Box>
                                            </TableCell>
                                        )
                                    )}
                                    <TableCell align="center">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="text-gray-800 dark:text-gray-100">
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                                <Avatar src={user.profile_photo_path} alt={user.name} />
                                                {user.name}
                                            </Box>
                                        </TableCell>
                                        <TableCell className="text-gray-800 dark:text-gray-100">
                                            {user.email}
                                        </TableCell>
                                        <TableCell className="text-gray-800 dark:text-gray-100">
                                            {user.phone}
                                        </TableCell>
                                        <TableCell className="text-gray-800 dark:text-gray-100">
                                            {user.role?.name}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                onClick={(event) => {
                                                    setSelectedUser(user);
                                                    setAnchorEl(event.currentTarget);
                                                }}
                                                size="small"
                                            >
                                                <ArrowDropDownCircleTwoTone />
                                            </IconButton>
                                            <Popover
                                                open={Boolean(anchorEl)}
                                                anchorEl={anchorEl}
                                                onClose={() => setAnchorEl(null)}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'center',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                            >
                                                <List>
                                                    <ListItemButton onClick={() => {
                                                        setIsShowModalOpen(true);
                                                        setAnchorEl(null);
                                                    }}>
                                                        <ListItemIcon><VisibilityIcon /></ListItemIcon>
                                                        <ListItemText primary="Show" />
                                                    </ListItemButton>
                                                    <ListItemButton onClick={() => {
                                                        setIsEditModalOpen(true);
                                                        setAnchorEl(null);
                                                    }}>
                                                        <ListItemIcon><EditIcon /></ListItemIcon>
                                                        <ListItemText primary="Edit" />
                                                    </ListItemButton>
                                                    <ListItemButton onClick={() => {
                                                        setIsDeleteModalOpen(true);
                                                        setAnchorEl(null);
                                                    }}>
                                                        <ListItemIcon><DeleteIcon /></ListItemIcon>
                                                        <ListItemText primary="Delete" />
                                                    </ListItemButton>
                                                </List>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </div>
            {isDeleteModalOpen && (
                <DeleteUserModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    user={selectedUser}
                />
            )}
            {isCreateModalOpen && (
                <UserModal
                    isEdit={false}
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    user={null}
                    roles={roles}
                />
            )}
            {isEditModalOpen && (
                <UserModal
                    isEdit={true}
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    user={selectedUser}
                    roles={roles}
                    currentUser={auth.user}
                />
            )}
            {isShowModalOpen && (
                <UserModal
                    isEdit={false}
                    isOpen={isShowModalOpen}
                    onClose={() => setIsShowModalOpen(false)}
                    user={selectedUser}
                    roles={roles}
                    currentUser={auth.user}
                />
            )}
        </AuthenticatedLayout>
    );
}
