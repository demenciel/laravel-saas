import React from 'react'
import { Link } from '@inertiajs/react'
import { motion } from 'framer-motion'

const Header = () => {
    return (
        <div className="container h-[75vh] flex items-center justify-center mx-auto">
            <div className="w-full flex flex-col items-center text-center relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-4 mb-4 flex flex-col items-center">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="text-3xl font-bold text-gray-800 dark:text-white  tracking-tighter sm:text-5xl xl:text-6xl/none mb-4"
                            >
                                Streamline Your <span className='text-primary'>SaaS</span> Operations
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="max-w-[700px] text-center text-muted-foreground md:text-xl"
                            >
                                Our boilerplate provides a solid foundation to build your next-generation SaaS application. <br />
                                It started as a search for Laravel and React boilerplates, but evolved into project that can be used as a starting point for any SaaS application.
                            </motion.p>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex flex-col gap-2 min-[400px]:flex-row justify-center"
                        >
                            <Link
                                href='#'
                                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-transform duration-300 hover:bg-primary/90 hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group"
                            >
                                <span className="relative z-10 text-gray-800 dark:text-white font-bold">Get Started</span>
                                <motion.div
                                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                                    initial={{ scale: 0, x: "-50%", y: "-50%" }}
                                    whileHover={{ scale: 1.5 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </Link>
                            <a
                                href='https://github.com/demenciel/laravel-saas'
                                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-transform duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group"
                            >
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 0C5.37 0 0 5.37 0 12C0 17.3 3.438 21.8 8.205 23.385C8.805 23.475 9.025 23.145 9.025 22.865C9.025 22.615 9.015 21.865 9.01 20.865C5.672 21.565 4.968 19.415 4.968 19.415C4.422 18.065 3.633 17.715 3.633 17.715C2.545 17.065 3.722 17.08 3.722 17.08C4.922 17.165 5.548 18.315 5.548 18.315C6.622 20.065 8.348 19.565 9.048 19.265C9.148 18.515 9.422 18.015 9.748 17.715C7.122 17.415 4.322 16.365 4.322 11.665C4.322 10.315 4.822 9.215 5.622 8.365C5.522 8.065 5.122 6.815 5.722 5.115C5.722 5.115 6.822 4.815 9.022 6.415C9.922 6.165 10.922 6.065 11.922 6.065C12.922 6.065 13.922 6.165 14.822 6.415C17.022 4.815 18.122 5.115 18.122 5.115C18.722 6.815 18.322 8.065 18.222 8.365C19.022 9.215 19.522 10.315 19.522 11.665C19.522 16.375 16.722 17.415 14.097 17.715C14.522 18.115 14.922 18.915 14.922 20.115C14.922 21.815 14.912 22.615 14.912 22.865C14.912 23.145 15.132 23.485 15.732 23.385C20.498 21.8 24 17.3 24 12C24 5.37 18.63 0 12 0Z" />
                                </svg>
                                <span className="relative z-10 text-gray-800 dark:text-white font-bold">Star on GitHub</span>
                                <motion.div
                                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                                    initial={{ scale: 0, x: "-50%", y: "-50%" }}
                                    whileHover={{ scale: 1.5 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>

    )
}

export default Header