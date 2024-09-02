import { FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useTheme } from '@/Hooks/useTheme';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const appUrl = usePage().props.appUrl;
    const { theme } = useTheme();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head>
                <title>Sign up - TechnoSaas</title>
                <meta name="description" content="Sign up for TechnoSaas to access your dashboard and manage your SaaS business efficiently." />
                <meta name="keywords" content="SaaS, TechnoSaas, boilerplate, Laravel, React, TypeScript, Tailwind CSS, Stripe Integration, SEO Optimized, Signup" />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="TechnoSaas" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content="Sign up - TechnoSaas" />
                <meta property="og:description" content="Sign up for TechnoSaas to access your dashboard and manage your SaaS business efficiently." />
                <meta property="og:url" content={`${appUrl}/register`} />
                <meta property="og:image" content={`${appUrl}/Preview.png`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Sign up - TechnoSaas" />
                <meta name="twitter:description" content="Sign up for TechnoSaas to access your dashboard and manage your SaaS business efficiently." />
                <meta name="twitter:image" content={`${appUrl}/Preview.png`} />
            </Head>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        style={{ background: theme === 'dark' ? '#171717' : '#fff' }}
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        style={{ background: theme === 'dark' ? '#171717' : '#fff' }}
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        style={{ background: theme === 'dark' ? '#171717' : '#fff' }}
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        style={{ background: theme === 'dark' ? '#171717' : '#fff' }}
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 dark:hover:text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
