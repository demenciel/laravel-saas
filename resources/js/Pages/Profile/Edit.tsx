import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Edit({ auth, mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean, status?: string }>) {
    const appUrl = usePage().props.url;
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head>
                <title>Profile | Manage Your SaaS Business with TechnoSaas Boilerplate</title>
                <meta name="description" content="Manage your SaaS business profile built with TechnoSaas. Efficient and optimized SaaS development using Laravel and React." />

                <meta name="keywords" content="SaaS, TechnoSaas, boilerplate, Laravel, React, TypeScript, Tailwind CSS, Stripe Integration, SEO Optimized" />
                <meta property="og:title" content="Profile | Manage Your SaaS Business with TechnoSaas Boilerplate" />
                <meta property="og:description" content="The Profile page for your Saas business built using TechnoSaas Boilerplate" />
                <meta property="og:url" content={`${appUrl}/`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Profile | Manage Your SaaS Business with TechnoSaas Boilerplate" />
                <meta name="twitter:description" content="Manage your SaaS business profile built with TechnoSaas. Efficient and optimized SaaS development using Laravel and React." />
                <meta name="twitter:image" content={`${appUrl}/Preview.png`} />
            </Head>

            <div className="py-12 ">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 ">
                    <div className="p-4 sm:p-8 rounded-lg bg-whiteshadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-3 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 rounded-lg bg-whiteshadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-3 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 rounded-lg bg-whiteshadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-3 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
