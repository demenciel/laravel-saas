import { FormEventHandler } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useTheme } from '@/Hooks/useTheme';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const appUrl = usePage().props.appUrl;
    const { theme } = useTheme();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head>
                <title>Log in - TechnoSaas</title>
                <meta name="description" content="Log in to your TechnoSaas account to access your dashboard and manage your SaaS business efficiently." />
                <meta name="keywords" content="SaaS, TechnoSaas, boilerplate, Laravel, React, TypeScript, Tailwind CSS, Stripe Integration, SEO Optimized, Login" />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="TechnoSaas" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content="Log in - TechnoSaas" />
                <meta property="og:description" content="Log in to your TechnoSaas account to access your dashboard and manage your SaaS business efficiently." />
                <meta property="og:url" content={`${appUrl}/login`} />
                <meta property="og:image" content={`${appUrl}/images/og-image.png`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Log in - TechnoSaas" />
                <meta name="twitter:description" content="Log in to your TechnoSaas account to access your dashboard and manage your SaaS business efficiently." />
                <meta name="twitter:image" content={`${appUrl}/images/twitter-image.png`} />
            </Head>

            <form onSubmit={submit}>
                <div className='dark:text-white/50'>
                    <InputLabel className='dark:text-white/50' htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"

                        name="email"
                        style={{ background: theme === 'dark' ? '#171717' : '#fff' }}
                        value={data.email}
                        className="mt-1 block w-full dark:text-white/50"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        style={{ background: theme === 'dark' ? '#171717' : '#fff' }}
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 dark:hover:text-primary hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
            <div className='w-full border-t border-primary my-4'></div>
            <div className='flex flex-col items-center justify-between'>
                <a href={route('facebook.login')} className="w-full flex items-center justify-center mt-4">
                    <PrimaryButton className="w-full flex items-center justify-center p-2 rounded-full bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <svg className="h-6 w-6 text-white mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.325v21.351C0 23.405.595 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.595 1.325-1.324V1.325C24 .595 23.405 0 22.675 0z" />
                        </svg>
                        <span className="text-white">Log in with Facebook</span>
                    </PrimaryButton>
                </a>
                <a href={route('google.login')} className="w-full flex items-center justify-center mt-4">
                    <PrimaryButton className="w-full flex items-center justify-center p-2 rounded-full bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        <svg className="h-6 w-6 text-white mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor">
                            <path d="M24 9.5c3.9 0 6.6 1.7 8.1 3.1l6-5.8C34.8 3.5 29.8 1 24 1 14.7 1 7.1 6.9 4.1 15.1l7.1 5.5C12.8 13.1 17.9 9.5 24 9.5zM9.9 28.5c-1.1-3.3-1.1-6.9 0-10.2L2.8 12.8C.9 16.4 0 20.1 0 24s.9 7.6 2.8 11.2l7.1-5.5zM24 38.5c-4.1 0-7.8-1.6-10.6-4.2l-7.1 5.5C7.1 41.1 14.7 47 24 47c5.8 0 10.8-2.5 14.1-6.4l-7.1-5.5c-1.5 1.4-4.2 3.4-8.1 3.4zM43.6 20.3H24v7.4h11.1c-1.1 3.1-3.4 5.7-6.4 7.4l7.1 5.5c4.1-3.8 6.4-9.4 6.4-15.9 0-1.1-.1-2.2-.3-3.3z" />
                        </svg>
                        <span className="ms-2 text-white">Log in with Google</span>
                    </PrimaryButton>
                </a>
            </div>
        </GuestLayout>
    );
}
