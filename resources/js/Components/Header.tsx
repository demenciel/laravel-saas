import React from 'react'
import { Link } from '@inertiajs/react'
import { motion } from 'framer-motion'

const Header = () => {
    return (
        <div className="container h-[75vh] flex items-center">
            <div className="w-full grid gap-6 lg:grid-cols-2 lg:gap-8 relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                            >
                                Streamline Your SaaS Operations
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="max-w-[600px] text-muted-foreground md:text-xl"
                            >
                                Our boilerplate provides a solid foundation to build your next-generation SaaS application, with a focus
                                on performance, security, and scalability.
                            </motion.p>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex flex-col gap-2 min-[400px]:flex-row"
                        >
                            <Link
                                href='#'
                                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group"
                            >
                                <span className="relative z-10">Get Started</span>
                                <motion.div
                                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                                    initial={{ scale: 0, x: "-50%", y: "-50%" }}
                                    whileHover={{ scale: 1.5 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </Link>
                            <Link
                                href='#'
                                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group"
                            >
                                <span className="relative z-10">Learn More</span>
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
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.15, scale: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] pointer-events-none"
                >
                    <div className="absolute inset-0 bg-gradient-radial from-primary to-transparent opacity-30" />
                </motion.div>
            </div>
        </div>
    )
}

export default Header