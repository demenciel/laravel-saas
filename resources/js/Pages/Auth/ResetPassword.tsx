import { FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useTheme } from '@/Hooks/useTheme';
import { useSnackbar } from '@/Hooks/SnackbarProvider';

export default function ResetPassword({ token, email }: { token: string, email: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });
    const { showSnackbar } = useSnackbar();
    const { theme } = useTheme();
    const appUrl = usePage().props.url;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => {
                reset('password', 'password_confirmation')
                showSnackbar('Password reset successfully.', 'success');
            },
        });
    };

    return (
        <GuestLayout>
            <Head>
                <title>Reset Password - TechnoSaas</title>
                <meta name="description" content="The Reset Password page for your Saas business built using TechnoSaas Boilerplate" />
                <meta name="keywords" content="SaaS, TechnoSaas, boilerplate, Laravel, React, TypeScript, Tailwind CSS, Stripe Integration, SEO Optimized" />
                <meta property="og:title" content="Dashboard" />
                <meta property="og:description" content="The Reset Password page for your Saas business built using TechnoSaas Boilerplate" />
                <meta property="og:url" content={`${appUrl}/reset-password`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Reset Password" />
                <meta name="twitter:description" content="Discover TechnoSaas, the ultimate SaaS boilerplate to streamline your operations. Build your next project faster with pre-configured integrations and tools." />
                <meta name="twitter:image" content={`${appUrl}/Preview.png`} />
            </Head>


            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        style={{ background: theme === 'dark' ? '#171717' : '#fff' }}
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
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
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        type="password"
                        name="password_confirmation"
                        style={{ background: theme === 'dark' ? '#171717' : '#fff' }}
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Reset Password
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
