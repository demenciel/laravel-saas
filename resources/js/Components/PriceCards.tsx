import { motion } from 'framer-motion';
import PriceCard from './PriceCard';
import { useForm } from '@inertiajs/react';


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
    features: { name: string }[];
}

interface SubscriptionCardProps {
    products: Product[];
    csrf: string;
}

export default function PriceCards({ products = [], csrf }: SubscriptionCardProps) {
    const { data, setData } = useForm<{ product: Product | null }>({
        product: null
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (data?.product?.prices && data?.product?.prices[0].id && data?.product?.prices[0].recurring) {
            handlePurchase(data.product.prices[0].id, route('payments.subscription-checkout'));
        } else if (data?.product?.prices && data?.product?.prices[0].id && !data?.product?.prices[0].recurring) {
            handlePurchase(data.product.prices[0].id, route('payments.one-time-checkout'));
        }
    };

    const handlePurchase = (priceId: string, route: string) => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = route;

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
                <form onSubmit={submit}>
                    <h6 className="text-xl font-bold text-center mb-4 text-primary">
                        Pricing
                    </h6>
                    <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
                        Affordable SaaS Boilerplate Pricing <br /> One-Time Purchase Plans
                    </h2>
                    <h6 className="text-lg text-center text-gray-700 dark:text-gray-300 mb-8">
                        Build Your Next Project Faster with Pre-Configured Integrations and Tools.
                    </h6>

                    <div className={`grid items-center sm:gap-8 lg:gap-0 ${products.length === 2 ? 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto' : 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
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
                                className={`shadow-lg max-w-[360px] rounded-2xl ${index === 1 ? "scale-110" : ""} ${products.length === 2 ? 'mx-auto' : ''}`}
                            >
                                <PriceCard products={products} product={product} setData={setData} />
                            </motion.div>
                        ))}
                    </div>
                </form>
            </div>
        </section >
    );
}