import { motion } from "framer-motion";
import { FaDesktop, FaKey, FaLaravel, FaSearch, FaStripe, FaDatabase, FaTools } from "react-icons/fa";

const features = [
    {
        title: "Laravel: The PHP Framework for Web Development",
        description: "Built on Laravel, a popular PHP framework, our boilerplate provides a solid foundation for your web application development, ensuring a smooth and efficient workflow.",
        icon: <FaLaravel className="w-8 h-8 text-primary" />,
        features: [
            "Fast and secure backend development using modern PHP practices.",
            "Built-in support for routing, middleware, and controllers.",
            "Streamline database management with Eloquent ORM."
        ]
    },
    {
        title: "Automated Setup Scripts: Get Started in Minutes",
        description: "Simplify your development process with our automated setup scripts for project configuration, SSL certificate creation, and Nginx configuration. Get your project up and running in minutes.",
        icon: <FaTools className="w-8 h-8 text-primary" />,
        features: [
            "Automated SSL certificate generation with Let’s Encrypt.",
            "Pre-configured Nginx for optimal performance and security.",
            "Reduce initial setup time with ready-to-use environment configuration."
        ]
    },
    {
        title: "Simplified Payment Integration with Stripe",
        description: "Easily manage payments with our Stripe integration, supporting one-time payments and subscriptions. No more wasting time setting up Stripe logic.",
        icon: <FaStripe className="w-12 h-12 text-primary" />,
        features: [
            "Support for both one-time payments and recurring subscriptions.",
            "Pre-built webhook handling for seamless Stripe integration.",
            "Detailed payment analytics and reporting."
        ]
    },
    {
        title: "Laravel Breeze & Socialite: Secure and Reliable User Sign-ups",
        description: "Manage user authentication with Laravel Breeze, including support for Google, Facebook, and email logins. Our setup makes it easy to get started with secure and reliable user sign-ups.",
        icon: <FaKey className="w-8 h-8 text-primary" />,
        features: [
            "Out-of-the-box social login with Google, Facebook, and more.",
            "Secure user registration and login with email verification.",
            "Fully customizable authentication flows for your SaaS app."
        ]
    },
    {
        title: "Responsive Design: Ensure Your App Looks Great on All Devices",
        description: "Ensure your app looks great on all devices with our fully responsive design. The layout adapts seamlessly to different screen sizes, providing a consistent user experience.",
        icon: <FaDesktop className="w-8 h-8 text-primary" />,
        features: [
            "Responsive design optimized for desktop, tablet, and mobile.",
            "Pixel-perfect rendering across a variety of devices and screen sizes.",
            "Fluid layouts that adapt seamlessly to any screen resolution."
        ]
    },
    {
        title: "SEO Optimized: Enhance Your App's Search Engine Visibility",
        description: "Enhance your app's search engine visibility with our built-in SEO features. From optimized meta tags to clean HTML, our boilerplate is designed to help your application perform well online.",
        icon: <FaSearch className="w-8 h-8 text-primary" />,
        features: [
            "Optimized meta tags and headers for better search engine ranking.",
            "Clean HTML structure to improve crawling and indexing.",
            "Built-in sitemap generation and structured data markup for SEO."
        ]
    }
];

const Features = () => {
    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto">
                <h5 className="text-xl font-bold text-center mb-4 text-primary">
                    Features
                </h5>
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
                    Discover the Best SaaS Boilerplate: TechnoSaas Features
                </h2>
                <h6 className="text-lg text-center text-gray-700 dark:text-gray-300 mb-8 max-w-[700px] mx-auto">
                    Easily manage payments with our Stripe integration, supporting one-time payments and subscriptions. Built into TechnoSaas, this feature saves you time and effort, allowing you to focus on developing your SaaS product.
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
                            <div className="mb-4 rounded-lg w-16 h-16 flex items-center justify-center">
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

export default Features;
