import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });
    const appUrl = usePage().props.appUrl;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
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

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
