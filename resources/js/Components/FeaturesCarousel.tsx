import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaCode, FaDesktop, FaKey, FaLaravel, FaSearch, FaStripe } from "react-icons/fa";

const features = [
    {
        title: "Stripe Integration",
        description: "Easily manage payments with our Stripe integration, supporting one-time payments and subscriptions. With built-in support for secure transactions, you can streamline your payment processes.",
        icon: <FaStripe className="w-12 h-12 text-primary" />
    },
    {
        title: "Laravel Breeze & Socialite",
        description: "Manage user authentication with Laravel Breeze, including support for Google, Facebook, and email logins. Our setup makes it easy to get started with secure and reliable user sign-ups.",
        icon: <FaKey className="w-8 h-8 text-primary" />
    },
    {
        title: "TypeScript & Tailwind Combined",
        description: "Use TypeScript for type safety and Tailwind CSS for fast, utility-first styling. This combination helps you create responsive interfaces efficiently while keeping your code clean and maintainable.",
        icon: <FaCode className="w-8 h-8 text-primary" />
    },
    {
        title: "Laravel",
        description: "Built on Laravel, a popular PHP framework, our boilerplate provides a solid foundation for your web application development, ensuring a smooth and efficient workflow.",
        icon: <FaLaravel className="w-8 h-8 text-primary" />
    },
    {
        title: "Responsive Design",
        description: "Ensure your app looks great on all devices with our fully responsive design. The layout adapts seamlessly to different screen sizes, providing a consistent user experience.",
        icon: <FaDesktop className="w-8 h-8 text-primary" />
    },
    {
        title: "SEO Optimized",
        description: "Enhance your app's search engine visibility with our built-in SEO features. From optimized meta tags to clean HTML, our boilerplate is designed to help your application perform well online.",
        icon: <FaSearch className="w-8 h-8 text-primary" />
    },
];


const FeatureCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? features.length - 1 : prevIndex - 1
        );
    };

    return (
        <section className="py-16 md:py-24 bg-gray-100 dark:bg-transparent">
            <div className="container mx-auto">

                <h6 className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-primary">
                    Features
                </h6>
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
                    Discover What Makes Our SaaS Boilerplate Stand Out
                </h2>
                <h6 className="text-lg text-center text-gray-700 dark:text-gray-300 mb-8">
                    Build Your Next Project Faster with Pre-Configured Integrations and Tools. <br /> Explore Our Key Features Below.
                </h6>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md text-left hover:ring-1 hover:ring-primary transition duration-300"
                        >
                            <div className="mb-4  rounded-lg w-16 h-16 flex items-center justify-center ">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                                {feature.title}
                            </h3>
                            <hr className="h-0.5 bg-primary rounded-lg mb-6 w-8" />
                            <p className="text-gray-600 dark:text-gray-300">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureCarousel;
