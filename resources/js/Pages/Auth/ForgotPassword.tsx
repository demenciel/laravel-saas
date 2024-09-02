import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { useTheme } from '@/Hooks/useTheme';
import { Snackbar } from '@mui/material';
import { useSnackbar } from '@/Hooks/SnackbarProvider';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });
    const appUrl = usePage().props.appUrl;
    const { showSnackbar } = useSnackbar();
    const { theme } = useTheme();
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (data.email === '') {
            showSnackbar('Please enter your email address.', 'error');
            return;
        }
        try {
            post(route('password.forgot'));
            if (status === 'password.reset') {
                showSnackbar('Email sent successfully.', 'success');
            }
        } catch (error) {
            console.log(error);
            showSnackbar('Something went wrong.', 'error');
        }
    };

    return (
        <GuestLayout>
            <Head>
                <title>Forgot Password</title>
                <meta name="description" content="The forgot your password page for your Saas business built using TechnoSaas Boilerplate" />
                <meta name="keywords" content="SaaS, TechnoSaas, boilerplate, Laravel, React, TypeScript, Tailwind CSS, Stripe Integration, SEO Optimized" />
                <meta property="og:title" content="Dashboard" />
                <meta property="og:description" content="The forgot your password page for your Saas business built using TechnoSaas Boilerplate" />
                <meta property="og:url" content={`${appUrl}/`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Forgot Password" />
                <meta name="twitter:description" content="Discover TechnoSaas, the ultimate SaaS boilerplate to streamline your operations. Build your next project faster with pre-configured integrations and tools." />
                <meta name="twitter:image" content={`${appUrl}/path_to_image.png`} />
            </Head>

            <div className="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email address and we will email you a password
                reset link that will allow you to choose a new one.
            </div>

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    style={{ background: theme === 'dark' ? '#171717' : '#fff' }}
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
