import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface Product {
    id: string;
    name: string;
    description: string | null;
    prices: Array<{
        id: string;
        currency: string;
        recurring: {
            interval: string;
            interval_count: number;
        };
        unit_amount: number;
    }>;
    url?: string | null;
    features: string[];
}

interface SubscriptionCardProps {
    products: Product[];
}

export default function SubscriptionCards({ products = [] }: SubscriptionCardProps) {
    return (
        <section className="py-16 md:py-24">
            <div className="container px-4 mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Choose Your Plan</h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            viewport={{ once: true }}
                            whileInView="visible"
                            variants={{
                                visible: { opacity: 1, scale: 1 },
                                hidden: { opacity: 0, scale: 0 }
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            className={index === 1 ? "scale-110" : ""}
                        >
                            <div className="
                                overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-3 lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]">
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">{product.name}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">{product.description || 'No description available'}</p>
                                </div>
                                <div className="p-6 py-6 border-t border-gray-200 dark:border-gray-700">
                                    {product.prices && product.prices.length > 0 && (
                                        <div className="my-6 text-center">
                                            <span className="text-4xl font-bold text-gray-900 dark:text-white">
                                                {product.prices[0].unit_amount / 100}
                                            </span>
                                            <span className="text-xl font-medium text-gray-600 dark:text-gray-300">
                                                {product.prices[0].currency.toUpperCase()}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400 block">
                                                {product.prices[0].recurring.interval_count > 1
                                                    ? `per ${product.prices[0].recurring.interval_count} ${product.prices[0].recurring.interval}s`
                                                    : `per ${product.prices[0].recurring.interval}`}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                                    Get Started
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}