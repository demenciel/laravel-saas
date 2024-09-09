import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link, useForm } from "@inertiajs/react";
import { PageProps, Blog } from "@/types";
import { useState, useEffect } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
    Popover,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { ArrowDropDownCircleTwoTone } from "@mui/icons-material";
import BlogActionPopover from "./Partials/BlogActionPopover";

type SortField = "title" | "author" | "created_at";
type SortOrder = "asc" | "desc";

export default function BlogsAdminIndex({ auth, blogs }: PageProps & { blogs: Blog[] }) {
    const appUrl = usePage().props.appUrl || null;
    const { delete: destroy } = useForm();
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const [sortedBlogs, setSortedBlogs] = useState<Blog[]>(blogs);
    const [sortField, setSortField] = useState<SortField>("created_at");
    const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

    useEffect(() => {
        setSortedBlogs(
            [...blogs].sort((a, b) => {
                if (sortField === "author") {
                    return sortOrder === "asc"
                        ? (a.author?.name || "").localeCompare(b.author?.name || "")
                        : (b.author?.name || "").localeCompare(a.author?.name || "");
                }
                return sortOrder === "asc"
                    ? (a[sortField] || "").localeCompare(b[sortField] || "")
                    : (b[sortField] || "").localeCompare(a[sortField] || "");
            })
        );
    }, [blogs, sortField, sortOrder]);

    const handleSort = (field: SortField) => {
        if (field === sortField) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    const handleDelete = (id: number) => {
        destroy(route('blog.destroy', id));
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
                    Blog Management
                </h2>
            }
        >
            <Head>
                <title>Blog Management | TechnoSaas</title>
                <meta name="description" content="Manage your blog posts with ease using the TechnoSaas Dashboard. Organize, edit, and delete your articles effortlessly." />
                <meta name="keywords" content="Blog Management, TechnoSaas, Dashboard, Articles, Edit, Delete, Organize" />
                <meta property="og:title" content="Blog Management | TechnoSaas" />
                <meta property="og:description" content="Manage your blog posts with ease using the TechnoSaas Dashboard. Organize, edit, and delete your articles effortlessly." />
                <meta property="og:url" content={`${appUrl}/blog`} />
                <meta property="og:image" content={`${appUrl}/Preview.png`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Blog Management | TechnoSaas" />
                <meta name="twitter:description" content="Manage your blog posts with ease using the TechnoSaas Dashboard. Organize, edit, and delete your articles effortlessly." />
                <meta name="twitter:image" content={`${appUrl}/Preview.png`} />
            </Head>

            <div className="container mx-auto flex flex-col p-16">
                <Box sx={{ width: '100%', overflow: 'hidden' }}>
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
                            All Blogs
                        </Typography>

                        <Button variant="contained" color="primary">
                            <Link
                                className="text-white"
                                href={route('blog.create')}
                            >
                                Create New Article
                            </Link>
                        </Button>
                    </Box>
                    <Box
                        sx={{ backgroundColor: "transparent" }}
                        className="p-4 sm:p-8 rounded-lg bg-whiteshadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-3 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                    >
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="blog table">
                                <TableHead>
                                    <TableRow>
                                        {[
                                            { id: 'title', label: 'Title' },
                                            { id: 'author', label: 'Author' },
                                            { id: 'created_at', label: 'Created At' },
                                        ].map((column) => (
                                            <TableCell
                                                key={column.id}
                                                onClick={() => handleSort(column.id as SortField)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {column.label}
                                                <SortIcon field={column.id as SortField} />
                                            </TableCell>
                                        ))}
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {sortedBlogs && sortedBlogs?.map((blog) => (
                                        <TableRow key={blog?.id}>
                                            <TableCell>{blog?.title}</TableCell>
                                            <TableCell>{blog?.author?.name}</TableCell>
                                            <TableCell>{new Date(blog.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    onClick={(event) => {
                                                        setSelectedBlog(blog);
                                                        setAnchorEl(event.currentTarget);
                                                    }}
                                                    size="small"
                                                >
                                                    <ArrowDropDownCircleTwoTone />
                                                </IconButton>
                                                <Popover
                                                    open={Boolean(anchorEl)}
                                                    anchorEl={anchorEl}
                                                    onClose={() => {
                                                        setAnchorEl(null);
                                                        setSelectedBlog(null);
                                                    }}
                                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                                    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                                                >
                                                    <List>
                                                        <ListItemButton onClick={() => {
                                                            setAnchorEl(null);
                                                        }}>
                                                            <Link href={route('blog.show', selectedBlog?.id || 0)} className='flex flex-row items-center gap-2'>
                                                                <ListItemIcon><VisibilityIcon /></ListItemIcon>
                                                                <ListItemText primary="View" />
                                                            </Link>
                                                        </ListItemButton>
                                                        <ListItemButton onClick={() => setAnchorEl(null)}>
                                                            <Link href={route('blog.edit', selectedBlog?.id || 0)} className='flex flex-row items-center gap-2'>
                                                                <ListItemIcon><EditIcon /></ListItemIcon>
                                                                <ListItemText primary="Edit" />
                                                            </Link>
                                                        </ListItemButton>
                                                        <ListItemButton onClick={() => setAnchorEl(null)}>
                                                            <div onClick={() => handleDelete(selectedBlog?.id || 0)} className='flex flex-row items-center gap-2'>
                                                                <ListItemIcon><DeleteIcon /></ListItemIcon>
                                                                <ListItemText primary="Delete" />
                                                            </div>
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
                </Box>
            </div>
        </AuthenticatedLayout >
    );
}
