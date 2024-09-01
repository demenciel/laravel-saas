import { usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface Product {
    id: string;
    name: string;
    description: string | null;
    prices?: Array<{
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
    csrf: string;
}

export default function SubscriptionCards({ products = [], csrf }: SubscriptionCardProps) {
    const handlePurchase = (priceId: string) => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/payments/redirect-to-one-time-checkout';

        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = '_token';
        csrfInput.value = csrf;
        form.appendChild(csrfInput);

        const priceInput = document.createElement('input');
        priceInput.type = 'hidden';
        priceInput.name = 'price_id';
        priceInput.value = priceId;
        form.appendChild(priceInput);

        document.body.appendChild(form);
        form.submit();
    };

    return (
        <section id='products' className="pb-16 md:py-16 bg-gray-100 dark:bg-transparent">
            <div className="container px-4 mx-auto">
                <h6 className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-primary">
                    Pricing
                </h6>
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
                    One-Time Purchase Plans
                </h2>
                <h6 className="text-lg text-center text-gray-700 dark:text-gray-300 mb-8">
                    Build Your Next Project Faster with Pre-Configured Integrations and Tools. <br /> Explore Our One-Time Purchase Plans Below.
                </h6>

                <div className={`grid gap-8 ${products.length === 1 ? 'justify-center' : products.length === 2 ? 'sm:grid-cols-1 md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
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
                            <div className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md text-left hover:ring-1 hover:ring-primary transition duration-300">
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">{product.name}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">{product.description || 'No description available'}</p>
                                </div>
                                <div className="p-6 py-6 border-t border-gray-200 dark:border-gray-700">
                                    {product.prices && product.prices.length > 0 && (
                                        <div className="my-6 text-center">
                                            <span className="text-4xl font-bold text-gray-900 dark:text-white">
                                                ${product.prices[0].unit_amount / 100}
                                            </span>
                                            <span className="text-xl font-medium text-gray-600 dark:text-gray-300">
                                                {product.prices[0].currency.toUpperCase()}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400 block">
                                                One-time purchase
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <button
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                                    onClick={() => handlePurchase(product.prices && product.prices.length > 0 ? product.prices[0].id : '')}
                                >
                                    Purchase Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section >
    );
}