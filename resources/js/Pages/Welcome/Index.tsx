import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import Navbar from '@/Components/Navbar';
import FAQ from './Partials/FAQ';
import Hero from './Partials/Hero';
import PriceCards from '@/Components/PriceCards';
import TechnologiesBanner from './Partials/TechnoBanner';
import FeaturesSection from './Partials/FeaturesSection';
import { IconButton } from '@mui/material';
import { FaTwitter } from "react-icons/fa";

export default function Index({ auth }: PageProps) {
    const { products, csrf, appUrl } = usePage().props as unknown as {
        products: { data: any[] },
        csrf: string,
        appUrl: string
    };
    return (
        <>
            <Head>
                <title>TechnoSaas | Laravel & React SaaS Boilerplate with Stripe Integration</title>
                <meta name="description" content="TechnoSaas is a powerful Laravel & React boilerplate. Launch your SaaS fast with Stripe, TypeScript, and more." />
                <meta name="keywords" content="SaaS boilerplate, TechnoSaas, Laravel React, Stripe integration, TypeScript, Tailwind CSS, SaaS development" />
                <meta property="og:title" content="TechnoSaas - Rapid SaaS Development Boilerplate" />
                <meta property="og:description" content="Launch your SaaS faster with TechnoSaas. Seamless Laravel and React integration, Stripe, TypeScript, and more." />
                <meta property="og:url" content={`${appUrl}/`} />
                <meta property="og:image" content={`${appUrl}/Preview.png`} />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="TechnoSaas - Rapid SaaS Development Boilerplate" />
                <meta name="twitter:description" content="Launch your SaaS faster with TechnoSaas. Seamless Laravel and React integration, Stripe, TypeScript, and more." />
                <meta name="twitter:image" content={`${appUrl}/Preview.png`} />
                <meta name="twitter:card" content="summary_large_image" />
                <link rel="canonical" href={`${appUrl}/`} />
            </Head>
            <div className="text-gray-800 relative dark:bg-black/90 dark:text-white/50 overflow-hidden">
                <img id="background" className="absolute -left-20 top-0 max-w-[877px]" src="/hero-blur.png" alt="Background decoration" />
                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header>
                            <nav className="w-full" aria-label="Main navigation">
                                <Navbar auth={auth} />
                            </nav>
                        </header>

                        <main>
                            <Hero />
                            <TechnologiesBanner />
                            <FeaturesSection />
                            <PriceCards
                                products={products?.data}
                                csrf={csrf}
                            />
                            <FAQ />
                        </main>

                        <footer className="py-16 px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-between text-sm text-black dark:text-white/70">
                            <p>&copy; {new Date().getFullYear()} TechnoSaas. All rights reserved.</p>
                            <div className="mt-4">
                                <IconButton
                                    color="primary"
                                    sx={{
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        },
                                    }}
                                    href="https://x.com/technoSaas"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Follow on X"
                                >
                                    <FaTwitter />
                                </IconButton>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}