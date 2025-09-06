import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Head, router, usePage } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import { PageProps } from '@/types';

export default function Cancel({ auth }: PageProps) {
    const appUrl = usePage().props.appUrl;
    const message = usePage().props.message || 'Oups ! Something went wrong.';
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCount) => prevCount - 1);
        }, 1000);

        const redirect = setTimeout(() => {
            router.get('/');
        }, 5000);

        return () => {
            clearInterval(timer);
            clearTimeout(redirect);
        };
    }, []);

    return (
        <div className="dark bg-gray-50 text-black/50 min-h-screen dark:bg-black/90 dark:text-white/50">
            <section className="pb-16 md:py-16 bg-gray-100 dark:bg-transparent">
                <Head>
                    <title>Payment Cancel | TechnoSaas</title>
                    <meta name="description" content="Your payment was cancelled. Please try again." />
                    <meta name="keywords" content="SaaS, TechnoSaas, payment cancel, SaaS boilerplate, Laravel, React, Stripe Integration" />
                    <meta property="og:title" content="Payment Cancel | TechnoSaas" />
                    <meta property="og:description" content="Your payment was cancelled. Please try again." />
                    <meta property="og:url" content={`${appUrl}/payment-cancel`} />
                    <meta property="og:image" content={`${appUrl}/Preview.png`} />
                    <meta property="og:type" content="website" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="Payment Cancel | TechnoSaas" />
                    <meta name="twitter:description" content="Your payment was cancelled. Please try again." />
                    <meta name="twitter:image" content={`${appUrl}/Preview.png`} />
                    <link rel="canonical" href={`${appUrl}/payment-cancel`} />
                </Head>
                <img id="background" className="absolute -left-20 top-0 max-w-[877px]" src="/hero-blur.png" />
                <Navbar auth={auth} />
                <div className="relative flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <Head>
                        <title>Payment Cancel</title>
                    </Head>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="container mx-auto mt-10 p-6"
                    >
                        <div className="flex flex-col items-center justify-center space-y-6">
                            <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            <h1 className="text-3xl font-bold text-center text-red-600">Payment Cancelled!</h1>
                            <p className="text-center text-gray-700 dark:text-gray-300">{String(message)}</p>
                            <div className="text-center mt-6">
                                <p className="text-xl text-gray-700 dark:text-gray-300">Redirecting in {countdown} seconds...</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}