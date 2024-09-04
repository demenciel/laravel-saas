import React from "react";
// import check icon frm mui
import CheckIcon from '@mui/icons-material/Check';
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
    marketing_features: Array<{
        name: string;
    }>;
    url?: string | null;
    features: string[];
}

const PriceCard = ({
    product,
    setData,
}: {
    product: Product;
    setData: (data: any) => void;
}) => {
    console.log(product);
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
            <div className="flex flex-col gap-2 p-6 mb-4 border-t border-gray-200 dark:border-gray-700">

                {product.marketing_features.length > 0 && product.marketing_features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-green-500" />
                        <span className="text-gray-800 dark:text-white">{feature.name}</span>
                    </div>
                ))}
            </div>
            <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                onClick={() => setData({ product: product })}
            >
                Purchase Now
            </button>
        </div>
    );
};

export default PriceCard;
