import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";

const features = [
    {
        title: "Stripe Integration",
        description: "Basic Stripe integration for handling payments seamlessly.",
    },
    {
        title: "Laravel Breeze & Socialite",
        description: "Auth handling with Google, Facebook, and email login support.",
    },
    {
        title: "TypeScript & Tailwind",
        description: "Using TypeScript for type safety and Tailwind for utility-first styling.",
    },
    {
        title: "Laravel",
        description: "A powerful PHP framework that provides a solid foundation for web development.",
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
            <div className="container px-4 mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
                    Key Features
                </h2>
                <div className="relative">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md text-center"
                    >
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                            {features[currentIndex].title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {features[currentIndex].description}
                        </p>
                    </motion.div>
                    <div className="absolute inset-y-0 left-0 flex items-center">
                        <button
                            onClick={handlePrev}
                            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                        >
                            &#8592;
                        </button>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        <button
                            onClick={handleNext}
                            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                        >
                            &#8594;
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeatureCarousel;
