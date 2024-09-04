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

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
