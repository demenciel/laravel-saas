import { Link } from '@inertiajs/react'
import { motion } from 'framer-motion'

const Hero = () => {
    return (
        <section className="container h-[75vh] flex items-center justify-center mx-auto" aria-label="Hero">
            <div className="w-full flex flex-col items-center text-center relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <div className="flex flex-col justify-center space-y-4">
                        <header className="space-y-4 mb-4 flex flex-col items-center" aria-label="Hero Header">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="text-3xl font-bold text-gray-800 dark:text-white  tracking-tighter sm:text-5xl xl:text-6xl/none mb-4"
                            >
                                Streamline Your SaaS Development with <span className='text-primary'>TechnoSaas</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="max-w-[700px] text-center text-muted-foreground md:text-xl"
                            >
                                TechnoSaas offers a robust SaaS boilerplate built on Laravel and React, designed to accelerate your application development. Perfect for developers, our solution comes pre-configured with essential integrations, including Stripe and TypeScript.
                            </motion.p>
                        </header>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex flex-col gap-2 min-[400px]:flex-row justify-center"
                        >
                            <Link
                                href='#products'
                                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-transform duration-300 hover:bg-primary/90 hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group"
                            >
                                <span className="relative z-10 text-white font-bold">Get Started</span>
                                <motion.div
                                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                                    initial={{ scale: 0, x: "-50%", y: "-50%" }}
                                    whileHover={{ scale: 1.5 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>

    )
}

export default Hero