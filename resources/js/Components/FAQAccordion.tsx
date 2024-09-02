import { motion } from "framer-motion";

const FAQAccordion = ({ faq, index, activeIndex, toggleFAQ }: { faq: any, index: number, activeIndex: number | null, toggleFAQ: (index: number) => void }) => {
    return (
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
    )
}

export default FAQAccordion