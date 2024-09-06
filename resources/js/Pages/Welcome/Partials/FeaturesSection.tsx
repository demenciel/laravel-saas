import { CheckCircleTwoTone } from "@mui/icons-material";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { motion } from "framer-motion";
import { FaDesktop, FaKey, FaLaravel, FaSearch, FaStripe, FaTools } from "react-icons/fa";

const features = [
    {
        title: "Laravel",
        description:
            "Built on Laravel, the most popular PHP framework, our boilerplate provides a solid foundation for your web application development, ensuring a smooth and efficient workflow.",
        icon: <FaLaravel className="w-8 h-8 text-white" />,
        subFeatures: [
            "MVC architecture for easier development",
            "Robust routing and middleware",
            "Comprehensive ORM for database management",
        ],
        image: "/images/feature-laravel.png",
    },
    {
        title: "Automated Setup Scripts",
        description:
            "Simplify your development process with our automated setup scripts for project configuration, SSL certificate creation, Github repository creation, and Nginx configuration. Get your project up and running in minutes.",
        icon: <FaTools className="w-8 h-8 text-white" />,
        subFeatures: [
            "Auto-configure SSL certificates with Certbot",
            "Auto-create Nginx server configuration",
            "Auto-create Github repository",
        ],
        image: "/images/feature-scripts.png",
    },
    {
        title: "Stripe Integration",
        description:
            "Easily manage payments with our Stripe integration, supporting one-time payments and subscriptions. No more wasting time setting up Stripe logic.",
        icon: <FaStripe className="w-12 h-12 text-white" />,
        subFeatures: [
            "Supports one-time and subscription payments",
            "Seamless Stripe checkout integration",
            "Webhook support for real-time payment updates",
        ],
        image: "/images/feature-stripe.png",
    },
    {
        title: "Laravel Breeze & Socialite",
        description:
            "Manage user authentication with Laravel Breeze, including support for Google, Facebook, and email logins. Our setup makes it easy to get started with secure and reliable user sign-ups.",
        icon: <FaKey className="w-8 h-8 text-white" />,
        subFeatures: [
            "OAuth login via Google and Facebook",
            "Secure email and password authentication",
            "Pre-built user management system",
        ],
        image: "/images/feature-oauth.png",
    },
    {
        title: "Responsive Design",
        description:
            "Ensure your app looks great on all devices with our fully responsive design. The layout adapts seamlessly to different screen sizes, providing a consistent user experience.",
        icon: <FaDesktop className="w-8 h-8 text-white" />,
        subFeatures: [
            "Mobile-first approach",
            "Optimized for tablets and desktops",
            "Seamless layout transition across devices",
        ],
        image: "/images/feature-responsive.png",
    },
    {
        title: "SEO Optimized",
        description:
            "Enhance your app's search engine visibility with our built-in SEO features. From optimized meta tags to clean HTML, our boilerplate is designed to help your application perform well online.",
        icon: <FaSearch className="w-8 h-8 text-white" />,
        subFeatures: [
            "Pre-configured meta tags",
            "Search engine friendly URL structure",
            "Optimized HTML structure",
        ],
        image: "/images/feature-seo.png",
    },
];

const FeaturesSection = () => {
    return (
        <section className="py-16 md:py-24" aria-label="Features">
            <div className="container mx-auto">
                <motion.h2
                    className="sm:text-xl md:text-3xl font-bold text-center text-gray-800 dark:text-white mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Discover the Best SaaS Boilerplate: TechnoSaas Features
                </motion.h2>

                {features.map((feature, index) => (
                    <motion.article
                        key={index}
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: false }}
                        className="sm:mb-4 md:mb-12 lg:mb-24 last:mb-0 sm:pt-8 md:pt-16 lg:pt-32"
                    >
                        <div className={`flex container mx-auto flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} justify-between items-center`}>
                            <div className="w-full md:w-1/2 order-2 md:order-none mb-8 md:mb-0 flex justify-center">
                                <div className="text-left md:pr-12">
                                    <Box className={`flex flex-row items-start`}>
                                        <h3 className={`text-xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-4`}>{feature.title}</h3>
                                    </Box>
                                    <p className="text-sm lg:text-lg text-left text-gray-600 dark:text-gray-300 mb-6">{feature.description}</p>
                                    <List className="text-gray-600 dark:text-gray-300" aria-label={`${feature.title} benefits`}>
                                        {feature.subFeatures.map((subFeature, subIndex) => (
                                            <ListItem key={subIndex}>
                                                <ListItemIcon>
                                                    <CheckCircleTwoTone fontSize="small" className="text-primary" aria-hidden="true" />
                                                </ListItemIcon>
                                                <ListItemText primary={subFeature} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 order-1 md:order-none flex justify-center mb-8 md:mb-0">
                                <motion.div
                                    className="w-full max-w-md mx-auto"
                                    whileHover="hover"
                                    initial="rest"
                                    variants={{
                                        rest: { scale: 1 },
                                        hover: { scale: 1.05 }
                                    }}
                                >
                                    <motion.div
                                        className="flex items-center justify-center"
                                        variants={{
                                            rest: { rotateX: 0, rotateY: 0 },
                                            hover: { rotateX: 0, rotateY: 0 }
                                        }}
                                        whileHover="hover"
                                        onMouseMove={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            const x = e.clientX - rect.left;
                                            const y = e.clientY - rect.top;
                                            const centerX = rect.width / 2;
                                            const centerY = rect.height / 2;
                                            const rotateX = (y - centerY) / 10;
                                            const rotateY = (centerX - x) / 10;
                                            e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        <img src={feature.image} alt={`Illustration of ${feature.title} feature`} className="w-full h-auto" loading="lazy" />
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    );
};

export default FeaturesSection;
