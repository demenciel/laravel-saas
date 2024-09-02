
import { Link } from '@inertiajs/react'
import { User } from '@/types';
import { motion } from 'framer-motion';

interface AuthProps {
    user: User;
}
import { useState } from 'react';
import ApplicationLogo from './ApplicationLogo';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ auth }: { auth: AuthProps }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            <Link href="/">
                                <ApplicationLogo height={146} width={146} />
                            </Link>
                        </div>
                    </div>
                    <div className="hidden sm:flex sm:items-center">
                        <Link
                            href="#products"
                            className="rounded-md px-3 py-2 text-gray-800 ring-1 ring-transparent transition hover:text-gray-800/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Products
                        </Link>
                    </div>
                    <div className="hidden sm:flex sm:items-center space-x-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-md px-3 py-2 text-gray-800 ring-1 ring-transparent transition hover:text-gray-800/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <ThemeToggle />
                                <Link
                                    href={route('login')}
                                    className="rounded-md px-3 py-2 text-gray-800 mx-2 ring-1 ring-transparent transition hover:text-gray-800/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-md bg-primary px-3 py-2 text-gray-800 ring-1 ring-transparent transition hover:text-gray-800/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    className={isOpen ? 'hidden' : 'inline-flex'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={isOpen ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`${isOpen ? 'flex relative  w-full' : 'hidden'} sm:hidden`}>
                <div className="absolute w-full px-2 pt-2 pb-3 space-y-1 text-right items-end">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            href="#products"
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 ring-1 ring-transparent transition hover:text-gray-800/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Products
                        </Link>
                    </motion.div>
                    {auth.user ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className='space-x-4'
                        >
                            <Link
                                href={route('dashboard')}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 ring-1 ring-transparent transition hover:text-gray-800/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Dashboard
                            </Link>
                        </motion.div>
                    ) : (
                        <>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <Link
                                    href={route('login')}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 ring-1 ring-transparent transition hover:text-gray-800/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Sign in
                                </Link>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <Link
                                    href={route('register')}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 ring-1 ring-transparent transition hover:text-gray-800/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Sign up
                                </Link>
                            </motion.div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;