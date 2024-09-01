import { useState } from 'react';
import { motion } from 'framer-motion';

const faqs = [
    {
        question: "What is TechnoSaas?",
        answer: "TechnoSaas is a SaaS boilerplate designed to streamline your operations with pre-configured integrations and tools, helping you build your next project faster."
    },
    {
        question: "How do I get started with TechnoSaas?",
        answer: "You can get started with TechnoSaas by signing up on our website and choosing a subscription plan that fits your needs. Our documentation and support team are here to help you every step of the way."
    },
    {
        question: "What integrations are included?",
        answer: "TechnoSaas includes integrations with Stripe for payments, Laravel Breeze & Socialite for user authentication, and more. Check out our features section for a full list of integrations."
    },
    {
        question: "Is TechnoSaas SEO optimized?",
        answer: "Yes, TechnoSaas is built with SEO in mind. From optimized meta tags to clean HTML, our boilerplate is designed to help your application perform well online."
    },
    {
        question: "Can I customize TechnoSaas?",
        answer: "Absolutely! TechnoSaas is designed to be flexible and customizable. You can tailor it to fit your specific needs and requirements."
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-16 md:py-24 ">
            <div className="container mx-auto">
                <h6 className="text-xl font-bold text-center mb-4 text-primary">
                    FAQ
                </h6>
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
                    Frequently Asked Questions
                </h2>
                <h6 className="text-lg text-center text-gray-700 dark:text-gray-300 mb-8">
                    Find answers to common questions about TechnoSaas below.
                </h6>

                <div className="grid gap-6">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md text-left hover:ring-1 hover:ring-primary transition duration-300"
                        >
                            <motion.div
                                initial="collapsed"
                                animate={activeIndex === index ? "expanded" : "collapsed"}
                                variants={{
                                    expanded: { height: "auto" },
                                    collapsed: { height: "auto" }
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="cursor-pointer"
                                onClick={() => toggleFAQ(index)}
                            >
                                <div className='w-full flex flex-row items-center'>
                                    <div className="text-xl font-semibold text-gray-800 dark:text-white flex-grow">
                                        {faq.question}
                                    </div>
                                    <div className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                </div>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        transition={{ duration: 0.3 }}
                                        className='mt-4'
                                    >
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
