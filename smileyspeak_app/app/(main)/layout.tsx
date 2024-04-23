import Navbar from '@/components/Navbar';
import React, { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "SmileySpeak",
  description: "Discover & Share Fun & Joyful comments",
  icons: {
    icon: "/images/smileylogo.png",
  },
};

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="w-full flex flex-col gap-10 items-center md:mt-10">
        {children}
      </main>
    </>
  )
}

export default HomeLayout