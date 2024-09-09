import React from 'react';
import { Popover, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from '@inertiajs/react';
import { Blog } from '@/types';

interface BlogActionPopoverProps {
    anchorEl: HTMLButtonElement | null;
    onClose: () => void;
    onView: () => void;
    onEdit: () => void;
    onDelete: () => void;
    id: number;
}

const BlogActionPopover: React.FC<BlogActionPopoverProps> = ({
    anchorEl, onClose, onView, onEdit, onDelete, id
}) => (
    <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
        <List>
            <ListItemButton onClick={onView}>
                <Link href={route('blog.show', id)} className='flex flex-row items-center gap-2'>
                    <ListItemIcon><VisibilityIcon /></ListItemIcon>
                    <ListItemText primary="View" />
                </Link>
            </ListItemButton>
            <ListItemButton onClick={onEdit}>
                <Link href={route('blog.edit', id)} className='flex flex-row items-center gap-2'>
                    <ListItemIcon><EditIcon /></ListItemIcon>
                    <ListItemText primary="Edit" />
                </Link>
            </ListItemButton>
            <ListItemButton onClick={onDelete}>
                <Link href={route('blog.destroy', id)} className='flex flex-row items-center gap-2'>
                    <ListItemIcon><DeleteIcon /></ListItemIcon>
                    <ListItemText primary="Delete" />
                </Link>
            </ListItemButton>
        </List>
    </Popover>
);

export default BlogActionPopover;