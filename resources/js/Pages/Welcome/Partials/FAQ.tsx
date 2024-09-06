import { useState } from 'react';
import { motion } from 'framer-motion';
import FAQAccordion from '@/Components/FAQAccordion';

const faqs = [
    {
        question: "What is TechnoSaas?",
        answer: "TechnoSaas is a SaaS boilerplate designed to streamline your operations with pre-configured integrations and tools, helping you build your next project faster."
    },
    {
        question: "How do I get started with TechnoSaas?",
        answer: "You can get started with TechnoSaas by making a one-time payment on our website. Once your payment is processed, we'll send you a download link for the boilerplate. Our documentation is available to guide you through the setup process."
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
                    TechnoSaas FAQ: Get All Your Questions Answered
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
                            <FAQAccordion faq={faq} index={index} activeIndex={activeIndex} toggleFAQ={toggleFAQ} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
