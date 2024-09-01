import { motion } from 'framer-motion';
import PriceCard from './PriceCard';

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

export default function PriceCards({ products = [], csrf }: SubscriptionCardProps) {
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
        <section id='products' className="pb-16 md:py-16">
            <div className="container px-4 mx-auto">
                <h6 className="text-xl font-bold text-center mb-4 text-primary">
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
                            className={`max-w-[320px] ${index === 1 ? "scale-110" : ""}`}
                        >
                            <PriceCard product={product} handlePurchase={handlePurchase} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section >
    );
}