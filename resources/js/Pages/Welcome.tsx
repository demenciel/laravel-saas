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
                <title>Welcome</title>
                <meta name="description" content="Discover TechnoSaas, the ultimate SaaS boilerplate to streamline your operations. Build your next project faster with pre-configured integrations and tools." />
                <meta name="keywords" content="SaaS, TechnoSaas, boilerplate, Laravel, React, TypeScript, Tailwind CSS, Stripe Integration, SEO Optimized" />
                <meta property="og:title" content="Welcome" />
                <meta property="og:description" content="Discover TechnoSaas, the ultimate SaaS boilerplate to streamline your operations. Build your next project faster with pre-configured integrations and tools." />
                <meta property="og:url" content={`${appUrl}/`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Welcome" />
                <meta name="twitter:description" content="Discover TechnoSaas, the ultimate SaaS boilerplate to streamline your operations. Build your next project faster with pre-configured integrations and tools." />
                <meta name="twitter:image" content={`${appUrl}/path_to_image.png`} />
            </Head>
            <div className=" text-gray-800 dark:bg-black/90 dark:text-white/50">
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
