import { Link, Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import TechnologiesBanner from '@/Components/TechnoBanner';
import Navbar from '@/Components/Navbar';
import FAQ from '@/Components/FAQ';
import Hero from '@/Components/Hero';
import Features from '@/Components/Features';
import PriceCards from '@/Components/PriceCards';

export default function Welcome({ auth }: PageProps) {
    const { products, csrf, appUrl } = usePage().props as unknown as {
        products: { data: any[] },
        csrf: string,
        appUrl: string
    };
    return (
        <>
            <Head>
                <title>TechnoSaas - The Ultimate SaaS Boilerplate for Laravel and React</title>
                <meta name="description" content="Boost your SaaS development with TechnoSaas, a robust Laravel and React boilerplate. Streamline your operations with built-in integrations for Stripe, TypeScript, and more." />
                <meta name="keywords" content="SaaS boilerplate, TechnoSaas, Laravel React boilerplate, Stripe integration, TypeScript, Tailwind CSS, SaaS development tools, SEO optimized SaaS" />
                <meta property="og:title" content="TechnoSaas - Your Go-To SaaS Boilerplate" />
                <meta property="og:description" content="Build your SaaS project faster with TechnoSaas, featuring seamless Laravel and React integration, Stripe, TypeScript, and more." />
                <meta property="og:url" content={`${appUrl}/`} />
                <meta property="og:image" content={`${appUrl}/Preview.png`} />
                <meta name="twitter:title" content="TechnoSaas - Your Go-To SaaS Boilerplate" />
                <meta name="twitter:description" content="Build your SaaS project faster with TechnoSaas, featuring seamless Laravel and React integration, Stripe, TypeScript, and more." />
                <meta name="twitter:image" content={`${appUrl}/Preview.png`} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <div className="text-gray-800 relative dark:bg-black/90 dark:text-white/50 overflow-hidden">
                <img id="background" className="absolute -left-20 top-0 max-w-[877px]" src="/hero-blur.png" />
                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="">
                            <nav className="w-full">
                                <Navbar auth={auth} />
                            </nav>
                        </header>

                        <main className="flex flex-col justify-center">
                            <Hero />
                            <TechnologiesBanner />
                            <Features />
                            <PriceCards
                                products={products?.data}
                                csrf={csrf}
                            />
                            <FAQ />
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            TechnoSaas © {new Date().getFullYear()}
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
