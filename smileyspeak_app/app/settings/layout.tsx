import Navbar from '@/components/Navbar';
import React, { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "SmileySpeak | Settings",
    description: "Log Out or Update your Profile",
    icons: {
        icon: "/images/smileylogo.png",
    },
};

const SettingsLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <main className="w-full h-[calc(100vh-136px)] flex justify-center items-center">
                {children}
            </main>
        </>
    )
}

export default SettingsLayout