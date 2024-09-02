import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Dashboard({ auth }: PageProps) {
    const appUrl = usePage().props.appUrl || null;
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Welcome to Your TechnoSaas Dashboard</h2>}
        >
            <Head>
                <title>TechnoSaas Dashboard - Manage Your SaaS Business Effectively</title>
                <meta name="description" content="Access and manage your SaaS business effectively with the TechnoSaas Dashboard. Get insights, manage users, subscriptions, and more." />
                <meta name="keywords" content="SaaS Dashboard, TechnoSaas, SaaS management, Laravel, React, TypeScript, Tailwind CSS, Stripe Integration, SEO Optimized" />
                <meta property="og:title" content="TechnoSaas Dashboard - Manage Your SaaS Business Effectively" />
                <meta property="og:description" content="Access and manage your SaaS business effectively with the TechnoSaas Dashboard. Get insights, manage users, subscriptions, and more." />
                <meta property="og:url" content={`${appUrl}/dashboard`} />
                <meta property="og:image" content={`${appUrl}/Preview.png`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="TechnoSaas Dashboard - Manage Your SaaS Business Effectively" />
                <meta name="twitter:description" content="Access and manage your SaaS business effectively with the TechnoSaas Dashboard. Get insights, manage users, subscriptions, and more." />
                <meta name="twitter:image" content={`${appUrl}/Preview.png`} />
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8 bg-white dark:bg-zinc-800 rounded-lg shadow-md text-left hover:ring-1 hover:ring-primary transition duration-300">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-800 dark:text-white">You're logged in!</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
