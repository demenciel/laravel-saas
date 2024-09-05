import React from "react";
import { Box, Typography, Button, Divider, Paper, Grid } from "@mui/material";
import { CheckCircleTwoTone } from "@mui/icons-material";
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
    features: {
        name: string;
    }[];
    url?: string | null;
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
    console.log(product);

    const isHighestPriced = () => {
        if (!product.prices || product.prices.length === 0) return false;
        const currentPrice = product.prices[0].unit_amount;
        return products.every(p => !p.prices || p.prices.length === 0 || p.prices[0].unit_amount <= currentPrice);
    };



    const buttonStyle = isHighestPriced()
        ? "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        : "w-full bg-transparent hover:bg-blue-600 text-blue-600 hover:text-white font-bold py-2 px-4 rounded-lg border border-blue-600 transition duration-300";

    return (
        <Paper className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md text-left hover:ring-1 hover:ring-primary transition duration-300 flex flex-col h-full">
            <Box className="p-6">
                <Typography
                    fontWeight={isHighestPriced() ? "bold" : "normal"}
                    variant={isHighestPriced() ? "h4" : "h5"} className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                    {product.name}
                </Typography>
            </Box>
            <Divider className="border-gray-200 dark:border-gray-700" />
            <Box className="p-2 py-6 flex-grow">
                {product?.features && product?.features.map((feature, index) => (
                    <Box key={index} className="py-2">
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={1} >
                                <CheckCircleTwoTone className="text-primary mr-2 inline-block" />
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="body1" className="text-gray-600 dark:text-gray-300">
                                    {feature.name}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                ))}
            </Box>
            <Divider className="border-gray-200 dark:border-gray-700" />
            <Box className="p-6 py-6">
                {product.prices && product.prices.length > 0 && (
                    <Box className="my-6 text-center">
                        <Typography variant="h4" component="span" className="text-4xl font-bold text-gray-900 dark:text-white">
                            ${product.prices[0].unit_amount / 100}
                        </Typography>
                        <Typography variant="h6" component="span" className="text-xl font-medium text-gray-600 dark:text-gray-300">
                            {product.prices[0].currency.toUpperCase()} {product.prices[0].recurring && `/${product.prices[0].recurring.interval}ly`}
                        </Typography>
                        {!product.prices[0].recurring && (
                            <Typography variant="body2" className="text-sm text-gray-500 dark:text-gray-400 block">
                                Pay once, use forever
                            </Typography>
                        )}
                    </Box>
                )}
            </Box>
            <button
                className={buttonStyle}
                onClick={() => setData({ product: product })}
            >
                Start Building
            </button>
        </Paper>
    );
};

export default PriceCard;