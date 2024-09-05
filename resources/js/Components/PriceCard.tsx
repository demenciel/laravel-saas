import React from "react";

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

const PriceCard = ({
    product,
    products,
    setData,
}: {
    product: Product;
    products: Product[];
    setData: (data: any) => void;
}) => {
    const isHighestPriced = () => {
        if (!product.prices || product.prices.length === 0) return false;
        const currentPrice = product.prices[0].unit_amount;
        return products.every(p => !p.prices || p.prices.length === 0 || p.prices[0].unit_amount <= currentPrice);
    };

    const buttonStyle = isHighestPriced()
        ? "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        : "w-full bg-transparent hover:bg-blue-600 text-blue-600 hover:text-white font-bold py-2 px-4 rounded border border-blue-600 transition duration-300";
    return (
        <div className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md text-left hover:ring-1 hover:ring-primary transition duration-300">
            <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    {product.description || "No description available"}
                </p>
            </div>
            <div className="p-6 py-6 border-t border-gray-200 dark:border-gray-700">
                {product.prices && product.prices.length > 0 && (
                    <div className="my-6 text-center">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                            ${product.prices[0].unit_amount / 100}
                        </span>
                        <span className="text-xl font-medium text-gray-600 dark:text-gray-300">
                            {product.prices[0].currency.toUpperCase()} {product.prices[0].recurring && `/${product.prices[0].recurring.interval}ly`}
                        </span>
                        {!product.prices[0].recurring && (
                            <span className="text-sm text-gray-500 dark:text-gray-400 block">
                                One-time purchase
                            </span>
                        )}
                    </div>
                )}
            </div>
            {/* <div className="p-6 py-6 border-t border-gray-200 dark:border-gray-700">
                {
                    product.features.map((feature, index) => (
                        // add a checkmark icon before the feature
                        <li className="text-gray-600 dark:text-gray-300" key={index}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 inline-block mr-2">
                                <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                            </svg>
                            {feature}
                        </li>
                    ))
                }
            </div> */}
            <button
                className={buttonStyle}
                onClick={() => setData({ product: product })}
            >
                Start Building
            </button>
        </div>
    );
};

export default PriceCard;
