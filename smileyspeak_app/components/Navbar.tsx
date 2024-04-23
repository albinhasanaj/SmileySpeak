"use client";
import { useState } from 'react';
import Image from 'next/image';
import Button from './Button';
import NavLi from './NavLi';

import { motion, AnimatePresence } from 'framer-motion';
import { menuVariants } from '@/motion/navbar';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getNavLinks } from '@/utils/getNavLinks';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated } = useAuth();
    const navLinks = getNavLinks(pathname, isAuthenticated);

    return (
        <nav className="flex flex-col items-center mx-12 md:mx-0">
            {/* desktop */}
            <div className="hidden md:flex w-full items-center justify-around">

                <div className="flex items-center gap-4 cursor-pointer"
                    onClick={() => router.push('/')}
                >
                    <Image src="/images/smileylogo.png"
                        alt="SmileySpeak Logo"
                        width={64}
                        height={64}
                        onLoadingComplete={() => setIsLoading(false)}
                    />
                    <h2 className="md:text-[32px] lg:text-[48px] text-black">SMILEY SPEAK</h2>
                </div>
                <div className="flex gap-4">
                    {navLinks.map((link, index) => (
                        <Button key={index} text={isLoading ? "Loading..." : link} redirect={true} />
                    ))}
                </div>
            </div>
            {/* mobile */}
            <div className="md:hidden w-full flex flex-col items-end relative">

                <Image src={isOpen ? "icons/cross.svg" : "/icons/hamburger.svg"}
                    alt="Hamburger Menu"
                    width={64}
                    height={64}
                    onClick={() => setIsOpen(prev => !prev)}
                    className="cursor-pointer"
                />

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={menuVariants}
                            className="absolute top-full right-[-1.25rem] py-8 px-6 bg-[#C4C4C4] rounded-[15px] z-[99]">
                            <ul className="flex flex-col gap-2">
                                {navLinks.map((link, index) => (
                                    <NavLi key={index} text={link} />
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    )
}

export default Navbar