import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Blog, PageProps } from '@/types';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
    TextField,
    Button,
    Typography,
    Box,
    Grid,
    Tooltip,
    IconButton,
} from '@mui/material';
import { useSnackbar } from '@/Hooks/SnackbarProvider';

export default function Edit({ auth, blog }: PageProps & { blog: Blog }) {
    const appUrl = usePage().props.appUrl || null;
    const { showSnackbar } = useSnackbar();
    const { data, setData, put, processing, errors, reset } = useForm({
        title: blog.title,
        sub_header: blog.sub_header,
        body: blog.body,
        image: blog.image || null,
        meta_image: blog.meta_image,
        meta_title: blog.meta_title,
        alt_text_image: blog.alt_text_image,
        meta_description: blog.meta_description,
        meta_keywords: blog.meta_keywords,
        slug: blog.slug,
    });
    const [image, setImage] = useState<File | null>(blog.image ? new File([blog.image], blog.image) : null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.body && !data.title) {
            showSnackbar("Please fill in all the required fields.", "error");
            return;
        }
        put(route('blog.update', blog.id), {
            onSuccess: () => {
                showSnackbar('Blog updated successfully!', 'success');
                reset();
            },
            onError: (errors) => {
                if (errors) {
                    // Show validation errors
                    showSnackbar('Failed to update blog. Please correct the errors and try again.', 'error');
                } else {
                    showSnackbar('An unexpected error occurred. Please try again later.', 'error');
                }
            },
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setImage(files[0]);
        } else {
            setData((oldData) => ({ ...oldData, [name]: value }));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Blog</h2>}
        >
            <Head>
                <title>Edit a Blog Post | TechnoSaas</title>
                <meta name="description" content="Edit your blog post with TechnoSaas. A simple and powerful tool for bloggers to share their knowledge." />
                <meta name="keywords" content="Edit Blog Post, SaaS Blog, Write Blog, Tech Blog, SaaS Dashboard, Blog Article, Blog Management, Blogging Platform, TechnoSaas" />
                <meta property="og:title" content="Edit a Blog Post | TechnoSaas" />
                <meta property="og:description" content="Edit your blog post with TechnoSaas. A simple and powerful tool for bloggers to share their knowledge." />
                <meta property="og:url" content={`${appUrl}/blog/edit`} />
                <meta property="og:image" content={`${appUrl}/Preview.png`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Edit a Blog Post | TechnoSaas" />
                <meta name="twitter:description" content="Edit your blog post with TechnoSaas. A simple and powerful tool for bloggers to share their knowledge." />
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
                            Edit Article
                        </Typography>
                    </Box>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            autoFocus
                            value={data.title}
                            onChange={handleChange}
                            error={!!errors.title}
                            helperText={errors.title}
                            InputProps={{
                                endAdornment: (
                                    <Tooltip title="Use keywords in your title for better SEO. Keep it under 60 characters for optimal display in search results.">
                                        <IconButton>
                                            <HelpOutlineIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                ),
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="sub_header"
                            label="Sub Header"
                            name="sub_header"
                            autoFocus
                            value={data.sub_header}
                            onChange={handleChange}
                            error={!!errors.sub_header}
                            helperText={errors.sub_header}
                            InputProps={{
                                endAdornment: (
                                    <Tooltip title="Use keywords in your sub header for better SEO. Keep it under 60 characters for optimal display in search results.">
                                        <IconButton>
                                            <HelpOutlineIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                ),
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="body"
                            label="Content"
                            name="body"
                            multiline
                            value={data.body}
                            onChange={handleChange}
                            error={!!errors.body}
                            helperText={errors.body}
                            InputProps={{
                                sx: {
                                    '& .MuiInputBase-input': {
                                        resize: 'vertical',
                                        overflow: 'auto',
                                        minHeight: '100px',
                                    },
                                },
                                endAdornment: (
                                    <Tooltip title="Include relevant keywords naturally throughout your content. Aim for at least 300 words for better SEO performance.">
                                        <IconButton>
                                            <HelpOutlineIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    padding: '8px',
                                    '& textarea': {
                                        resize: 'vertical',
                                    },
                                },
                            }}
                        />

                        <TextField
                            margin="normal"
                            fullWidth
                            id="meta_title"
                            label="Meta Title"
                            name="meta_title"
                            value={data.meta_title}
                            onChange={handleChange}
                            error={!!errors.meta_title}
                            helperText={errors.meta_title}
                            InputProps={{
                                endAdornment: (
                                    <Tooltip title="Keep your meta title under 60 characters. Include your main keyword near the beginning for better SEO.">
                                        <IconButton>
                                            <HelpOutlineIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                ),
                            }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="meta_description"
                            label="Meta Description"
                            name="meta_description"
                            value={data.meta_description}
                            onChange={handleChange}
                            error={!!errors.meta_description}
                            helperText={errors.meta_description}
                            InputProps={{
                                endAdornment: (
                                    <Tooltip title="Aim for 150-160 characters in your meta description. Include your main keyword and a call-to-action to improve click-through rates.">
                                        <IconButton>
                                            <HelpOutlineIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                ),
                            }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="meta_keywords"
                            label="Meta Keywords"
                            name="meta_keywords"
                            value={data.meta_keywords}
                            onChange={handleChange}
                            error={!!errors.meta_keywords}
                            helperText={errors.meta_keywords}
                            InputProps={{
                                endAdornment: (
                                    <Tooltip title="While less important for SEO now, use 5-10 relevant keywords separated by commas. Focus on long-tail keywords for better targeting.">
                                        <IconButton>
                                            <HelpOutlineIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                ),
                            }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="slug"
                            label="Slug"
                            name="slug"
                            value={data.slug}
                            onChange={handleChange}
                            error={!!errors.slug}
                            helperText={errors.slug}
                            InputProps={{
                                endAdornment: (
                                    <Tooltip title="Use hyphens to separate words in your slug. Include your main keyword for better SEO, but keep it short and readable.">
                                        <IconButton>
                                            <HelpOutlineIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                ),
                            }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="meta_image"
                            label="Meta Image"
                            name="meta_image"
                            value={data.meta_image}
                            onChange={handleChange}
                            error={!!errors.meta_image}
                            helperText={errors.meta_image}
                            InputProps={{
                                endAdornment: (
                                    <Tooltip title="Choose a path to an image that will be used as the meta image for your blog post.">
                                        <IconButton>
                                            <HelpOutlineIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                ),
                            }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="alt_text_image"
                            label="Alt Text Image"
                            name="alt_text_image"
                            value={data.alt_text_image}
                            onChange={handleChange}
                            error={!!errors.alt_text_image}
                            helperText={errors.alt_text_image}
                            InputProps={{
                                endAdornment: (
                                    <Tooltip title="Provide a brief description of the image for better accessibility.">
                                        <IconButton>
                                            <HelpOutlineIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                ),
                            }}
                        />

                        <Box margin="normal" sx={{
                            borderRadius: 1,
                            marginTop: 1,
                            padding: 2,
                            borderWidth: 1,
                            borderColor: 'primary.white',
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item xs={10}>
                                    <Button
                                        variant={image !== null ? 'contained' : 'outlined'}
                                        component="label"
                                        sx={{ marginLeft: 2, color: 'white' }}
                                        color="primary"
                                    >
                                        Upload Article Image
                                        <input
                                            type="file"
                                            id="image"
                                            name="image"
                                            hidden
                                            onChange={(e) => {
                                                const file = e.target.files?.[0] || null;
                                                setImage(file);
                                                setData('image', file);
                                            }}
                                        />
                                    </Button>
                                    {errors.image && (
                                        <Typography color="error" variant="body2">
                                            {errors.image}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid item xs={2}>
                                <Tooltip title="Use an eye-catching image that represents your content well. Optimal size is 1200x630 pixels for social media sharing.">
                                    <IconButton>
                                        <HelpOutlineIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Box>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{ mt: 3, mb: 2, color: 'white' }}
                            disabled={processing}
                        >
                            Edit Blog
                        </Button>
                    </Box>
                </Box>
            </div>
        </AuthenticatedLayout>
    );
}
