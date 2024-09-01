import { Link, Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import SubscriptionCards from '@/Components/SubscriptionCards';
import Header from '@/Components/Header';
import TechnologiesBanner from '@/Components/TechnoBanner';
import FeatureCarousel from '@/Components/FeaturesCarousel';
import Navbar from '@/Components/Navbar';

export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    const products = usePage().props.products;

    return (
        <>
            <Head>
                <title>Welcome to TechnoSaas</title>
                <meta name="description" content="Discover TechnoSaas, the ultimate SaaS boilerplate to streamline your operations. Build your next project faster with pre-configured integrations and tools." />
                <meta name="keywords" content="SaaS, TechnoSaas, boilerplate, Laravel, React, TypeScript, Tailwind CSS, Stripe Integration, SEO Optimized" />
                <meta property="og:title" content="Welcome to TechnoSaas" />
                <meta property="og:description" content="Discover TechnoSaas, the ultimate SaaS boilerplate to streamline your operations. Build your next project faster with pre-configured integrations and tools." />
                <meta property="og:image" content="https://example.com/og-image.jpg" />
                <meta property="og:url" content="https://example.com/welcome" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Welcome to TechnoSaas" />
                <meta name="twitter:description" content="Discover TechnoSaas, the ultimate SaaS boilerplate to streamline your operations. Build your next project faster with pre-configured integrations and tools." />
                <meta name="twitter:image" content="https://example.com/twitter-image.jpg" />
            </Head>
            <div className="dark bg-gray-50 text-black/50 dark:bg-black/90 dark:text-white/50">
                <img id="background" className="absolute -left-20 top-0 max-w-[877px]" src="/hero-blur.png" />
                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="">
                            <nav className="w-full">
                                <Navbar auth={auth} />
                            </nav>
                        </header>

                        <main className="flex flex-col justify-center">
                            <Header />
                            <TechnologiesBanner />
                            <FeatureCarousel />
                            <SubscriptionCards
                                products={products?.data}
                            />
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
