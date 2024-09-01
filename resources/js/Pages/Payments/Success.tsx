import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Head, router, usePage } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import { PageProps } from '@/types';

export default function Success({ auth }: PageProps) {
    const appUrl = usePage().props.appUrl;
    const message = usePage().props.message || 'Your payment has been created successfully!';
    const file_url = usePage().props.file_url;
    const [countDown, setCountdown] = useState<number>(5);

    useEffect(() => {
        if (typeof file_url === 'string' && file_url) {
            setTimeout(() => {
                window.location.href = file_url;
            }, 1000);
        }
    }, [file_url]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCount) => prevCount - 1);
        }, 1000);
        if (countDown <= 0) {
            window.location.href = '/';
        }

        return () => {
            clearInterval(timer);
        };
    }, [appUrl, file_url]);

    return (
        <div className="dark bg-gray-50 text-black/50 min-h-screen dark:bg-black/90 dark:text-white/50">
            <section className="pb-16 md:py-16 bg-gray-100 dark:bg-transparent">
                <img id="background" className="absolute -left-20 top-0 max-w-[877px]" src="/hero-blur.png" />
                <Navbar auth={auth} />
                <div className="relative flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <Head>
                        <title>Payment Success</title>
                    </Head>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="container mx-auto mt-10 p-6"
                    >
                        <div className="flex flex-col items-center justify-center space-y-6">
                            <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <h1 className="text-3xl font-bold text-center text-green-600">Payment Successful!</h1>
                            <p className="text-center text-gray-700 dark:text-gray-300">{String(message)}</p> // Cast message to string

                            <div className="text-center mt-6">
                                <p className="text-xl text-gray-700 dark:text-gray-300">Redirecting in {countDown} seconds...</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}