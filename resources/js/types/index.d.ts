export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    role?: {
        id: number;
        name: string;
    };
    status?: string;
    phone?: string;
    address?: string;
    photo?: {
        id: number;
        path: string;
    };
    profile_photo_path?: string;
}

export interface Blog {
    id: number;
    title: string;
    author: {
        id: number;
        name: string;
    };
    alt_text_image?: string;
    image: string;
    header: string;
    sub_header: string;
    body: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    meta_image: string;
    slug: string;
    created_at: string;
    updated_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
