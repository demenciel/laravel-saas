import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Blog, PageProps } from '@/types';
import { Box, Typography, Card, CardMedia, CardContent, Grid, Paper, Divider } from '@mui/material';
import { useTheme } from '@/Hooks/useTheme';

export default function Show({ auth, blog }: PageProps & { blog: Blog }) {
    const appUrl = usePage().props.appUrl || null;
    const theme = useTheme();
    const [formattedBody, setFormattedBody] = React.useState<string[]>([]);

    const isListItem = (word: string): boolean => {
        const numberPattern = /^\d+\.\s/;
        const bulletPoints = ['•', '·', '○', '●', '◦', '▪', '▫', '⦿', '⁃', '‣', '⁌', '⁍'];
        return numberPattern.test(word) || bulletPoints.some(bullet => word.startsWith(bullet));
    };

    const detectParagraphs = (text: string) => {
        const lines = text.split('\n');
        let paragraphs: string[] = [];


        lines.forEach((line) => {
            if (line.trim() !== '') {
                paragraphs.push(line.trim());
                paragraphs.push('');
            }
        });
        if (paragraphs[paragraphs.length - 1] === '') {
            paragraphs.pop();
        }
        paragraphs.forEach((paragraph) => {
            const words = paragraph.split(' ');
            words.forEach((word) => {
                if (isListItem(word)) {
                    console.log(word);
                }
            });
        });
        return paragraphs;
    };

    const boldFirstWord = (word: string) => {
        if (isListItem(word)) {
            return true;
        }
        // if sentence or word has break line on top and bottom 
        if (word.startsWith('\n') && word.endsWith('\n')) {
            return true;
        }
        return false;
    };

    React.useEffect(() => {
        if (blog.body) {
            const paragraphs = detectParagraphs(blog.body);
            setFormattedBody(paragraphs);
        }
    }, [blog.body]);

    return (
        <AuthenticatedLayout user={auth.user}>
            {/* <Head>
                <title>{blog?.title || 'Blog'} | TechnoSaas Blog</title>
                <meta name="description" content={blog?.meta_description || blog?.sub_header || 'Blog'} />
                <meta name="keywords" content={blog?.meta_keywords.toString()} />
                <meta property="og:title" content={blog?.title} />
                <meta property="og:description" content={blog?.meta_description || blog?.sub_header} />
                <meta property="og:url" content={`${appUrl}/blog/${blog.id}`} />
                <meta property="og:image" content={blog?.meta_image ? `${appUrl}/storage/${blog.meta_image}` : `${appUrl}/Preview.png`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={blog?.title} />
                <meta name="twitter:description" content={blog?.meta_description || blog?.sub_header} />
                <meta name="twitter:image" content={blog?.meta_image ? `${appUrl}/storage/${blog.meta_image}` : `${appUrl}/Preview.png`} />
            </Head> */}

            <div className="container mx-auto py-8 bg-transparent">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card
                            className='bg-background px-8 md:px-32 lg:px-80'
                            sx={{ boxShadow: 3, transition: '0.3s', '&:hover': { boxShadow: 6 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {blog.image && (
                                <CardMedia
                                    component="img"
                                    height="140"
                                    sx={{ py: { sm: 4, md: 8 }, width: '400px', height: 'auto', objectFit: 'cover', alignSelf: 'center' }}
                                    src={`${appUrl}/storage/${blog.image}`}
                                    image={`${appUrl}/storage/${blog.image}`}
                                    alt={blog.alt_text_image || blog.title}
                                />
                            )}
                            <CardContent sx={{ padding: 3 }}
                            >
                                <Typography py={2} variant="h4" component="h1" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, fontWeight: 'bold' }}>
                                    {blog.title}
                                </Typography>
                                <Divider sx={{ marginY: 3 }} />
                                <Typography variant="subtitle2" color="textSecondary">
                                    {`By ${blog.author?.name} on ${new Date(blog.created_at).toLocaleDateString()}`}
                                </Typography>
                                <Typography variant="h6" color="textSecondary" gutterBottom>
                                    {blog.sub_header}
                                </Typography>

                                <Divider sx={{ marginY: 3 }} />
                                <Typography
                                    variant="body1" sx={{ whiteSpace: 'pre-line', fontWeight: 300, letterSpacing: 1, fontSize: 20 }}>
                                    {formattedBody.map((paragraph, index) => (
                                        <React.Fragment key={index}>
                                            {boldFirstWord(paragraph) ? <b>{paragraph}</b> : paragraph}
                                            {index < formattedBody.length - 1 && <br />}
                                        </React.Fragment>
                                    ))}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </AuthenticatedLayout>
    );
}
